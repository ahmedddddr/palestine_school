// Frontend configuration for split deployment
// This file configures the frontend to connect to the backend API

const API_BASE_URL = process.env.API_BASE_URL || window.location.origin;

// Export configuration for use in the application
window.FRONTEND_CONFIG = {
    API_BASE_URL: API_BASE_URL,
    // Add other configuration as needed
};

console.log('Frontend config loaded. API Base URL:', API_BASE_URL);
