import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();

// ==========================================
// 1. ASSET AUDIT
// ==========================================
console.log('=== AUDITING ASSETS ===');

const assetDirs = [
  'public/assets/backgrounds',
  'public/assets/characters',
  'public/assets/nodes',
  'public/assets/maps',
];

for (const d of assetDirs) {
  const p = path.join(rootDir, d);
  if (!fs.existsSync(p)) {
    console.log(`Directory MISSING: ${d}`);
  } else {
    const count = fs.readdirSync(p).length;
    console.log(`Directory ${d}: ${count} files`);
  }
}

// Check all 40 district nodes:
const allNodeIds = [
  // Story 1 Act 1
  'n1_safehouse', 'n2_taxi_rank', 'n3_central_precinct', 'n4_city_hall',
  'n5_cyber_pawn', 'n6_pier2_port', 'n7_archive_basement',
  // Story 1 Act 2
  'n8_ridge_penthouses', 'n9_township_depot', 'n10_high_court',
  'n11_citrus_estate', 'n12_cargo_apron',
  // Story 2 Highveld
  'h1_braamfontein_safehouse', 'h2_sandton_tower', 'h3_hillbrow_substation',
  'h4_witwatersrand_shaft', 'h5_union_buildings', 'h6_kendon_coal_depot', 'h7_siu_headquarters',
  // Story 3 Namaqua
  'd1_port_nolloth_jetty', 'd2_alexander_bay_quarry', 'd3_richtersveld_canyon',
  'd4_debeers_ghost_mine', 'd5_orange_river_pont', 'd6_aegis_coastal_compound', 'd7_springbok_magistrate',
  // Story 4 Cape
  'c1_long_street_strip', 'c2_manenberg_tenements', 'c3_camps_bay_promenade',
  'c4_table_bay_container_berth', 'c5_stellenbosch_wine_estate', 'c6_agu_safehouse_ruin', 'c7_provincial_police_hq',
  // Story 5 Octagon
  'o1_drakensberg_bunker', 'o2_union_buildings_subbasement', 'o3_apollo_grid_command',
  'o4_durban_berth_command', 'o5_karoo_airspace_corridor', 'o6_stellenbosch_oligarch_vault', 'o7_octagon_summit_chamber',
];

console.log(`\nChecking node banner images for ${allNodeIds.length} nodes...`);
const missingNodeBanners = [];
for (const id of allNodeIds) {
  const nodeFile = path.join(rootDir, 'public', 'assets', 'nodes', `${id}.jpg`);
  if (!fs.existsSync(nodeFile)) {
    missingNodeBanners.push(id);
  }
}
if (missingNodeBanners.length === 0) {
  console.log('✓ All 40 node banners exist in public/assets/nodes/');
} else {
  console.log(`⚠️ Missing node banners (${missingNodeBanners.length}):`, missingNodeBanners);
}

// Check maps:
const maps = [
  'map_ethekwini.jpg',
  'map_highveld.jpg',
  'map_namaqua.jpg',
  'map_cape.jpg',
  'map_octagon.jpg',
];
console.log('\nChecking regional map backgrounds...');
const missingMaps = [];
for (const m of maps) {
  const p = path.join(rootDir, 'public', 'assets', 'maps', m);
  if (!fs.existsSync(p)) missingMaps.push(m);
}
if (missingMaps.length === 0) {
  console.log('✓ All 5 regional map backgrounds exist in public/assets/maps/');
} else {
  console.log(`⚠️ Missing maps (${missingMaps.length}):`, missingMaps);
}

// Check characters / portraits:
console.log('\nScanning referenced character / portrait assets in source code...');
const codeFilesToScan = [
  'components/GameDashboard.tsx',
  'components/PrologueScreen.tsx',
  'components/ConspiracyBoardModal.tsx',
  'components/ContactDialogueModal.tsx',
  'data/campaignStories.ts',
  'data/story2HighveldPrologue.ts',
  'data/story3NamaquaPrologue.ts',
  'data/story4CapePrologue.ts',
  'data/story5OctagonPrologue.ts',
  'data/prologueScript.ts',
];

const assetRegex = /\/(?:assets)\/[a-zA-Z0-9_\-\/]+\.(?:jpg|png|webp|svg)/g;
const referencedAssets = new Set();

for (const f of codeFilesToScan) {
  const p = path.join(rootDir, f);
  if (!fs.existsSync(p)) continue;
  const content = fs.readFileSync(p, 'utf8');
  const matches = content.match(assetRegex) || [];
  for (const m of matches) {
    referencedAssets.add(m);
  }
}

console.log(`Found ${referencedAssets.size} statically referenced assets in key code files.`);
const missingReferencedAssets = [];
for (const ref of referencedAssets) {
  const localPath = path.join(rootDir, 'public', ref);
  if (!fs.existsSync(localPath)) {
    missingReferencedAssets.push(ref);
  }
}
if (missingReferencedAssets.length === 0) {
  console.log('✓ All referenced assets exist on disk!');
} else {
  console.log(`⚠️ Missing referenced assets (${missingReferencedAssets.length}):`, missingReferencedAssets);
}

// ==========================================
// 2. TRANSLATION AUDIT
// ==========================================
console.log('\n=== AUDITING TRANSLATIONS ===');

const i18nDir = path.join(rootDir, 'data', 'i18n');
const langFiles = fs.readdirSync(i18nDir).filter((f) => f.endsWith('.json'));

const langData = {};
for (const f of langFiles) {
  const lang = f.replace('.json', '');
  langData[lang] = JSON.parse(fs.readFileSync(path.join(i18nDir, f), 'utf8'));
}

const enKeys = Object.keys(langData.en);
console.log(`English (en.json) has ${enKeys.length} translation keys.`);

const langStats = [];
for (const [lang, dict] of Object.entries(langData)) {
  const keys = Object.keys(dict);
  const missingFromEn = enKeys.filter((k) => !(k in dict));
  langStats.push({
    lang,
    totalKeys: keys.length,
    missingVsEn: missingFromEn.length,
  });
}

console.table(langStats);

// Check story-specific key prefixes in en.json:
const stories = [
  { name: 'Story 1 (eThekwini Act 1 & 2)', prefix: ['node.n', 'dialogue.n', 'clock.mokoena', 'clock.nandi', 'clock.precinct', 'clock.audit_docket'] },
  { name: 'Story 2 (Highveld)', prefix: ['node.h', 'dialogue.h', 'prologue.highveld', 'clock.megawatt', 'ending.ending_highveld'] },
  { name: 'Story 3 (Namaqua)', prefix: ['node.d', 'dialogue.d', 'prologue.namaqua', 'clock.admiralty', 'ending.ending_namaqua'] },
  { name: 'Story 4 (Cape)', prefix: ['node.c', 'dialogue.c', 'prologue.cape', 'clock.red_cipher', 'ending.ending_cape'] },
  { name: 'Story 5 (Octagon)', prefix: ['node.o', 'dialogue.o', 'prologue.octagon', 'clock.treason', 'ending.ending_octagon'] },
];

console.log('\nStory-specific key representation in en.json:');
for (const s of stories) {
  const count = enKeys.filter((k) => s.prefix.some((p) => k.startsWith(p))).length;
  console.log(`- ${s.name}: ${count} keys found with story prefixes`);
}
