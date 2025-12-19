import { GoogleGenAI } from "@google/genai";

/**
 * Directly calls the Google Gemini API from the browser to process images.
 * Note: When calling from the frontend, the API Key is visible in network requests.
 * Standard practice is to restrict the key to your domain in the Google Cloud Console.
 */
export async function autoProcessPhotoAI(imageBase64: string): Promise<string | null> {
  try {
    // Safety check for API key to prevent app crash
    const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : (window as any).API_KEY;
    
    if (!apiKey) {
      console.error("API Key is missing. Please configure process.env.API_KEY.");
      return null;
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const base64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
    
    // Using gemini-2.5-flash-image for high-quality background removal and lighting adjustment
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: 'image/jpeg',
            },
          },
          {
            text: 'Professional passport photo task: Carefully remove the background and replace it with solid pure white (#FFFFFF). Ensure the subject face lighting is balanced and neutral for official document use. Output ONLY the resulting image.',
          },
        ],
      },
    });

    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }

    console.warn("AI response did not contain image data.");
    return null;
  } catch (err) {
    console.error("Gemini AI Error:", err);
    return null;
  }
}