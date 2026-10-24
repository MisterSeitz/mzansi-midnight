// scripts/inject-prologue-backgrounds.mjs
import fs from 'fs';
import path from 'path';

const I18N_DIR = path.resolve('data/i18n');

const TRANSLATIONS = {
  en: {
    "prologue.select_this_bg": "Select This Background",
    "prologue.choose_bg": "Select",
    "prologue.chosen_path": "Selected Path",
    "prologue.select_bg_prompt": "Click a path to review dossier & select your background",
    "bg.forensic_hawk.title": "The Paper-Trail Auditor",
    "bg.forensic_hawk.former_unit": "DPCI (Hawks) Serious Commercial Crime Unit",
    "bg.forensic_hawk.tagline": "You follow the Rands through shell companies and municipal tenders.",
    "bg.forensic_hawk.desc": "Brigadier Mokoena framed you when your audit of municipal water-tanker contracts got too close to City Hall. You cannot fight a hit squad head-on, but give you a ledger and a magistrate clerk, and you can bring down an empire.",
    "bg.trt_breacher.title": "The Burned Enforcer",
    "bg.trt_breacher.former_unit": "SAPS Tactical Response Team (TRT) — Detached to Hawks",
    "bg.trt_breacher.tagline": "You know how Mokoena’s hit squads operate because you used to lead one.",
    "bg.trt_breacher.desc": "You kicked down doors from KwaMashu to the Point until you refused an order to stage a shootout at Pier 2. Every taxi boss and station commander knows your face—and respects your trigger discipline.",
    "bg.crime_intel.title": "The Ghost Wiretapper",
    "bg.crime_intel.former_unit": "Crime Intelligence Signals & Covert Surveillance",
    "bg.crime_intel.tagline": "Cell-tower dumps, cloned transponders, and off-the-record blackmail.",
    "bg.crime_intel.desc": "You lived in the back of an unmarked panel van listening to cartel bosses whisper to city councillors. When someone wiped the central server and pinned the leak on you, you kept backup drives hidden across the CBD.",
    "pnode_opt.pick_forensic.label": "Select Background: The Paper-Trail Auditor (+2 Dockets, +1 Influence)",
    "pnode_opt.pick_breacher.label": "Select Background: The Burned Enforcer (+2 Street, +1 Dockets)",
    "pnode_opt.pick_intel.label": "Select Background: The Ghost Wiretapper (+2 Wire, +1 Influence)"
  },
  af: {
    "prologue.select_this_bg": "Kies Hierdie Agtergrond",
    "prologue.choose_bg": "Kies",
    "prologue.chosen_path": "Gekose Pad",
    "prologue.select_bg_prompt": "Klik op 'n pad om die dossier te hersien & jou agtergrond te kies",
    "bg.forensic_hawk.title": "Die Ouditeur van die Papier-spoor",
    "bg.forensic_hawk.former_unit": "DPCI (Valke) Eenheid vir Ernstige Handelsmisdaad",
    "bg.forensic_hawk.tagline": "Jy volg die Rande deur dekmaatskappye en munisipale tenders.",
    "bg.forensic_hawk.desc": "Brigadier Mokoena het jou ingelê toe jou oudit van munisipale watertenkwa-kontrakte te naby aan die Stadsaal gekom het. Jy kan nie 'n sluipmoordbende regstreeks beveg nie, maar gee jou 'n grootboek en 'n landdrosklerk, en jy kan 'n ryk laat val.",
    "bg.trt_breacher.title": "Die Gebrande Toepasser",
    "bg.trt_breacher.former_unit": "SAPD Taktiese Reaksiespan (TRT) — Afgevaardig na Valke",
    "bg.trt_breacher.tagline": "Jy weet hoe Mokoena se sluipmoordbendes funksioneer omdat jy vroeër een gelei het.",
    "bg.trt_breacher.desc": "Jy het deure oopgeskop van KwaMashu tot by die Point totdat jy geweier het om 'n skietgeveg by Pier 2 op te dis. Elke taxibaas en stasiebevelvoerder ken jou gesig—en respekteer jou snellerdissipline.",
    "bg.crime_intel.title": "Die Spook-Afluisteraar",
    "bg.crime_intel.former_unit": "Misdaadintelligensie Seine & Geheime Toesig",
    "bg.crime_intel.tagline": "Selfoonmas-stortings, gekloonde transponders, en buite-die-rekord afpersing.",
    "bg.crime_intel.desc": "Jy het agterin 'n ongemerkte paneelwa gewoon terwyl jy geluister het na kartelbase wat met stadsraadslede fluister. Toe iemand die sentrale bediener uitgewis en die lek op jou geplaas het, het jy rugsteunskywe regoor die middestad versteek gehou.",
    "pnode_opt.pick_forensic.label": "Kies Agtergrond: Die Ouditeur van die Papier-spoor (+2 Dossiers, +1 Invloed)",
    "pnode_opt.pick_breacher.label": "Kies Agtergrond: Die Gebrande Toepasser (+2 Straat, +1 Dossiers)",
    "pnode_opt.pick_intel.label": "Kies Agtergrond: Die Spook-Afluisteraar (+2 Draad, +1 Invloed)"
  },
  zu: {
    "prologue.select_this_bg": "Khetha Lesi Simo",
    "prologue.choose_bg": "Khetha",
    "prologue.chosen_path": "Indlela Ekhethiwe",
    "prologue.select_bg_prompt": "Chofoza indlela ukuze ubuyekeze ifayela & ukhethe isimo sakho",
    "bg.forensic_hawk.title": "Umcwaningi Wamacala Emali",
    "bg.forensic_hawk.former_unit": "DPCI (Oklebe) Uphiko Lwezobugebengu Bezohwebo Olubucayi",
    "bg.forensic_hawk.tagline": "Ulandela amaRandi ezinkampanini ezingamambuka nakumathenda kamasipala.",
    "bg.forensic_hawk.desc": "UBhBrigadiye Mokoena wakubeka icala ngamanga ngesikhathi ukuhlolwa kwakho kwamathangi amanzi kamasipala kusondela kakhulu eHholo Ledolobha. Awukwazi ukulwa nethimba lababulali ubuso nobuso, kodwa uma unikezwe ibhuku lezimali nomabhalane wenkantolo, ungabhidliza umbuso wonke.",
    "bg.trt_breacher.title": "Umphoqeleli Oshile",
    "bg.trt_breacher.former_unit": "SAPS Ithimba Lokusabela Ngokushesha (TRT) — Ehlukaniselwe Oklebe",
    "bg.trt_breacher.tagline": "Uyazi ukuthi amabutho kaMokoena asebenza kanjani ngoba wawuhola elilodwa lawo.",
    "bg.trt_breacher.desc": "Wadilizela iminyango kusukela KwaMashu kuya ePoint waze wenqaba umyalo wokuhlela ukudubulana ePier 2. Bonke abaphathi bamatekisi nabaphathi beziteshi bayabazi ubuso bakho—futhi bahlonipha ukukhalipha kwesibhamu sakho.",
    "bg.crime_intel.title": "Umhloli Wezingcingo Zomshoshaphansi",
    "bg.crime_intel.former_unit": "Uphiko Lwezobunhloli Bezobugebengu Nemiyalezo Eyimfihlo",
    "bg.crime_intel.tagline": "Ukwelashwa kwemibhoshongo yamaselula, ama-transponder mbumbulu, nokusabisa okungekho emthethweni.",
    "bg.crime_intel.desc": "Wawuhlala ngemuva kweveni elingenamphawulo ulalele abaphathi bezigelekeqe behlebezela amakhansela edolobha. Ngesikhathi othile ecisha iseva enkulu wasolwa wena ngalokho, wagcina amadrayivu ayisipele efihliwe kuyo yonke i-CBD.",
    "pnode_opt.pick_forensic.label": "Khetha Isimo: Umcwaningi Wamacala Emali (+2 Amadokhumenti, +1 Ithonya)",
    "pnode_opt.pick_breacher.label": "Khetha Isimo: Umphoqeleli Oshile (+2 Isitaladi, +1 Amadokhumenti)",
    "pnode_opt.pick_intel.label": "Khetha Isimo: Umhloli Wezingcingo Zomshoshaphansi (+2 Ucingo, +1 Ithonya)"
  },
  xh: {
    "prologue.select_this_bg": "Khetha Esi Simo",
    "prologue.choose_bg": "Khetha",
    "prologue.chosen_path": "Indlela Ekhethiweyo",
    "prologue.select_bg_prompt": "Cofa indlela ukuze uphonononge ifayile & ukhethe imvelaphi yakho",
    "bg.forensic_hawk.title": "Umphicothi-zincwadi Wezemali",
    "bg.forensic_hawk.former_unit": "DPCI (OoKhozi) Icandelo Lolwaphulo-mthetho Lwezorhwebo",
    "bg.forensic_hawk.tagline": "Ulandela iiRandi kwiinkampani ezingamakhaka nakwiithenda zikamasipala.",
    "bg.forensic_hawk.desc": "UBrigadier Mokoena wakutyhola ngobuxoki xa uphicotho lwakho lweetanki zamanzi lwasondela eHolo yeDolophu. Awukwazi ukulwa neqela lababulali ngqo, kodwa ukuba unikezwe ileja nonobhala wenkundla, ungawisa ubukhosi bonke.",
    "bg.trt_breacher.title": "Umnyanzelisi Otshileyo",
    "bg.trt_breacher.former_unit": "SAPS Iqela Lokuphendula Ngobuchule (TRT) — Elithunyelwe kuoKhozi",
    "bg.trt_breacher.tagline": "Uyazi indlela asebenza ngayo amagosa kaMokoena ngoba wakha wakhokela elinye lawo.",
    "bg.trt_breacher.desc": "Waqhekeza iingcango ukusuka eKwaMashu ukuya ePoint wada wala umyalelo wokwenza idabi lokudubula ePier 2. Wonke umphathi weeteksi nomphathi wesitishi uyabazi ubuso bakho—kwaye bayakuhlonipha ukubamba kwakho umpu.",
    "bg.crime_intel.title": "Umphulaphuli Weentsimbi Womthunzi",
    "bg.crime_intel.former_unit": "Icandelo Lezobuntlola Nobufihlo Bezobugebengu",
    "bg.crime_intel.tagline": "Ulwazi lweminqaba yefowuni, ii-transponder zomgunyathi, nokutyekezelisa ngasese.",
    "bg.crime_intel.desc": "Wawuhlala ngasemva kwiveni engaphawulwanga uphulaphule iintloko zamaphukuphuku zisebeza kumakhansela edolophu. Xa umntu othile wacima iseva enkulu waza watyhola wena, wagcina iidrayivu ezifihliweyo kwi-CBD iphela.",
    "pnode_opt.pick_forensic.label": "Khetha Imvelaphi: Umphicothi-zincwadi Wezemali (+2 Amaxwebhu, +1 Impembelelo)",
    "pnode_opt.pick_breacher.label": "Khetha Imvelaphi: Umnyanzelisi Otshileyo (+2 Isitrato, +1 Amaxwebhu)",
    "pnode_opt.pick_intel.label": "Khetha Imvelaphi: Umphulaphuli Weentsimbi Womthunzi (+2 Ucingo, +1 Impembelelo)"
  },
  st: {
    "prologue.select_this_bg": "Kgetha Semelo Sena",
    "prologue.choose_bg": "Kgetha",
    "prologue.chosen_path": "Tsela e Kgethilweng",
    "prologue.select_bg_prompt": "Tobetsa tsela ho hlahloba faele & ho kgetha semelo sa hao",
    "bg.forensic_hawk.title": "Mohlahlobi wa Ditokomane tsa Ditjhelete",
    "bg.forensic_hawk.former_unit": "DPCI (Mankwe) Karolo ya Ditlolo tsa Molao wa Kgwebo",
    "bg.forensic_hawk.tagline": "O latela diRanta ka dikhamphani tsa bohata le dithendara tsa masepala.",
    "bg.forensic_hawk.desc": "Molaodi Mokoena o ile a o etselletsa ha tlhahlobo ya hao ya ditanka tsa metsi e atamela haholo Holong ya Toropo. O ke ke wa lwantsha sehlopha sa babolai sefahleho le sefahleho, empa fa mohlalosi dibuka tsa ditjhelete le tlelereke ya lekgotla, mme o ka diha mmuso ohle.",
    "bg.trt_breacher.title": "Moqobelli ya Tjheleng",
    "bg.trt_breacher.former_unit": "SAPS Sehlopha sa Boiketsetso ba Maqheka (TRT) — Se kgomareditsweng ho Mankwe",
    "bg.trt_breacher.tagline": "O tseba kamoo dihlopha tsa Mokoena di sebetsang kateng hobane o kile wa etella pele se seng sa tsona.",
    "bg.trt_breacher.desc": "O ile wa qhaqha menyako ho tloha KwaMashu ho ya Fihla Point ho fihlela o hana taelo ya ho qapa thunya Pier 2. Monghadi e mong le e mong wa ditekesi le molaodi wa seteishene o tseba sefahleho sa hao—mme ba hlompha taolo ya hao ya sethunya.",
    "bg.crime_intel.title": "Mohloli wa Mehala wa Sepoko",
    "bg.crime_intel.former_unit": "Bohlale ba Ditlolo tsa Molao Matshwao le Tlhokomelo e Sephiri",
    "bg.crime_intel.tagline": "Meqomo ya ditora tsa mehala, di-transponder tsa bohata, le kotsi e se nang rekoto.",
    "bg.crime_intel.desc": "O ne o dula ka morao ho vene e se nang matshwao o mametse marena a dikarteli a hweshetsa ho makhanselara a toropo. Ha motho e mong a hlakola seva e kgolo mme a beha molato ho wena, o ile wa boloka disebediswa tsa tshireletso di patilwe hohle CBD.",
    "pnode_opt.pick_forensic.label": "Kgetha Semelo: Mohlahlobi wa Ditokomane tsa Ditjhelete (+2 Ditokomane, +1 Tshutsumetso)",
    "pnode_opt.pick_breacher.label": "Kgetha Semelo: Moqobelli ya Tjheleng (+2 Seterata, +1 Ditokomane)",
    "pnode_opt.pick_intel.label": "Kgetha Semelo: Mohloli wa Mehala wa Sepoko (+2 Terata, +1 Tshutsumetso)"
  },
  nso: {
    "prologue.select_this_bg": "Kgetha Bokamorago Bjo",
    "prologue.choose_bg": "Kgetha",
    "prologue.chosen_path": "Tsela ye e Kgethilwego",
    "prologue.select_bg_prompt": "Kgotla tsela go lekola faele & go kgetha bokamorago bja gago",
    "bg.forensic_hawk.title": "Mohlakiši wa Mehlala ya Mangwalo",
    "bg.forensic_hawk.former_unit": "DPCI (Dihlodi) Yuniti ya Bosenyi bja Kgwebo bjo Bogolo",
    "bg.forensic_hawk.tagline": "O latela diRanta ka dikhamphani tša maaka le dithendara tša mmasepala.",
    "bg.forensic_hawk.desc": "Mokoloneli Mokoena o go lwešitše ge thakišo ya gago ya ditanka tša meetse tša mmasepala e be e batamelaholo Holong ya Toropo. O ka se lwe le sehlopha sa babolayi ka thwii, eupša ge o neilwe puku ya ditšhelete le klereke ya maseterata, o ka wiša mmušo ka moka.",
    "bg.trt_breacher.title": "Moapeledi yo a Tšhelego",
    "bg.trt_breacher.former_unit": "SAPS Sehlopha sa Karabelo ya Maano (TRT) — Se Abetšwego Dihlodi",
    "bg.trt_breacher.tagline": "O tseba ka fao dihlopha tša polao tša Mokoena di šomago ka gona ka gobane o kile wa etelela pele se sengwe sa tšona.",
    "bg.trt_breacher.desc": "O pšhatlile mejako go tloga KwaMashu go ya Point go fihlela o gana taelo ya go rulaganya thunyo go Pier 2. Mong wa dithekisi yo mongwe le yo mongwe le molaodi wa seteishene o tseba sefahlego sa gago—ebile ba hlompha taolo ya gago ya sethunya.",
    "bg.crime_intel.title": "Motheetši wa Mehala wa Sepoko",
    "bg.crime_intel.former_unit": "Bohlale bja Bosenyi Matshwao le Tlhokomelo ya Sephiri",
    "bg.crime_intel.tagline": "Ditlhokomelo tša ditora tša difouno, di-transponder tša maaka, le go gapeletša go sego molaong.",
    "bg.crime_intel.desc": "O be o dula ka morago ga bene ye e se nago maswao o theeditše balaodi ba dikatlele ba sebela makhanselara a toropo. Ge motho yo mongwe a phumola seba ye kgolo gomme a bea molato go wena, o bolokile di-hard drive tša tšhireletšo di fihlile gohle CBD.",
    "pnode_opt.pick_forensic.label": "Kgetha Bokamorago: Mohlakiši wa Mehlala ya Mangwalo (+2 Ditokomane, +1 Tutuetšo)",
    "pnode_opt.pick_breacher.label": "Kgetha Bokamorago: Moapeledi yo a Tšhelego (+2 Seterata, +1 Ditokomane)",
    "pnode_opt.pick_intel.label": "Kgetha Bokamorago: Motheetši wa Mehala wa Sepoko (+2 Mothale, +1 Tutuetšo)"
  },
  tn: {
    "prologue.select_this_bg": "Tlhopha Lemorago Leno",
    "prologue.choose_bg": "Tlhopha",
    "prologue.chosen_path": "Tsela e e Tlhophilweng",
    "prologue.select_bg_prompt": "Tobetsa tsela go tlhatlhoba faele & go tlhopha lemorago la gago",
    "bg.forensic_hawk.title": "Mosekaseki wa Motlhala wa Dipampiri",
    "bg.forensic_hawk.former_unit": "DPCI (Mankwe) Yuniti ya Bokebekwa jwa Kgwebo jo bo Masisi",
    "bg.forensic_hawk.tagline": "O sala diRanta morago ka dikhamphani tsa maaka le dithendara tsa mmasepala.",
    "bg.forensic_hawk.desc": "Mokoloneli Mokoena o go latofaditse ka maaka fa tlhatlhobo ya gago ya ditanka tsa metsi tsa mmasepala e neng e atamelaholo Holong ya Toropo. O ka se lwe le setlhopha sa babolai difatlhego di lebagane, mme fa o newa buka ya ditšhelete le mokwaledi wa kgotlatshekelo, o ka diga mmuso otlhe.",
    "bg.trt_breacher.title": "Mogapeletsi yo o Filweng Mollo",
    "bg.trt_breacher.former_unit": "SAPS Setlhopha sa Tsibogo ya Maano (TRT) — Se kopantsweng le Mankwe",
    "bg.trt_breacher.tagline": "O itse ka moo ditlhopha tsa polao tsa ga Mokoena di dirang ka gona gonne o kile wa etelela pele se sengwe sa tsone.",
    "bg.trt_breacher.desc": "O thubile ditswalo go tswa KwaMashu go ya Point go fitlhela o gana taelo ya go dira thuntshano kwa Pier 2. Mong wa dithekisi mongwe le mongwe le molaodi wa seteishene o itse sefatlhego sa gago—mme ba tlotla taolo ya gago ya sethunya.",
    "bg.crime_intel.title": "Motheetseledi wa Mehala wa Sepoko",
    "bg.crime_intel.former_unit": "Bohlale jwa Bokebekwa Matshwao le Tlhokomelo e e Sephiri",
    "bg.crime_intel.tagline": "Ditatlho tsa ditora tsa megala, di-transponder tsa maaka, le petso e e seng ya semmuso.",
    "bg.crime_intel.desc": "O ne o nna ka fa morago ga baki e e se nang letshwao o reeditse babusa-dikarteli ba seba le makhanselara a toropo. Fa mongwe a phimola seba e kgolo mme a go pega molato, o bolokile di-hard drive tsa tshireletso di fitlhwe gohle mo CBD.",
    "pnode_opt.pick_forensic.label": "Tlhopha Lemorago: Mosekaseki wa Motlhala wa Dipampiri (+2 Dikgetsi, +1 Tlhotlheletso)",
    "pnode_opt.pick_breacher.label": "Tlhopha Lemorago: Mogapeletsi yo o Filweng Mollo (+2 Mmila, +1 Dikgetsi)",
    "pnode_opt.pick_intel.label": "Tlhopha Lemorago: Motheetseledi wa Mehala wa Sepoko (+2 Mogala, +1 Tlhotlheletso)"
  },
  ts: {
    "prologue.select_this_bg": "Hlawula Ndzhaku Leyi",
    "prologue.choose_bg": "Hlawula",
    "prologue.chosen_path": "Ndlela leyi Hlawuriweke",
    "prologue.select_bg_prompt": "Tshinya ndlela ku kambela fayili & ku hlawula ndzhaku ya wena",
    "bg.forensic_hawk.title": "Mukambisisi wa Ntila wa Mapapila",
    "bg.forensic_hawk.former_unit": "DPCI (Mphungu) Yuniti ya Vugevenga bya Mabindzu lebyi Tikaka",
    "bg.forensic_hawk.tagline": "U landzelela tiRhandi eka tikhamphani ta mavunwa ni tithendara ta masipala.",
    "bg.forensic_hawk.desc": "Muphuresidente Mokoena u ku hembile loko nkambisiso wa wena wa mathangi ya mati ya masipala wu tshinele ekusuhi na Holo ya Doroba. U nge lwi na ntlawa wa vadlayi hi mahlo, kambe loko u nyikiwa rekhodo ya timali na matsalani wa khoto, u nga wisa mfumo hinkwawo.",
    "bg.trt_breacher.title": "Mulanguteri la Hisiweke",
    "bg.trt_breacher.former_unit": "SAPS Ntlawa wo Hlamula hi Maendlelo (TRT) — La Yisiweke eka Mphungu",
    "bg.trt_breacher.tagline": "Wa swi tiva leswi mintlawa ya vudlayi ya Mokoena yi tirhisaka xiswona hikuva a wu rhangela yin'wana ya yona.",
    "bg.trt_breacher.desc": "U faye minyangwa ku suka KwaMashu ku ya fika ePoint ku fikela loko u ala xileriso xo rhangela ku thuntana ePier 2. Murhangeri un'wana ni un'wana wa thekisi ni mufambisi wa xitichi wa xi tiva xikandza xa wena—naswona va xixima nkongomiso wa wena wa xibalesa.",
    "bg.crime_intel.title": "Muvutleri wa Riqingho wa Xipoko",
    "bg.crime_intel.former_unit": "Vutlhari bya Vugevenga Swikombiso ni Vulanguteri bya Xihundla",
    "bg.crime_intel.tagline": "Swipano swa swihondzo swa foni, ti-transponder ta mavunwa, ni ku chavisela loku nga riki enawini.",
    "bg.crime_intel.desc": "A wu tshama endzhaku ka vani leyi nga riki na mfungho u ri karhi u yingisela tihosi ta vugevenga ti hlevetela eka makhanselara ya doroba. Loko un'wana a sula sevha leyikulu kutani a ku hehla hi yona, u hlayisile tidrayivhu to hlayisa ti fihliwile eka CBD hinkwayo.",
    "pnode_opt.pick_forensic.label": "Hlawula Ndzhaku: Mukambisisi wa Ntila wa Mapapila (+2 Timhaka, +1 Nkucetelo)",
    "pnode_opt.pick_breacher.label": "Hlawula Ndzhaku: Mulanguteri la Hisiweke (+2 Xitarata, +1 Timhaka)",
    "pnode_opt.pick_intel.label": "Hlawula Ndzhaku: Muvutleri wa Riqingho wa Xipoko (+2 Waya, +1 Nkucetelo)"
  },
  ss: {
    "prologue.select_this_bg": "Khetsa Lesi Simo",
    "prologue.choose_bg": "Khetsa",
    "prologue.chosen_path": "Indlela Lekhetsiwe",
    "prologue.select_bg_prompt": "Cindzetela indlela kute uhlole lifayela & ukhetse simo sakho",
    "bg.forensic_hawk.title": "Umcwaningi Wetitifiketi Temali",
    "bg.forensic_hawk.former_unit": "DPCI (Mahlombe) Lophiko Lwebugebengu Betekuhweba Lobumatima",
    "bg.forensic_hawk.tagline": "Ulandzela emaRandi etinkampanini temanga nakumathenda kamasipala.",
    "bg.forensic_hawk.desc": "UBrigadier Mokoena wakubeka licala ngemanga ngesikhatsi kuhlola kwakho emathangi emanti kamasipala kusondzela eHholweni Ledolobha. Angeke ulwe nelicembu lebabulali buso nebubuso, kodvwa nangabe unikwe libhuku letimali namabhalane wenkantolo, ungawisa umbuso wonkhe.",
    "bg.trt_breacher.title": "Umphoqeleli Loshile",
    "bg.trt_breacher.former_unit": "SAPS Licembu Lekuphendvula Ngemasu (TRT) — Lelabelwe Mahlombe",
    "bg.trt_breacher.tagline": "Uyati kutsi emabutfo ekubulala aMokoena asebenta kanjani ngobe wawuhola linye lawo.",
    "bg.trt_breacher.desc": "Wadzilita iminyango kusukela KwaMashu kuya ePoint wate wala umyalo wekuhlela kudubulana ePier 2. Bonkhe baphatsi bamatekisi nebaphatsi betiteshi bayasati sibuko sakho—futhi bayasihlonipha kukhanyisa kwesibhamu sakho.",
    "bg.crime_intel.title": "Umhloli Wetintsambo Wesipoko",
    "bg.crime_intel.former_unit": "Buhloli Bwebugebengu Emasu Nekugada Kwangasese",
    "bg.crime_intel.tagline": "Kuhlolwa kwemibhoshongo yebucingo, ema-transponder mbumbulu, nekusabisa lokungekho emtfonjeni.",
    "bg.crime_intel.desc": "Wawuhlala ngemuva kweveni lengenamphawulo ulalela tinhloko tetigebengu tihleba emakhanseleni edolobha. Ngesikhatsi lomunye acisha iseva lenkhulu wasola wena, wagcina emadrayivu ekuvikela afihliwe kuyo yonkhe i-CBD.",
    "pnode_opt.pick_forensic.label": "Khetsa Simo: Umcwaningi Wetitifiketi Temali (+2 Emadokhumenti, +1 Litfonsi)",
    "pnode_opt.pick_breacher.label": "Khetsa Simo: Umphoqeleli Loshile (+2 Sitaladi, +1 Emadokhumenti)",
    "pnode_opt.pick_intel.label": "Khetsa Simo: Umhloli Wetintsambo Wesipoko (+2 Lutsambo, +1 Litfonsi)"
  },
  ve: {
    "prologue.select_this_bg": "Nangani Vhubvo Hovhu",
    "prologue.choose_bg": "Nangani",
    "prologue.chosen_path": "Ndila Yo Nangwaho",
    "prologue.select_bg_prompt": "Dzidzanyani ndila u itela u sedzulusa faela & u nanga vhubvo hanu",
    "bg.forensic_hawk.title": "Muodithi wa Vhushaka ha Maphepha",
    "bg.forensic_hawk.former_unit": "DPCI (Mavhudzi) Yuniti ya Vhutshinyi ha Mabindu vhu Lemelaho",
    "bg.forensic_hawk.tagline": "Ni tevhela dziRanda kha khamphani dza mazwifhi na thendara dza masipala.",
    "bg.forensic_hawk.desc": "Brigadier Mokoena o ni pomoka vhukhakhi musi u sedzulusa hanu ha dzi-tanker dza madi dza masipala hu tshi sendela tsini na Holo ya Dorobo. A ni koni u lwa na tshigwada tsha vhabulayi zwifhatuwo zwo livhana, fhedzi arali na newa bukhu ya masheleni na mukwaleli wa khothe, ni nga wisa muvhuso wothe.",
    "bg.trt_breacher.title": "Mupangi o Swaho",
    "bg.trt_breacher.former_unit": "SAPS Tshigwada tsha U Dzhia Vhukando ha Zwifhinga (TRT) — Tsho Rumelwaho kha Mavhudzi",
    "bg.trt_breacher.tagline": "Ni a divha uri zwigwada zwa polao zwa Mokoena zwi shuma hani ngauri no vha ni tshi rhangela tshithihi tshazwo.",
    "bg.trt_breacher.desc": "No thutha minwango u bva KwaMashu u swika Point u swikela ni tshi hana ndaela ya u dzudzanya u thuntshana kha Pier 2. Muphuresidente munwe na munwe wa thekhisi na mulanguli wa tshititshi vha a divha tshifhatuwo tshenu—nahone vha thonifha ndaela ya tshibalesa tshanu.",
    "bg.crime_intel.title": "Muthetshelesi wa Dzi-wire wa Tshipuku",
    "bg.crime_intel.former_unit": "Vhutali ha Vhutshinyi Zwiga na U Lavhelesa ha Tshiphiri",
    "bg.crime_intel.tagline": "Kudzhenelele kwa thawa dza founu, dzi-transponder dza mazwifhi, na u tshuvisa zwi si mulayoni.",
    "bg.crime_intel.desc": "No vha ni tshi dzula murahu ha veni i si na tshiga ni tshi thetshelesa vharangaphanda vha dzikharteli vha tshi hevhedza kha makhanselara a dorobo. Musi munwe a tshi phumula seva khulwane a ni pomoka zwone, no vhulunga dzi-hard drive dzo tsireledzwaho dzo tumbiswa CBD yothe.",
    "pnode_opt.pick_forensic.label": "Nangani Vhubvo: Muodithi wa Vhushaka ha Maphepha (+2 Dzi-Docket, +1 Tshanduko)",
    "pnode_opt.pick_breacher.label": "Nangani Vhubvo: Mupangi o Swaho (+2 Tshitarata, +1 Dzi-Docket)",
    "pnode_opt.pick_intel.label": "Nangani Vhubvo: Muthetshelesi wa Dzi-wire wa Tshipuku (+2 Lutingo, +1 Tshanduko)"
  }
};

let totalInjected = 0;
for (const [lang, entries] of Object.entries(TRANSLATIONS)) {
  const filePath = path.join(I18N_DIR, `${lang}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    continue;
  }
  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  let count = 0;
  for (const [k, v] of Object.entries(entries)) {
    content[k] = v;
    count++;
  }
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf-8');
  totalInjected += count;
  console.log(`Updated ${lang}.json with ${count} prologue background entries.`);
}

console.log(`Successfully injected ${totalInjected} translations across all 10 language files.`);
