export const BASE_URI = import.meta.env.VITE_API_BASE_URI

if (! BASE_URI) 
    throw new Error("VITE_API_BASE_URI is not defined in the .env")