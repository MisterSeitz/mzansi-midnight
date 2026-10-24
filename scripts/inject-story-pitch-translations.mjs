import fs from 'fs';
import path from 'path';

const DICT_DIR = path.resolve('data/i18n');
const LANGS = ['en', 'af', 'zu', 'xh', 'st', 'nso', 'tn', 'ts', 'ss', 've'];

const STORY_PITCH_TRANSLATIONS = {
  'intro.pitch_story2': {
    en: 'Strategic destruction of Eskom power generation to force emergency open-cycle gas turbine diesel tenders, bankrolled by private security oligarchs and corrupt cabinet insiders. Disgraced SIU investigator Kagiso "Bra K" Molefe must penetrate Johannesburg\'s deepest mine shafts and Sandton penthouses before the grid collapses.',
    af: 'Strategiese vernietiging van Eskom-kragopwekking om nood-dieseltenders af te dwing, gefinansier deur private sekuriteits-oligarge en korrupte kabinetslede. Geskorste SIU-ondersoeker Kagiso "Bra K" Molefe moet Johannesburg se diepste mynskagte en Sandton-dakwoonstelle binnedring voor die netwerk ineenstort.',
    zu: 'Ukubhujiswa kwamasu kokuphehlwa kukagesi kwa-Eskom ukuze kuphoqelelwe amathenda kadizili aphuthumayo, exhaswe ngemali ongxiwankulu bezokuphepha kanye nongqongqoshe abakhohlakele. Umcwaningi we-SIU uKagiso "Bra K" Molefe kumele angene emigodini ejulile yaseGoli nasemakamelweni aseSandton ngaphambi kokuba ugesi uwe.',
    xh: 'Ukutshatyalaliswa kobuchule bokuveliswa kombane e-Eskom ukunyanzelisa iithenda zikadizili zikaxakeka, ezixhaswa ngoonongxowankulu bezokhuseleko nabaphathiswa abakhohlakeleyo. Umphandi we-SIU uKagiso "Bra K" Molefe kufuneka angene kwimingxuma enzulu yaseGoli nakwizindlu zaseSandton phambi kokuba uthungelwano luwe.',
    st: 'Pshatlo ea maano ea ho fehla motlakase ea Eskom ho qobella lithendara tsa diesel tsa tšohanyetso, tse tšehelitsoeng ka lichelete ke bo-rakhoebo ba tšireletso le matona a bolotsana. Mofuputsi oa SIU Kagiso "Bra K" Molefe o tlameha ho kenella mekoting e tebileng ea merafo ea Johannesburg le matlong a majabajaba a Sandton pele marang-rang a putlama.',
    nso: 'Tshenyo ya maano ya go tšweletša mohlagase ya Eskom go gapeletša dithendara tša tšhoganetšo tša diesel, tšeo di thekgwago ke bo-ramakgwebo ba tšhireletšo le matona a bomenetši. Monyakišiši wa SIU Kagiso "Bra K" Molefe o swanetše go tsena ka meleteng e tseneletšego ya meepo ya Johannesburg le dintlong tša Sandton pele marangrang a wela fase.',
    tn: 'Tshenyo ya maano ya go tlhagisa motlakase ya Eskom go pateletsa dithendara tsa tshaoganyetso tsa diesel, tse di tshegeditsweng ke borakgwebo ba tshireletso le ditona tsa tshenyetso-setshaba. Mmatlisisi wa SIU Kagiso "Bra K" Molefe o tshwanetse go tsena mo meleteng e e boteng ya meepo ya Johannesburg le matlong a Sandton pele mafaratlhatlha a gosomana.',
    ts: 'Ku onhiwa ka maano ka ku humesiwa ka gezi ra Eskom ku sindzisa tithendara ta dizili ta xihatla, leti seketeriwaka hi van’wamabindzu va vuhlayiseki na va-minista va vukungundzwana. Mulavisisi wa SIU Kagiso "Bra K" Molefe u fanele ku nghena emikotini yo enta ya migodi ya Johannesburg na tindlu ta Sandton gezi ri nga si wa.',
    ss: 'Kupheliswa kwemachinga kwekuphehlwa kwegezi kwa-Eskom kute kuphocelelwe emathenda ladzingekako adizili, laxhaswe ngemali ngongxiwankulu betekuphepha kanye nebaphatsi labakhohlakele. Umcwaningi we-SIU uKagiso "Bra K" Molefe kumele angene emigodzini lejulile yaseGoli nasemakamelweni laseSandton ngaphambi kwekutsi gezi liwe.',
    ve: 'U tshinywa ha maano a u bveledza mudagasi ha Eskom u kombetshedza thendara dza dzidizili dza tshihutwane, dzine dza khou tikedzwa nga vho-ramabindu vha tsireledzo na vha-minisita vha vhutsila. Musedzulusi wa SIU Kagiso "Bra K" Molefe u tea u dzhena migodini yo dzenaho ya Johannesburg na dzindluni dza Sandton mudagasi u sa athu wa.',
  },
  'intro.pitch_story3': {
    en: 'Unregistered seabed diamond-dredging concessions, cross-border arms drops, and private naval mercenaries laundering energy cash into international conflict stones across the fog-shrouded Atlantic coastline of Port Nolloth and the Richtersveld.',
    af: 'Ongeregistreerde seebodem-diamantbaggerkonsessies, oorgrens-wapenaflewerings, en private vloot-huursoldate wat energiegeld was in internasionale konflikstene langs die mistige Atlantiese kuslyn van Port Nolloth en die Richtersveld.',
    zu: 'Izimvume ezingabhalisiwe zokumba amadayimane olwandle, ukudonswa kwezikhali emngceleni, kanye namasosha emikhumbi azimele ageza imali yamandla abe ngamatshe ezingxabano zamazwe ngamazwe ngasogwini lwase-Atlantic olugcwele inkungu e-Port Nolloth nase-Richtersveld.',
    xh: 'Iimvume ezingabhaliswanga zokombiwa kwedayimane phantsi kolwandle, ukuthunyelwa kwezixhobo ezinqumla imida, kunye namajoni olwandle abucala ahlamba imali yamandla kumatye eembambano zamazwe ngamazwe kunxweme lwe-Atlantic olunesiphango e-Port Nolloth nase-Richtersveld.',
    st: 'Litokelo tse sa ngolisoang tsa ho cheka litaemane botebong ba leoatle, thepa ea libetsa e tšelang meeli, le bahlabani ba likepe tsa poraefete ba hlatsoang chelete ea matla hore e be majoe a likhohlano tsa machaba lebopong la Atlantic le koahetsoeng ke moholi la Port Nolloth le Richtersveld.',
    nso: 'Ditumelelo tša go se ngwadišwe tša go epa ditaemane fase ga lewatle, go fetišetšwa ga dibetša mellwaneng, le bahlabani ba dikepe tša sephiri bao ba hlatswago tšhelete ya maatla go ba maswika a diphapano tša boditšhabatšhaba lebopong la Atlantic la go aparetswe ke mouwane la Port Nolloth le Richtersveld.',
    tn: 'Ditetlelelo tse di sa kwadisiwang tsa go epa ditaemane mo botebong jwa lewatle, go tlisiwa ga dibetsa go kgabaganya melelwane, le masole a dikepe tsa sephiri a a phepafatsang madi a maatla go nna majwe a kgotlhang ya boditshabatshaba mo lotshitshing lwa Atlantic lo lo aparetsweng ke mouwane kwa Port Nolloth le Richtersveld.',
    ts: 'Timbuyelo leti nga tsarisiwangiki to cela tidayimani ehansi ka lwandle, ku yisiwa ka matlhari eka mindzilikano, na masocha ya le matini ya phurayivhete lama hlantswaka mali ya matimba ma va maribye ya timholovo ta matiko hinkwawo eribuweni ra Atlantic leri funengetiwaka hi hunguva ePort Nolloth na Richtersveld.',
    ss: 'Timvumo letingakabhaliswa tekumba emadayimane elwandle, kutfunyelwa kwetikhali emnceleni, kanye nemabutfo emikhumbi labucala labalungisa imali yemandla ibe ngematje etimphi tamhlaba wonkhe elugwini lwase-Atlantic lolunenkungu e-Port Nolloth nase-Richtersveld.',
    ve: 'Pheshembulwani dzi songo ṅwaliswaho dza u bwa dzaemane fhasi ha lwanzhe, u rumelwa ha zwihali mulanoni, na maswole a lwanzheni a phuraivethe ane a khou thaphudza tshelede ya mafulufulu u vha matombo a dzinndwa dza dzitshaka lutshengoni lwa Atlantic lwo dalaho khuli lwa Port Nolloth na Richtersveld.',
  },
  'intro.pitch_story4': {
    en: 'A shadow alliance of provincial police generals, unified Cape Flats gang cartels, and historic Winelands oligarchs arming a private security army to control the night economy and export docks. Former Anti-Gang Unit detective Leila Hendricks investigates from Camps Bay to the Stellenbosch cellars.',
    af: '’n Skadu-alliansie van provinsiale polisie-generaals, verenigde Kaapse Vlakte-bende-kartelle, en historiese Wynland-oligarge wat ’n private sekuriteitleër bewapen om die nag-ekonomie en uitvoerdokke te beheer. Voormalige Anti-Bende-eenheid-speurder Leila Hendricks ondersoek van Kampsbaai tot die Stellenbosch-kelders.',
    zu: 'Umfelandawonye oyisithunzi wojenene bamaphoyisa esifundazwe, amaviyo ezigebengu ase-Cape Flats ahlangene, nongxiwankulu base-Winelands abahlomisa ibutho lezokuphepha elizimele ukuze balawule umnotho wasebusuku namadokodo okuthutha. Owayengumsentshisi we-Anti-Gang Unit u-Leila Hendricks uphenya kusukela e-Camps Bay kuya ezindaweni zewayini e-Stellenbosch.',
    xh: 'Umdibaniso ofihlakeleyo weejeneyali zamapolisa zephondo, imibutho yamagela e-Cape Flats emanyeneyo, kunye noonongxowankulu bembali base-Winelands abaxhoba umkhosi wokhuseleko wabucala ukulawula uqoqosho lwasebusuku kunye namazibuko othumelo. Owayesakuba ngumcuphi we-Anti-Gang Unit u-Leila Hendricks uphanda ukusuka e-Camps Bay ukuya kwiindawo zewayini zase-Stellenbosch.',
    st: 'Kopano ea moriti ea balaoli ba sepolesa sa provense, mekhatlo e kopaneng ea likhukhuni tsa Cape Flats, le bo-rakhoebo ba nalane ba Winelands ba hlometseng lebotho la tšireletso la poraefete ho laola moruo oa bosiu le likou tsa thomello. Detective ea khale ea Anti-Gang Unit Leila Hendricks o batlisisa ho tloha Camps Bay ho isa libakeng tsa veine tsa Stellenbosch.',
    nso: 'Kopano ya moriti ya balaodi ba maphodisa a selete, dihlopha tše di kopanego tša disenyi tša Cape Flats, le bo-ramakgwebo ba histori ba Winelands bao ba hlomago mašole a tšhireletšo ya sephiri go laola ekonomi ya bošego le maemelakepe a go romela ntle. Mofepi wa kgale wa Sehlopha sa go Lwantšha Digwera Leila Hendricks o nyakišiša go tloga Camps Bay go fihla mafelong a beine a Stellenbosch.',
    tn: 'Kopano ya moriti ya balaodi ba mapodisi a kgaolo, ditlhopha tse di kopaneng tsa dirukhutlhi tsa Cape Flats, le borakgwebo ba hisitori ba Winelands ba ba tlamelang sesole sa tshireletso sa poraefete ka dibetsa go laola itsholelo ya bosigo le maemelakepe a go romela kwa ntle. Mmatlisisi wa pele wa Yuniti ya Kgatlhanong le Dirukhutlhi Leila Hendricks o batlisisa go tswa Camps Bay go ya mafelong a beine a Stellenbosch.',
    ts: 'Nhlangano ya xihundla ya ti-general ta maphorisa ya xifundzha, mintlawa leyi hlanganeke ya vugevenga bya Cape Flats, na van’wamabindzu va vhinyo va ndhavuko lava hlomisaka vuthu ra vuhlayiseki ra phurayivhete ku lawula ikhonomi ya vusiku na madoko yo rhumela handle. Mutektivhe wa khale wa Yuniti yo Lwisana na Mintlawa Leila Hendricks u lavisisa ku suka eCamps Bay ku fika etindlwini ta vhinyo ta Stellenbosch.',
    ss: 'Umfelandzawonye lofihlakele wabojenene bamaphoyisa esifundza, emacembu ezigebengu lase-Cape Flats lahlangene, kanye nabosigwaca base-Winelands labahlomisa libutfo letekuphepha lelibucala kute balawule umnotfo wasebusuku kanye nematiko ekutfumela ngaphandle. Lomseshi wakadzala we-Anti-Gang Unit u-Leila Hendricks uphenya kusukela e-Camps Bay kuya etindzaweni teliwayini e-Stellenbosch.',
    ve: 'Mbofho ya tshiphiri ya dzigenerala dza mapholisa a vundu, zwigwada zwo ṱanganelanaho zwa zwigevhenga zwa Cape Flats, na vho-ramabindu vha divhalesaho vha Winelands vhane vha khou ṱhoma mmbi ya tsireledzo ya phuraivethe u langa ikonomi ya vhusiku na vhuimamalavhu ha u rumela nnda. Muṱoli wa kale wa Yuniti ya u Lwa na Zwigwada Leila Hendricks u sedzulusa u bva Camps Bay u swika zwititshini zwa waini zwa Stellenbosch.',
  },
  'intro.pitch_story5': {
    en: 'Total Stage 8 Black-Sky Grid Collapse across all nine provinces. The United Hawks Taskforce unifies the four regional forensic keystones to storm the Sovereign Octagon summit in the Drakensberg before democracy is permanently dissolved.',
    af: 'Totale Fase 8 Donkerhemel-Kragnetwerk Ineenstorting oor al nege provinsies. Die Verenigde Valke Taakmag verenig die vier streek- forensiese sleutelstene om die Soewereine Oktagoon beraad in die Drakensberg te bestorm voor demokrasie permanent ontbind word.',
    zu: 'Ukuwa Okuphelele Kwe-Stage 8 Kagesi Kuso Sonke Isifunda Eziyisishiyagalolunye. Ithimba Elihlanganisiwe Le-Hawks lihlanganisa amadokhumenti abalulekile amane esifunda ukuze lihlasele umhlangano we-Sovereign Octagon e-Drakensberg ngaphambi kokuba intando yeningi ichithwe unomphela.',
    xh: 'Ukuwa Okupheleleyo Kwethungelwano Lombane Lwe-Stage 8 Kuwo Onke Amaphondo Asithoba. Iqela Elihlanganisiweyo Le-Hawks limanyanisa amadokhumenti amane abalulekileyo ommandla ukuhlasela ingqungquthela ye-Sovereign Octagon e-Drakensberg phambi kokuba idemokhrasi ichithwe unaphakade.',
    st: "Ho Putlama ho Feletseng ha Marang-rang a Motlakase a Boemo ba 8 ho pholletsa le liprovense tsohle tse robong. Sehlopha se Kopaneng sa Hawks se kopanya litsela tse 'ne tsa bohlokoa tsa meralo ea libaka ho hlasela seboka sa Sovereign Octagon Drakensberg pele demokrasi e felisoa ka ho sa feleng.",
    nso: 'Go Wela fase ka Botlalo ga Marangrang a Mohlagase a Kgato ya 8 go ralala le diprofense ka moka tše senyane. Sehlopha se Kopanego sa Hawks se kopanya maswika a bohlokwa a mane a selete a dinyakišišo go hlasela kopano ya godimo ya Sovereign Octagon go la Drakensberg pele temokrasi e phumolwa go ya go ile.',
    tn: 'Go Gosomana go go Feletseng ga Mafaratlhatlha a Motlakase a Mogato wa 8 mo diprofenseng tsotlhe tse robongwe. Setlhopha se se Kopaneng sa Hawks se kopanya dikwalo tse nne tsa botlhokwa tsa kgaolo go thapa bokopano jwa Sovereign Octagon kwa Drakensberg pele ga puso ya batho ka batho e phimolwa ruri.',
    ts: 'Ku Wa Hi ku Hetiseka ka Gezi ra Xiteji xa 8 eka swifundzha hinkwaswo swa kaye. Ntlawa lowu Hlanganeke wa Hawks wu hlanganisa matsalwa ya mune ya nkoka ya swifundzha ku hlasela nhlengeletano ya xiyimo xa le henhla ya Sovereign Octagon eDrakensberg temokrasi yi nga si herisiwa hi ku helela.',
    ss: 'Kuphela Lokuphelele Kwegezi Lesigaba 8 kuto tonkhe tifundza letiyimfica. Ithimba Lelihlangene Le-Hawks lihlanganisa tinhlavu letine letibalulekile tasesifundzeni kute lihhasele umhlangano wemgwaco we-Sovereign Octagon e-Drakensberg ngaphambi kwekutsi intsandvo yelinyenti ivalwe phakadze.',
    ve: 'U Dzima ho Fhelelaho ha Netiweke ya Mudagasi ha Tshiteji tsha 8 kha mavundu oṱhe a ṱahe. Tshumisano ya Hawks i ṱanganya matombo mana a ndeme a dzingu a mufhedziso u dzhia muṱangano muhulwane wa Sovereign Octagon Drakensberg themokhirasi i sa athu fheliswa tshoṱhe.',
  },
  'campaign.active_story_label': {
    en: 'SELECT STORY:',
    af: 'KIES STORIE:',
    zu: 'KHETHA INDABA:',
    xh: 'KHETHA IBHAYI:',
    st: 'KHETHA PALE:',
    nso: 'KGETHA KANEGELO:',
    tn: 'TLHOPHA PALE:',
    ts: 'HLAPHA NTSIKETO:',
    ss: 'KHETHA INDZABA:',
    ve: 'NANGANI TSHITORI:',
  },
};

for (const lang of LANGS) {
  const filePath = path.join(DICT_DIR, `${lang}.json`);
  if (!fs.existsSync(filePath)) continue;

  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  let count = 0;

  for (const [key, translations] of Object.entries(STORY_PITCH_TRANSLATIONS)) {
    if (translations[lang]) {
      content[key] = translations[lang];
      count++;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf-8');
  console.log(`Updated ${lang}.json with ${count} story pitch translations.`);
}

console.log('Story pitch translation injection complete.');
