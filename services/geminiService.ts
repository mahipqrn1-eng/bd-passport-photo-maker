import { GoogleGenAI } from "@google/genai";

/**
 * Processes a passport photo using the Gemini 2.5 Flash Image model.
 * Performs background removal and replaces it with pure white (#FFFFFF).
 */
export async function autoProcessPhotoAI(imageBase64: string): Promise<string | null> {
  try {
    // Access the API key exclusively from the environment.
    // Ensure you have set 'API_KEY' in your hosting dashboard (e.g., Netlify/Vercel settings).
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      console.warn("Gemini API Error: API_KEY is not defined in the environment variables.");
      return null;
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    // Extract base64 raw data
    const base64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
    
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: 'image/jpeg'
      }
    };

    const textPart = {
      text: "Portrait Background Removal Task: Remove the background from this person's photo and replace it with a solid, pure white color (#FFFFFF). Maintain the person's features exactly as they are. Return only the edited image."
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [imagePart, textPart] }
    });

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error("No response candidates from Gemini.");
    }

    // Find and return the image part from the response
    const parts = response.candidates[0].content.parts;
    for (const part of parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }

    console.warn("AI processing finished but no image data was found in response.");
    return null;

  } catch (err) {
    console.error("Gemini AI Background Removal Failed:", err);
    return null;
  }
}