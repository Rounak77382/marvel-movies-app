import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import MovieCard from './MovieCard';

const ListContainer = styled.div`
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 16px;
  }
`;

const Title = styled(motion.h2)`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.text};
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MovieCount = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-left: 12px;
  font-weight: 400;
`;

// const ProgressBar = styled.div`
//   width: 100%;
//   height: 4px;
//   background-color: ${({ theme }) => theme.colors.cardBg};
//   margin-bottom: 24px;
//   border-radius: 2px;
//   overflow: hidden;
// `;

// const Progress = styled.div`
//   height: 100%;
//   width: ${({ value }) => `${value}%`};
//   background-color: ${({ theme }) => theme.colors.primary};
//   transition: width 0.3s ease;
// `;

// Card animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: "easeOut"
    }
  }),
  exit: { opacity: 0, y: -20 }
};

const MovieList = ({ movies }) => {
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [key, setKey] = useState(0);
  
  // Update the rendered movies list when movies change
  useEffect(() => {
    // Only update if we have movies to show
    if (movies && movies.length > 0) {
      setRenderedMovies(movies);
      // Change the key to force re-animation when the movie list changes substantially
      setKey(prev => prev + 1);
    }
  }, [movies]);

  return (
    <ListContainer>
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span>Marvel</span> Movies Collection
        <MovieCount>{renderedMovies.length} movies</MovieCount>
      </Title>
      
      <Grid>
        <AnimatePresence mode="wait">
          {renderedMovies.map((movie, index) => (
            <motion.div
              key={`${movie.id}-${key}`}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </AnimatePresence>
      </Grid>
    </ListContainer>
  );
};

export default MovieList;