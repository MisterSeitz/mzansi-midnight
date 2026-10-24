import fs from 'node:fs';
import path from 'node:path';

const enPath = path.join(process.cwd(), 'data', 'i18n', 'en.json');
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const files = [
  'components/GameDashboard.tsx',
  'components/DistrictSvgMap.tsx',
  'components/ObjectiveTracker.tsx',
  'components/ThreatClock.tsx',
  'components/EventModal.tsx',
  'components/ContactDialogueModal.tsx',
  'components/EvidenceDossierModal.tsx',
  'components/ConspiracyBoardModal.tsx',
  'components/EndingScreen.tsx',
  'components/TutorialOverlay.tsx',
  'components/SettingsModal.tsx',
  'components/EndCycleModal.tsx',
  'components/MissionStatusModal.tsx',
  'components/TitleIntroScreen.tsx',
  'components/PrologueScreen.tsx',
  'engine/advisor.ts',
];

const missing = [];
const keyRegex = /t\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]/g;

for (const file of files) {
  const fullPath = path.join(process.cwd(), file);
  if (!fs.existsSync(fullPath)) continue;
  const content = fs.readFileSync(fullPath, 'utf8');
  let match;
  while ((match = keyRegex.exec(content)) !== null) {
    const [, key, fallback] = match;
    if (!(key in en)) {
      missing.push({ file, key, fallback });
    }
  }
}

const missingMap = {};
for (const item of missing) {
  missingMap[item.key] = item.fallback;
}

const outDir = path.join(process.cwd(), '.system_generated');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'missing_keys.json'), JSON.stringify(missingMap, null, 2), 'utf8');

console.log('Total unique missing keys:', Object.keys(missingMap).length);
console.log('Saved to .system_generated/missing_keys.json');

