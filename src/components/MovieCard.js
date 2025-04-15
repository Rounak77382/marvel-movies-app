import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { extractYear } from '../utils/helpers';

const Card = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow};
  transition: all ${({ theme }) => theme.transition};
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
`;

const PosterContainer = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 2/3;
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const ReleaseYear = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const ImdbRating = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: ${({ theme }) => theme.colors.accent};
  color: black;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CardContent = styled.div`
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 8px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const ReleaseDate = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 8px;
`;

const Franchise = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: auto;
`;

const MovieCard = ({ movie }) => {
  const releaseYear = extractYear(movie.releaseDate);
  const isUpcoming = movie.releaseDate.includes('upcoming') || movie.releaseDate === 'TBA';
  
  // Use the poster URL from IndexedDB if available, otherwise use API URL or placeholder
  const posterUrl = movie.posterUrl || movie.apiPosterUrl || `/images/placeholder.jpg`;
  
  return (
    <Link to={`/movie/${movie.id}`}>
      <Card
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.98 }}
      >
        <PosterContainer>
          <Poster 
            src={posterUrl} 
            alt={movie.title} 
            loading="lazy" // Add lazy loading for performance
          />
          <ReleaseYear>{releaseYear}</ReleaseYear>
          
          {movie.imdbRating && (
            <ImdbRating>
              <span>★</span> {movie.imdbRating}
            </ImdbRating>
          )}
        </PosterContainer>
        <CardContent>
          <Title>{movie.title}</Title>
          <ReleaseDate>
            {isUpcoming ? (
              <span style={{ color: '#F0E68C' }}>Coming {movie.releaseDate.replace('*(upcoming)*', '')}</span>
            ) : (
              movie.releaseDate
            )}
          </ReleaseDate>
          <Franchise>{movie.franchise}</Franchise>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;