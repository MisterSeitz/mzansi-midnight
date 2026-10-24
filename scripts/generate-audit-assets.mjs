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

const BASE_STYLE =
  'gritty South African crime noir graphic novel illustration, Citizen Sleeper and Disco Elysium painterly art style, high contrast dramatic chiaroscuro shadows, humid rain reflections, expressive textured brushwork, cinematic lighting, no text or watermarks';

const ASSET_SPECS = [
  // ==========================================
  // PROLOGUE ORIGIN BACKGROUNDS (16:9 widescreen)
  // Target: public/assets/backgrounds/
  // ==========================================
  {
    targetDir: 'public/assets/backgrounds',
    filename: 'siu_whistleblower.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Disgraced South African Special Investigating Unit forensic auditor Kagiso Molefe working late in a dim high-rise room in Braamfontein, Pretoria skyline through rain-streaked window, air-gapped laptop glowing amber with Eskom coal-conveyor audit telemetry, spilled rooibos tea, ${BASE_STYLE}`,
  },
  {
    targetDir: 'public/assets/backgrounds',
    filename: 'deep_reef_fixer.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Underground South African mining fixer in the 2000-metre deep Crown Mines stope beneath Johannesburg, wearing heavy headlamp and dust-stained overalls, hidden diesel barrels stacked against fractured quartzite rock walls, ${BASE_STYLE}`,
  },
  {
    targetDir: 'public/assets/backgrounds',
    filename: 'nia_ghost.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Covert South African State Security Agency ghost operative in a dark surveillance van overlooking the Union Buildings Pretoria at dusk, glowing green phosphor terminal screens, wiretap waveforms, cigarette smoke drifting across dashboard, ${BASE_STYLE}`,
  },
  {
    targetDir: 'public/assets/backgrounds',
    filename: 'deep_sea_diver.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Commercial diamond diver standing on a battered wooden slipway in Port Nolloth, dripping wet neoprene suit and heavy bronze diver helmet held under arm, cold Atlantic Benguela current waves crashing against rusted diamond gravel barges, turquoise sea spray, ${BASE_STYLE}`,
  },
  {
    targetDir: 'public/assets/backgrounds',
    filename: 'kalahari_tracker.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Namaqualand desert tracker kneeling on shifting red Kalahari dunes, tracing heavy military tire tracks through sun-bleached desert rocks, Richtersveld moon rock gorges in background, scorching late afternoon heat shimmer, ${BASE_STYLE}`,
  },
  {
    targetDir: 'public/assets/backgrounds',
    filename: 'ex_naval_infiltrator.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Former South African Navy maritime operative in dark tactical gear crouched on a rocky jetty near Simons Town, acoustic hydrophone equipment, naval radar masts cutting through thick coastal sea mist, cold slate and navy palette, ${BASE_STYLE}`,
  },
  {
    targetDir: 'public/assets/backgrounds',
    filename: 'agu_ballistics_detective.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Discredited South African Anti-Gang Unit ballistics detective in a forensic laboratory under cold fluorescent lights, examining a recovered 9mm hollow-point bullet casing under an optical comparator microscope, ballistic trajectory charts on chalkboard, ${BASE_STYLE}`,
  },
  {
    targetDir: 'public/assets/backgrounds',
    filename: 'cape_flats_infiltrator.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Underground street handler on the concrete balcony of a Manenberg tenement block in Cape Flats, washing lines strung between bullet-scarred flats, police helicopter searchlight beam sweeping past, tense purple-tinged Cape winter twilight, ${BASE_STYLE}`,
  },
  {
    targetDir: 'public/assets/backgrounds',
    filename: 'winelands_forensic_auditor.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Forensic financial auditor in an opulent historic Stellenbosch wine cellar, ancient oak barrels in shadow, mahogany desk illuminated by warm brass desk lamp, auditing classified offshore family trust ledgers, ${BASE_STYLE}`,
  },
  {
    targetDir: 'public/assets/backgrounds',
    filename: 'taskforce_commander_nandi.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Captain Nandi Mthembu as Taskforce Director in a high-security tactical command center, high-level constitutional indictments spread across stainless-steel war table, holographic map of South Africa showing critical infrastructure nodes, determined heroic expression, ${BASE_STYLE}`,
  },
  {
    targetDir: 'public/assets/backgrounds',
    filename: 'taskforce_strike_gideon.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Gideon Brand as Tactical Vanguard Lead in military combat rig, standing in an alpine helicopter hangar in the Drakensberg mountains at midnight, snow blowing across the concrete apron, armed tactical transport idling with rotor wash, ${BASE_STYLE}`,
  },
  {
    targetDir: 'public/assets/backgrounds',
    filename: 'taskforce_intelligence_leila.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Leila Hendricks as SIGINT and Cyber Director surrounded by bank of glowing server racks and multi-monitor SCADA telemetry terminals, Apollo national grid frequency graphs spiking red, dark cyber-espionage atmosphere, cyan and deep amber neon reflections, ${BASE_STYLE}`,
  },

  // ==========================================
  // CHARACTER & CONTACT PORTRAITS (1:1 square)
  // Target: public/assets/characters/
  // ==========================================
  {
    targetDir: 'public/assets/characters',
    filename: 'dispatcher.jpg',
    imageSize: 'square_hd',
    prompt: `Gritty painted character portrait of a weathered South African weighbridge dispatcher at Kendon Coal Depot, fluorescent safety vest over grease-stained jacket, clipboard in hand, hard cynical gaze, yellow sodium lighting, ${BASE_STYLE}`,
  },
  {
    targetDir: 'public/assets/characters',
    filename: 'shop_steward.jpg',
    imageSize: 'square_hd',
    prompt: `Gritty painted character portrait of an artisanal diamond diver shop steward at Alexander Bay, rugged salt-worn face, wool beanie, thick beard, scarred knuckles, determined working-class defiance, cold Atlantic sea spray, ${BASE_STYLE}`,
  },
  {
    targetDir: 'public/assets/characters',
    filename: 'pontoon_smuggler.jpg',
    imageSize: 'square_hd',
    prompt: `Gritty painted character portrait of a cunning Namib trans-border pontoon smuggler on the Orange River, sun-weathered face, dusty brimmed hat, squinting against harsh desert sun, gold tooth glint, charismatic rogue, ${BASE_STYLE}`,
  },
  {
    targetDir: 'public/assets/characters',
    filename: 'cellar_master.jpg',
    imageSize: 'square_hd',
    prompt: `Gritty painted character portrait of an elderly distinguished Stellenbosch wine estate cellar master, silver-streaked hair, patrician features, tailored vest, holding a crystal tasting glass, discreet and guarded, ${BASE_STYLE}`,
  },
  {
    targetDir: 'public/assets/characters',
    filename: 'lerato.jpg',
    imageSize: 'square_hd',
    prompt: `Poignant painted portrait of Auditor Lerato Molefe, brilliant young South African forensic auditor, dignified and resolute expression, spectacles, formal business attire, warm amber lighting with a haunting melancholy, memorial dossier tribute portrait, ${BASE_STYLE}`,
  },
  {
    targetDir: 'public/assets/characters',
    filename: 'damon.jpg',
    imageSize: 'square_hd',
    prompt: `Poignant painted portrait of Detective David Damon, brave Anti-Gang Unit whistleblower, South African police detective with sharp observant eyes, leather jacket, street-smart demeanor, dramatic noir shadow, memorial dossier tribute portrait, ${BASE_STYLE}`,
  },
];

async function callFalApi(prompt, imageSize) {
  const endpoint = 'https://fal.run/fal-ai/flux/schnell';
  const body = {
    prompt,
    image_size: imageSize,
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

async function processAsset(spec, index, total) {
  const fullOutPath = path.join(spec.targetDir, spec.filename);

  if (fs.existsSync(fullOutPath)) {
    const stats = fs.statSync(fullOutPath);
    if (stats.size > 10000) {
      console.log(`[${index + 1}/${total}] SKIP: ${spec.filename} (already exists, ${Math.round(stats.size / 1024)} KB)`);
      return { spec, status: 'skipped' };
    }
  }

  console.log(`[${index + 1}/${total}] GENERATING: ${spec.filename} (${spec.imageSize})...`);
  let attempts = 0;
  while (attempts < 3) {
    try {
      attempts++;
      const imgUrl = await callFalApi(spec.prompt, spec.imageSize);
      await downloadImage(imgUrl, fullOutPath);
      const stats = fs.statSync(fullOutPath);
      console.log(`  ✓ SAVED: ${spec.filename} (${Math.round(stats.size / 1024)} KB)`);
      return { spec, status: 'success' };
    } catch (err) {
      console.warn(`  ⚠️ Attempt ${attempts} failed for ${spec.filename}: ${err.message}`);
      if (attempts >= 3) {
        throw err;
      }
      await new Promise((r) => setTimeout(r, 2000 * attempts));
    }
  }
}

async function run() {
  console.log(`=== GENERATING ${ASSET_SPECS.length} MISSING STORY ASSETS ===`);
  const concurrency = 3;
  const results = [];

  for (let i = 0; i < ASSET_SPECS.length; i += concurrency) {
    const batch = ASSET_SPECS.slice(i, i + concurrency);
    const promises = batch.map((spec, batchIdx) =>
      processAsset(spec, i + batchIdx, ASSET_SPECS.length)
    );
    const batchResults = await Promise.all(promises);
    results.push(...batchResults);
  }

  console.log('\n=== GENERATION SUMMARY ===');
  const succeeded = results.filter((r) => r.status === 'success').length;
  const skipped = results.filter((r) => r.status === 'skipped').length;
  console.log(`Successfully generated: ${succeeded}`);
  console.log(`Skipped existing: ${skipped}`);
  console.log(`Total ready: ${results.length}`);
}

run().catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
