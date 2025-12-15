
// --- STANDALONE MODE ---
// This file has been neutralized to allow the app to run without Firebase dependencies.
// In a real implementation, you might replace this with LocalStorage or IndexedDB.

const db: any = {};
const auth: any = {};
const storage: any = {};

console.log("App is running in Standalone/Offline mode. Firebase is disabled.");

export { db, auth, storage };

// Helper to simulate data fetching (Offline Mock)
export const mockFetch = async <T,>(mockData: T, delay = 500): Promise<T> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockData), delay);
    });
};
