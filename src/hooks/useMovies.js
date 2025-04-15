import { useState, useEffect, useMemo } from 'react';
import movies from '../data/movies';
import { sortMovies } from '../utils/helpers';

const useMovies = () => {
  const [allMovies] = useState(movies);
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFranchise, setSelectedFranchise] = useState('all');
  const [sortOption, setSortOption] = useState('releaseDate');
  
  // Extract unique franchises
  const franchises = useMemo(() => {
    return [...new Set(allMovies.map(movie => movie.franchise))].sort();
  }, [allMovies]);
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...allMovies];
    
    // Filter by franchise
    if (selectedFranchise !== 'all') {
      result = result.filter(movie => movie.franchise === selectedFranchise);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(movie => 
        movie.title.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    result = sortMovies(result, sortOption);
    
    setFilteredMovies(result);
  }, [allMovies, selectedFranchise, searchQuery, sortOption]);
  
  return {
    allMovies,
    filteredMovies,
    franchises,
    searchQuery,
    setSearchQuery,
    selectedFranchise,
    setSelectedFranchise,
    sortOption,
    setSortOption
  };
};

export default useMovies;