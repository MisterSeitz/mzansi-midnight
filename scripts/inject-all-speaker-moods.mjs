// scripts/inject-all-speaker-moods.mjs
import fs from 'fs';
import path from 'path';

const I18N_DIR = path.resolve('data/i18n');

const MOODS_MAP = {
  "Pressing a blood-soaked gauze pad against her shoulder under the buzzing emergency LED.": {
    en: "Pressing a blood-soaked gauze pad against her shoulder under the buzzing emergency LED.",
    af: "Druk 'n bloeddeurdrenkte gaasblokkie teen haar skouer onder die gonsende nood-LED.",
    zu: "Ecindezela igazi eligcwele i-gauze pad ehlombe lakhe ngaphansi kwe-LED yesimo esiphuthumayo ebhuzayo.",
    xh: "Ecinezela igazi elizele igauze ehlombe layo phantsi kwe-LED yexesha likaxakeka ebhuzayo.",
    st: "A hatella lesela la gauze le nang le mali lehetleng la hae tlas'a LED ea tshohanyetso e llang.",
    nso: "A gateletša lešela la go tlala madi legetleng la gagwe ka tlase ga LED ya tšhoganetšo ye e dumedingo.",
    tn: "A gatelela lesela la gauze le le tletseng madi legetleng la gagwe ka fa tlase ga LED ya tshoganyetso e e dumang.",
    ts: "A tshikilela lapi ro tala ngati eka katla rakwe ehansi ka LED ya xilamulela leyi cinaka.",
    ss: "Acindzetele liduku legauze leligcwele ngati ehlombe lakhe ngaphansi kwe-LED yesimo lesiphutfumako lebhumako.",
    ve: "U kandeledza lila la gauze lo dalaho malofha fhafheni hawe fhasi ha LED ya tshifhinga tsha shango i bvumaho."
  },
  "Counting crisp hundred-Rand notes inside a parked Quantum minibus while rank marshals whistle outside.": {
    en: "Counting crisp hundred-Rand notes inside a parked Quantum minibus while rank marshals whistle outside.",
    af: "Tel vars honderd-Rand-note binne 'n geparkeerde Quantum-minibus terwyl rang-beamptes buite fluit.",
    zu: "Ebala imali ehlanzekile engamakhulu e-Rand ngaphakathi kwebhasi le-Quantum elimile ngenkathi onogada beshaya amakhwela ngaphandle.",
    xh: "Ebala imali ekrwada yamakhulu eerandi ngaphakathi kwiteksi ye-Quantum emisiweyo ngelixa oonogada bekhwaza ngaphandle.",
    st: "A bala litshelete tse hloekileng tsa lekholo la Li-Rand ka hare ho Quantum minibus e pakiloeng ha bakhanni ba letsa meloli kantle.",
    nso: "A bala tšhelete ya makgolo a di-Ranta ka gare ga bese ya Quantum ye e emego mola batlhahlobi ba letsa melodi ka ntle.",
    tn: "A bala madi a a phepa a lekgolo a Diranta mo teng ga khombi ya Quantum e e emeng fa badiri ba letse melodi kwa ntle.",
    ts: "A hlaya mali yo tenga ya madzana ya Tirhanta endzeni ka movha wa Quantum lowu yimiseke loko vaofisiri va chayela swiphazamiso ehandle.",
    ss: "Abala timali letitsite tangemakhulu ema-Randi ngekhatsi kwe-Quantum lepakiwe ngesikhatsi bonogada bentele tingoma ngaphandle.",
    ve: "U vhala masheleni a dzirannda dza dana phandani ha minimbisi ya Quantum yo imiswaho musi vhalanguli vha tshi lidza zwitololi nnda."
  },
  "Leaning out the sliding door, voice dropping below the diesel idle.": {
    en: "Leaning out the sliding door, voice dropping below the diesel idle.",
    af: "Leun by die skuifdeur uit, terwyl sy stem stiller word as die diesel-enjin.",
    zu: "Encike emnyango oshelelayo, izwi lakhe lehla ngaphansi komsindo wedizili.",
    xh: "Echophe kumnyango otyibilikayo, ilizwi lihla ngaphantsi kwesandi sedizili.",
    st: "A sekamela monyakong o thellang, lentsoe la hae le theoha ka tlase ho molumo oa disele.",
    nso: "A sekametše mojako wa go thelela, lentšu la gagwe le theogela ka fase ga lešata la disele.",
    tn: "A sokamela mo mojako o o thelelang, lentswe la gagwe le wela tlase ga modumo wa disele.",
    ts: "A tshikilela rivanti ro rhulurha, rito rakwe ri ri karhi ri thwela ehansi ka modumo wa dizili.",
    ss: "Egobile emnyango loshelelitako, livi lakhe lehla ngephansi kwemsindvo wedizili.",
    ve: "U sendela munangoni u kokovhaho, ipfi lawe la vha fhasi ha muvhuso wa dizili."
  },
  "Chuckling warmly as he taps his Motorola two-way radio.": {
    en: "Chuckling warmly as he taps his Motorola two-way radio.",
    af: "Lag warm terwyl hy op sy Motorola-tweerigtingradio tik.",
    zu: "Ehleka kamnandi ngenkathi ethinta umsakazo wakhe we-Motorola.",
    xh: "Ehlekela ngaphakathi ngobubele ngelixa ecofa unomathotholo wakhe we-Motorola.",
    st: "A tsheha hamonate ha a phaphatha seea-le-moea sa hae sa Motorola.",
    nso: "A sega ka lethabo mola a kgwatha radio ya gagwe ya Motorola.",
    tn: "A tshega ka monyenyo fa a phaphatha radio ya gagwe ya Motorola.",
    ts: "A hleka hi ku tsaka loko a thukunya xiya-ni-moya xakwe xa Motorola.",
    ss: "Ahleka kamnandzi nakatsintsa umsakato wakhe we-Motorola.",
    ve: "U sea nga zwavhudi musi a tshi khou tapha radiondi yawe ya Motorola."
  },
  "Pressing a thick roll of notes into your jacket pocket.": {
    en: "Pressing a thick roll of notes into your jacket pocket.",
    af: "Druk 'n dik rol note in jou baadjiesak.",
    zu: "Efaka umqulu omkhulu wemali ephaketheni lejakhethi yakho.",
    xh: "Efaka umqulu omkhulu wemali epokothweni yebhatyi yakho.",
    st: "A hatella mokotla o motenya oa litshelete ka pokothong ea baki ea hao.",
    nso: "A kgoromeletša phuthego ye koto ya tšhelete ka potleng ya baki ya gago.",
    tn: "A kgotlhaganya mokoa o o kima wa madi mo kgetsaneng ya baki ya gago.",
    ts: "A tshikilela hungu ro duma ra mali eka ndzutsu ya jakete ya wena.",
    ss: "Acindzetela umculu lomkhulu wetimali ephaketheni lebhakethe yakho.",
    ve: "U sukela mupfuto muhulu wa masheleni phokhothoni ya baki yau."
  },
  "Standing under the flickering fluorescent tubes of the Central Precinct charge office, thumb hooked in his tactical vest.": {
    en: "Standing under the flickering fluorescent tubes of the Central Precinct charge office, thumb hooked in his tactical vest.",
    af: "Staan onder die flikkerende fluoresseerbuise van die Sentrale Polisiestasie-aanklagkantoor, duim gehaak in sy taktiese frokkie.",
    zu: "Emi ngaphansi kwamashubhu akhanyayo ehhovisi lezinsolo laseCentral Precinct, isithupha silenga evestini lakhe lamasu.",
    xh: "Eme phantsi kwezibane ezidanyazayo zeofisi yezityholo yaseCentral Precinct, ithupha libambelele kwivesti yakhe yobuchule.",
    st: "A eme tlas'a mabone a panyapanyang a ofisi ea liqoso ea Central Precinct, monoana o motona o khomaretse vest ea hae ea maqheka.",
    nso: "A eme ka tlase ga mabone a go phadima a ofisi ya ditatofatšo ya Central Precinct, monwana o mogolo o ngaparele sekipa sa gagwe sa sešole.",
    tn: "A eme ka fa tlase ga dipone tse di phatsimang tsa ofisi ya ditatofatso ya Central Precinct, monwana o mogolo o tsentse mo jaking ya gagwe ya sesole.",
    ts: "A yime ehansi ka mavoni lawa ma voningaka e ofisini ya timhaka ya Central Precinct, rintiho leri kulu ri khome nceka wa vuthu.",
    ss: "Eme ngaphansi kwetibane letikhanyako te-ofisi yetinsolo ye-Central Precinct, sithupha sibambelele kwivesti yakhe yemasu.",
    ve: "U ima fhasi ha dzilayithi dzi dzinginyeaho dza ofisi ya zwitofu ya Central Precinct, gunwe lo hoka tshiambaro tshawe tsha zwikhali."
  },
  "Jaw clenching as a desk sergeant hurriedly looks away.": {
    en: "Jaw clenching as a desk sergeant hurriedly looks away.",
    af: "Kake klem terwyl 'n toonbank-sersant haastig wegkyk.",
    zu: "Imihlathi iqina ngenkathi usayitsheni wesikhundla ebheka eceleni ngokushesha.",
    xh: "Imihlathi iqinile ngelixa usajini weleta ejonga kude ngokukhawuleza.",
    st: "Mehlathi e tiea ha sajene ea deske a qamaka ka thoko ka potlako.",
    nso: "Mehlathi e gagamala mola sajente sa teseke se lebelela thoko ka lebelo.",
    tn: "Mehlaleng e tiile fa sajente sa teseke se leba koo ka potlako.",
    ts: "Swilelo swi tiya loko sajeni wa le desikeni a hundzula nhloko hi ku hatlisa.",
    ss: "Imihlatsi iyacina nakasayitsheni we-desk abukela eceleni ngekushesha.",
    ve: "Tshiendedzi tsho ima musi sajeni wa desike a tshi sedza thungo nga u tavhanya."
  },
  "Studying your eyes for a bluff before barking into his shoulder mic.": {
    en: "Studying your eyes for a bluff before barking into his shoulder mic.",
    af: "Bestudeer jou oë vir 'n bluf voordat hy in sy skouermikrofoon blaf.",
    zu: "Ehlola amehlo akho ukubona ukuthi uyaqamba amanga ngaphambi kokuthethisa kumakrofoni yakhe yehlombe.",
    xh: "Efunda amehlo akho ngaphambi kokukhwaza kwimakrofoni yegxalaba lakhe.",
    st: "A hlahloba mahlo a hao pele a hoeletsa ka har'a maekrofounu ea hae ea lehetla.",
    nso: "A lekola mahlo a gago pele a goelela ka gare ga maekrofounu ya gagwe ya legetla.",
    tn: "A tlhatlhoba matlho a gago pele a goa mo maekorofounung ya legetla la gagwe.",
    ts: "A langutisisa matihlo ya wena a nga si kalaka eka maikrofoni ya katla rakwe.",
    ss: "Abuka emehlo akho ngaphambi kwekutsi amemete kumakrofoni yelihlombe lakhe.",
    ve: "U sedzulusa mato au musi a sa athu u vhidzelela kha maikhurofoni ya fhafha lawe."
  },
  "Voice dropping to a venomous whisper as he unlocks a desk drawer.": {
    en: "Voice dropping to a venomous whisper as he unlocks a desk drawer.",
    af: "Stem sak na 'n giftige fluistering terwyl hy 'n lessenaarlaai oopsluit.",
    zu: "Izwi liyancipha libe ukuhleba okunoshevu ngenkathi evula idrowa yedeski.",
    xh: "Ilizwi lihle libe kukunyenyeza okunetyhefu njengoko evula idrowa yedesika.",
    st: "Lentsoe le theoha ho ba seriti se chefo ha a notlela drowa ea deske.",
    nso: "Lentšu le theošetša phase ya go ba mpholo mola a bula drowara ya teseke.",
    tn: "Lentswe le wela tlase go nna sebodu se se botlhole fa a bulela drowa ya teseke.",
    ts: "Rito ri thwela ehansi ku fana ni xisehelo xa chefu loko a pfula drowara ya desiki.",
    ss: "Livi lehla libe kusebenta lokunebhutsi nakavula lidrowa yedeski.",
    ve: "Ipfi la kokovha sa lwa tshifhe musi a tshi vula drowara ya desike."
  },
  "Sipping rooibos from fine bone china while her private diesel generator hums smoothly outside the teak-paneled office.": {
    en: "Sipping rooibos from fine bone china while her private diesel generator hums smoothly outside the teak-paneled office.",
    af: "Drink rooibos uit fyn porselein terwyl haar private dieselgenerator glad buite die kiaatpaneelkantoor gons.",
    zu: "Ephuza i-rooibos enkomishini enhle ngenkathi ijeneretha yakhe yedizili ibhuma ngokushelela ngaphandle kwehhovisi elihlotshiswe ngokhuni.",
    xh: "Esela i-rooibos kwi-porcelain entle ngelixa ijenereyitha yakhe yedizili igquma ngaphandle kweofisi eneeplanga ze-teak.",
    st: "A noa rooibos ho tsoa komiking e ntle ha jenereithara ea hae ea disele e duma hantle kantle ho ofisi ea lepolanka la teak.",
    nso: "A nwa rooibos go tšwa senwelong sa mabonobono mola jenereitara ya gagwe ya disele e duma ka boiketlo ka ntle ga ofisi ya mapolanka a teak.",
    tn: "A nwa rooibos go tswa komiking e e manobonobo fa jenereitara ya gagwe ya disele e duma ka thelelo kwa ntle ga ofisi ya dikgong tsa teak.",
    ts: "A nwa rooibos hi xikhovhelo xo saseka loko jeneretha yakwe ya dizili yi duma kahle ehandle ka ofisi ya mapulanga ya teak.",
    ss: "Anatsa i-rooibos enkomishini lenhle nakusale ijeneretha yakhe yedizili ibhuma kamnandzi ngaphandle kwe-ofisi yelugodvo lwetikhi.",
    ve: "U nwa tiye ya rooibos ngomu ha tshinwelo tsho nakaho musi jeneretha yawe ya dizili i tshi lidza zwavhudi nnda ha ofisi ya phani ya thiki."
  },
  "Smiling thinly over the rim of her teacup.": {
    en: "Smiling thinly over the rim of her teacup.",
    af: "Gimlag dun oor die rand van haar teekoppie.",
    zu: "Emamatheka kancane phezu kwenkomishi yakhe yetiye.",
    xh: "Emomotheka kancinci phezu kwendebe yakhe yeti.",
    st: "A bososela hanyenyane ka holim'a komiki ea hae ea tee.",
    nso: "A myemyela gannyane godimo ga senwelo sa gagwe sa teye.",
    tn: "A nyenya go se nene fa godimo ga komiki ya gagwe ya tee.",
    ts: "A n'wayitela katsongo e henhla ka xikhovhelo xa tiya.",
    ss: "Amomotsela kancane etulu kwenkomishi yakhe yetiye.",
    ve: "U nwethuwa zshituku ntha ha tshinwelo tshawe tsha tie."
  },
  "Setting her cup down without a sound, eyes razor-sharp.": {
    en: "Setting her cup down without a sound, eyes razor-sharp.",
    af: "Sit haar koppie neer sonder 'n geluid, oë vlymskerp.",
    zu: "Ebeka phansi inkomishi yakhe ngaphandle komsindo, amehlo ebukhali kakhulu.",
    xh: "Ebeka indebe yakhe phantsi ngaphandle kwesandi, amehlo ebukhali okwewembe.",
    st: "A beha komiki ea hae fatše ntle le molumo, mahlo a le bohale joaloka lehare.",
    nso: "A bea senwelo sa gagwe fase ntle le lešata, mahlo a le bogale bjalo ka legare.",
    tn: "A baya komiki ya gagwe fa fatshe kwantle ga modumo, matlho a le bogale jaaka legare.",
    ts: "A veka xikhovhelo xakwe ehansi handle ka modumo, matihlo ma ri karhi ma vha ma twa.",
    ss: "Abeka phansi inkomishi yakhe ngaphandle kwemsindvo, emehlo abukhali njengensingo.",
    ve: "U vhea tshinwelo tshawe fhasi hu si na muvhuso, mato o vhafalala."
  },
  "Glancing irritably toward the outer secretariat.": {
    en: "Glancing irritably toward the outer secretariat.",
    af: "Kyk geïrriteerd na die buitenste sekretariaat.",
    zu: "Ebheka ngokucasuka ngasesekritariyathe yangaphandle.",
    xh: "Ejonga ngokukruquka kwiofisi kanobhala yangaphandle.",
    st: "A qamaka ka ho teneha nqa bokwaleding bo kantle.",
    nso: "A lebelela ka pefelo go bongwaledi bja ka ntle.",
    tn: "A leba ka kgalefo ntlheng ya bokwaledi jwa kwa ntle.",
    ts: "A languta hi ku hlundzuka eka vatsari va le handle.",
    ss: "Abuka ngekucansuka ngasekobhali wangaphandle.",
    ve: "U sedza nga u nyema vhuofisi ha munwali wa nnda."
  },
  "Peering through jeweler’s loupes under a neon dragon sign while a soldering iron smokes beside a stack of stripped PlayStations.": {
    en: "Peering through jeweler’s loupes under a neon dragon sign while a soldering iron smokes beside a stack of stripped PlayStations.",
    af: "Kyk deur juwelierslense onder 'n neon-drakenteken terwyl 'n soldeerbout rook langs 'n stapel gestroopte PlayStations.",
    zu: "Ebuka ngezibuko zobucwebe ngaphansi kophawu lukadragoni lwe-neon ngenkathi i-soldering iron ishunqa eduze kwenqwaba yama-PlayStation ahlakaziwe.",
    xh: "Ejonga ngeelensi zamatye anqabileyo phantsi kophawu lwedragoni yeneon ngelixa intsimbi yokuthengisa itshisa ecaleni kwePlayStation eziqhekeziweyo.",
    st: "A sheba ka likhalase tsa mabenyane tlas'a letšoao la neon dragon ha tšepe ea ho tjheseletsa e tsuba pel'a qubu ea li-PlayStation tse hlakotsoeng.",
    nso: "A lebelela ka dihlolamabenyane ka tlase ga leswao la drakone ya neon mola aporon ya go šomela e kuka mosi kgauswi le sehlopha sa di-PlayStation tše di phatlaladitšwego.",
    tn: "A leba ka digalase tsa mabenyane ka fa tlase ga letshwao la kgogodi ya neon fa tshipi ya go thoba e kuka mosi gaufi le bokoa jwa di-PlayStation tse di thubilweng.",
    ts: "A langutisisa hi mavoni ya swin'wetsin'weti ehansi ka xikombiso xa dragon ya neon loko ayoni yo hisa yi thukunya ekusuhi ni ntlawa wa ti-PlayStation leti tsemiweke.",
    ss: "Abuka ngetibuko tebucwebecwebe ngaphansi kweluphawu lwadragoni ye-neon nakusale i-soldering iron ishunqa eceleni kwenqwaba yema-PlayStation lahlaketiwe.",
    ve: "U sedza nga dzilwupu dza vhadzimi fhasi ha tshiga tsha drakoni ya neon musi tsimbi ya u fhisa i tshi khou duba tsini ha thulwi ya dzipPlayStation dzo tshinywaho."
  },
  "Tapping the cracked OLED screen with insulated tweezers.": {
    en: "Tapping the cracked OLED screen with insulated tweezers.",
    af: "Tik op die gekraakte OLED-skerm met geïsoleerde tweezers.",
    zu: "Ethinta isikrini se-OLED esiqhephukile ngezindlawu ezifakwe ukufudumala.",
    xh: "Ecofa isikrini se-OLED esiqhekekileyo nge-tweezers efakelweyo.",
    st: "A phaphatha skrine sa OLED se petsohileng ka li-tweezers tse sirelelitsoeng.",
    nso: "A kgwatha sekirini sa OLED sa go phatloga ka ditshwaro tša go šireletšwa.",
    tn: "A phaphatha sekirini sa OLED se se thubegileng ka ditshwaro tse di sireleditsweng.",
    ts: "A thukunya xikirini xa OLED lexi hlakaleke hi switshwaro swo sirheleleka.",
    ss: "Atsintsa sikrini se-OLED lesibhoboziwe ngetinsimbi letivikelwe.",
    ve: "U tapha tskirini tsho pwasheaho tsha OLED nga zwitshwari zwo tsireledzwaho."
  },
  "Grinning as green hexadecimal dumps cascade down his CRT monitor.": {
    en: "Grinning as green hexadecimal dumps cascade down his CRT monitor.",
    af: "Grynslag terwyl groen heksadesimale data teen sy CRT-monitor afrol.",
    zu: "Emamatheka ngenkathi amakhodi aluhlaza e-hexadecimal ehla kumonitha yakhe ye-CRT.",
    xh: "Emomotheka ngelixa iikhowudi eziluhlaza ze-hexadecimal zisehla kwimonitha yakhe ye-CRT.",
    st: "A bososela ha linomoro tse tala tsa hexadecimal li theoha ho monitha oa hae oa CRT.",
    nso: "A myemyela mola datha ya botala ya hexadecimal e theogela mo monithareng ya gagwe ya CRT.",
    tn: "A nyenya fa dintlha tse di tala tsa hexadecimal di elela mo monithareng ya gagwe ya CRT.",
    ts: "A n'wayitela loko tindzhawu ta rihlaza ta hexadecimal ti khulukela eka xikirini xakwe xa CRT.",
    ss: "Amomotsela nakusale ema-hexadecimal laluhlaza ehla kumonitha yakhe ye-CRT.",
    ve: "U nwethuwa musi manwalo madala a hekisadesimala a tshi khou rwa kha monithara yawe ya CRT."
  },
  "Handing you a tin mug of tar-black coffee as his spectrum analyzer chirps.": {
    en: "Handing you a tin mug of tar-black coffee as his spectrum analyzer chirps.",
    af: "Gee jou 'n blikbeker teerswart koffie terwyl sy spektrumanaliseerder tjirp.",
    zu: "Ekunika inkomishi kapotiyeli yekhofi elimnyama kakhulu ngenkathi isihlaziya sakhe se-spectrum sikhala.",
    xh: "Ekunika ikomityi yebhodi yekofu emnyama okwetheyile ngelixa isixhobo sakhe se-spectrum sikhala.",
    st: "A o neha komiki ea lekotikoti ea kofi e ntšo joaloka sekontiri ha sesebelisoa sa hae sa spectrum se lla.",
    nso: "A go fa senwelo sa lephefo sa kofi ye ntsho bjalo ka theere mola sehlatholli sa gagwe sa sepeketeramo se lla.",
    tn: "A go neela mogopo wa tshipi wa kofi e ntsho jaaka sekgomaretsi fa sesolofatsi sa gagwe sa spectrum se duma.",
    ts: "A ku nyika mug wa nsimbi wa kofi ya ntima swinene loko xikambela-spectrum xakwe xi twala.",
    ss: "Ukunika inkomishi yensimbi yekhofi lelimnyama kakhulu nakusale i-spectrum analyzer yakhe ikhala.",
    ve: "U u kumedza khopho ya thanda ya kofi i swifhaho vhukuma musi tshisengulusi tshawe tsha sipekithiramu tshi tshi lila."
  },
  "Standing on the rain-slick catwalk above Berth 14 in a tailored cashmere overcoat, watching gantry cranes swing forty-foot containers through the fog.": {
    en: "Standing on the rain-slick catwalk above Berth 14 in a tailored cashmere overcoat, watching gantry cranes swing forty-foot containers through the fog.",
    af: "Staan op die reënglans-loopgang bo Berth 14 in 'n pasgemaakte kasjmierjas, en kyk hoe hyskrane veertigvoet-houers deur die mis swaai.",
    zu: "Emi endleleni eshelelayo ngaphezu kwe-Berth 14 egqoke ijazi le-cashmere, ebuka amakreni ejikijela amakhabhinethi angamafidi angamashumi amane enkungwini.",
    xh: "Eme kwindawo emanzi yemvula ngaphezu kwe-Berth 14 enxibe idyasi ye-cashmere, ejonge iikren zijingisa izikhongozeli zenkungu.",
    st: "A eme tseleng e thellang ke pula kaholimo ho Berth 14 a apere jase ea cashmere, a shebeletse likrane li tsokotsa likontheinara moholing.",
    nso: "A eme godimo ga tsela ye e thelelago ka baka la pula ka godimo ga Berth 14 a apere jase ya cashmere, a bogela dikrane di tšokoša dikhontheinara ka gare ga mouwane.",
    tn: "A eme mo tselaneng e e thelelang ka ntlha ya pula kwa godimo ga Berth 14 a apere baki ya cashmere, a lebile dikrene di kuka dikhontheinara mo mouwaneng.",
    ts: "A yime eka ndlela leyi rhelelaka hi mpfula e henhla ka Berth 14 a ambele jasi ra cashmere, a hlalele tikreni ti tlakusa swibye swa makhontheinara exikarhi ka hunguva.",
    ss: "Eme endleleni leshelelitako ngetulu kwe-Berth 14 agcoke lijazi le-cashmere, abuka emakhreni ajikisa emakhontheyina enkungwini.",
    ve: "U ima ntha ha ndila yo thelelaho nga mvula ntha ha Berth 14 o ambara jasi la khashimere, a tshi vhona zwikolobisi zwi tshi vhea dzikhonntheinara khunvini."
  },
  "Gesturing toward the glowing skyline of the CBD across the water.": {
    en: "Gesturing toward the glowing skyline of the CBD across the water.",
    af: "Wys na die gloeiende silhoeët van die middestad oorkant die water.",
    zu: "Ekhomba engxenyeni ekhanyayo ye-CBD phesheya kwamanzi.",
    xh: "Ekhomba kwizakhiwo ezikhanyayo ze-CBD ngaphesheya kwamanzi.",
    st: "A supa mohaho o khanyang oa CBD ka nqane ho metsi.",
    nso: "A šupa go bophagamo bja toropo bjo bo tagago bja CBD ka mošola wa meetse.",
    tn: "A supa mebago e e phatsimang ya CBD go kgabaganya metsi.",
    ts: "A komba doroba leri voningaka ra CBD etlhelo leriya ra mati.",
    ss: "Akhomba edolobheni lelikhanyako le-CBD ngaphesheya kwemanti.",
    ve: "U sumba dorobo yo vhonetshelaho ya CBD tshedani ha madi."
  },
  "Signaling his lieutenant to hand over a sealed customs pouch.": {
    en: "Signaling his lieutenant to hand over a sealed customs pouch.",
    af: "Gee sy luitenant 'n teken om 'n verseëlde doeanesakkie te oorhandig.",
    zu: "Etshela iphoyisa lakhe eliyinhloko ukuthi lidlulise isikhwama samasiko esivaliwe.",
    xh: "Eyalela ilutenant yakhe ukuba inikeze ingxowa yamasiko evalwe ngci.",
    st: "A fana ka pontsho ho molaoli oa hae ho nehelana ka mokotla oa lekhetho o tiisitsoeng.",
    nso: "A laela mothuši wa gagwe go neela kgetsi ya kgetho ye e tswaletšwego.",
    tn: "A laela mothusa-molaodi wa gagwe go neela kgetse ya lekgetho e e tswetsweng.",
    ts: "A komba mulanguteri wakwe ku hundzisela xipaci xa customs lexi pfariweke.",
    ss: "Akhombisa li-lieutenant lakhe kutsi linikele sikhwama sekastomu lesivaliwe.",
    ve: "U laya muthusi wawe u nekedza bege yo tsireledzwaho ya muthelo."
  },
  "A cold, appraising smile crossing his face in the sodium crane glare.": {
    en: "A cold, appraising smile crossing his face in the sodium crane glare.",
    af: "'n Koue, takserende glimlag verskyn op sy gesig in die natrium-kraanlig.",
    zu: "Ukumamatheka okubandayo, okuhlolisayo kuhlala ebusweni bakhe ekukhanyeni kwekreni.",
    xh: "Uncumo olubandayo noluhlolisayo luvela ebusweni bakhe ekukhanyeni kwekren.",
    st: "Pososelo e batang e hlaha sefahlehong sa hae khanyeng ea krane.",
    nso: "Phesogo ye e tonyago e tšwelela sefahlegong sa gagwe leseding la krane.",
    tn: "Monyenyo o o tsididi o tlhagelela mo sefatlhegong sa gagwe mo leseding la krene.",
    ts: "Ku n'wayitela ko titimela ku vonaka ebusweni byakwe ekuvoningeni ka kreni.",
    ss: "Kumomotsela lokubandzako kuvela ebusweni bakhe ekukhanyeni kwekreni.",
    ve: "U nwethuwa ho rothaho hu vhonala tshifhatuwoni tshawe tshedzini ya tshinwelo."
  },
  "hunched over a green-shaded banker’s lamp between towering steel shelves of mouldering magistrate dockets.": {
    en: "hunched over a green-shaded banker’s lamp between towering steel shelves of mouldering magistrate dockets.",
    af: "Gebuk oor 'n groen bankierslamp tussen hoë staalrakke van verrottende landdrosdossiere.",
    zu: "Ekhotheme phezu kwesibani se-banker esiluhlaza phakathi kwamashalofu ensimbi amadokhethi kamantshi abolile.",
    xh: "Egobile phezu kwesibane sebhanki esiluhlaza phakathi kweeshelfu zentsimbi zeedokhethi zikamantyi.",
    st: "A kobehile holim'a lebone le letala la banka lipakeng tsa lishelefo tsa tšepe tsa litokomane tsa maseterata.",
    nso: "A iname godimo ga lebone le letala la panka magareng ga diraka tša tšhipi tša ditokomane tša maseterata.",
    tn: "A khuname fa godimo ga lebone le le tala la panka fa gare ga diraka tsa tshipi tsa dikwalo tsa mmakaseterata.",
    ts: "A khunyamile e henhla ka tevhula ya rihlaza ya panka exikarhi ka tishelefu ta nsimbi ta madokete ya masipala.",
    ss: "Agobile etulu kwelibane leluhlaza lelibhangi emkhatsini wemashalofu ensimbi emadokhethi kamantji.",
    ve: "O petutshela ntha ha luvhone lutala lwa bannga vhukati ha zhiterefu zha thanda zha dzidokhethi dza madzhisitirata."
  },
  "Polishing his wire-rimmed glasses with a tired sigh.": {
    en: "Polishing his wire-rimmed glasses with a tired sigh.",
    af: "Poleer sy draadbril met 'n moeë sug.",
    zu: "Ehlanzisa izibuko zakhe zocingo ngokububula okukhathele.",
    xh: "Ecosha iindondo zakhe ngesingqala esidiniweyo.",
    st: "A hlakola likhalase tsa hae ka ho hema ho khathetseng.",
    nso: "A phadimiša digalase tša gagwe ka go hema ga go lapa.",
    tn: "A phepafatsa digalase tsa gagwe ka go hema go go lapileng.",
    ts: "A basisa magilazi yakwe ya nsimbi hi ku hefemula loku karhatekeke.",
    ss: "Ahlobisa titibuko takhe tencingo ngekufemula lokukhatsele.",
    ve: "U pholisha magalasi awe nga u femelela ho netaho."
  },
  "Pulling off his headphones, face pale beneath the banker’s lamp.": {
    en: "Pulling off his headphones, face pale beneath the banker’s lamp.",
    af: "Haal sy oorfone af, gesig bleek onder die bankierslamp.",
    zu: "Ekhumula ama-headphone akhe, ubuso buphaphathekile ngaphansi kwesibani sebhange.",
    xh: "Ekhupha ii-headphones zakhe, ubuso bumhlophe phantsi kwesibane sebhanki.",
    st: "A rola li-headphone tsa hae, sefahleho se le sesoeu tlas'a lebone la banka.",
    nso: "A rola di-headphone tša gagwe, sefahlego se sešweu ka tlase ga lebone la panka.",
    tn: "A rola di-headphone tsa gagwe, sefatlhego se le sesweu ka fa tlase ga lebone la panka.",
    ts: "A susa ti-headphone takwe, xikandza xi basile ehansi ka tevhula ya panka.",
    ss: "Ekhumula ema-headphone akhe, buso buphetseke ngaphansi kwelibane lebhangi.",
    ve: "U bvisa zwipfulo zha nndzeve, tshifhatuwo tsho tshena fhasi ha luvhone lwa bannga."
  },
  "Standing on a wind-swept 28th-floor glass balcony overlooking the Indian Ocean while paper shredders hum inside the penthouse suite.": {
    en: "Standing on a wind-swept 28th-floor glass balcony overlooking the Indian Ocean while paper shredders hum inside the penthouse suite.",
    af: "Staan op 'n windverwaaide 28ste-verdieping glasbalkon wat uitkyk oor die Indiese Oseaan terwyl papierversnipperaars binne die dakwoonstel gons.",
    zu: "Emi kuvulandi wengilazi esitezi sama-28 esipheshulwa ngumoya ebheke uLwandlekazi lwase-Indiya ngenkathi imishini yokusika amaphepha ibhuma ngaphakathi.",
    xh: "Eme kwibhalkhoni yeglasi yomgangatho wama-28 ejonge uLwandle lwaseIndiya ngelixa oomatshini bokusika amaphepha bevakala ngaphakathi.",
    st: "A eme balkoneng ea khalase mokatong oa bo-28 e shebaneng le Leoatle la India ha mechini ea ho seha lipampiri e duma ka hare.",
    nso: "A eme balkoning ya galase mokatong wa bo-28 ye e lebeletšego Lewatle la India mola metšhene ya go kgaola dipampiri e duma ka gare.",
    tn: "A eme mo godimo ga balkoni ya galase ya bo-28 e e lebileng Lewatle la India fa metšhine ya go sega dipampiri e duma mo teng.",
    ts: "A yime eka balkoni ya xiphemu xa 28 leyi languteke Lwandle ra Indiya loko michini yo tsema maphepha yi duma endzeni.",
    ss: "Eme kubhalikhoni yengilazi esitezi sama-28 ebuka Lwandle lwaseNdiya nakusale imishini yekusika emaphepha ibhuma ngekhatsi.",
    ve: "U ima ntha ha balkoni ya ngilasi ya fuloro ya vhu-28 i sedzaho Lwanzhe lwa India musi mitshini ya u gera mabammbiri i tshi duma ngomu."
  },
  "Watching lightning flicker over the Umhlanga lighthouse.": {
    en: "Watching lightning flicker over the Umhlanga lighthouse.",
    af: "Kyk hoe weerlig oor die Umhlanga-vuurtoring flikker.",
    zu: "Ebuka umbani ubani phezu kwendlu yesibani yase-Umhlanga.",
    xh: "Ejonge umbane udanyaza phezu kwendlu yesibane yase-Umhlanga.",
    st: "A shebeletse lehadima le benya holim'a ntlo ea mabone ea Umhlanga.",
    nso: "A bogela legadima le phadima godimo ga ntlo ya mabone ya Umhlanga.",
    tn: "A lebile logadima lo phatsima mo godimo ga ntlo ya mabone ya Umhlanga.",
    ts: "A hlalele rihati leri vangamaka e henhla ka yindlu ya voningo ya Umhlanga.",
    ss: "Abuka umbane ubaneka etulu kwelighthouse yase-Umhlanga.",
    ve: "U vhona luvalo lwa muvhuso lu tshi khou penya ntha ha luvhone lwa Umhlanga."
  },
  "Her composure cracking for a fraction of a second.": {
    en: "Her composure cracking for a fraction of a second.",
    af: "Haar kalmte breek vir 'n breukdeel van 'n sekonde.",
    zu: "Ukuzola kwakhe kuphuka isikhashana nje esincane.",
    xh: "Ukuzola kwakhe kuqhekeka okomzuzwana omncinci.",
    st: "Ho tsitsa ha hae ho robeha ka motsotsoana o monyenyane.",
    nso: "Go iketla ga gagwe go pšhatlega motsotswana o monyenyane.",
    tn: "Boiketlo jwa gagwe bo thubega ka karolwana ya motsotsoana.",
    ts: "Ku tiya kakwe ku hambana hi xiphemu xa sekoni.",
    ss: "Kuthula kwakhe kuyaphela ngemzuzwana lomncane.",
    ve: "U vuya hawe ho thutheha lwa tshifhinga tshituku."
  },
  "Unlocking a leather travel Valise and counting out notes.": {
    en: "Unlocking a leather travel Valise and counting out notes.",
    af: "Sluit 'n leerreistas oop en tel banknote uit.",
    zu: "Evula isikhwama sokuhamba sesikhumba bese ebala imali yamaphepha.",
    xh: "Evula ivalise yokuhamba yesikhumba kwaye ebala imali.",
    st: "A notlela mokotla oa letlalo oa maeto mme a bala chelete.",
    nso: "A bula sekgwama sa letlalo sa maeto gomme a bala tšhelete.",
    tn: "A bulela kgetse ya letlalo ya maeto mme a bala dipampiri tsa madi.",
    ts: "A pfula nkwama wa letlalo wa maendzo a hlaya mali ya maphepha.",
    ss: "Avula sikhwama sekuhamba sesikhumba aphindze abale imali.",
    ve: "U vula bege ya lukanda ya lwendo a tshi vhala masheleni."
  },
  "Standing atop an impounded municipal water tanker in KwaMashu while hundreds of residents bang empty twenty-litre buckets against the depot gates.": {
    en: "Standing atop an impounded municipal water tanker in KwaMashu while hundreds of residents bang empty twenty-litre buckets against the depot gates.",
    af: "Staan bo-op 'n gekonfiskeerde munisipale watertenkwa in KwaMashu terwyl honderde inwoners leë twintigliter-emmers teen die depot-hekke slaan.",
    zu: "Emi phezu kwethangi lamanzi likamasipala elithunjiwe eKwaMashu ngenkathi amakhulu ezakhamuzi eshaya amabhakede angenalutho emagumbini e-depot.",
    xh: "Eme phezu kwetanki yamanzi kamasipala ebanjiweyo eKwaMashu ngelixa amakhulu abahlali bebetha amabhakethi angamashumi amabini eelitha emasangweni ediphu.",
    st: "A eme holim'a tanka ea metsi ea masepala e nkileng KwaMashu ha baahi ba makholo ba otla dinkho tse se nang letho mamating a dipo.",
    nso: "A eme godimo ga tanka ya meetse ya masepala ye e tšerwego kua KwaMashu mola baagi ba makgolo ba betha dinkgo tša go hloka selo dikgorong tša dipo.",
    tn: "A eme mo godimo ga tanka ya metsi ya masepala e e gapilweng kwa KwaMashu fa baagi ba le makgolo ba thula dinkgo tse di se nang sepe mo dikgorong tsa depot.",
    ts: "A yime e henhla ka thanki ya mati ya masipala leyi khomiweke e KwaMashu loko vaaki va madzana va ba magandzelo ya mahala emayangweni ya depot.",
    ss: "Eme etulu kwethangi lemanti lamaspala lelibanjiwe eKwaMashu nakusale emakhulu etakhamuti ashaya emabhakede langenalutfo emnyango we-depot.",
    ve: "U ima ntha ha thannga ya madi ya mumasipala yo valiweho ngei KwaMashu musi madana a vhadzulapo vha tshi khou vhanda dzibakethe dzi si na tshithu getheni dza dipo."
  },
  "Slamming his palm against the stainless-steel tanker flank.": {
    en: "Slamming his palm against the stainless-steel tanker flank.",
    af: "Slaan sy handpalm teen die vlekvryestaal-tenkwa se sykant.",
    zu: "Eshaya isandla sakhe ohlangothini lwethangi lensimbi engenzi ukugqwala.",
    xh: "Ebetha isandla sakhe kwicala letanki yentsimbi engangcoliyo.",
    st: "A otla seatla sa hae lehlakoreng la tanka ea tšepe e sa ruseng.",
    nso: "A betha seatla sa gagwe lehlakoreng la tanka ya tšhipi ye e sa rusego.",
    tn: "A thula seatla sa gagwe mo letlhakoreng la tanka ya tshipi e e sa ruseng.",
    ts: "A ba xandla xakwe e tlhelo ka thanki ya nsimbi leyi nga rwaliki.",
    ss: "Ashaya sandla sakhe eceleni kwethangi lensimbi lengarusi.",
    ve: "U rwa tshanda tshawe thungoni ha thannga ya tsimbi i sa rwaliho."
  },
  "Raising his fist as the crowd roars along the perimeter fence.": {
    en: "Raising his fist as the crowd roars along the perimeter fence.",
    af: "Lig sy vuis terwyl die skare langs die grensheining brul.",
    zu: "Ephakamisa isibhakela sakhe ngenkathi isixuku simemeza ecingweni lomngcele.",
    xh: "Ephakamisa inqindi yakhe njengoko isihlwele sigquma ngasecingweni.",
    st: "A phahamisa feisi ea hae ha letšoele le puruma terateng ea moeli.",
    nso: "A emiša letswele la gagwe mola lešaba le goelela terateng ya mollwane.",
    tn: "A tsholeletsa letswele la gagwe fa leshaba le goa mo terateng ya melelwane.",
    ts: "A tlakusa xibakele xakwe loko xitshungu xi huwelela erithangwini ra ndzilakana.",
    ss: "Aphakamisa sibhakela sakhe nalesicuku simemeta elucingweni lwemngcele.",
    ve: "U takusa tsumbo yawe musi gogo li tshi khou huvha luhurani lwa mukano."
  },
  "Standing in the marble rotunda of the KZN High Court with a stack of red-ribboned subpoenas under his arm.": {
    en: "Standing in the marble rotunda of the KZN High Court with a stack of red-ribboned subpoenas under his arm.",
    af: "Staan in die marmerrotunda van die KZN-Hooggeregshof met 'n stapel rooilint-dagvaardings onder sy arm.",
    zu: "Emi erotunda yemabula yeNkantolo Ephakeme yase-KZN ephethe inqwaba yamasamanisi anamaribhoni abomvu ngaphansi kwekhwapha lakhe.",
    xh: "Eme kwigumbi le-rotunda le-KZN High Court enentqwaba yee-subpoena ezibotshwe ngeeribhoni ezibomvu phantsi kwengalo yakhe.",
    st: "A eme rotundeng ea 'mabole ea Lekhotla le Phahameng la KZN a nkile qubu ea li-subpoena tse tlamiloeng ka ribone e khubelu.",
    nso: "A eme ka gare ga rotunda ya mmabole ya Kgorotsheko ye Kgolo ya KZN a swere sehlopha sa masamantisi a makhwibidu ka tlase ga legetla.",
    tn: "A eme mo rotundeng ya mmabole ya Kgotlatshekelo e Kgolo ya KZN a tshotse bokoa jwa di-subpoena tsa diribone tse dikhubedu.",
    ts: "A yime e rotunda ya maribolo ya Hubo leyi Tlakukeke ya KZN a khome ntlawa wa switsundzuxo swa riboni ro tshwuka.",
    ss: "Eme erotunda yemabula yeNkantolo Lephakeme yase-KZN aphetse emaphepha labomvu lamanyiswe ngaphansi kwengalo yakhe.",
    ve: "U ima rotunda ya mabulu ya Khothe Khulwane ya KZN o fara thulwi ya dzwidagadziso zho vhofhwaho nga riboni li tswuku."
  },
  "Lowering his voice as two defense advocates walk past.": {
    en: "Lowering his voice as two defense advocates walk past.",
    af: "Laat sak sy stem terwyl twee verdedigingsadvokate verbyloop.",
    zu: "Ehlisa izwi lakhe ngenkathi amagqwetha amabili abavikeli edlula.",
    xh: "Ehlisa ilizwi lakhe ngelixa amagqwetha amabini okuzikhusela edlula.",
    st: "A theola lentsoe la hae ha babuelli ba babeli ba tšhireletso ba feta.",
    nso: "A theošetša lentšu la gagwe fase mola babueledi ba babedi ba tšhireletšo ba feta.",
    tn: "A wisa lentswe la gagwe tlase fa baemedi ba babedi ba itshireletso ba feta.",
    ts: "A thwela rito rakwe ehansi loko magqwetha mambirhi ya vusirheleri ma hundza.",
    ss: "Ehlisa livi lakhe nakwedlula babu議論eli lababili bekutivikela.",
    ve: "U fhungudza ipfi lawe musi vhadzireleli vhavhili vha tshi khou fhira."
  },
  "Stamping the affidavit with the red DPCI seal.": {
    en: "Stamping the affidavit with the red DPCI seal.",
    af: "Stempel die beëdigde verklaring met die rooi DPCI-seël.",
    zu: "Eshaya isitampu ku-affidavit ngesitembu esibomvu se-DPCI.",
    xh: "Estampa i-affidavit ngesitampu esibomvu se-DPCI.",
    st: "A setempa setatemente ka setempe se sefubelu sa DPCI.",
    nso: "A gatiša setatamente ka seswantšho se sekhwibidu sa DPCI.",
    tn: "A tsenya setempe mo setatamenteng ka setempe se sekhubedu sa DPCI.",
    ts: "A gandlisa xitifiketi hi xitempe xo tshwuka xa DPCI.",
    ss: "Afaka sitampu ku-affidavit ngesitembu lesibovu se-DPCI.",
    ve: "U tampinga afidaviti nga tshitampu tshitswuku tsha DPCI."
  },
  "Standing amid rows of UV-lit hydroponic citrus trees and stainless-steel distillation towers in the misty Midlands hills.": {
    en: "Standing amid rows of UV-lit hydroponic citrus trees and stainless-steel distillation towers in the misty Midlands hills.",
    af: "Staan tussen rye UV-verligte hidroponiese sitrusbome en vlekvryestaal-distilleringstorings in die mistige Midlands-heuwels.",
    zu: "Emi phakathi kwemigqa yezihlahla ze-citrus ze-hydroponic ezikhanyiswe nge-UV nemibhoshongo yokucwenga ezintabeni ezinenkungu zase-Midlands.",
    xh: "Eme phakathi kwemigqa yemithi ye-citrus ye-hydroponic ekhanyiswe nge-UV kunye neenqaba zentsimbi engangcoliyo kwiinduli zaseMidlands ezigcwele inkungu.",
    st: "A eme har'a mela ea lifate tsa lamunu tsa hydroponic tse bonesitsoeng ke UV le litora tsa tšepe lithabeng tsa Midlands tse nang le moholi.",
    nso: "A eme magareng ga methalo ya mehlare ya citrus ya hydroponic ye e bonesitšwego ke UV le ditora tša tšhipi dithabeng tša Midlands tša mouwane.",
    tn: "A eme fa gare ga mela ya ditlhare tsa citrus tsa hydroponic tse di bonesitsweng ke UV le ditora tsa tshipi mo dithabeng tsa Midlands tse di nang le mouwane.",
    ts: "A yime exikarhi ka milayeni ya mirhi ya citrus ya hydroponic leyi voningiwaka hi UV ni titora ta nsimbi etitsungeni ta Midlands leti nga ni hunguva.",
    ss: "Eme emkhatsini wemigca yetihlahla te-citrus letikhanyiswe nge-UV nemibhoshongo yensimbi etintsabeni tase-Midlands letinenkungu.",
    ve: "U ima vhukati ha dzinnda dza muri ya citrus ya hydroponic yo vhonetshelwaho nga UV na thora dza tsimbi thavhani dza Midlands dzo dalaho khunvi."
  },
  "Running a gloved hand over a crate stenciled for Rotterdam.": {
    en: "Running a gloved hand over a crate stenciled for Rotterdam.",
    af: "Vryf 'n gehandskoende hand oor 'n krat gemerk vir Rotterdam.",
    zu: "Ehambisa isandla esinegilavu ebhokisini elibhalwe iRotterdam.",
    xh: "Ehambisa isandla esineglavu phezu kwebhokisi elibhalwe iRotterdam.",
    st: "A pholla letsoho le nang le tlelafo holim'a krate e ngotsoeng Rotterdam.",
    nso: "A sepetša seatla sa lešela godimo ga lepokisi le le ngwadilwego Rotterdam.",
    tn: "A fetisa seatla se se nang le seatlana mo kgetsing e e kwadilweng Rotterdam.",
    ts: "A fambisa voko leri nga ni glavu e henhla ka bokisi leri tsariweke Rotterdam.",
    ss: "Agijimisa sandla lesinegilavu ebhokisini lelibhalwe Rotterdam.",
    ve: "U pembisa tshanda tsho ambadzaho gilovisi ntha ha gudedzi lo nwalwaho Rotterdam."
  },
  "Dialing a short code on his satellite handset and speaking in crisp isiZulu.": {
    en: "Dialing a short code on his satellite handset and speaking in crisp isiZulu.",
    af: "Bel 'n kortkode op sy satelliettelefoon en praat in duidelike isiZulu.",
    zu: "Eshaya ikhodi emfushane ocingweni lwakhe lwesathelayithi futhi ekhuluma isiZulu esicacile.",
    xh: "Ecofa ikhowudi emfutshane kwifowuni yakhe yesathelayithi kwaye ethetha isiZulu esicacileyo.",
    st: "A letsetsa khoutu e khutšoanyane founung ea hae ea sathelaete mme a bua ka Sezulu se hlakileng.",
    nso: "A letsa khoutu e kopana mogaleng wa gagwe wa sathelaete gomme a bolela ka Sezulu sa go hlaka.",
    tn: "A letsa khoutu e khutshwane mo mogaleng wa gagwe wa sathelaete mme a bua ka Sezulu se se tlhapileng.",
    ts: "A chayela khodi yo koma eka foni yakwe ya sathelayiti a vulavula hi Xizulu xo tenga.",
    ss: "Ashaya ikhodi lemfishane ocingweni lwakhe lwesathelayithi akhulume siZulu lesicacile.",
    ve: "U daya khoudu pfufhi kha lutingo lwawe lwa sathilayithi a tshi amba tshiZulu tsho kunaho."
  },
  "Standing on the rain-lashed tarmac beside the screaming twin turbines of Gulfstream ZS-900, flanked by blue-light NYALA armoured carriers.": {
    en: "Standing on the rain-lashed tarmac beside the screaming twin turbines of Gulfstream ZS-900, flanked by blue-light NYALA armoured carriers.",
    af: "Staan op die reëngeslaan teerpad langs die skreeuende tweelingturbines van Gulfstream ZS-900, geflankeer deur bloulig-NYALA-pantservoertuie.",
    zu: "Emi etiyeleni elishaywe yimvula eceleni kwezinjini ezimbili ezikhalayo ze-Gulfstream ZS-900, ehaqwe izimoto ze-NYALA ezinezibani eziluhlaza.",
    xh: "Eme kwitela elibethwe yimvula ecaleni kwee-injini ezimbili ze-Gulfstream ZS-900, ejikelezwe ziinqwelo ze-NYALA ezinamalitha aluhlaza.",
    st: "A eme tseleng ea sekontiri e otlilweng ke pula pel'a liturbine tse peli tsa Gulfstream ZS-900, a pota-potiloe ke likoloi tsa sesole tsa NYALA tse nang le mabone a maputsoa.",
    nso: "A eme godimo ga taramaka ye e otlilwego ke pula kgauswi le dithepine tše pedi tša Gulfstream ZS-900, a dikologilwe ke dikoloi tša sešole tša NYALA tša mabone a matala.",
    tn: "A eme mo godimo ga tarmac e e iteilweng ke pula gaufi le diturbine tse pedi tsa Gulfstream ZS-900, a dikanyeditswe ke dikoloi tsa NYALA tsa dipone tse dipududu.",
    ts: "A yime e henhla ka tarimak ya mpfula ekusuhi ni ti-turbine timbirhi ta Gulfstream ZS-900, a rhendzeriwile hi mimovha ya NYALA leyi nga ni mavoni ya wasi.",
    ss: "Eme ethileni lelishaywe yimvula eceleni kwetinjini letimbili te-Gulfstream ZS-900, azungezwe tindiza te-NYALA letinetibane letiluhlaza.",
    ve: "U ima thamakhani yo rwaho nga mvula tsini ha dzinjini mbili dza Gulfstream ZS-900, o tanganyedzwa nga mimovha ya NYALA i re na dzilayithi dza lutombo."
  },
  "Shouting over the whine of the Gulfstream jet engines.": {
    en: "Shouting over the whine of the Gulfstream jet engines.",
    af: "Skree bo-oor die gefluit van die Gulfstream-straalenjins.",
    zu: "Ememeza phezu komsindo wezinjini zejethi ye-Gulfstream.",
    xh: "Ekhwaza ngaphezu kwesandi seenjini zejet zaseGulfstream.",
    st: "A hoeletsa holim'a molumo oa lienjini tsa jete ea Gulfstream.",
    nso: "A goelela ka godimo ga lešata la dienjine tša jete ya Gulfstream.",
    tn: "A goa mo godimo ga modumo wa dienjene tsa jete ya Gulfstream.",
    ts: "A huwelela e henhla ka modumo wa ti-injini ta jete ya Gulfstream.",
    ss: "Amemeta ngetulu kwemsindvo wetinjini tejeti ye-Gulfstream.",
    ve: "U vhidzelela ntha ha muvhuso wa dzinjini dza jethi ya Gulfstream."
  },
  "Looking back in alarm as two TRT Nyala crews switch off their roof strobes and reverse away.": {
    en: "Looking back in alarm as two TRT Nyala crews switch off their roof strobes and reverse away.",
    af: "Kyk verskrik om terwyl twee TRT Nyala-spanne hul dakflitsers afskakel en agteruitry.",
    zu: "Ebheka emuva ngokwethuka ngenkathi amaqembu amabili e-TRT Nyala ecima izibani zawo zophahla abese ehlehla.",
    xh: "Ejonga ngasemva ngokothuka njengoko amaqela amabini e-TRT Nyala ecima izibane zawo zophahla aze ahlehle.",
    st: "A hetla ka tšabo ha lihlopha tse peli tsa TRT Nyala li tima mabone a tsona a marulelo mme li khutlela morao.",
    nso: "A lebelela morago ka letšhogo mola dihlopha tše pedi tša TRT Nyala di tima mabone a tšona a marulelo gomme tša boela morago.",
    tn: "A gadima morago ka letshogo fa ditlhopha tse pedi tsa TRT Nyala di tima dipone tsa tsone tsa marulelo mme di boela morago.",
    ts: "A languta ndzhaku hi ku chava loko mintlawa yimbirhi ya TRT Nyala yi timula mavoni ya yona ya lwandle yi tlhelela ndzhaku.",
    ss: "Abuka emuva ngekwetfuka nakutsi emacembu lamabili e-TRT Nyala acime tibane tawo teluphahla abese ayahlehla.",
    ve: "U sedza murahu nga tshitshuwo musi zwigwada zwivhili zwa TRT Nyala zwi tshi dzima dzilayithi dza thungo zha thoma u humela murahu."
  }
};

const UI_EXTRA = {
  "ui.requires": {
    en: "Requires",
    af: "Vereis",
    zu: "Kudingeka",
    xh: "Kufuneka",
    st: "Hlokahala",
    nso: "Nyakega",
    tn: "Tlhokega",
    ts: "Laveka",
    ss: "Kudzingeka",
    ve: "Zwi Toda"
  },
  "role.whistleblower": {
    en: "Whistleblower",
    af: "Fluitjieblaser",
    zu: "Umdaluli Wemfihlo",
    xh: "Umpempe-mvula",
    st: "Mosenodi",
    nso: "Mogaba-lephiri",
    tn: "Moitsisi wa Sephiri",
    ts: "Mutsundzuxi wa Vuxisi",
    ss: "Umbhali Wemaciniso",
    ve: "Mubviseli-Nnda"
  },
  "role.wounded_whistleblower": {
    en: "Wounded Whistleblower",
    af: "Gewonde Fluitjieblaser",
    zu: "Umdaluli Wemfihlo Olimele",
    xh: "Umpempe-mvula Owenzakeleyo",
    st: "Mosenodi ea Lemetseng",
    nso: "Mogaba-lephiri yo a Gobetšego",
    tn: "Moitsisi wa Sephiri yo o Gobetseng",
    ts: "Mutsundzuxi wa Vuxisi la Vavaliweke",
    ss: "Umbhali Wemaciniso Lolimele",
    ve: "Mubviseli-Nnda o Khakhamalwaho"
  }
};

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 40);
}

const langs = ['en', 'af', 'zu', 'xh', 'st', 'nso', 'tn', 'ts', 'ss', 've'];

let totalInjected = 0;

for (const lang of langs) {
  const filePath = path.join(I18N_DIR, `${lang}.json`);
  const dict = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Inject UI extras
  for (const [key, transMap] of Object.entries(UI_EXTRA)) {
    dict[key] = transMap[lang] || transMap.en;
    totalInjected++;
  }

  // Also fix event.evt_nandi_critical.role
  dict['event.evt_nandi_critical.role'] = UI_EXTRA['role.wounded_whistleblower'][lang] || 'Wounded Whistleblower';

  // Inject all moods
  for (const [enMood, transMap] of Object.entries(MOODS_MAP)) {
    const key = `mood.${slugify(enMood)}`;
    dict[key] = transMap[lang] || transMap.en;
    totalInjected++;
  }

  fs.writeFileSync(filePath, JSON.stringify(dict, null, 2), 'utf8');
  console.log(`Updated ${lang}.json`);
}

console.log(`Successfully injected ${totalInjected} translations across all 10 languages.`);
