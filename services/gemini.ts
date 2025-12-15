
import { GuideInfo } from "../types";

// --- OFFLINE MODE ---
// This service returns static mock data to simulate AI responses without API keys.

export const generateGuideInfo = async (location: string, title: string): Promise<GuideInfo | null> => {
  // Simulate network delay for a realistic experience
  await new Promise(resolve => setTimeout(resolve, 500));

  console.log(`[Offline Mock] Generating guide info for: ${title} at ${location}`);

  // Return Mock Data directly matching the GuideInfo interface
  return {
      story: "This location is famous for its historical significance dating back to the Edo period. It was originally a villa for a shogun and offers a serene atmosphere amidst the city bustle.",
      highlights: [
          { id: 'm1', text: "Matcha Soft Serve", color: 'green' },
          { id: 'm2', text: "Yudofu (Tofu Hot Pot)", color: 'orange' },
          { id: 'm3', text: "Dango", color: 'red' }
      ],
      tip: "Arrive early to avoid crowds. The best photo spot is across the main pond where you can capture the reflection."
  };
};
