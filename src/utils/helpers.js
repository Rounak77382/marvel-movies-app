// Extract year from a date string
export const extractYear = (dateString) => {
  if (!dateString) return 'TBA';
  if (dateString.includes('upcoming') || dateString.includes('TBA')) return 'Upcoming';
  
  const match = dateString.match(/\d{4}/);
  return match ? match[0] : '';
};

// Sort movies by various criteria
export const sortMovies = (movies, sortBy = 'releaseDate') => {
  const sortedMovies = [...movies];
  
  switch (sortBy) {
    case 'title':
      return sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
    case 'newest':
      return sortedMovies.sort((a, b) => {
        if (a.releaseDate.includes('upcoming') && !b.releaseDate.includes('upcoming')) return -1;
        if (!a.releaseDate.includes('upcoming') && b.releaseDate.includes('upcoming')) return 1;
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      });
    case 'oldest':
      return sortedMovies.sort((a, b) => {
        if (a.releaseDate.includes('upcoming') && !b.releaseDate.includes('upcoming')) return 1;
        if (!a.releaseDate.includes('upcoming') && b.releaseDate.includes('upcoming')) return -1;
        return new Date(a.releaseDate) - new Date(b.releaseDate);
      });
    case 'releaseDate':
    default:
      return sortedMovies.sort((a, b) => {
        if (a.releaseDate.includes('upcoming') && !b.releaseDate.includes('upcoming')) return 1;
        if (!a.releaseDate.includes('upcoming') && b.releaseDate.includes('upcoming')) return -1;
        return new Date(a.releaseDate) - new Date(b.releaseDate);
      });
  }
};

// Group movies by franchise
export const groupByFranchise = (movies) => {
  const groups = {};
  
  movies.forEach(movie => {
    if (!groups[movie.franchise]) {
      groups[movie.franchise] = [];
    }
    groups[movie.franchise].push(movie);
  });
  
  return groups;
};