// Single source of truth for the API base URL.
// Override it by setting VITE_API_URL in client/.env
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3004';
