import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = "gemini-3.1-flash-image-preview";

const outputDir = path.resolve("public/images");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

/**
 * Generate a new image from a text prompt.
 */
async function generateImage({ name, prompt, aspectRatio = "4:3" }) {
  console.log(`Generating: ${name}...`);

  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: { aspectRatio },
      },
    });

    return saveFirstImage(response, name);
  } catch (err) {
    console.error(`  Error generating ${name}: ${err.message}`);
    return null;
  }
}

/**
 * Edit an existing image with a text prompt.
 * @param {string} inputPath - Path to the source image file
 */
async function editImage({ name, inputPath, prompt, aspectRatio = "4:3" }) {
  console.log(`Editing: ${name} (from ${inputPath})...`);

  const imageBytes = fs.readFileSync(inputPath);
  const base64 = imageBytes.toString("base64");
  const mimeType = inputPath.endsWith(".jpg") || inputPath.endsWith(".jpeg")
    ? "image/jpeg"
    : "image/png";

  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType, data: base64 } },
            { text: prompt },
          ],
        },
      ],
      config: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: { aspectRatio },
      },
    });

    return saveFirstImage(response, name);
  } catch (err) {
    console.error(`  Error editing ${name}: ${err.message}`);
    return null;
  }
}

/**
 * Extract and save the first image from a Gemini response.
 */
function saveFirstImage(response, name) {
  for (const part of response.candidates[0].content.parts) {
    if (part.text) {
      console.log(`  Model said: ${part.text.slice(0, 120)}`);
    }
    if (part.inlineData) {
      const buffer = Buffer.from(part.inlineData.data, "base64");
      const ext = part.inlineData.mimeType === "image/png" ? "png" : "jpg";
      const filePath = path.join(outputDir, `${name}.${ext}`);
      fs.writeFileSync(filePath, buffer);
      console.log(`  Saved: ${filePath}`);
      return filePath;
    }
  }
  console.log(`  Warning: No image returned for ${name}`);
  return null;
}

// --- Presets ---

const presets = {
  heroes: [
    {
      name: "hero-1",
      prompt:
        "A beautiful Hawaiian plantation style home with a wide wraparound lanai, green tin roof, board-and-batten siding, set against a lush tropical Maui landscape with palm trees and mountains in the background. Golden hour lighting. Photorealistic architectural photography.",
      aspectRatio: "16:9",
    },
    {
      name: "hero-2",
      prompt:
        "A charming single-story Hawaiian plantation style home with a large covered porch, white wood siding, and a corrugated metal roof, surrounded by tropical plants and plumeria trees on Maui. Blue sky with scattered clouds. Photorealistic exterior photography.",
      aspectRatio: "16:9",
    },
    {
      name: "hero-3",
      prompt:
        "A cozy Hawaiian plantation style home interior and exterior view showing an open-air living space that flows onto a wooden lanai with views of the ocean in the distance. Warm natural wood tones, ceiling fans, tropical landscaping. Sunset colors. Photorealistic photography.",
      aspectRatio: "16:9",
    },
  ],

  about: {
    construction: {
      name: "about-construction",
      inputPath: path.resolve("public/images/about.png"),
      prompt:
        "Edit this image so that the wooden framing beams are replaced with steel beams and steel framing. Keep the workers, the tropical Maui scenery, the same camera angle, and the same overall composition. The structure should clearly show steel I-beams and metal framing instead of wood. Photorealistic photography.",
      aspectRatio: "4:3",
    },
    finished: {
      name: "about-finished",
      inputPath: path.resolve("public/images/about.png"),
      prompt:
        "Transform this image of a house under construction into the same house fully finished and completed. Same camera angle, same tropical Maui location and scenery. The finished home should be a beautiful Hawaiian plantation style house with white siding, a corrugated metal roof, a wraparound lanai with railings, landscaped tropical garden, and a paved driveway. The house should look move-in ready. Photorealistic architectural photography.",
      aspectRatio: "4:3",
    },
  },
};

// --- CLI ---

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("Usage:");
    console.log("  node scripts/generate-images.mjs all        # Generate everything");
    console.log("  node scripts/generate-images.mjs heroes     # Generate hero images only");
    console.log("  node scripts/generate-images.mjs about      # Generate about section images");
    console.log('  node scripts/generate-images.mjs edit <input> "<prompt>" <output>');
    console.log('  node scripts/generate-images.mjs generate "<prompt>" <output>');
    return;
  }

  const command = args[0];

  if (command === "all") {
    for (const item of presets.heroes) {
      await generateImage(item);
    }
    await editImage(presets.about.construction);
    await editImage(presets.about.finished);
  } else if (command === "heroes") {
    for (const item of presets.heroes) {
      await generateImage(item);
    }
  } else if (command === "about") {
    await editImage(presets.about.construction);
    await editImage(presets.about.finished);
  } else if (command === "edit" && args.length >= 4) {
    const inputPath = path.resolve(args[1]);
    const prompt = args[2];
    const name = args[3];
    await editImage({ name, inputPath, prompt });
  } else if (command === "generate" && args.length >= 3) {
    const prompt = args[1];
    const name = args[2];
    await generateImage({ name, prompt });
  } else {
    console.error("Unknown command or missing arguments. Run without arguments for usage.");
  }

  console.log("\nDone!");
}

main();
