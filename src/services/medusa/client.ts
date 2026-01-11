import Medusa from "@medusajs/medusa-js";

const MEDUSA_API_URL = import.meta.env.VITE_MEDUSA_API_URL;
const MEDUSA_PUBLISHABLE_KEY = import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY;

if (!MEDUSA_API_URL) {
    console.warn(
        "VITE_MEDUSA_API_URL is not defined. Using fallback URL. Please configure .env.local"
    );
}

// Singleton instance
export const medusaClient = new Medusa({
    baseUrl: MEDUSA_API_URL || "http://localhost:9000",
    maxRetries: 3,
    publishableApiKey: MEDUSA_PUBLISHABLE_KEY,
});

export default medusaClient;
