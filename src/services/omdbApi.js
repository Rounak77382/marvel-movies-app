const BASE_URL = 'https://www.omdbapi.com/';
const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

/**
 * Convert a response to a blob
 * @param {Response} response - Fetch response object
 * @returns {Promise<Blob>} - Promise resolving to a Blob
 */
const responseToBlob = async (response) => {
  return await response.blob();
};

/**
 * Fetch an image as a Blob
 * @param {string} url - Image URL
 * @returns {Promise<Blob|null>} - Promise resolving to an image Blob or null
 */
export const fetchImageAsBlob = async (url) => {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    
    return await responseToBlob(response);
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
};

/**
 * Fetch movie details from OMDb API
 * @param {string} title - Movie title to search for
 * @param {number|string} year - Optional release year to improve search accuracy
 * @returns {Promise<Object>} - Movie details object or null if not found
 */
export const fetchMovieDetails = async (title, year = null) => {
  try {
    let url = `${BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(title)}`;
    
    // Add year parameter if provided for more accurate search
    if (year) {
      url += `&y=${year}`;
    }
    
    // Check if we're online
    if (!navigator.onLine) {
      console.warn('You are offline. Using cached data only.');
      return null;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`OMDb API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.Response === 'True') {
      return data;
    } else {
      console.warn(`No results found for "${title}" ${year ? `(${year})` : ''}: ${data.Error}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return null;
  }
};

/**
 * Extract year from a date string like "May 2, 2008"
 * @param {string} dateString - Date string from the Marvel movies dataset
 * @returns {string|null} - 4-digit year or null if not found
 */
export const extractYearFromDate = (dateString) => {
  if (!dateString || dateString === 'TBA') {
    return null;
  }
  
  const match = dateString.match(/\d{4}/);
  return match ? match[0] : null;
};