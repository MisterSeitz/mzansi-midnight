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
          return match[1].trim().replace(/^["']|["']$/g, '');
        }
      }
    }
  }
  throw new Error('FAL_API_KEY not found in environment or .env.local');
}

const FAL_API_KEY = loadFalApiKey();

const BASE_MAP_STYLE =
  'top-down dark GIS tactical cartography map view, high altitude dark noir satellite imagery, fine topographic contour lines, glowing amber and cyan urban electrical corridors, deep chiaroscuro shadows, gritty atmospheric texture, cinematic, no text, no watermarks, 8k resolution';

const MAP_SPECS = [
  {
    filename: 'map_ethekwini.jpg',
    prompt: `Aerial high-altitude tactical satellite cartography of Durban eThekwini South Africa at night, dark noir coastal shipping port with illuminated container terminals and harbour channels, glowing street grid along Berea ridge and Point waterfront, dark deep ocean swells, ${BASE_MAP_STYLE}`,
  },
  {
    filename: 'map_highveld.jpg',
    prompt: `Aerial high-altitude tactical satellite cartography of Johannesburg and Pretoria Highveld South Africa at night, dark noir urban sprawl with illuminated gold mining reef corridors, glowing electrical grid lines and high-voltage transmission veins, dense industrial rail yards, ${BASE_MAP_STYLE}`,
  },
  {
    filename: 'map_namaqua.jpg',
    prompt: `Aerial high-altitude tactical satellite cartography of Namaqualand and Richtersveld coastline South Africa, dark noir Atlantic Benguela ocean meeting scorched desert quartz mountains, Orange River border drift carving through desert canyons, ${BASE_MAP_STYLE}`,
  },
  {
    filename: 'map_cape.jpg',
    prompt: `Aerial high-altitude tactical satellite cartography of Cape Peninsula Cape Town South Africa at night, dark dramatic silhouette of Table Mountain surrounded by glowing city lights, illuminated Table Bay harbour berths and Atlantic seaboard, glowing Cape Flats highway arteries, ${BASE_MAP_STYLE}`,
  },
  {
    filename: 'map_octagon.jpg',
    prompt: `Aerial high-altitude national tactical command cartography map of South Africa at night, dark noir topography with dramatic Drakensberg mountain ranges and glowing nationwide high-voltage electrical super-grid transmission lines, top-down military operations GIS cartography map view, deep blue and amber glowing nodes, ${BASE_MAP_STYLE}`,
  },
];

async function callFalApi(prompt) {
  const endpoint = 'https://fal.run/fal-ai/flux/schnell';
  const body = {
    prompt,
    image_size: 'landscape_16_9',
    num_inference_steps: 4,
    num_images: 1,
    enable_safety_checker: false,
  };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Key ${FAL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Fal.ai API error (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  const imageUrl = data?.images?.[0]?.url;
  if (!imageUrl) {
    throw new Error('Fal.ai returned no images');
  }

  return imageUrl;
}

async function downloadImage(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download image: ${res.statusText}`);
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
}

async function run() {
  const outDir = path.join(process.cwd(), 'public', 'assets', 'maps');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log(`=== GENERATING ${MAP_SPECS.length} REGIONAL TACTICAL MAP BACKGROUNDS ===`);

  for (let i = 0; i < MAP_SPECS.length; i++) {
    const spec = MAP_SPECS[i];
    const outPath = path.join(outDir, spec.filename);

    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 10000) {
      console.log(`[${i + 1}/${MAP_SPECS.length}] SKIP: ${spec.filename} (already exists)`);
      continue;
    }

    console.log(`[${i + 1}/${MAP_SPECS.length}] GENERATING: ${spec.filename}...`);
    let attempts = 0;
    while (attempts < 3) {
      try {
        attempts++;
        const url = await callFalApi(spec.prompt);
        await downloadImage(url, outPath);
        const stats = fs.statSync(outPath);
        console.log(`  ✓ SAVED: ${spec.filename} (${Math.round(stats.size / 1024)} KB)`);
        break;
      } catch (err) {
        console.warn(`  ⚠️ Attempt ${attempts} failed for ${spec.filename}: ${err.message}`);
        if (attempts >= 3) throw err;
        await new Promise((r) => setTimeout(r, 2000 * attempts));
      }
    }
  }

  console.log('\n=== ALL REGIONAL MAP BACKGROUNDS READY ===');
}

run().catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
