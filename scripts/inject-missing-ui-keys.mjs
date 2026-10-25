// scripts/inject-missing-ui-keys.mjs
import fs from 'node:fs';
import path from 'node:path';

const i18nDir = path.resolve('data/i18n');
const languages = ['en', 'af', 'zu', 'xh', 'st', 'nso', 'tn', 'ts', 'ss', 've'];

const newKeys = {
  'map.sector.cape_strip': {
    en: 'SECTOR 01 // CAMPS BAY & LONG STREET',
    af: 'SEKTOR 01 // KAMPSBAAI & LANGSTRAAT',
    zu: 'UMKHAKHA 01 // I-CAMPS BAY NE-LONG STREET',
    xh: 'ICANDELO 01 // I-CAMPS BAY NE-LONG STREET',
    st: 'LEKALA 01 // CAMPS BAY LE LONG STREET',
    nso: 'SEKGAOLO 01 // CAMPS BAY LE LONG STREET',
    tn: 'LEKALA 01 // CAMPS BAY LE LONG STREET',
    ts: 'XIYENGE 01 // CAMPS BAY NA LONG STREET',
    ss: 'UMKHATSI 01 // CAMPS BAY NE-LONG STREET',
    ve: 'TUSHUMELO 01 // CAMPS BAY NA LONG STREET'
  },
  'map.sector.highveld_spine': {
    en: 'SECTOR 01 // BRAAMFONTEIN & HILLBROW',
    af: 'SEKTOR 01 // BRAAMFONTEIN & HILLBROW',
    zu: 'UMKHAKHA 01 // I-BRAAMFONTEIN NE-HILLBROW',
    xh: 'ICANDELO 01 // I-BRAAMFONTEIN NE-HILLBROW',
    st: 'LEKALA 01 // BRAAMFONTEIN LE HILLBROW',
    nso: 'SEKGAOLO 01 // BRAAMFONTEIN LE HILLBROW',
    tn: 'LEKALA 01 // BRAAMFONTEIN LE HILLBROW',
    ts: 'XIYENGE 01 // BRAAMFONTEIN NA HILLBROW',
    ss: 'UMKHATSI 01 // BRAAMFONTEIN NE-HILLBROW',
    ve: 'TUSHUMELO 01 // BRAAMFONTEIN NA HILLBROW'
  },
  'map.sector.cape_flats': {
    en: 'SECTOR 02 // MANENBERG & AGU BUNKER',
    af: 'SEKTOR 02 // MANENBERG & AGU-BUNKER',
    zu: 'UMKHAKHA 02 // I-MANENBERG NE-AGU BUNKER',
    xh: 'ICANDELO 02 // I-MANENBERG NE-AGU BUNKER',
    st: 'LEKALA 02 // MANENBERG LE AGU BUNKER',
    nso: 'SEKGAOLO 02 // MANENBERG LE AGU BUNKER',
    tn: 'LEKALA 02 // MANENBERG LE AGU BUNKER',
    ts: 'XIYENGE 02 // MANENBERG NA AGU BUNKER',
    ss: 'UMKHATSI 02 // MANENBERG NE-AGU BUNKER',
    ve: 'TUSHUMELO 02 // MANENBERG NA AGU BUNKER'
  },
  'map.sector.sandton_pretoria': {
    en: 'SECTOR 02 // SANDTON & PRETORIA',
    af: 'SEKTOR 02 // SANDTON & PRETORIA',
    zu: 'UMKHAKHA 02 // I-SANDTON NE-PRETORIA',
    xh: 'ICANDELO 02 // I-SANDTON NE-PRETORIA',
    st: 'LEKALA 02 // SANDTON LE PRETORIA',
    nso: 'SEKGAOLO 02 // SANDTON LE PRETORIA',
    tn: 'LEKALA 02 // SANDTON LE PRETORIA',
    ts: 'XIYENGE 02 // SANDTON NA PRETORIA',
    ss: 'UMKHATSI 02 // SANDTON NE-PRETORIA',
    ve: 'TUSHUMELO 02 // SANDTON NA PRETORIA'
  },
  'map.sector.cape_docks': {
    en: 'SECTOR 03 // TABLE BAY PIER 109 & STELLENBOSCH',
    af: 'SEKTOR 03 // TAFELBAAI HAAIHOOF 109 & STELLENBOSCH',
    zu: 'UMKHAKHA 03 // ITHEKWINI LASE-TABLE BAY PIER 109 NE-STELLENBOSCH',
    xh: 'ICANDELO 03 // IZIBUKO LASE-TABLE BAY PIER 109 NE-STELLENBOSCH',
    st: 'LEKALA 03 // TABLE BAY PIER 109 LE STELLENBOSCH',
    nso: 'SEKGAOLO 03 // TABLE BAY PIER 109 LE STELLENBOSCH',
    tn: 'LEKALA 03 // TABLE BAY PIER 109 LE STELLENBOSCH',
    ts: 'XIYENGE 03 // TABLE BAY PIER 109 NA STELLENBOSCH',
    ss: 'UMKHATSI 03 // TABLE BAY PIER 109 NE-STELLENBOSCH',
    ve: 'TUSHUMELO 03 // TABLE BAY PIER 109 NA STELLENBOSCH'
  },
  'map.sector.crown_kendon': {
    en: 'SECTOR 03 // CROWN REEFS & KENDON',
    af: 'SEKTOR 03 // CROWN REEFS & KENDON',
    zu: 'UMKHAKHA 03 // I-CROWN REEFS NE-KENDON',
    xh: 'ICANDELO 03 // I-CROWN REEFS NE-KENDON',
    st: 'LEKALA 03 // CROWN REEFS LE KENDON',
    nso: 'SEKGAOLO 03 // CROWN REEFS LE KENDON',
    tn: 'LEKALA 03 // CROWN REEFS LE KENDON',
    ts: 'XIYENGE 03 // CROWN REEFS NA KENDON',
    ss: 'UMKHATSI 03 // CROWN REEFS NE-KENDON',
    ve: 'TUSHUMELO 03 // CROWN REEFS NA KENDON'
  },
  'map.water.cape_nocturne': {
    en: 'TABLE BAY CONTAINER HARBOUR // ATLANTIC STRIP',
    af: 'TAFELBAAI-HOUERHAWE // ATLANTIESE KUSSTROOK',
    zu: 'ITHEKU LEZITHUTHI LASE-TABLE BAY // UMBALA WASE-ATLANTIC',
    xh: 'IZIBUKO LEMITHWALO LASE-TABLE BAY // UNXWEME LWASE-ATLANTIC',
    st: 'BOEMA-FOKE BA TABLE BAY // SEBOKA SA ATLANTIC',
    nso: 'LEBOPO LA DITSHEPHO TSA TABLE BAY // LEBOPONG LA ATLANTIC',
    tn: 'BOEMA-KEPE BA TABLE BAY // LEFAPHA LA ATLANTIC',
    ts: 'RHIBA RA SWIKEPE RA TABLE BAY // RIBUWA RA ATLANTIC',
    ss: 'LITHEKU LETITFUTSI LASE-TABLE BAY // LUGWINSI LWASE-ATLANTIC',
    ve: 'VHUDZULAMALIGWE HA TABLE BAY // VHUPO HA ATLANTIC'
  },
  'map.water.highveld_corridor': {
    en: 'WITWATERSRAND REEF // SHAFT 4 & KENDON',
    af: 'WITWATERSRAND-RIF // SKAG 4 & KENDON',
    zu: 'UMGODI WASE-WITWATERSRAND // I-SHAFT 4 NE-KENDON',
    xh: 'UMGODI WASE-WITWATERSRAND // ISHAFT 4 NE-KENDON',
    st: 'MORAFO WA WITWATERSRAND // SHAFT 4 LE KENDON',
    nso: 'MOETI WA WITWATERSRAND // SHAFT 4 LE KENDON',
    tn: 'MOEPO WA WITWATERSRAND // SHAFT 4 LE KENDON',
    ts: 'MUGODI WA WITWATERSRAND // SHAFT 4 NA KENDON',
    ss: 'UMGUDI WASE-WITWATERSRAND // SHAFT 4 NE-KENDON',
    ve: 'MUGODI WA WITWATERSRAND // SHAFT 4 NA KENDON'
  },
  'map.roadblock_warning': {
    en: '! SAPS ROADBLOCK',
    af: '! SAPD-PADBLOKKADE',
    zu: '! ISITHIBELO SE-SAPS',
    xh: '! ISITHINTELO SE-SAPS',
    st: '! TŠHIRELETSO EA TSELENG YA SAPS',
    nso: '! LEPHOTHO LA TSELENG LA SAPS',
    tn: '! THIBAPUSELELO YA MAPODISI A SAPS',
    ts: '! SIVHALO XA PATU XA SAPS',
    ss: '! SIVIMBO SEMGWACO SA-SAPS',
    ve: '! TSIRA YA BADA YA SAPS'
  },
  'tracker.cape.step1': {
    en: '1. Break Protection Racket',
    af: '1. Breek Beskermingsnetwerk',
    zu: '1. Qeda Inethiwekhi Yokukhwabanisa',
    xh: '1. Gqiba Inethiwekhi Yokukhwabanisa',
    st: '1. Rola Tsamaiso ea Bosholu',
    nso: '1. Pshatla Mokgwa wa Tshireletso ya Maaka',
    tn: '1. Senya Kgolagano ya Tshireletso ya Maaka',
    ts: '1. Fayelela Ntlawa wa Vutsireleli bya Vunwa',
    ss: '1. Gedla Libandla Lekuvikela Kwemanga',
    ve: '1. Pwashekanyani Vhuvhanga ha Tsireledzo ya Mazwifhi'
  },
  'tracker.cape.step2': {
    en: '2. Decrypt Red Cipher',
    af: '2. Dekripteer Rooi Kode',
    zu: '2. Chaza Ikhodi Ebomvu',
    xh: '2. Cazulula Ikhowudi Ebomvu',
    st: '2. Manolla Khoutu e Khubelu',
    nso: '2. Hlatholla Khoutu e Khubedu',
    tn: '2. Ranola Khoutu e Khibidu',
    ts: '2. Hlahluva Khodi yo Tshwuka',
    ss: '2. Chaza Ikhodi Lebovu',
    ve: '2. Vusulutsani Khoutu Tswuku'
  },
  'tracker.cape.step3': {
    en: '3. Pier 109 Finale',
    af: '3. Haaihoof 109 Finaal',
    zu: '3. Isiphetho Sase-Pier 109',
    xh: '3. Isiphelo Sase-Pier 109',
    st: '3. Qetello ea Pier 109',
    nso: '3. Bofelo bja Pier 109',
    tn: '3. Bokhutlo jwa Pier 109',
    ts: '3. Makumu ya Pier 109',
    ss: '3. Siphetfo Sase-Pier 109',
    ve: '3. Magumo a Pier 109'
  },
  'tracker.namaqua.step1': {
    en: '1. Survey Submarine Canyon',
    af: '1. Ondersoek Duikbootkloof',
    zu: '1. Hlola Umhosha Wangaphansi Kolwandle',
    xh: '1. Phanda Umgxuma Wangaphantsi Kolwandle',
    st: '1. Hlahloba Mokoti oa Leoatle',
    nso: '1. Lekola Sekoti sa Ka Fase ga Lewatle',
    tn: '1. Tlhola Sekoti sa Ka Fa Tlase ga Lewatle',
    ts: '1. Kambisisa Bakwa ra Hantsi ka Lwandle',
    ss: '1. Hlola Umhosha Wangephansi Kwelwandle',
    ve: '1. Tolani Gumbu la Dzhivha la Lwanzhe'
  },
  'tracker.namaqua.step2': {
    en: '2. Intercept Arms Consignment',
    af: '2. Onderskep Wapensending',
    zu: '2. Vimba Impahla Yezikhali',
    xh: '2. Nqanda Impahla Yezixhobo',
    st: '2. Thibela Thomelo ea Libetsa',
    nso: '2. Thibela Thomelo ya Dibetša',
    tn: '2. Thiba Thomelo ya Dibetsa',
    ts: '2. Sivela Rhungula ra Matlhari',
    ss: '2. Vimbela Kutfunyelwa Kwetikhali',
    ve: '2. Thivhelani Zwiendedzwa zwa Zwihali'
  },
  'tracker.namaqua.step3': {
    en: '3. Orange River Climax',
    af: '3. Oranjerivier-klimaks',
    zu: '3. Isiqongo Sase-Orange River',
    xh: '3. Incopho Yase-Orange River',
    st: '3. Qetello ea Noka ea Orange',
    nso: '3. Sehloa sa Noka ya Orange',
    tn: '3. Setlhoa sa Noka ya Orange',
    ts: '3. Makumu ya Nambu wa Orange',
    ss: '3. Siphetfo Semfula i-Orange',
    ve: '3. Tshitotzi tsha Mulambo wa Orange'
  },
  'tracker.highveld.step1': {
    en: '1. Crack Midas Decrypt',
    af: '1. Kraak Midas-dekriptering',
    zu: '1. Qhekeza Ikhodi Yakwa-Midas',
    xh: '1. Qhekeza Ikhowudi Yakwa-Midas',
    st: '1. Qhaqha Khoutu ea Midas',
    nso: '1. Pshatla Khoutu ya Midas',
    tn: '1. Phushola Khoutu ya Midas',
    ts: '1. Tshova Khodi ya Midas',
    ss: '1. Choboza Ikhodi Yakwa-Midas',
    ve: '1. Pwashekanyani Khoutu ya Midas'
  },
  'tracker.highveld.step2': {
    en: '2. Build SIU Docket',
    af: '2. Bou SOE-saakdossier',
    zu: '2. Yakha Idokhethi Le-SIU',
    xh: '2. Yakha Idokethi Le-SIU',
    st: '2. Haha Tokomane ea SIU',
    nso: '2. Aga Tokomane ya SIU',
    tn: '2. Aga Lokwalo lwa SIU',
    ts: '2. Aka Dokete ya SIU',
    ss: '2. Yakha Lidokhethi Le-SIU',
    ve: '2. Fhatani Dokethe ya SIU'
  },
  'tracker.highveld.step3': {
    en: '3. Kendon Grid Climax',
    af: '3. Kendon-kragroosterklimaks',
    zu: '3. Isiqongo Sehla Lekagesi Lase-Kendon',
    xh: '3. Incopho Yenethiwekhi Yombane Yase-Kendon',
    st: '3. Qetello ea Grid ea Motlakase ea Kendon',
    nso: '3. Sehloa sa Kgokagano ya Mohlagase ya Kendon',
    tn: '3. Setlhoa sa Mafaratlhatlha a Motlakase a Kendon',
    ts: '3. Makumu ya Gezi ra Kendon',
    ss: '3. Siphetfo Sehla Lemagezi Lase-Kendon',
    ve: '3. Tshitotzi tsha Mudagasi wa Kendon'
  },
  'board.cape_web': {
    en: 'Cape Town Web',
    af: 'Kaapstad-web',
    zu: 'Inethiwekhi Yase-Cape Town',
    xh: 'Inethiwekhi YaseKapa',
    st: 'Marang-rang a Motse Kapa',
    nso: 'Kgolagano ya Motse Kapa',
    tn: 'Kgokagano ya Motse Kapa',
    ts: 'Rungula ra Kapa',
    ss: 'Linethiwekhi Lase-Kapa',
    ve: 'Mambundungule a Cape Town'
  },
  'intro.back': {
    en: '[Back]',
    af: '[Terug]',
    zu: '[Emuva]',
    xh: '[Emva]',
    st: '[Morao]',
    nso: '[Morago]',
    tn: '[Morago]',
    ts: '[Endzhaku]',
    ss: '[Emuva]',
    ve: '[Murahu]'
  },
  'intro.mode_story4_prologue': {
    en: 'Story 4: Interactive Prologue (Leila Hendricks) →',
    af: 'Storie 4: Interaktiewe Proloog (Leila Hendricks) →',
    zu: 'Indaba 4: Isandulela Esisebenzisanayo (Leila Hendricks) →',
    xh: 'Ibali 4: Intshayelelo Esebenzisanayo (Leila Hendricks) →',
    st: 'Pale 4: Selelekela se Kopanetsoeng (Leila Hendricks) →',
    nso: 'Kanegelo 4: Matseno a go Kgatha Tema (Leila Hendricks) →',
    tn: 'Polelo 4: Matseno a go Tsaya Karolo (Leila Hendricks) →',
    ts: 'Xitori 4: Xingheniso xo Hlanganyela (Leila Hendricks) →',
    ss: 'Indzaba 4: Sendlalelo Lesihlanganyelwako (Leila Hendricks) →',
    ve: 'Tshitori 4: Marangaphanda a u Shela Mulenzhe (Leila Hendricks) →'
  },
  'intro.mode_story4_map': {
    en: 'Story 4: Quick-Start to Cape Town Map',
    af: 'Storie 4: Kitsbegin na Kaapstad-kaart',
    zu: 'Indaba 4: Qala Ngokushesha Ebalazweni Lase-Cape Town',
    xh: 'Ibali 4: Qalisa Ngokukhawuleza Kwimephu YaseKapa',
    st: 'Pale 4: Qalo e Potlakileng ea \'Mmapa oa Motse Kapa',
    nso: 'Kanegelo 4: Thomang ka Potlako Mepeng wa Motse Kapa',
    tn: 'Polelo 4: Simolola ka Bofefo Mmapeng wa Motse Kapa',
    ts: 'Xitori 4: Sungula hi Ku Hatlisa eka Mepe wa Kapa',
    ss: 'Indzaba 4: Cala Ngekushesha Ebalaveni Lase-Kapa',
    ve: 'Tshitori 4: Thoma nga U Tavhanya kha Mmapa wa Cape Town'
  },
  'intro.mode_story2_prologue': {
    en: 'Story 2: Interactive Prologue (Bra K) →',
    af: 'Storie 2: Interaktiewe Proloog (Bra K) →',
    zu: 'Indaba 2: Isandulela Esisebenzisanayo (Bra K) →',
    xh: 'Ibali 2: Intshayelelo Esebenzisanayo (Bra K) →',
    st: 'Pale 2: Selelekela se Kopanetsoeng (Bra K) →',
    nso: 'Kanegelo 2: Matseno a go Kgatha Tema (Bra K) →',
    tn: 'Polelo 2: Matseno a go Tsaya Karolo (Bra K) →',
    ts: 'Xitori 2: Xingheniso xo Hlanganyela (Bra K) →',
    ss: 'Indzaba 2: Sendlalelo Lesihlanganyelwako (Bra K) →',
    ve: 'Tshitori 2: Marangaphanda a u Shela Mulenzhe (Bra K) →'
  },
  'intro.mode_story2_map': {
    en: 'Story 2: Quick-Start to Gauteng Map',
    af: 'Storie 2: Kitsbegin na Gauteng-kaart',
    zu: 'Indaba 2: Qala Ngokushesha Ebalazweni Lase-Gauteng',
    xh: 'Ibali 2: Qalisa Ngokukhawuleza Kwimephu YaseGauteng',
    st: 'Pale 2: Qalo e Potlakileng ea \'Mmapa oa Gauteng',
    nso: 'Kanegelo 2: Thomang ka Potlako Mepeng wa Gauteng',
    tn: 'Polelo 2: Simolola ka Bofefo Mmapeng wa Gauteng',
    ts: 'Xitori 2: Sungula hi Ku Hatlisa eka Mepe wa Gauteng',
    ss: 'Indzaba 2: Cala Ngekushesha Ebalaveni Lase-Gauteng',
    ve: 'Tshitori 2: Thoma nga U Tavhanya kha Mmapa wa Gauteng'
  },
  'prologue.cape_header': {
    en: 'PROLOGUE // CASE FILE #990-WC (CAPE-NOCTURNE)',
    af: 'PROLOOG // SAAKDOSSIER #990-WC (KAAP-NOKTURNE)',
    zu: 'ISANDULELA // IFAYELA LEDOKHETHI #990-WC (CAPE-NOCTURNE)',
    xh: 'INTSHAYELELO // IFAYILE YEDOKETHI #990-WC (CAPE-NOCTURNE)',
    st: 'SELELEKELA // FAELE YA DOKETE #990-WC (CAPE-NOCTURNE)',
    nso: 'MATSENO // FAELA YA DOKETE #990-WC (CAPE-NOCTURNE)',
    tn: 'MATSENO // FAELE YA DOKETE #990-WC (CAPE-NOCTURNE)',
    ts: 'XINGHENISO // FAEYILI YA DOKETE #990-WC (CAPE-NOCTURNE)',
    ss: 'SENDLALELO // LELIFAYELA LELIDOKHETHI #990-WC (CAPE-NOCTURNE)',
    ve: 'MARANGAPHANDA // FAELA YA DOKETHE #990-WC (CAPE-NOCTURNE)'
  },
  'prologue.highveld_header': {
    en: 'PROLOGUE // CASE FILE #711-GP (HIGHVELD-CHROME)',
    af: 'PROLOOG // SAAKDOSSIER #711-GP (HOËVELD-CHROOM)',
    zu: 'ISANDULELA // IFAYELA LEDOKHETHI #711-GP (HIGHVELD-CHROME)',
    xh: 'INTSHAYELELO // IFAYILE YEDOKETHI #711-GP (HIGHVELD-CHROME)',
    st: 'SELELEKELA // FAELE YA DOKETE #711-GP (HIGHVELD-CHROME)',
    nso: 'MATSENO // FAELA YA DOKETE #711-GP (HIGHVELD-CHROME)',
    tn: 'MATSENO // FAELE YA DOKETE #711-GP (HIGHVELD-CHROME)',
    ts: 'XINGHENISO // FAEYILI YA DOKETE #711-GP (HIGHVELD-CHROME)',
    ss: 'SENDLALELO // LELIFAYELA LELIDOKHETHI #711-GP (HIGHVELD-CHROME)',
    ve: 'MARANGAPHANDA // FAELA YA DOKETHE #711-GP (HIGHVELD-CHROME)'
  },
  'prologue.header': {
    en: 'PROLOGUE // THE GHOST DOCKET',
    af: 'PROLOOG // DIE SPOEKDOSSIER',
    zu: 'ISANDULELA // IDOKHETHI LOMPHOKO',
    xh: 'INTSHAYELELO // IDOKETHI LESITHUNZI',
    st: 'SELELEKELA // DOKETE LA SEPHEPO',
    nso: 'MATSENO // DOKETE LA SEFAPHO',
    tn: 'MATSENO // DOKETE YA MOWA',
    ts: 'XINGHENISO // DOKETE YA MOYA',
    ss: 'SENDLALELO // LIDOKHETHI LELIPHUKU',
    ve: 'MARANGAPHANDA // DOKETHE LA TSHIDZIMU'
  }
};

const missingPrologueKeys = {
  'prologue.log.bolt_deadlocks': {
    xh: 'Utsala uNandi ngaphakathi uze utshixe izitshixo njengoko iindudumo zigungqisa iglasi ye-arcade.',
    st: 'U hulela Nandi kahare mme o notlela dinotlolo ha sealuma se sisinya khalase ea arcade.',
    nso: 'O gogela Nandi ka gare gomme o notlela dinotlelo ge modumo wa legodimo o šikinya galase ya arcade.',
    tn: 'O gogela Nandi ka fa gare mme o lotlela dinotlelo fa modumo wa maru o tsubula galase ya arcade.',
    ts: 'U koka Nandi endzeni kutani u khiya tikhiya tanihi loko ku dzindza ka tilo ku tsekatsekisa nghilazi ya arcade.',
    ss: 'Udvonsela Nandi ngakhatsi bese ukhiya tikhiye njengobe kudvuma kwelitulu kunyakalisa ingilazi ye-arcade.',
    ve: 'Ni kokodzela Nandi nga ngomu nahone na khonela dzikhii musi muduma u tshi dzinginya girasi ya arcade.'
  },
  'prologue.log.fake_disaster': {
    xh: 'Ubona ngoko nangoko: ithenda litsibe unondyebo wephondo lisebenzisa isiginitsha yeSibhengezo seNtlekele yomGunyathi.',
    st: 'O bona hang-hang: thendara e fetile letlotlo la provense e sebelisa tekeno ea Phatlalatso ea Koluoa ea Maaka.',
    nso: 'O bona gateetee: thentara e fapogile matlotlo a profense ka go šomiša mosaeno wa Pego ya Kotsi ya Maaka.',
    tn: 'O lemoga ka bofefo: thendara e tlodisitse letlotlo la porofense e dirisa mosaeno wa Phatlalatso ya Masetlapelo a Maaka.',
    ts: 'U swi vona hi ku hatlisa: thendara yi hundzile vuhlayiselo bya xifundzha hi ku tirhisa sayini ya Xitiviso xa Mutsonga-hungu.',
    ss: 'Ukubona masinyane: lithenda lelidlulise umphatsi wetimali wesifundza lisebentisa sisindvo seSimemetelo Sehlekelele Yemanga.',
    ve: 'Ni zwi vhona nga u tavhanya: thendara yo fhira vhulungelo ha tshelede ya vundu hu tshi shumiswa tsaino ya Ndivhadzo ya Khombo ya Mazwifhi.'
  },
  'prologue.log.passcode_hint': {
    xh: 'Ukuzola kwakho kucothisa ukuphefumla kwakhe. Ukunika icebiso legama lokugqitha umphicothi-zincwadi awayethetha ngalo ngaphambi kokuba afe.',
    st: 'Ho khutsa ha hao ho fokotsa ho hema ha hae. O u fa leseli la khoutu eo mohlahlobi a neng a e bua pele a e-shoa.',
    nso: 'Go ritifala ga gago go theosa go hema ga gagwe. O go fa keletšo ya phasewete yeo mohlahlobi a boletšego ka yona pele a hlokofala.',
    tn: 'Go iketla ga gago go fokotsa go hema ga gagwe. O go naya ntlha ya khoutu e motlhahlobi a neng a e bua pele a tlhokafala.',
    ts: 'Ku rhula ka wena ku hunguta ku hefemula ka yena. U ku nyika xikombiso xa phaswedi leyi mukambisisi a yi vuleke a nga si fa.',
    ss: 'Kuthula kwakho kubambelela kuphefumula kwakhe. Ukuniketa sincomelelo sephasiwedi umcwaningi layikhulumile ngaphambi kwekutsi afe.',
    ve: 'U vutshela havho hu hungudza u fema hawe. U ni fha ndaedzo ya phaswidi ye mutoli a i amba musi a sa athu fa.'
  },
  'prologue.log.dead_auditor_phone': {
    xh: '"Ifowuni yomphicothi-zincwadi ofileyo," usebeze watsho. "Ndaqengqelekela emoba xa kufika iveni yesibini ye-TRT."',
    st: '"Fono ea mohlahlobi ea shoeleng," o sebela ka lentsoe le tlaase. "Ke ile ka thella motebong oa metsi holim\'a \'moba ha koloi ea bobeli ea TRT e fihla."',
    nso: '"Founu ya mohlahlobi yo a hlokofetšego," o sebela bjalo. "Ke ile ka kgokologa ka tsena ka gare ga moba ge koloi ya bobedi ya TRT e fihla."',
    tn: '"Founu ya motlhahlobi yo o tlhokafetseng," o sebaseba jalo. "Ke ne ka thella fa thoko ga noka ya morwalela mo motsokweng fa veni ya bobedi ya TRT e goroga."',
    ts: '\"Foni ya mukambisisi loyi a feke,\" u hleveterile. \"Ndzi khungumukele eka swikavhu swa mova loko veni ya vumbirhi ya TRT yi fika.\"',
    ss: '\"Licingo lemcwaningi lofilwe,\" uhleba kancane. \"Ngagingcika ngaya emobeni ngesikhatsi kufika liveni lesibili le-TRT.\"',
    ve: '\"Lutingo lwa mutoli o faho,\" u hwehwhedza. \"Ndo kunguluwela luvhandeni lwa miomva musi goloi ya vhuvhili ya TRT i tshi swika.\"'
  },
  'prologue.log.kill_radio': {
    xh: 'Uqhekeza iqweqwe lukanomathotholo wakhe uze uphose itshiphu ye-GPS kwiglasi yegin phambi kokuba umrhulele ngaphakathi.',
    st: 'O ntša khetla ea seea-le-moea sa hae \'me o lahlela tšepe ea GPS ka khalaseng ea joala pele o mo hulela kahare.',
    nso: 'O ntšha lepokisi la radio ya gagwe gomme o lahlela tshipi ya GPS ka galaseng ya jini pele ga ge o mo gogela ka gare.',
    tn: 'O tlosolola seromamowa sa gagwe mme o latlhela tshipi ya GPS mo galaseng ya jini pele o mo gogela ka fa gare.',
    ts: 'U susumuta xiphemu xa rhadiyo ya yena kutani u lahlela chip ya GPS enghilazini ya jini u nga si n\'wi kokele endzeni.',
    ss: 'Ususa siboshwa semoya wakhe bese uphonsa i-chip ye-GPS engilazini ye-jini ngaphambi kwekutsi umdvonsele ngakhatsi.',
    ve: 'Ni bvisa khavha ya radziyo yawe nahone na posa tshipi ya GPS kha girasi ya jini musi ni sa athu mu kokodzela nga ngomu.'
  },
  'prologue.log.clear_alley': {
    xh: 'Uskena umgca ophahleni onethayo—azikho iilaser okanye iiGolf ezingaphawulwanga okwangoku—uze umbheke esofeni.',
    st: 'O lekola mohala oa marulelo a nang le pula—ha ho mahlaseli a laser kapa Likoloi tsa Golf tse sa tšoauoang hajoale—\'me o mo hulela sofeng.',
    nso: 'O lebelela bogodimo bja marulelo a nago le pula—ga go na di-laser goba di-Golf tšeo di se nago maswao gabjale—gomme o mo gogela sofeng.',
    tn: 'O sekaseka godimo ga marulelo a pula—ga go na marang a laser kgotsa Dikoloi tsa Golf tse di sa tshwaiwang jaanong—mme o mo gogela mo sofeng.',
    ts: 'U kambisisa laha henhla ka lebyeni ro tala—a ku na swirhumiwa swa laser kumbe ti-Golf to ka ti nga tiviwiki—kutani u n\'wi kokela eka sofa.',
    ss: 'Uhlola luphahla lolunemvula—kute i-laser nobe ti-Golf letingakavunyelwa kwanyalo—bese umdvonsela esofeni.',
    ve: 'Ni lavhelesa ntha ha thakha dzo neliwaho nga mvula—a hu na dzo-laser kana dzi-Golf dzi si na tshiga zwazwino—nahone na mu kokodzela kha sofa.'
  }
};

for (const lang of languages) {
  const filePath = path.join(i18nDir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  let addedCount = 0;
  for (const [key, translations] of Object.entries(newKeys)) {
    if (!data[key]) {
      data[key] = translations[lang] || translations.en;
      addedCount++;
    }
  }

  for (const [key, translations] of Object.entries(missingPrologueKeys)) {
    if (!data[key] && translations[lang]) {
      data[key] = translations[lang];
      addedCount++;
    }
  }

  // Write sorted keys for clean diff
  const sorted = {};
  for (const k of Object.keys(data).sort()) {
    sorted[k] = data[k];
  }

  fs.writeFileSync(filePath, JSON.stringify(sorted, null, 2), 'utf-8');
  console.log(`Updated ${lang}.json: added ${addedCount} keys, total keys now: ${Object.keys(sorted).length}`);
}
