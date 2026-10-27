import fs from 'fs';
import path from 'path';

const translations = {
  en: 'SCORES',
  zu: 'AMAMAKI',
  xh: 'AMANAKU',
  af: 'TELLINGS',
  st: 'DINTLHA',
  nso: 'DINTLHA',
  tn: 'DINTLHA',
  ts: 'TINOMBORO',
  ss: 'EMAMAKI',
  ve: 'ZWIPIḒA',
};

const dir = path.join(process.cwd(), 'data', 'translations');

for (const [lang, val] of Object.entries(translations)) {
  const filePath = path.join(dir, `${lang}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    data['ui.scores'] = val;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
    console.log(`Updated ${lang}.json with ui.scores = ${val}`);
  }
}
