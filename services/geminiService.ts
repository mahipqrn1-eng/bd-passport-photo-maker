import { GoogleGenAI } from "@google/genai";

/**
 * Directly calls the Google Gemini API from the browser to process images.
 * This removes the requirement for a PHP proxy and utilizes the Gemini 2.5 Flash Image model.
 */
export async function autoProcessPhotoAI(imageBase64: string): Promise<string | null> {
  try {
    // Initialize the AI client using the environment variable API key
    // The key is injected at runtime and is managed securely in the execution context
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Extract raw base64 data if a data URL is provided
    const base64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
    
    // Call the model for image editing (background removal/replacement)
    // We use gemini-2.5-flash-image as the standard for image generation and editing
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
            text: 'Professional passport photo processing: Remove the existing background and replace it with a solid, pure white (#FFFFFF) background. Maintain high detail on the subject and ensure neutral, balanced lighting suitable for official document standards.',
          },
        ],
      },
    });

    // Extract the resulting image from the response parts
    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          // Return the base64 encoded image data as a data URL using the model's provided MIME type
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }

    // Log warning if the model didn't return an image part
    console.warn("Gemini AI returned a response without an image part.");
    return null;
  } catch (err) {
    // Robust error handling for network or API issues
    console.error("Gemini AI Processing failed:", err);
    return null;
  }
}