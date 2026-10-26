import fs from 'node:fs';
import path from 'node:path';

function loadFalApiKey() {
  if (process.env.FAL_API_KEY) return process.env.FAL_API_KEY.trim();
  const envFiles = ['.env.local', '.env'];
  for (const file of envFiles) {
    const fullPath = path.join(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      for (const line of content.split(/\r?\n/)) {
        const match = line.match(/^FAL_API_KEY=(.+)$/);
        if (match) {
          return match[1].trim().replace(/^['"]|['"]$/g, '');
        }
      }
    }
  }
  throw new Error('FAL_API_KEY not found in environment or .env.local');
}

const STYLE_SUFFIX =
  'gritty South African crime noir graphic novel illustration, Citizen Sleeper and Disco Elysium painterly art style, high contrast dramatic shadows, humid rain reflections, amber sodium streetlights and cyan neon accents, expressive brushwork, cinematic 16:9 widescreen composition, no text or watermarks';

const ASSETS = [
  // --- CUTSCENE ARTWORKS ---
  {
    outputPath: 'public/assets/cutscenes/climax_berth14.jpg',
    prompt: `Cinematic wide shot of Durban container terminal Berth 14 at night during heavy rain and power blackout, convoy of heavy municipal water tankers escorted by unmarked tactical police vans with flashing blue strobes, giant container cranes silhouetted against lightning, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/cutscenes/climax_kendon.jpg',
    prompt: `Cinematic wide shot of massive electrical substation explosion at midnight in Johannesburg Highveld, blinding turquoise electric arcs tearing through high-voltage transformer pylons, industrial coal rail depot in foreground under falling rain, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/cutscenes/climax_namaqua.jpg',
    prompt: `Cinematic wide shot of Atlantic diamond dredge vessel offshore near Port Nolloth desert coastline, midnight sea fog and stormy waves, wooden smuggler skiffs unloading contraband crates onto a desolate beach under pale moonlight, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/cutscenes/climax_cape.jpg',
    prompt: `Cinematic wide shot of Cape Town Table Bay container docks at night in a howling gale storm, shipping container cracked open with glowing floodlights, tactical police units and dockers facing off on rain-slicked concrete, Table Mountain silhouette behind, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/cutscenes/climax_octagon.jpg',
    prompt: `Cinematic wide shot of a massive subterranean Cold War command bunker under the Drakensberg mountains, giant blast doors sliding open to reveal illuminated electronic warfare screens showing nationwide power grid telemetry, silhouette of operatives walking in, ${STYLE_SUFFIX}`,
  },

  // --- ENDING SCENE ARTWORKS ---
  {
    outputPath: 'public/assets/endings/ending_vigilante.jpg',
    prompt: `Cinematic dramatic epilogue scene of Durban harbour Berth 14 engulfed in towering orange fire, burning chemical tankers on the quay, black smoke rising into the rainy night sky, minibus taxi silhouettes speeding away on the wet coastal highway, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/endings/ending_whistleblower.jpg',
    prompt: `Cinematic dramatic epilogue scene inside a noisy newspaper printing plant at 5 AM, giant industrial presses rolling out front pages of The Daily Veld with leaked government dockets, journalists and camera flashes, coffee steam in morning light, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/endings/ending_kingpin.jpg',
    prompt: `Cinematic dramatic epilogue scene on a luxury glass penthouse balcony in Umhlanga Durban at midnight, shadowy syndicate boss holding crystal whiskey glass overlooking the illuminated port and container terminals below, cigar smoke drifting, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/endings/ending_captured.jpg',
    prompt: `Cinematic dramatic epilogue scene inside a pitch-black abandoned Witwatersrand gold mine shaft, harsh blinding tactical flashlight beams cutting through water droplets and dust, solitary handcuffed figure sitting against rusted mine cart tracks, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/endings/ending_act2_reckoning.jpg',
    prompt: `Cinematic dramatic epilogue scene on airport tarmac at King Shaka Hangar 7 in pouring rain, private Gulfstream jet blocked by flashing tactical police units and forensic investigators, corporate oligarchs led away in handcuffs, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/endings/ending_highveld_vindication.jpg',
    prompt: `Cinematic dramatic epilogue scene inside the Special Investigating Unit tribunal hearing in Pretoria, stacks of seized gold mining ledgers and forensic binders on mahogany tables, flashbulbs popping, stern magistrates at the bench, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/endings/ending_namaqua_rebellion.jpg',
    prompt: `Cinematic dramatic epilogue scene along the Richtersveld Atlantic coast at dawn, fleet of weathered wooden artisanal diver boats anchored proudly in coastal mist, divers holding aloft rough diamonds, sunrise over desert dunes, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/endings/ending_cape_seizure.jpg',
    prompt: `Cinematic dramatic epilogue scene at Table Bay Foreshore police headquarters, seized military weapon crates and offshore bank ledgers displayed before international media cameras, blue police strobes illuminating wet Victorian brick walls, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/endings/ending_octagon_reckoning.jpg',
    prompt: `Cinematic dramatic epilogue scene inside the grand Constitutional Court on Constitution Hill Johannesburg, illuminated modern glass and brick architecture, conspirators sitting in the dock under judgement, South African national flag in sunbeams, ${STYLE_SUFFIX}`,
  },
];

async function generateAssetWithRetry(asset, apiKey, retries = 3) {
  const fullOutPath = path.join(process.cwd(), asset.outputPath);
  if (fs.existsSync(fullOutPath)) {
    const size = fs.statSync(fullOutPath).size;
    if (size > 10000) {
      console.log(`[EXISTS] ${asset.outputPath} (${(size / 1024).toFixed(1)} KB)`);
      return;
    }
  }

  fs.mkdirSync(path.dirname(fullOutPath), { recursive: true });

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`[GENERATING] ${asset.outputPath} (attempt ${attempt}/${retries})...`);
      const response = await fetch('https://fal.run/fal-ai/flux/schnell', {
        method: 'POST',
        headers: {
          Authorization: `Key ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: asset.prompt,
          image_size: 'landscape_16_9',
          num_inference_steps: 4,
          num_images: 1,
          enable_safety_checker: false,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Fal API error (${response.status}): ${errText}`);
      }

      const data = await response.json();
      const imageUrl = data?.images?.[0]?.url;
      if (!imageUrl) {
        throw new Error('No image URL returned by Fal.ai');
      }

      const imgRes = await fetch(imageUrl);
      if (!imgRes.ok) {
        throw new Error(`Failed to download image from ${imageUrl}`);
      }

      const buffer = Buffer.from(await imgRes.arrayBuffer());
      fs.writeFileSync(fullOutPath, buffer);
      console.log(`[SUCCESS] Saved ${asset.outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
      return;
    } catch (err) {
      console.error(`[ATTEMPT FAILED] ${asset.outputPath}:`, err.message);
      if (attempt === retries) {
        throw err;
      }
      await new Promise((res) => setTimeout(res, 2500 * attempt));
    }
  }
}

async function main() {
  const apiKey = loadFalApiKey();
  console.log(`Generating ${ASSETS.length} Cinematic Cutscene & Ending Scene Assets via Fal.ai Flux Schnell...`);

  // Run in small batches of 2 concurrent generations to respect rate limits
  const batchSize = 2;
  for (let i = 0; i < ASSETS.length; i += batchSize) {
    const batch = ASSETS.slice(i, i + batchSize);
    await Promise.all(batch.map((asset) => generateAssetWithRetry(asset, apiKey)));
  }

  console.log('All cutscene & ending assets successfully generated and saved!');
}

main().catch((err) => {
  console.error('Fatal generation error:', err);
  process.exit(1);
});
