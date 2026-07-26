// Frontend configuration for split deployment
// This file configures the frontend to connect to the backend API

// IMPORTANT: API_BASE_URL must be set in Vercel environment variables
// If not set, this will cause errors in production
const API_BASE_URL = process.env.API_BASE_URL || 'https://palestine-school-backend.onrender.com';

// Export configuration for use in the application
window.FRONTEND_CONFIG = {
    API_BASE_URL: API_BASE_URL,
    // Add other configuration as needed
};

console.log('Frontend config loaded. API Base URL:', API_BASE_URL);
console.log('WARNING: If API_BASE_URL is not set in Vercel environment variables, using default backend URL');
