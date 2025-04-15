import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FilterContainer = styled.div`
  padding: 0 20px 20px;
  max-width: 1400px;
  margin: 0 auto;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 8px;
  }
`;

const FilterLabel = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-right: 8px;
  display: flex;
  align-items: center;
`;

const FilterButton = styled(motion.button)`
  background-color: ${({ theme, active }) => 
    active ? theme.colors.primary : theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme, active }) => 
      active ? theme.colors.primary : '#2a2a40'};
  }
`;

const SearchInput = styled.input`
  background-color: ${({ theme }) => theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid #333;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 0.9rem;
  flex-grow: 1;
  max-width: 300px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const MovieFilter = ({ 
  franchises, 
  selectedFranchise, 
  setSelectedFranchise,
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption
}) => {
  const sortOptions = [
    { value: 'releaseDate', label: 'Release Date' },
    { value: 'title', label: 'Title (A-Z)' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' }
  ];

  return (
    <FilterContainer>
      <FilterGroup>
        <FilterLabel>Franchise:</FilterLabel>
        <FilterButton
          whileTap={{ scale: 0.95 }}
          active={selectedFranchise === 'all'}
          onClick={() => setSelectedFranchise('all')}
        >
          All
        </FilterButton>
        
        {franchises.map(franchise => (
          <FilterButton
            key={franchise}
            whileTap={{ scale: 0.95 }}
            active={selectedFranchise === franchise}
            onClick={() => setSelectedFranchise(franchise)}
          >
            {franchise}
          </FilterButton>
        ))}
      </FilterGroup>
      
      <FilterGroup>
        <FilterLabel>Sort by:</FilterLabel>
        {sortOptions.map(option => (
          <FilterButton
            key={option.value}
            whileTap={{ scale: 0.95 }}
            active={sortOption === option.value}
            onClick={() => setSortOption(option.value)}
          >
            {option.label}
          </FilterButton>
        ))}
        
        <SearchInput
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </FilterGroup>
    </FilterContainer>
  );
};

export default MovieFilter;