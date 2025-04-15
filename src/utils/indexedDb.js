/**
 * Open a connection to the IndexedDB database
 * @returns {Promise<IDBDatabase>} - Promise resolving to the database connection
 */
export const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('MarvelMoviesDB', 1);
    
    request.onerror = (event) => {
      console.error('IndexedDB error:', event.target.error);
      reject('Error opening database');
    };
    
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Create object stores for our data
      if (!db.objectStoreNames.contains('posters')) {
        const posterStore = db.createObjectStore('posters', { keyPath: 'id' });
        posterStore.createIndex('movieId', 'movieId', { unique: false });
      }
      
      if (!db.objectStoreNames.contains('movieMetadata')) {
        db.createObjectStore('movieMetadata', { keyPath: 'id' });
      }
    };
  });
};

/**
 * Save a movie poster to IndexedDB
 * @param {number} movieId - The ID of the movie
 * @param {string} title - The title of the movie 
 * @param {string} year - The release year
 * @param {Blob} imageBlob - The poster image as a Blob
 * @returns {Promise<string>} - Promise resolving to the poster filename
 */
export const savePoster = async (movieId, title, year, imageBlob) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(['posters'], 'readwrite');
    const store = transaction.objectStore('posters');
    
    // Create a unique ID for the poster
    const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const id = `${sanitizedTitle}_${year || 'unknown'}`;
    const filename = `${id}.jpg`;
    
    // Store the poster in IndexedDB
    const poster = {
      id,
      movieId,
      title,
      year,
      filename,
      image: imageBlob,
      timestamp: Date.now()
    };
    
    return new Promise((resolve, reject) => {
      const request = store.put(poster);
      
      request.onsuccess = () => {
        resolve(filename);
      };
      
      request.onerror = (event) => {
        console.error('Error saving poster:', event.target.error);
        reject('Failed to save poster');
      };
    });
  } catch (error) {
    console.error('IndexedDB error:', error);
    throw error;
  }
};

/**
 * Get a movie poster from IndexedDB
 * @param {string} title - The title of the movie
 * @param {string} year - The release year
 * @returns {Promise<Object|null>} - Promise resolving to poster object or null if not found
 */
export const getPoster = async (title, year) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(['posters'], 'readonly');
    const store = transaction.objectStore('posters');
    
    const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const id = `${sanitizedTitle}_${year || 'unknown'}`;
    
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      
      request.onsuccess = () => {
        const poster = request.result;
        resolve(poster);
      };
      
      request.onerror = (event) => {
        console.error('Error getting poster:', event.target.error);
        reject('Failed to get poster');
      };
    });
  } catch (error) {
    console.error('IndexedDB error:', error);
    return null;
  }
};

/**
 * Save movie metadata to IndexedDB
 * @param {Object} movie - The movie object containing all metadata
 * @returns {Promise<void>}
 */
export const saveMovieMetadata = async (movie) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(['movieMetadata'], 'readwrite');
    const store = transaction.objectStore('movieMetadata');
    
    return new Promise((resolve, reject) => {
      const request = store.put({
        id: movie.id,
        ...movie,
        lastUpdated: Date.now()
      });
      
      request.onsuccess = () => {
        resolve();
      };
      
      request.onerror = (event) => {
        console.error('Error saving movie metadata:', event.target.error);
        reject('Failed to save movie metadata');
      };
    });
  } catch (error) {
    console.error('IndexedDB error:', error);
    throw error;
  }
};

/**
 * Get movie metadata from IndexedDB
 * @param {number} id - The ID of the movie
 * @returns {Promise<Object|null>} - Promise resolving to movie metadata or null if not found
 */
export const getMovieMetadata = async (id) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(['movieMetadata'], 'readonly');
    const store = transaction.objectStore('movieMetadata');
    
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      
      request.onsuccess = () => {
        resolve(request.result);
      };
      
      request.onerror = (event) => {
        console.error('Error getting movie metadata:', event.target.error);
        reject('Failed to get movie metadata');
      };
    });
  } catch (error) {
    console.error('IndexedDB error:', error);
    return null;
  }
};

/**
 * Check if the poster is older than the specified max age
 * @param {Object} poster - The poster object from IndexedDB
 * @param {number} maxAgeInDays - Maximum age in days before considering the poster stale
 * @returns {boolean} - True if the poster is older than maxAgeInDays
 */
export const isPosterStale = (poster, maxAgeInDays = 30) => {
  if (!poster || !poster.timestamp) return true;
  
  const maxAgeMs = maxAgeInDays * 24 * 60 * 60 * 1000;
  return Date.now() - poster.timestamp > maxAgeMs;
};

/**
 * Create a Blob URL for a poster
 * @param {Blob} blob - The poster image as a Blob
 * @returns {string} - Blob URL for the poster
 */
export const createPosterBlobUrl = (blob) => {
  return URL.createObjectURL(blob);
};

/**
 * Clean up old posters from IndexedDB
 * @param {number} maxItems - Maximum number of posters to keep
 * @returns {Promise<number>} - Promise resolving to the number of posters deleted
 */
export const cleanupOldPosters = async (maxItems = 100) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(['posters'], 'readwrite');
    const store = transaction.objectStore('posters');
    
    return new Promise((resolve) => {
      const posters = [];
      
      store.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        
        if (cursor) {
          posters.push({
            id: cursor.value.id,
            timestamp: cursor.value.timestamp
          });
          cursor.continue();
        } else {
          // If we have more posters than the max, delete the oldest ones
          if (posters.length > maxItems) {
            // Sort by timestamp (oldest first)
            posters.sort((a, b) => a.timestamp - b.timestamp);
            
            // Delete the oldest posters
            const postersToDelete = posters.slice(0, posters.length - maxItems);
            let deletedCount = 0;
            
            postersToDelete.forEach(poster => {
              store.delete(poster.id).onsuccess = () => {
                deletedCount++;
                
                if (deletedCount === postersToDelete.length) {
                  resolve(deletedCount);
                }
              };
            });
          } else {
            resolve(0);
          }
        }
      };
    });
  } catch (error) {
    console.error('Error cleaning up old posters:', error);
    return 0;
  }
};