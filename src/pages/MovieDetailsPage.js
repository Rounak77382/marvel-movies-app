import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import movies from "../data/movies";
import {
  fetchMovieDetails,
  extractYearFromDate,
  fetchImageAsBlob,
} from "../services/omdbApi";
import {
  getPoster,
  getMovieMetadata,
  savePoster,
  saveMovieMetadata,
  createPosterBlobUrl,
  isPosterStale,
} from "../utils/indexedDb";

const DetailsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MovieDetails = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 1fr) 2fr;
  gap: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const PosterContainer = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const Poster = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

const ReleaseDate = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 16px;
`;

const Badge = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  margin-right: 12px;
`;

const Phase = styled(Badge)`
  background-color: ${({ theme }) => theme.colors.accent};
  color: #000;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
`;

const RatingScore = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: #f5c518;
`;

const InfoSection = styled.div`
  margin-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 16px;
`;

const InfoTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const InfoText = styled.p`
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const DetailItem = styled.div`
  margin-bottom: 8px;
  line-height: 1.5;
`;

const DetailLabel = styled.span`
  font-weight: 600;
  margin-right: 8px;
  color: ${({ theme }) => theme.colors.text};
`;

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posterUrl, setPosterUrl] = useState(null);

  // Function to clean up resources when component unmounts
  useEffect(() => {
    return () => {
      // Revoke any Blob URLs to prevent memory leaks
      if (posterUrl && posterUrl.startsWith("blob:")) {
        URL.revokeObjectURL(posterUrl);
      }
    };
  }, [posterUrl]);

  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true);

      // Find the base movie data
      const foundMovie = movies.find((m) => m.id === parseInt(id));

      if (foundMovie) {
        try {
          const year = extractYearFromDate(foundMovie.releaseDate);

          // First, check if we have metadata in IndexedDB
          const storedMetadata = await getMovieMetadata(parseInt(id));

          if (storedMetadata) {
            // Set the movie data from IndexedDB
            setMovie(storedMetadata);

            // Now check if we have the poster in IndexedDB
            const storedPoster = await getPoster(foundMovie.title, year);

            if (storedPoster && !isPosterStale(storedPoster)) {
              // Create a Blob URL from the stored image
              const url = createPosterBlobUrl(storedPoster.image);
              setPosterUrl(url);
              setLoading(false);
              return;
            }
          }

          // If we don't have metadata or it's stale, fetch from OMDb API
          // Skip upcoming movies that might not have data yet
          if (
            !foundMovie.releaseDate.includes("upcoming") &&
            foundMovie.releaseDate !== "TBA"
          ) {
            const omdbData = await fetchMovieDetails(foundMovie.title, year);

            if (omdbData) {
              const apiPosterUrl =
                omdbData.Poster !== "N/A" ? omdbData.Poster : null;

              const enhancedMovie = {
                ...foundMovie,
                apiPosterUrl,
                plot: omdbData.Plot !== "N/A" ? omdbData.Plot : null,
                director:
                  omdbData.Director !== "N/A" ? omdbData.Director : null,
                actors: omdbData.Actors !== "N/A" ? omdbData.Actors : null,
                imdbRating:
                  omdbData.imdbRating !== "N/A" ? omdbData.imdbRating : null,
                runtime: omdbData.Runtime !== "N/A" ? omdbData.Runtime : null,
                genre: omdbData.Genre !== "N/A" ? omdbData.Genre : null,
                awards: omdbData.Awards !== "N/A" ? omdbData.Awards : null,
                boxOffice:
                  omdbData.BoxOffice !== "N/A" ? omdbData.BoxOffice : null,
              };

              // Save the metadata to IndexedDB
              await saveMovieMetadata(enhancedMovie);

              setMovie(enhancedMovie);

              // Download and store the poster image if available
              if (apiPosterUrl) {
                const imageBlob = await fetchImageAsBlob(apiPosterUrl);
                if (imageBlob) {
                  await savePoster(
                    foundMovie.id,
                    foundMovie.title,
                    year,
                    imageBlob
                  );

                  // Create a Blob URL from the downloaded image
                  const url = createPosterBlobUrl(imageBlob);
                  setPosterUrl(url);
                } else {
                  // If we couldn't get the image as a blob, just use the API URL
                  setPosterUrl(apiPosterUrl);
                }
              }
            } else {
              // If no OMDb data, just use the base movie data
              setMovie(foundMovie);
            }
          } else {
            // For upcoming movies, just use the base data
            setMovie(foundMovie);
          }
        } catch (error) {
          console.error("Error loading movie:", error);
          setMovie(foundMovie);
        }
      }

      setLoading(false);
    };

    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <DetailsContainer>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading movie details...
        </motion.div>
      </DetailsContainer>
    );
  }

  if (!movie) {
    return (
      <DetailsContainer>
        <h1>Movie not found</h1>
        <BackButton to="/">← Back to all movies</BackButton>
      </DetailsContainer>
    );
  }

  return (
    <DetailsContainer>
      <BackButton to="/">← Back to all movies</BackButton>

      <MovieDetails
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <PosterContainer>
          <Poster
            src={
              posterUrl ||
              movie.apiPosterUrl ||
              `https://via.placeholder.com/500x750?text=${encodeURIComponent(
                movie.title
              )}`
            }
            alt={movie.title}
          />
        </PosterContainer>

        <InfoContainer>
          <Title>{movie.title}</Title>
          <ReleaseDate>
            {movie.releaseDate.includes("upcoming") ? (
              <span style={{ color: "#F0E68C" }}>
                Coming {movie.releaseDate.replace("*(upcoming)*", "")}
              </span>
            ) : (
              `Released on ${movie.releaseDate}`
            )}
          </ReleaseDate>

          <div>
            <Badge>{movie.franchise}</Badge>
            {movie.phase && <Phase>{movie.phase}</Phase>}
            {movie.genre &&
              movie.genre.split(", ").map((g) => (
                <Badge key={g} style={{ backgroundColor: "#3a3a4a" }}>
                  {g}
                </Badge>
              ))}
          </div>

          {movie.imdbRating && (
            <Rating>
              <RatingScore>★ {movie.imdbRating}</RatingScore>
              <span>IMDb Rating</span>
            </Rating>
          )}

          {movie.plot && (
            <InfoSection>
              <InfoTitle>Synopsis</InfoTitle>
              <InfoText>{movie.plot}</InfoText>
            </InfoSection>
          )}

          <InfoSection>
            <InfoTitle>Details</InfoTitle>

            {movie.director && (
              <DetailItem>
                <DetailLabel>Director:</DetailLabel>
                {movie.director}
              </DetailItem>
            )}

            {movie.actors && (
              <DetailItem>
                <DetailLabel>Cast:</DetailLabel>
                {movie.actors}
              </DetailItem>
            )}

            {movie.runtime && (
              <DetailItem>
                <DetailLabel>Runtime:</DetailLabel>
                {movie.runtime}
              </DetailItem>
            )}

            {movie.boxOffice && (
              <DetailItem>
                <DetailLabel>Box Office:</DetailLabel>
                {movie.boxOffice}
              </DetailItem>
            )}

            {movie.awards && (
              <DetailItem>
                <DetailLabel>Awards:</DetailLabel>
                {movie.awards}
              </DetailItem>
            )}
          </InfoSection>
        </InfoContainer>
      </MovieDetails>
    </DetailsContainer>
  );
};

export default MovieDetailsPage;
