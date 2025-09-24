// Configuration for API endpoints
const getBackendURL = () => {
  // Check if we're running on localhost (development)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000';
  }

  // For production or when accessed from mobile devices, use the current host
  // This assumes the backend is running on the same host but different port
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  return `${protocol}//${hostname}:5000`;
};

export const BACKEND_URL = getBackendURL();
