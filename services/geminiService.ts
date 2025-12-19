import { GoogleGenAI } from "@google/genai";

/**
 * Processes a passport photo using the Gemini 2.5 Flash Image model.
 * Performs background removal and replaces it with pure white (#FFFFFF).
 */
export async function autoProcessPhotoAI(imageBase64: string): Promise<string | null> {
  try {
    // Access the API key exclusively from the environment.
    // Ensure you have set 'API_KEY' in your hosting dashboard (e.g., Netlify settings).
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      console.error("Gemini API Error: API_KEY is not defined in the environment.");
      return null;
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Clean base64 data to get raw bytes
    const base64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
    
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: 'image/jpeg'
      }
    };

    const textPart = {
      text: "Professional task: Remove the background of this portrait and replace it with a solid, pure white color (#FFFFFF). Keep the person and their features exactly as they are. Return ONLY the edited image."
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [imagePart, textPart] }
    });

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error("No response candidates received from Gemini.");
    }

    // Iterate through all parts to find the image part as per SDK guidelines
    const parts = response.candidates[0].content.parts;
    for (const part of parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      } else if (part.text) {
        console.log("Model response text:", part.text);
      }
    }

    console.warn("AI response did not contain an image part.");
    return null;

  } catch (err) {
    console.error("Gemini AI Processing failed:", err);
    return null;
  }
}