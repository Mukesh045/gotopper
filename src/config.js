// Configuration for API endpoints
const getBackendURL = () => {
  // Check if we're running on localhost (development)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000';
  }

  // For GitHub Pages deployment, use a proxy or external backend
  // Since we can't run a backend on GitHub Pages, we'll use a placeholder
  // In a real deployment, you'd need a separate backend service
  if (window.location.hostname === 'mukesh045.github.io') {
    // For demo purposes, return a placeholder URL
    // In production, this should point to your actual backend service
    return 'https://your-backend-service.com';
  }

  // For production or when accessed from mobile devices, use the current host
  // This assumes the backend is running on the same host but different port
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  return `${protocol}//${hostname}:5000`;
};

export const BACKEND_URL = getBackendURL();
