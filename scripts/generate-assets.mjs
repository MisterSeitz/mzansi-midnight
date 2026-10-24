import fs from 'node:fs';
import path from 'node:path';

// Load FAL_API_KEY safely from .env.local or .env without printing it
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
          return match[1].trim().replace(/^["']|["']$/g, '');
        }
      }
    }
  }
  throw new Error('FAL_API_KEY not found in environment or .env.local');
}

const STYLE_SUFFIX =
  'gritty South African crime noir graphic novel illustration, Citizen Sleeper and Disco Elysium painterly art style, high contrast dramatic shadows, humid rain reflections, amber sodium streetlights and cyan neon accents, expressive brushwork, no text or watermarks';

const ASSETS = [
  // 1. Investigator Archetype Portraits
  {
    outputPath: 'public/assets/backgrounds/forensic_hawk.jpg',
    imageSize: 'landscape_4_3',
    prompt: `Portrait of a sharp-eyed Black South African forensic investigator in a rain-soaked trench coat examining bloodstained financial ledgers under a flickering amber inverter lamp in a dim apartment, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/backgrounds/trt_breacher.jpg',
    imageSize: 'landscape_4_3',
    prompt: `Portrait of a battle-hardened Black South African former tactical police warrant officer in a dark windbreaker standing in a rain-slicked Durban alley at night, red and blue police light reflections on wet concrete, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/backgrounds/crime_intel.jpg',
    imageSize: 'landscape_4_3',
    prompt: `Portrait of a covert South African signals intelligence specialist wearing headphones inside a dark surveillance van filled with glowing radio frequency scanners, burner phones, and oscilloscopes, ${STYLE_SUFFIX}`,
  },

  // 2. Key Character & Faction Leader Portraits
  {
    outputPath: 'public/assets/characters/nandi.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of a wounded young Black female South African police constable in a rain-soaked blue windbreaker clutching a brown manila evidence folder in a dim neon corridor, tense expression, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/characters/mokoena.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of an imposing veteran Black South African police brigadier in a crisp uniform with service medals, stern scarred face, blue tactical police lights flashing in the rainy night behind him, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/characters/bheki.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of an older charismatic South African taxi association kingpin wearing a tweed flat cap and heavy gold watch, smoky shisanyama grill and minibus taxis in the night background, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/characters/masibi.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of a powerful corrupt South African female city councillor in luxury traditional attire and gold jewelry standing in a VIP glass suite overlooking a half-blacked-out metropolis at night, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/characters/zuko.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of a calm billionaire cartel logistics architect in tailored linen suit inside a minimalist glass penthouse overlooking giant harbour container cranes in the rain at midnight, ${STYLE_SUFFIX}`,
  },

  // 3. 7 District Node Header Banners
  {
    outputPath: 'public/assets/nodes/n1_safehouse.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Brutalist 1970s apartment block above a neon-lit urban arcade and 24-hour spaza shop with a smoking diesel generator in a rainy South African inner-city alley at night, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/nodes/n2_taxi_rank.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Bustling underground concrete minibus taxi rank at night in Durban South Africa, rows of white commuter vans, diesel fumes, glowing shisanyama braai fires, neon signs, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/nodes/n3_central_precinct.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Monolithic decaying concrete police headquarters tower at night in a coastal thunderstorm, armoured police vehicles parked in the flooded courtyard with glowing blue lights, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/nodes/n4_city_hall.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Grand colonial sandstone city hall with modern tinted glass annex at night in South Africa, blacked-out luxury SUVs parked outside on wet pavement during a blackout, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/nodes/n5_cyber_pawn.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Cramped neon-lit underground electronics repair and burner phone shop behind welded steel security gates, glowing CRT monitors, soldering iron smoke, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/nodes/n6_pier2_port.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Massive industrial harbour container terminal at midnight in pouring rain, towering gantry cranes, stacks of shipping containers, and municipal water tankers parked on the dark dock, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/nodes/n7_archive_basement.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Claustrophobic sub-basement archive beneath a court building, flickering fluorescent tubes, endless steel shelves packed with paper police dockets and evidence boxes, ${STYLE_SUFFIX}`,
  },
  // 4. Main Menu Widescreen Key Art & Additional Character Portraits
  {
    outputPath: 'public/assets/backgrounds/title_keyart.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Wide cinematic panoramic view of a rain-slicked South African coastal metropolis at midnight during a partial power blackout, lone detective in a trench coat standing beside a vintage sedan on an overpass overlooking glowing harbour container cranes, brutalist concrete skyscrapers, amber streetlamps and cyan neon reflections on wet asphalt, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/characters/sparks.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of a sharp-witted underground South African electronics hacker and signals fixer wearing solder goggles pushed up on forehead and a headset in a cramped neon-lit cyber pawn shop, glowing oscilloscope and circuit boards behind them, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/characters/vandermerwe.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of a weary incorruptible veteran South African Hawks police colonel in a rumpled dress shirt and tie with reading glasses, surrounded by towering stacks of paper court dockets in a dim basement archive under a single amber desk lamp, ${STYLE_SUFFIX}`,
  },
  // 5. Act 2 District 2 Node Header Banners
  {
    outputPath: 'public/assets/nodes/n8_ridge_penthouses.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Ultra-luxury glass penthouse towers on a coastal ridge in Umhlanga South Africa at night during a storm, infinity pools glowing cyan above a blacked-out city below, armoured black SUVs parked behind biometric security gates, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/nodes/n9_township_depot.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Industrial municipal water tanker staging depot on the edge of a hillside South African township at night, rows of parked steel water trucks under amber floodlights, burning brazier barrels, strike marshals standing guard in the rain, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/nodes/n10_high_court.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Imposing neoclassical and brutalist High Court building in South Africa at night, wet stone steps, television broadcast vans parked outside in the rain, wood-paneled judicial commission chamber glowing through tall windows, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/nodes/n11_citrus_estate.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Remote mist-shrouded hydroponic citrus farm and industrial packhouse in the KwaZulu-Natal Midlands at night, glowing purple and cyan greenhouse roofs, stainless steel chemical vats visible inside a guarded barn, ${STYLE_SUFFIX}`,
  },
  {
    outputPath: 'public/assets/nodes/n12_cargo_apron.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Rain-swept international airport cargo apron and private hangar at midnight, sleek white executive charter jet with boarding stairs lowered, armoured police vehicles and cargo pallets under sodium floodlights, ${STYLE_SUFFIX}`,
  },
];

async function generateOneAsset(asset, apiKey) {
  const fullOutPath = path.join(process.cwd(), asset.outputPath);
  if (fs.existsSync(fullOutPath)) {
    console.log(`[SKIP] ${asset.outputPath} already exists.`);
    return;
  }

  fs.mkdirSync(path.dirname(fullOutPath), { recursive: true });

  const response = await fetch('https://fal.run/fal-ai/flux/schnell', {
    method: 'POST',
    headers: {
      Authorization: `Key ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: asset.prompt,
      image_size: asset.imageSize,
      num_inference_steps: 4,
      num_images: 1,
      enable_safety_checker: false,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Fal API error (${response.status}) for ${asset.outputPath}: ${errText}`);
  }

  const data = await response.json();
  const imageUrl = data?.images?.[0]?.url;
  if (!imageUrl) {
    throw new Error(`No image URL returned for ${asset.outputPath}`);
  }

  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) {
    throw new Error(`Failed to download image from ${imageUrl}`);
  }

  const buffer = Buffer.from(await imgRes.arrayBuffer());
  fs.writeFileSync(fullOutPath, buffer);
  console.log(`[GENERATED] ${asset.outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

async function main() {
  const apiKey = loadFalApiKey();
  console.log(`Starting generation of ${ASSETS.length} South African Noir assets via Fal.ai...`);

  const batchSize = 5;
  for (let i = 0; i < ASSETS.length; i += batchSize) {
    const batch = ASSETS.slice(i, i + batchSize);
    await Promise.all(batch.map((asset) => generateOneAsset(asset, apiKey)));
  }

  console.log('All assets generated successfully!');
}

main().catch((err) => {
  console.error('Asset generation failed:', err.message);
  process.exit(1);
});
