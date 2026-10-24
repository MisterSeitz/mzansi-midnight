import fs from 'node:fs';
import path from 'node:path';

// Safely load FAL_API_KEY from .env.local or .env
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

const BASE_STYLE =
  'gritty South African crime noir graphic novel illustration, Citizen Sleeper and Disco Elysium painterly art style, high contrast dramatic chiaroscuro shadows, humid rain reflections, expressive textured brushwork, cinematic lighting, no text or watermarks';

export const STORY_ASSETS = [
  // ==========================================
  // STORY 2: HIGHVELD-CHROME (14 Assets)
  // ==========================================
  {
    story: 'story_2',
    outputPath: 'public/assets/backgrounds/story2_highveld_keyart.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Wide cinematic panoramic view of Johannesburg at 03:30 SAST during a Stage 6 rotating power blackout, Ponte City Tower and brutalist concrete skyscrapers illuminated by thunderstorm lightning and exploding substation arcs in the distance, lone cynical detective in a dark leather jacket standing on an overpass overlooking the pitch-black highway, electric cyan sparks and rust-orange neon reflections on wet asphalt, ${BASE_STYLE}`,
  },
  {
    story: 'story_2',
    outputPath: 'public/assets/nodes/h1_braamfontein_safehouse.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Rooftop loft safehouse in Braamfontein Johannesburg at night overlooking electrified railway yards, cracked window panes with city smog, glowing amber inverter desk lamp, scattered audit files and surveillance monitors, ${BASE_STYLE}`,
  },
  {
    story: 'story_2',
    outputPath: 'public/assets/nodes/h2_sandton_tower.jpg',
    imageSize: 'landscape_16_9',
    prompt: `38th-floor luxury energy arbitrage penthouse in Sandton at night, panoramic glass walls overlooking the blacked-out Johannesburg sprawl, sleek modern minimalist boardroom with glowing Bloomberg terminals and expensive whiskey decanters, ${BASE_STYLE}`,
  },
  {
    story: 'story_2',
    outputPath: 'public/assets/nodes/h3_hillbrow_substation.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Fortified 88kV electrical distribution substation in Hillbrow surrounded by razor wire and high security fencing, armed trade union strike marshals in red berets holding pickets around burning barrel fires, high-voltage transformer arcing with cyan electricity, ${BASE_STYLE}`,
  },
  {
    story: 'story_2',
    outputPath: 'public/assets/nodes/h4_witwatersrand_shaft.jpg',
    imageSize: 'landscape_16_9',
    prompt: `2,000-metre subterranean zama-zama artisanal gold reef in Crown Mines Shaft 4, timber mine supports, headlamps piercing humid golden dust, raw quartz veins in deep rock face, makeshift winches, ${BASE_STYLE}`,
  },
  {
    story: 'story_2',
    outputPath: 'public/assets/nodes/h5_union_buildings.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Grand neoclassical sandstone Union Buildings security precinct in Pretoria at night, monumental floodlit colonnades, blacked-out armoured VIP convoys parked outside on wet pavement, tactical NIA intelligence guards in the rain, ${BASE_STYLE}`,
  },
  {
    story: 'story_2',
    outputPath: 'public/assets/nodes/h6_kendon_depot.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Massive industrial coal-trucking weighing depot on the Mpumalanga border in driving rain, rows of heavy 34-ton haulage trucks under amber sodium floodlights, muddy weighbridge, mounds of diluted coal discard, ${BASE_STYLE}`,
  },
  {
    story: 'story_2',
    outputPath: 'public/assets/nodes/h7_siu_headquarters.jpg',
    imageSize: 'landscape_16_9',
    prompt: `SIU Special Tribunal underground forensic vaults beneath the Pretoria High Court, heavy steel document cages, air-gapped forensic servers, towering stacks of legal dockets and subpoena files under cold fluorescent light, ${BASE_STYLE}`,
  },
  {
    story: 'story_2',
    outputPath: 'public/assets/characters/bra_k.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of Kagiso "Bra K" Molefe, weathered sharp-eyed 40-year-old Black South African SIU forensic auditor in a dark leather jacket, cigarette smoke curling, cynical determined gaze, Johannesburg city night skyline behind him, ${BASE_STYLE}`,
  },
  {
    story: 'story_2',
    outputPath: 'public/assets/characters/khumalo.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of Advocate Nomsa Khumalo, sharp-featured exhausted veteran Black South African female prosecutor in formal black courtroom attire and gold wire glasses, sorting air-gapped forensic affidavits under a green desk lamp, ${BASE_STYLE}`,
  },
  {
    story: 'story_2',
    outputPath: 'public/assets/characters/helena.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of Helena Van Niekerk, cold elegant 45-year-old Afrikaner energy arbitrage billionaire in a sharp tailored silk blazer, sipping espresso, calculating gaze, panoramic night glass tower behind her, ${BASE_STYLE}`,
  },
  {
    story: 'story_2',
    outputPath: 'public/assets/characters/vusi.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of Vusi "Dynamite" Sithole, fierce battle-ready Black South African trade union strike marshal wearing a red beret and high-visibility vest, holding a heavy iron spanner, burning barrel fire reflections, ${BASE_STYLE}`,
  },
  {
    story: 'story_2',
    outputPath: 'public/assets/characters/mkhulu.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of Mkhulu "Ghost" Sibanyoni, elderly seasoned zama-zama underground gold mining leader with grey beard, worn yellow hardhat and headlamp, gold dust on weathered cheekbones, subterranean tunnel background, ${BASE_STYLE}`,
  },
  {
    story: 'story_2',
    outputPath: 'public/assets/characters/sithole.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of General Sibusiso Sithole, imposing corrupt 55-year-old Black South African NIA Chief of Special Operations in a crisp military dress uniform with medals, scarred jawline, ruthless calculating half-smile, ${BASE_STYLE}`,
  },

  // ==========================================
  // STORY 3: NAMAQUA-DIAMOND (14 Assets)
  // ==========================================
  {
    story: 'story_3',
    outputPath: 'public/assets/backgrounds/story3_namaqua_keyart.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Cinematic wide view of the wind-swept Atlantic Skeleton Coast in Namaqualand at 04:45 SAST, dense coastal sea fog (the Malmokken) rolling over battered diamond-dredging boats and 4x4 bakkies, Captain Giepie Brand in an oilskin coat standing on wet salt flats under a pale crescent moon, turquoise ocean surf, ${BASE_STYLE}`,
  },
  {
    story: 'story_3',
    outputPath: 'public/assets/nodes/m1_port_nolloth_jetty.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Battered wooden slipways and rusted diamond gravel barges at Port Nolloth jetty, crashing Benguela surf, weathered wooden shacks, sea fog and amber lantern light, ${BASE_STYLE}`,
  },
  {
    story: 'story_3',
    outputPath: 'public/assets/nodes/m2_alexander_bay_tailings.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Razor-wire diamond concession perimeter along the Atlantic surfline in Alexander Bay, shore diver air compressors running on the back of 4x4 bakkies, crashing white foam waves under midnight moonlight, ${BASE_STYLE}`,
  },
  {
    story: 'story_3',
    outputPath: 'public/assets/nodes/m3_richtersveld_canyon.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Scorched red moon rock canyon in the Richtersveld desert under vast desert stars, hidden 4x4 convoys, stashed steel fuel jerrycans and ancient petroglyphs on granite boulders, ${BASE_STYLE}`,
  },
  {
    story: 'story_3',
    outputPath: 'public/assets/nodes/m4_debeers_ghost_mine.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Abandoned 1930s diamond sorting plant half-swallowed by red desert sand dunes, rusted corrugated steel walls, broken sorting conveyor belts, wind howling through empty window frames, ${BASE_STYLE}`,
  },
  {
    story: 'story_3',
    outputPath: 'public/assets/nodes/m5_orange_river_pont.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Muddy reed-fringed Orange River border crossing between South Africa and Namibia at night, old wooden cable pontoon ferry under dim floodlights, smuggler 4x4 trucks waiting in silence, ${BASE_STYLE}`,
  },
  {
    story: 'story_3',
    outputPath: 'public/assets/nodes/m6_aegis_marine_base.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Fortified naval mercenary base along the fog-shrouded coast, military radar domes spinning, armed patrol gunboats moored in concrete slipways under harsh blue-white floodlights, ${BASE_STYLE}`,
  },
  {
    story: 'story_3',
    outputPath: 'public/assets/nodes/m7_springbok_court.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Colonial granite magistrate courthouse and Sea Fisheries impound yard in the arid inland copper hills of Springbok, impounded dive bakkies and rusted boat trailers under desert night sky, ${BASE_STYLE}`,
  },
  {
    story: 'story_3',
    outputPath: 'public/assets/characters/giepie.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of Captain Gideon "Giepie" Brand, rugged 45-year-old Coloured/Afrikaner ex-maritime border diver and desert tracker in a faded green oilskin coat, salt-weathered stubble, piercing sea-green eyes, coastal sea-spray, ${BASE_STYLE}`,
  },
  {
    story: 'story_3',
    outputPath: 'public/assets/characters/bettie.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of Tannie Bettie van Zyl, warm sharp-witted coastal Coloured matriarch and marine radio operator wearing a hand-knitted wool cardigan and reading glasses inside a cluttered coastal radio shack, radio dials glowing, ${BASE_STYLE}`,
  },
  {
    story: 'story_3',
    outputPath: 'public/assets/characters/swartbooi.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of Swartbooi Witbooi, resilient Nama artisanal shore diver in a black neoprene wetsuit unzipped to the chest, holding a vintage brass diving helmet, ocean mist on dark skin, ${BASE_STYLE}`,
  },
  {
    story: 'story_3',
    outputPath: 'public/assets/characters/oom_dirk.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of Dirk "Oom Dirk" Coetzee, grizzled elderly concession baron and former coast guard chief in a khaki safari jacket, smoking a pipe, sun-baked wrinkled face, piercing blue eyes, ${BASE_STYLE}`,
  },
  {
    story: 'story_3',
    outputPath: 'public/assets/characters/petrov.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of Colonel Yuri Petrov, menacing scar-faced Eastern European mercenary naval commander in a tactical black maritime storm jacket with earpiece, cold slate-grey eyes, gunboat deck behind him, ${BASE_STYLE}`,
  },
  {
    story: 'story_3',
    outputPath: 'public/assets/characters/cloete.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of Captain Annelize Cloete, unyielding 38-year-old female SAPS coastal command inspector in a blue tactical windbreaker with service holster, wind whipping short blonde hair in coastal sea fog, ${BASE_STYLE}`,
  },

  // ==========================================
  // STORY 4: CAPE-NOCTURNE (15 Assets)
  // ==========================================
  {
    story: 'story_4',
    outputPath: 'public/assets/backgrounds/story4_cape_keyart.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Cinematic panoramic noir view of Cape Town at 02:00 SAST, Table Mountain shrouded in thick white tablecloth clouds, violet coastal sea-mist, neon reflections of the Atlantic Seaboard, Leila Hendricks in a trench coat standing beside a classic car overlooking Long Street and Table Bay container docks, wine-red and deep emerald accents, ${BASE_STYLE}`,
  },
  {
    story: 'story_4',
    outputPath: 'public/assets/nodes/c1_long_street_strip.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Neon-soaked Long Street nightlife strip in Cape Town in light drizzle, Victorian wrought-iron balconies, private nightclub bouncers in dark suits outside heavy brass doors, pulsing violet and cyan club lights, ${BASE_STYLE}`,
  },
  {
    story: 'story_4',
    outputPath: 'public/assets/nodes/c2_manenberg_tenements.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Bullet-scarred three-story tenement blocks in Manenberg on the Cape Flats, laundry lines fluttering in the night gale, gang graffiti tags, amber streetlamp reflections on cracked concrete, ${BASE_STYLE}`,
  },
  {
    story: 'story_4',
    outputPath: 'public/assets/nodes/c3_camps_bay_strip.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Glitzy Camps Bay palm tree boulevard and granite coastal boulders at midnight, ultra-modern glass villas glowing on the dark mountainside, private security patrol SUVs with flashing lights, ${BASE_STYLE}`,
  },
  {
    story: 'story_4',
    outputPath: 'public/assets/nodes/c4_table_bay_berth.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Table Bay Harbour Berth 109 container terminal at midnight, towering red gantry cranes unloading shipping containers under yellow sodium floodlights, large cargo freighter docked in stormy Atlantic waters, ${BASE_STYLE}`,
  },
  {
    story: 'story_4',
    outputPath: 'public/assets/nodes/c5_stellenbosch_cellars.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Historic Cape Dutch manor house and centuries-old oak avenue in Stellenbosch at night, whitewashed gables, cobblestones, subterranean brick wine cellar glowing with amber candlelight and oak barrels, ${BASE_STYLE}`,
  },
  {
    story: 'story_4',
    outputPath: 'public/assets/nodes/c6_agu_charred_bunker.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Charred remnants of an Anti-Gang Unit safehouse bunker, blackened concrete walls, melted filing cabinets, renegade tactical officers working by tactical flashlight and battery generator, ${BASE_STYLE}`,
  },
  {
    story: 'story_4',
    outputPath: 'public/assets/nodes/c7_foreshore_police_hq.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Monolithic glass and concrete police headquarters tower on the Cape Town Foreshore, wet stone plaza, blue police emergency beacon flashing in the mountain mist, ${BASE_STYLE}`,
  },
  {
    story: 'story_4',
    outputPath: 'public/assets/characters/leila.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of Leila Hendricks, razor-sharp 34-year-old Cape Malay private investigator and former AGU detective in a dark trench coat with collar turned up, observant wounded gaze, hair pulled back neatly, rainy Cape Town neon background, ${BASE_STYLE}`,
  },
  {
    story: 'story_4',
    outputPath: 'public/assets/characters/zack.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of Zack "The Bull" Rossouw, hulking 38-year-old nightclub security enforcer with shaved head, tailored black turtleneck, gold signet ring and scarred jawline, nightclub neon background, ${BASE_STYLE}`,
  },
  {
    story: 'story_4',
    outputPath: 'public/assets/characters/ronnie.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of Pastor Ronald "Uncle Ronnie" Jacobs, compassionate 65-year-old Cape Flats community pastor and reformed gang elder with silver hair, knitted woolen scarf, standing in a dim church hall, ${BASE_STYLE}`,
  },
  {
    story: 'story_4',
    outputPath: 'public/assets/characters/claudine.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of Baroness Claudine de Villiers, aristocratic 60-year-old Winelands dynasty heiress in silk scarf and diamond earrings, holding a glass of red wine in a wood-paneled antique manor library, ${BASE_STYLE}`,
  },
  {
    story: 'story_4',
    outputPath: 'public/assets/characters/cassiem.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of Cassiem Petersen, tough 50-year-old harbour stevedore dockers union shop steward in a high-vis vest and wool flat cap, holding a metal clipboard on a rain-slicked dock, ${BASE_STYLE}`,
  },
  {
    story: 'story_4',
    outputPath: 'public/assets/characters/warren.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of Sergeant Warren Abrahams, intense undercover AGU detective in a tactical windbreaker, unkempt stubble, holding an encrypted flash drive, cautious paranoid expression, ${BASE_STYLE}`,
  },
  {
    story: 'story_4',
    outputPath: 'public/assets/characters/general_swart.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of Major-General Andre "The Ghost" Swart, polished 55-year-old provincial police commissioner in dress uniform, silver hair, calculating serpentine gaze, city view through rain-streaked window behind him, ${BASE_STYLE}`,
  },

  // ==========================================
  // STORY 5: THE SOVEREIGN OCTAGON (14 Assets)
  // ==========================================
  {
    story: 'story_5',
    outputPath: 'public/assets/backgrounds/story5_octagon_keyart.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Epic wide-angle national confrontation: Dramatic jagged peaks of the Drakensberg mountains under a stormy midnight sky, subterranean bunker blast doors open with emergency crimson red lights, silhouette of the United Hawks Taskforce assembled on a granite ridge overlooking the blacked-out South African plains below, tactical crimson and obsidian lighting, ${BASE_STYLE}`,
  },
  {
    story: 'story_5',
    outputPath: 'public/assets/nodes/o1_drakensberg_redoubt.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Subterranean Cold War command redoubt blasted deep into Drakensberg granite, massive reinforced steel blast doors, glowing green tactical radar screens, taskforce war table with national topographic maps, ${BASE_STYLE}`,
  },
  {
    story: 'story_5',
    outputPath: 'public/assets/nodes/o2_union_crypt.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Vaulted century-old sandstone executive crypt beneath the Union Buildings in Pretoria, brass chandeliers, antique mahogany cabinets, armed constitutional marshals standing guard, ${BASE_STYLE}`,
  },
  {
    story: 'story_5',
    outputPath: 'public/assets/nodes/o3_apollo_scada.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Fortified Apollo SCADA national grid control center, giant glowing wall-sized telemetry map of South Africa showing collapsing regional transmission lines in red, rows of operator consoles, ${BASE_STYLE}`,
  },
  {
    story: 'story_5',
    outputPath: 'public/assets/nodes/o4_maritime_redoubt.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Dual-port strategic command post coordinating Durban and Cape Town container docks, longshoremen barricades, shipping containers turned into roadblocks in a stormy coastal gale, ${BASE_STYLE}`,
  },
  {
    story: 'story_5',
    outputPath: 'public/assets/nodes/o5_karoo_ew_corridor.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Vast arid Karoo desert plateau under starry sky, giant parabolic Square Kilometre Array radio telescope dishes, electronic warfare jamming antennae emitting cyan signal waves, ${BASE_STYLE}`,
  },
  {
    story: 'story_5',
    outputPath: 'public/assets/nodes/o6_winelands_vault.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Deep underground high-security bank vault beneath historic vineyard estate, rows of biometric safety deposit boxes, glowing server racks, gold bullion stacked on steel tables, ${BASE_STYLE}`,
  },
  {
    story: 'story_5',
    outputPath: 'public/assets/nodes/o7_summit_sanctum.jpg',
    imageSize: 'landscape_16_9',
    prompt: `Fortified mountain summit pavilion in the Karoo with octagonal conference table, floor-to-ceiling glass looking out into midnight lightning storm, armed private army sentries in black uniforms, ${BASE_STYLE}`,
  },
  {
    story: 'story_5',
    outputPath: 'public/assets/characters/taskforce.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of the United Hawks Taskforce Commander, tactical squad leader wearing radio headset and body armor with South African flag patch, resolute expression, command bunker monitors behind, ${BASE_STYLE}`,
  },
  {
    story: 'story_5',
    outputPath: 'public/assets/characters/sindi.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of Deputy Chief Justice Sindi Sithole, dignified authoritative 60-year-old Black South African senior female judge in green judicial robes, holding the Constitutional Court gavel, determined expression, ${BASE_STYLE}`,
  },
  {
    story: 'story_5',
    outputPath: 'public/assets/characters/phumzile.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of Minister Phumzile Mthembu, courageous middle-aged Black South African female cabinet whistleblower in an elegant business suit, holding a classified red evidence folder, standing firm, ${BASE_STYLE}`,
  },
  {
    story: 'story_5',
    outputPath: 'public/assets/characters/kabelo.jpg',
    imageSize: 'square',
    prompt: `Close-up portrait of Chief Engineer Kabelo Motaung, brilliant exhausted 50-year-old senior electrical grid engineer with rolled-up sleeves and glasses, holding SCADA schematics and bypass cables, control room background, ${BASE_STYLE}`,
  },
  {
    story: 'story_5',
    outputPath: 'public/assets/characters/bheki_cassiem.jpg',
    imageSize: 'square',
    prompt: `Dual portrait of Bra Bheki and Cassiem Petersen, seasoned taxi kingpin and stevedore dock union leader standing shoulder to shoulder in the rain, symbolizing united workers resistance against state capture, ${BASE_STYLE}`,
  },
  {
    story: 'story_5',
    outputPath: 'public/assets/characters/sterling_swart.jpg',
    imageSize: 'square',
    prompt: `Dual portrait of Lord Sterling and General Swart, the puppet-master British-South African mining oligarch in tailored pinstripe suit beside the uniformed corrupt police commissioner at the summit, sinister smiles, ${BASE_STYLE}`,
  },
];

async function generateOneAsset(asset, apiKey, retries = 3) {
  const fullOutPath = path.join(process.cwd(), asset.outputPath);
  if (fs.existsSync(fullOutPath)) {
    console.log(`[SKIP] ${asset.outputPath} already exists.`);
    return;
  }

  fs.mkdirSync(path.dirname(fullOutPath), { recursive: true });

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
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
        throw new Error(
          `Fal API error (${response.status}) on attempt ${attempt}: ${errText}`
        );
      }

      const data = await response.json();
      const imageUrl = data?.images?.[0]?.url;
      if (!imageUrl) {
        throw new Error(`No image URL returned on attempt ${attempt}`);
      }

      const imgRes = await fetch(imageUrl);
      if (!imgRes.ok) {
        throw new Error(`Failed to download image from ${imageUrl}`);
      }

      const buffer = Buffer.from(await imgRes.arrayBuffer());
      fs.writeFileSync(fullOutPath, buffer);
      console.log(
        `[GENERATED] ${asset.outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`
      );
      return;
    } catch (err) {
      console.warn(`[WARN] ${asset.outputPath} attempt ${attempt} failed: ${err.message}`);
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
}

async function main() {
  const apiKey = loadFalApiKey();

  // Parse CLI args for story filtering: e.g. --story=story_2 or --story=all
  const storyArg = process.argv.find((a) => a.startsWith('--story='));
  const targetStory = storyArg ? storyArg.split('=')[1] : 'all';

  const assetsToProcess =
    targetStory === 'all'
      ? STORY_ASSETS
      : STORY_ASSETS.filter((a) => a.story === targetStory);

  console.log(
    `Starting generation for target [${targetStory}]: ${assetsToProcess.length} assets queued via Fal.ai Flux Schnell...`
  );

  // Batch of 3 concurrent requests to respect rate limits
  const batchSize = 3;
  for (let i = 0; i < assetsToProcess.length; i += batchSize) {
    const batch = assetsToProcess.slice(i, i + batchSize);
    console.log(
      `--- Processing Batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(
        assetsToProcess.length / batchSize
      )} ---`
    );
    await Promise.all(batch.map((asset) => generateOneAsset(asset, apiKey)));
  }

  console.log(
    `Generation completed for target [${targetStory}]! Total assets processed: ${assetsToProcess.length}`
  );
}

main().catch((err) => {
  console.error('Fatal Asset Generation Error:', err.message);
  process.exit(1);
});
