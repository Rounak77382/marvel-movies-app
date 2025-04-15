import React from 'react';
import styled from 'styled-components';
import MovieList from '../components/MovieList';
import MovieFilter from '../components/MovieFilter';
import useMovies from '../hooks/useMovies';
import useOmdbData from '../hooks/useOmdbData';

const HomeContainer = styled.div`
  min-height: 100vh;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ProgressBar = styled.div`
  width: 80%;
  max-width: 600px;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.cardBg};
  margin: 20px auto;
  border-radius: 3px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  width: ${({ value }) => `${value}%`};
  background-color: ${({ theme }) => theme.colors.primary};
  transition: width 0.3s ease;
`;

const HomePage = () => {
  const {
    filteredMovies,
    franchises,
    searchQuery,
    setSearchQuery,
    selectedFranchise,
    setSelectedFranchise,
    sortOption,
    setSortOption
  } = useMovies();
  
  // Use the OMDb data hook to enhance movies with posters and other info
  const { enhancedMovies, isLoading, progress } = useOmdbData(filteredMovies);

  return (
    <HomeContainer>
      <MovieFilter 
        franchises={franchises}
        selectedFranchise={selectedFranchise}
        setSelectedFranchise={setSelectedFranchise}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      
      {isLoading ? (
        <>
          <LoadingMessage>Loading movie details and posters...</LoadingMessage>
          <ProgressBar>
            <Progress value={progress} />
          </ProgressBar>
        </>
      ) : (
        <MovieList movies={enhancedMovies} />
      )}
    </HomeContainer>
  );
};

export default HomePage;