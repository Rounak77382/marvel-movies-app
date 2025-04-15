import { useState, useEffect, useRef } from 'react';
import { fetchMovieDetails, extractYearFromDate, fetchImageAsBlob } from '../services/omdbApi';
import { 
  savePoster, 
  getPoster, 
  saveMovieMetadata, 
  getMovieMetadata, 
  isPosterStale,
  createPosterBlobUrl,
  cleanupOldPosters
} from '../utils/indexedDb';

/**
 * Custom hook for fetching and managing movie data from OMDb API with IndexedDB storage
 * @param {Array} movies - List of movies to fetch data for
 * @returns {Object} - Object containing loaded movies and loading state
 */
const useOmdbData = (movies) => {
  const [enhancedMovies, setEnhancedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const processingRef = useRef(false);
  const progressRef = useRef(0);
  
  useEffect(() => {
    // Don't start a new fetch if we're already processing
    if (processingRef.current) return;
    
    processingRef.current = true;
    
    const fetchMoviesData = async () => {
      setIsLoading(true);
      
      // Clean up old posters periodically
      try {
        const deletedCount = await cleanupOldPosters(150); // Keep max 150 posters
        if (deletedCount > 0) {
          console.log(`Cleaned up ${deletedCount} old posters from IndexedDB`);
        }
      } catch (e) {
        console.error('Error cleaning up old posters:', e);
      }
      
      // Create a copy of movies to update with API data
      const updatedMovies = [...movies];
      
      // Process movies in batches to avoid overwhelming the browser
      const batchSize = 10; // Increased batch size
      for (let i = 0; i < updatedMovies.length; i += batchSize) {
        const batch = updatedMovies.slice(i, i + batchSize);
        
        // Process each movie in the batch in parallel
        await Promise.all(batch.map(async (movie, batchIndex) => {
          const index = i + batchIndex;
          
          try {
            // Extract year from release date for more accurate API search
            const year = extractYearFromDate(movie.releaseDate);
            
            // First, check if we have complete metadata in IndexedDB
            const storedMetadata = await getMovieMetadata(movie.id);
            const currentTime = Date.now();
            const oneWeekMs = 7 * 24 * 60 * 60 * 1000;
            
            if (storedMetadata && (currentTime - storedMetadata.lastUpdated < oneWeekMs)) {
              // We have recent metadata, use it
              updatedMovies[index] = {
                ...movie,
                ...storedMetadata,
                posterUrl: null // Will be set below
              };
            }
            
            // Now, check if we have the poster in IndexedDB
            const storedPoster = await getPoster(movie.title, year);
            
            if (storedPoster && !isPosterStale(storedPoster)) {
              // Create a Blob URL from the stored image
              const posterUrl = createPosterBlobUrl(storedPoster.image);
              updatedMovies[index] = {
                ...updatedMovies[index],
                posterUrl,
                hasCachedPoster: true
              };
            } else {
              // Skip upcoming movies that might not have data yet
              if (movie.releaseDate.includes('upcoming') || movie.releaseDate === 'TBA') {
                return;
              }
              
              // If we don't have metadata or it's old, fetch from OMDb
              if (!storedMetadata || (currentTime - storedMetadata.lastUpdated >= oneWeekMs)) {
                // Fetch movie details from OMDb
                const omdbData = await fetchMovieDetails(movie.title, year);
                
                // Update movie with OMDb data if found
                if (omdbData) {
                  const posterUrl = omdbData.Poster !== 'N/A' ? omdbData.Poster : null;
                  
                  const movieData = {
                    ...movie,
                    apiPosterUrl: posterUrl,
                    plot: omdbData.Plot !== 'N/A' ? omdbData.Plot : null,
                    director: omdbData.Director !== 'N/A' ? omdbData.Director : null,
                    actors: omdbData.Actors !== 'N/A' ? omdbData.Actors : null,
                    imdbRating: omdbData.imdbRating !== 'N/A' ? omdbData.imdbRating : null,
                    runtime: omdbData.Runtime !== 'N/A' ? omdbData.Runtime : null,
                    genre: omdbData.Genre !== 'N/A' ? omdbData.Genre : null,
                    awards: omdbData.Awards !== 'N/A' ? omdbData.Awards : null,
                    boxOffice: omdbData.BoxOffice !== 'N/A' ? omdbData.BoxOffice : null,
                  };
                  
                  // Save the metadata to IndexedDB
                  await saveMovieMetadata(movieData);
                  
                  updatedMovies[index] = movieData;
                  
                  // Download and store the poster image if available
                  if (posterUrl) {
                    const imageBlob = await fetchImageAsBlob(posterUrl);
                    if (imageBlob) {
                      await savePoster(movie.id, movie.title, year, imageBlob);
                      
                      // Create a Blob URL from the downloaded image
                      const localPosterUrl = createPosterBlobUrl(imageBlob);
                      updatedMovies[index].posterUrl = localPosterUrl;
                      updatedMovies[index].hasCachedPoster = true;
                    }
                  }
                }
              }
            }
          } catch (error) {
            console.error(`Error processing movie ${movie.title}:`, error);
          }
        }));
        
        // Update the processing progress but don't re-render yet
        progressRef.current = Math.round((i + batchSize) / updatedMovies.length * 100);
        
        // Small delay between batches
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Only update the UI once all processing is complete
      setEnhancedMovies(updatedMovies);
      setIsLoading(false);
      processingRef.current = false;
    };
    
    fetchMoviesData();
    
    // Cleanup function to revoke Blob URLs
    return () => {
      enhancedMovies.forEach(movie => {
        if (movie.posterUrl && movie.hasCachedPoster) {
          URL.revokeObjectURL(movie.posterUrl);
        }
      });
      processingRef.current = false;
    };
  }, [movies]);
  
  // Add a listener for online/offline events to refresh data when coming back online
  useEffect(() => {
    const handleOnline = () => {
      console.log('Internet connection restored. Refreshing data...');
      processingRef.current = false; // Reset processing status
      setEnhancedMovies([]); // This will trigger the other useEffect to refetch data
    };
    
    window.addEventListener('online', handleOnline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);
  
  return { enhancedMovies, isLoading, progress: progressRef.current };
};

export default useOmdbData;