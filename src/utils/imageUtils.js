/**
 * Downloads an image from a URL and converts it to a Base64 string
 * @param {string} url - The URL of the image to download
 * @returns {Promise<string>} - A promise that resolves to the Base64 string
 */
export const downloadImageAsBase64 = async (url) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error downloading image:', error);
    return null;
  }
};

/**
 * Stores an image in localStorage with a key based on movie title and year
 * @param {string} title - Movie title
 * @param {string} year - Release year
 * @param {string} imageBase64 - Base64 encoded image data
 */
export const storeImageLocally = (title, year, imageBase64) => {
  if (!imageBase64) return;
  
  // Create a key that's safe for localStorage
  const key = `movie_poster_${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${year}`;
  
  try {
    localStorage.setItem(key, imageBase64);
  } catch (error) {
    // Handle localStorage quota exceeded
    console.error('Error storing image in localStorage:', error);
    // Clean up old images if quota is exceeded
    cleanupOldImages();
  }
};

/**
 * Gets a locally stored image from localStorage
 * @param {string} title - Movie title
 * @param {string} year - Release year
 * @returns {string|null} - Base64 encoded image data or null if not found
 */
export const getLocalImage = (title, year) => {
  const key = `movie_poster_${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${year}`;
  return localStorage.getItem(key);
};

/**
 * Cleans up older images from localStorage when quota is exceeded
 * This is a simple implementation that removes random items
 */
const cleanupOldImages = () => {
  const keysToRemove = [];
  
  // Find all poster keys
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('movie_poster_')) {
      keysToRemove.push(key);
    }
  }
  
  // Remove 20% of the cached images to free up space
  const removeCount = Math.ceil(keysToRemove.length * 0.2);
  for (let i = 0; i < removeCount; i++) {
    if (keysToRemove.length > 0) {
      const randomIndex = Math.floor(Math.random() * keysToRemove.length);
      const keyToRemove = keysToRemove.splice(randomIndex, 1)[0];
      localStorage.removeItem(keyToRemove);
    }
  }
};