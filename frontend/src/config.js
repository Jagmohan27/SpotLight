const rawBaseUrl = import.meta.env.VITE_BASE_URL || "https://spotlight-backend-gray.vercel.app";
export const BASE_URL = rawBaseUrl.endsWith("/") ? rawBaseUrl.slice(0, -1) : rawBaseUrl;
