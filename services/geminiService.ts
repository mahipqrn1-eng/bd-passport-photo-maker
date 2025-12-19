import { GoogleGenAI } from "@google/genai";

/**
 * Processes a passport photo using the Gemini 2.5 Flash Image model.
 * Performs background removal and replaces it with pure white (#FFFFFF).
 */
export async function autoProcessPhotoAI(imageBase64: string): Promise<string | null> {
  try {
    // Access the API key from the environment. 
    // We initialize here to ensure the most current key is used.
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      console.error("Gemini API Error: API_KEY is not defined in the environment.");
      return null;
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Clean base64 data by removing potential data URL prefixes
    const base64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
    
    // Prepare the multi-part request as per Gemini 2.5 standards
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: 'image/jpeg'
      }
    };

    const textPart = {
      text: "Professional passport photo processing: Remove the background and replace it with a solid, pure white (#FFFFFF) background. Ensure the subject's face is clearly visible with neutral lighting. Return only the edited image."
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [imagePart, textPart] }
    });

    // Check if the model returned content successfully
    if (!response || !response.candidates || response.candidates.length === 0) {
      console.error("Gemini API Error: No response candidates returned.");
      return null;
    }

    const parts = response.candidates[0].content.parts;
    
    // Iterate through parts to find the image data
    for (const part of parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }

    console.warn("Gemini API Warning: Model responded but no image data was found in the parts.");
    return null;

  } catch (err) {
    console.error("Gemini AI Processing failed:", err);
    // In case of a 404 or "entity not found", usually implies model or key issues
    return null;
  }
}