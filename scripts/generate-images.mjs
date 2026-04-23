import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const outputDir = path.resolve("public/images");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const prompts = [
  {
    name: "hero-1",
    prompt:
      "A beautiful Hawaiian plantation style home with a wide wraparound lanai, green tin roof, board-and-batten siding, set against a lush tropical Maui landscape with palm trees and mountains in the background. Golden hour lighting. Photorealistic architectural photography.",
  },
  {
    name: "hero-2",
    prompt:
      "A charming single-story Hawaiian plantation style home with a large covered porch, white wood siding, and a corrugated metal roof, surrounded by tropical plants and plumeria trees on Maui. Blue sky with scattered clouds. Photorealistic exterior photography.",
  },
  {
    name: "hero-3",
    prompt:
      "A cozy Hawaiian plantation style home interior and exterior view showing an open-air living space that flows onto a wooden lanai with views of the ocean in the distance. Warm natural wood tones, ceiling fans, tropical landscaping. Sunset colors. Photorealistic photography.",
  },
  {
    name: "about",
    prompt:
      "A team of home builders working on a Hawaiian plantation style home under construction on Maui. Wood framing visible, workers wearing hard hats, tropical scenery in background. Warm, authentic feel. Photorealistic photography.",
  },
];

async function generateImage(item) {
  console.log(`Generating: ${item.name}...`);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: item.prompt,
      config: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: {
          aspectRatio: item.name.startsWith("hero") ? "16:9" : "4:3",
        },
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const buffer = Buffer.from(part.inlineData.data, "base64");
        const ext =
          part.inlineData.mimeType === "image/png" ? "png" : "jpg";
        const filePath = path.join(outputDir, `${item.name}.${ext}`);
        fs.writeFileSync(filePath, buffer);
        console.log(`  Saved: ${filePath}`);
        return filePath;
      }
    }
    console.log(`  Warning: No image returned for ${item.name}`);
  } catch (err) {
    console.error(`  Error generating ${item.name}: ${err.message}`);
  }
  return null;
}

async function main() {
  console.log("Generating images for Deep Blue Hawaii...\n");

  // Generate sequentially to avoid rate limits
  for (const item of prompts) {
    await generateImage(item);
  }

  console.log("\nDone! Images saved to public/images/");
}

main();
