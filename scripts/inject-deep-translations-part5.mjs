import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const i18nDir = path.resolve(__dirname, '../data/i18n');

const TRANSLATIONS = {
  // Modal titles & tabs
  'mission.act1_title': {
    en: 'ACT 1: THE GHOST DOCKET // CASE FILE & STATUS',
    af: 'WET 1: DIE SPOOKDOKKET // SAAKLÊER & STATUS',
    zu: 'ACT 1: I-GHOST DOCKET // IFAYELA LEICALA NESIMO',
    xh: 'ACT 1: I-GHOST DOCKET // IFAYILE YETYALA NEMO',
    st: 'KAROLO 1: GHOST DOCKET // FAELE YA NYEOE LE BOEMO',
    nso: 'KAROLO 1: GHOST DOCKET // FAELE YA MOLATO LE MAEMO',
    tn: 'KAROLO 1: GHOST DOCKET // FAELE YA KGANG LE MAEMO',
    ts: 'ACT 1: GHOST DOCKET // FAWULI YA MHAKA NA XIMO',
    ss: 'ACT 1: I-GHOST DOCKET // LIFAYELA LELICALA NESIMO',
    ve: 'TSIPI 1: GHOST DOCKET // FAELA YA MULANDU NA VHUIDO',
  },
  'mission.act2_title': {
    en: 'ACT 2: COMMISSION OF INQUIRY // CASE FILE & STATUS',
    af: 'WET 2: KOMMISSIE VAN ONDERSOEK // SAAKLÊER & STATUS',
    zu: 'ACT 2: IKHOMISHINI YOPHENYO // IFAYELA LEICALA NESIMO',
    xh: 'ACT 2: IKHOMISHINI YOPHANDO // IFAYILE YETYALA NEMO',
    st: 'KAROLO 2: KHOMISHENE YA DIPHUPUTSO // FAELE YA NYEOE LE BOEMO',
    nso: 'KAROLO 2: KHOMIŠENE YA DINYAKIŠIŠO // FAELE YA MOLATO LE MAEMO',
    tn: 'KAROLO 2: KHOMIŠENE YA DIPATLISISIO // FAELE YA KGANG LE MAEMO',
    ts: 'ACT 2: KHOMIXINI YA VUHLOLISISI // FAWULI YA MHAKA NA XIMO',
    ss: 'ACT 2: IKHOMISHINI YEKUPHENYA // LIFAYELA LELICALA NESIMO',
    ve: 'TSIPI 2: KHOMISHINI YA THODISISO // FAELA YA MULANDU NA VHUIDO',
  },
  'mission.tab_objective': {
    en: 'Objective & Leads',
    af: 'Doelwitte & Leidrade',
    zu: 'Imigomo Nemikhondo',
    xh: 'Iinjongo Nemikhondo',
    st: 'Sepheo le Mehlala',
    nso: 'Maikemišetšo le Mehlala',
    tn: 'Maikemisetso le Dintlha',
    ts: 'Swikongomelo na Swikombiso',
    ss: 'Iminjongo Netinkhomba',
    ve: 'Zwifhinga na Zwidodombedzwa',
  },
  'mission.tab_faq': {
    en: 'How Cycles & Dice Work',
    af: 'Hoe Siklusse & Dobbelstene Werk',
    zu: 'Indlela Ama-Cycle Namadayisi Asebenza Ngayo',
    xh: 'Indlela EziSebenza Ngayo Imijikelezo Namadayisi',
    st: 'Kamoo Di-Cycle le Ditaele di Sebetsang Kateng',
    nso: 'Ka fao Di-Cycle le Ditaele di Šomago ka Gona',
    tn: 'Ka moo Di-Cycle le Ditaele di Dirang ka Teng',
    ts: 'Ndlela leyi Ti-Cycle na Tidayisi ti Tirhaka ha Yona',
    ss: 'Indlela Ema-Cycle Nemadayisi Lasebenta Ngayo',
    ve: 'Nḓila ine Dzi-Cycle na Daisi dza Shuma Ngayo',
  },
  'mission.tab_clocks': {
    en: 'Active Clocks',
    af: 'Aktiewe Horlosies',
    zu: 'Amawashi Asebenzayo',
    xh: 'Iiwotshi Ezisebenzayo',
    st: 'Lioache Tse Sebetsang',
    nso: 'Dithuši tše di Šomago',
    tn: 'Ditshego tse di Dirang',
    ts: 'Tiwachi leti Tirhaka',
    ss: 'Emawashini Lasebentako',
    ve: 'Watshi dzi Shumaho',
  },
  'mission.tab_inventory': {
    en: 'Evidence Dossier',
    af: 'Bewysstuk-Dossier',
    zu: 'Idossier Yobufakazi',
    xh: 'Idossier Yobungqina',
    st: 'Dossier ea Bopaki',
    nso: 'Dossier ya Bohlatse',
    tn: 'Dossier ya Bosupi',
    ts: 'Dossier ya Vumbhoni',
    ss: 'Idossier Yebufakazi',
    ve: 'Dossier ya Vhutanzi',
  },

  // Act 1 & 2 exhibit items in inventory
  'item.item_act1_scorched_valves': {
    en: 'Scorched Berth 14 Valves (+1 STRT)',
    af: 'Verskroeide Berth 14-Klepmanifes (+1 STRAAT)',
    zu: 'Incwadi Yama-Valve Ashe e-Berth 14 (+1 STRT)',
    xh: 'Incwadi ye-Valve Etshisiweyo e-Berth 14 (+1 STRT)',
    st: 'Li-valve tse Chesitsoeng tsa Berth 14 (+1 STRT)',
    nso: 'Di-valve tša go Tšhungwa tša Berth 14 (+1 STRT)',
    tn: 'Di-valve tse di Fisitsweng tsa Berth 14 (+1 STRT)',
    ts: 'Ti-valve leti Hiseke ta Berth 14 (+1 STRT)',
    ss: 'Ema-valve Lashisiwe e-Berth 14 (+1 STRT)',
    ve: 'Dzi-valve dzo Swaho dza Berth 14 (+1 STRT)',
  },
  'item.item_act1_subpoena_warrant': {
    en: 'High Court Subpoena (+1 DCKT)',
    af: 'Hooggeregshof-Dagvaarding (+1 DOKK)',
    zu: 'I-Subpoena Yenkantolo Ephakeme (+1 DCKT)',
    xh: 'I-Subpoena yeNkundla ePhakamileyo (+1 DCKT)',
    st: 'Warante ea Lekhotla le Phahameng (+1 DCKT)',
    nso: 'Warante ya Kgoro e Phagamego (+1 DCKT)',
    tn: 'Warante ya Kgotlatshekelo e Kgolo (+1 DCKT)',
    ts: 'Waranti ya Khoto ya le Henhla (+1 DCKT)',
    ss: 'I-Subpoena yeNkantolo Lephakeme (+1 DCKT)',
    ve: 'Waranthi ya Khoro ya Nṱha (+1 DCKT)',
  },
  'item.item_act1_shadow_retainer': {
    en: 'Abasanta Retainer Key (+R1,500)',
    af: 'Abasanta Retainer-Sleutel (+R1,500)',
    zu: 'Isihluthulelo Sokugcina se-Abasanta (+R1,500)',
    xh: 'Isitshixo sokuGcina se-Abasanta (+R1,500)',
    st: 'Senotlolo sa Retainer sa Abasanta (+R1,500)',
    nso: 'Senotlelo sa Retainer sa Abasanta (+R1,500)',
    tn: 'Senotlolo sa Retainer sa Abasanta (+R1,500)',
    ts: 'Xilotlelo xa Retainer xa Abasanta (+R1,500)',
    ss: 'Sihluthulelo sekugcina se-Abasanta (+R1,500)',
    ve: 'Tshilotlhelo tsha Retainer tsha Abasanta (+R1,500)',
  },
  'item.offshore_trust_deed': {
    en: 'Sovereign Pearl Trust Deed',
    af: 'Sovereign Pearl Trust-Akte',
    zu: 'Sovereign Pearl Trust Deed',
    xh: 'Sovereign Pearl Trust Deed',
    st: 'Sovereign Pearl Trust Deed',
    nso: 'Sovereign Pearl Trust Deed',
    tn: 'Sovereign Pearl Trust Deed',
    ts: 'Sovereign Pearl Trust Deed',
    ss: 'Sovereign Pearl Trust Deed',
    ve: 'Sovereign Pearl Trust Deed',
  },
  'item.superlab_batch_telemetry': {
    en: 'Super-Lab Batch Telemetry',
    af: 'Super-Lab Bondel-Telemetrie',
    zu: 'Super-Lab Batch Telemetry',
    xh: 'Super-Lab Batch Telemetry',
    st: 'Super-Lab Batch Telemetry',
    nso: 'Super-Lab Batch Telemetry',
    tn: 'Super-Lab Batch Telemetry',
    ts: 'Super-Lab Batch Telemetry',
    ss: 'Super-Lab Batch Telemetry',
    ve: 'Super-Lab Batch Telemetry',
  },
  'item.item_sat_uplink': {
    en: 'Inmarsat Sat-Terminal (+1 WIRE)',
    af: 'Inmarsat Satelliet-Terminaal (+1 DRAAD)',
    zu: 'I-Inmarsat Sat-Terminal (+1 WIRE)',
    xh: 'I-Inmarsat Sat-Terminal (+1 WIRE)',
    st: 'Inmarsat Sat-Terminal (+1 WIRE)',
    nso: 'Inmarsat Sat-Terminal (+1 WIRE)',
    tn: 'Inmarsat Sat-Terminal (+1 WIRE)',
    ts: 'Inmarsat Sat-Terminal (+1 WIRE)',
    ss: 'I-Inmarsat Sat-Terminal (+1 WIRE)',
    ve: 'Inmarsat Sat-Terminal (+1 WIRE)',
  },
};

const languages = ['en', 'af', 'zu', 'xh', 'st', 'nso', 'tn', 'ts', 'ss', 've'];

languages.forEach((lang) => {
  const filePath = path.join(i18nDir, `${lang}.json`);
  let data = {};
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  let added = 0;
  for (const [key, trans] of Object.entries(TRANSLATIONS)) {
    if (trans[lang]) {
      data[key] = trans[lang];
      added++;
    } else if (trans.en) {
      data[key] = trans.en;
      added++;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Updated ${lang}.json with ${added} translations.`);
});

console.log('Part 5 translations successfully injected.');
