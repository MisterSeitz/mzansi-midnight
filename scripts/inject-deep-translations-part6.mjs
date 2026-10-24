// scripts/inject-deep-translations-part6.mjs
import fs from 'fs';
import path from 'path';

const I18N_DIR = path.resolve('data/i18n');

const TRANSLATIONS = {
  en: {
    // Dialogue Notification Screen & Controls
    "dialogue.intel_secured": "INTEL SECURED:",
    "ui.dismiss": "Dismiss",
    "dialogue.one_time_intel": "One-Time Intel",
    "dialogue.select_response": "Select Interrogation / Response Line (0 Dice Cost)",

    // Left Menu Clocks & Dossier
    "clocks.type_threat": "Threat Clock",
    "clocks.type_opportunity": "Investigation",
    "clocks.on_heat": "On Heat",
    "clocks.on_roll": "On Roll",
    "ui.evidence_dossier": "Evidence & Gear Dossier",
    "ui.tap_to_inspect": "Tap to inspect",
    "ui.speak_with_contact": "Speak with Contact",
    "ui.menu": "MENU",

    // Prologue roles
    "pnode.scene_2_the_door.role": "SAPS Rapid Rail & Highway Patrol (Your Former Rookie)",
    "pnode.scene_3_the_ambush.role": "Wounded Whistleblower",

    // Safehouse role
    "dialogue.n1_safehouse.role": "Wounded Whistleblower • Key Witness",

    // Dialogue moods
    "mood.tracing_trembling_finger": "Tracing a trembling finger across the carbon-copy invoice.",
    "mood.eyes_fixed_rain": "Eyes fixed on the rain streaking the louvered glass.",
    "mood.fierce_relief": "A fierce, exhausted relief breaking across her face.",

    // Reward summaries
    "reward.audit_docket_composure": "+1 Audit Docket #409 Clock, +10% Composure",
    "reward.nandi_wound_composure": "+15% Composure, -1 Nandi Gunshot Wound Clock",
    "reward.precinct_heat_syndicate": "-1 Precinct Heat, +1 Street Syndicate Rep",
    "reward.cash_450": "+R450 Cash",
    "reward.mokoena_sweep_trt": "-1 Brigadier Mokoena’s Sweep Clock, +1 SAPS TRT Rep",
    "reward.cash_600_heat": "+R600 Hush Money, -1 Precinct Heat",
    "reward.cash_500_city_hall": "+R500 Consulting Fee, +1 City Hall Rep, -1 Precinct Heat",
    "reward.crack_phone_composure": "+10% Composure, +1 Crack Auditor’s Handset Clock",
    "reward.crack_phone_clock": "+1 Crack Auditor’s Handset Clock, +10% Composure",
    "reward.precinct_heat_rest": "-1 Precinct Heat, +10% Composure (Costs R100)",
    "reward.cash_700_abasanta": "+R700 Cash, +1 Abasanta Rep",
    "reward.mokoena_sweep_composure": "+15% Composure, -1 Brigadier Mokoena’s Sweep Clock",
    "reward.hawks_rep_heat": "+1 Hawks Rep, -1 Precinct Heat, +15% Composure",
    "reward.trust_clock_contempt": "+1 Trace Sovereign Pearl Trust Clock, -1 Contempt Warrant",
    "reward.cash_800_city_hall": "+R800 Offshore Cash, +1 City Hall Rep",
    "reward.telemetry_depot_hit_squad": "+1 Synthesize Super-Lab Telemetry Clock, -1 Izinkabi Hit Squad Clock",
    "reward.trust_contempt_composure": "+1 Trace Sovereign Pearl Trust Clock, -1 Contempt Warrant, +10% Composure",
    "reward.hit_squad_cash_abasanta": "-2 Izinkabi Hit Squad Clock, +R900 Cash, +1 Abasanta Rep",
    "reward.hit_squad_composure": "-2 Izinkabi Hit Squad Clock, +15% Composure"
  },
  af: {
    "dialogue.intel_secured": "INLIGTING VERKRY:",
    "ui.dismiss": "Maak toe",
    "dialogue.one_time_intel": "Eenmalige Inligting",
    "dialogue.select_response": "Kies Ondervraging / Reaksielyn (0 Dobbelsteen-koste)",

    "clocks.type_threat": "Bedreigingshorlosie",
    "clocks.type_opportunity": "Ondersoek",
    "clocks.on_heat": "Op Hitte",
    "clocks.on_roll": "Per Rol",
    "ui.evidence_dossier": "Bewysstukke & Toerusting-dossier",
    "ui.tap_to_inspect": "Tik om te inspekteer",
    "ui.speak_with_contact": "Praat met Kontak",
    "ui.menu": "KIESLYS",

    "pnode.scene_2_the_door.role": "SAPD Snelle Spoor- & Hoofwegpatrollie (Jou Voormalige Nuweling)",
    "pnode.scene_3_the_ambush.role": "Gewonde Fluitjieblaser",

    "dialogue.n1_safehouse.role": "Gewonde Fluitjieblaser • Sleutelgetuie",

    "mood.tracing_trembling_finger": "Trek 'n bewende vinger oor die deurslagfaktuur.",
    "mood.eyes_fixed_rain": "Oë gevestig op die reën wat oor die hortjiesglas stroom.",
    "mood.fierce_relief": "'n Intense, uitgeputte verligting spoel oor haar gesig.",

    "reward.audit_docket_composure": "+1 Oudit Dossier #409-horlosie, +10% Kalmte",
    "reward.nandi_wound_composure": "+15% Kalmte, -1 Nandi se Skietwond-horlosie",
    "reward.precinct_heat_syndicate": "-1 Wyk-hitte, +1 Straat-sindikaat Rep",
    "reward.cash_450": "+R450 Kontant",
    "reward.mokoena_sweep_trt": "-1 Brigadier Mokoena se Soektog-horlosie, +1 SAPD TRT Rep",
    "reward.cash_600_heat": "+R600 Swyg geld, -1 Wyk-hitte",
    "reward.cash_500_city_hall": "+R500 Konsultasiefooi, +1 Stadsaal Rep, -1 Wyk-hitte",
    "reward.crack_phone_composure": "+10% Kalmte, +1 Kraak Ouditeur se Selfoon-horlosie",
    "reward.crack_phone_clock": "+1 Kraak Ouditeur se Selfoon-horlosie, +10% Kalmte",
    "reward.precinct_heat_rest": "-1 Wyk-hitte, +10% Kalmte (Kos R100)",
    "reward.cash_700_abasanta": "+R700 Kontant, +1 Abasanta Rep",
    "reward.mokoena_sweep_composure": "+15% Kalmte, -1 Brigadier Mokoena se Soektog-horlosie",
    "reward.hawks_rep_heat": "+1 Valke Rep, -1 Wyk-hitte, +15% Kalmte",
    "reward.trust_clock_contempt": "+1 Spoor Sovereign Pearl Trust-horlosie, -1 Minagting-lasbrief",
    "reward.cash_800_city_hall": "+R800 Buitelandse Kontant, +1 Stadsaal Rep",
    "reward.telemetry_depot_hit_squad": "+1 Sintetiseer Super-Lab Telemetrie-horlosie, -1 Izinkabi-moordbende-horlosie",
    "reward.trust_contempt_composure": "+1 Spoor Sovereign Pearl Trust-horlosie, -1 Minagting-lasbrief, +10% Kalmte",
    "reward.hit_squad_cash_abasanta": "-2 Izinkabi-moordbende-horlosie, +R900 Kontant, +1 Abasanta Rep",
    "reward.hit_squad_composure": "-2 Izinkabi-moordbende-horlosie, +15% Kalmte"
  },
  zu: {
    "dialogue.intel_secured": "ULWAZI LUVUNYELWE:",
    "ui.dismiss": "Susa",
    "dialogue.one_time_intel": "Ulwazi Lwesikhathi Esisodwa",
    "dialogue.select_response": "Khetha Umugqa Wokuphenya / Impendulo (Izindleko Zedayisi ezingu-0)",

    "clocks.type_threat": "Iwashi Lesisongelo",
    "clocks.type_opportunity": "Uphenyo",
    "clocks.on_heat": "Ekushiseni",
    "clocks.on_roll": "Ngokuphonsa",
    "ui.evidence_dossier": "Ifayela Lobufakazi Nezinsiza",
    "ui.tap_to_inspect": "Thepha ukuze uhlole",
    "ui.speak_with_contact": "Khuluma Nomuntu Oxhumana Naye",
    "ui.menu": "IMENU",

    "pnode.scene_2_the_door.role": "SAPS Amaphoyisa Omgwaqo Kaloliwe Nomgwaqo Omkhulu (Owayengumfundi Wakho)",
    "pnode.scene_3_the_ambush.role": "Umdaluli Wemfihlo Olimele",

    "dialogue.n1_safehouse.role": "Umdaluli Wemfihlo Olimele • Ufakazi Oqavile",

    "mood.tracing_trembling_finger": "Ulandelela umunwe oqhaqhazelayo phezu kwe-invoice ye-carbon-copy.",
    "mood.eyes_fixed_rain": "Amehlo agxile emvuleni eyehla ewindini elinezimbobo.",
    "mood.fierce_relief": "Ukukhululeka okukhulu nokuqeda amandla kubonakala ebusweni bakhe.",

    "reward.audit_docket_composure": "+1 Iwashi Le-Docket #409, +10% Ukuzola",
    "reward.nandi_wound_composure": "+15% Ukuzola, -1 Iwashi Lenxeba Lesibhamu LikaNandi",
    "reward.precinct_heat_syndicate": "-1 Ukushisa Kwesiteshi, +1 Idumela Lesindikethe Yasesitaladini",
    "reward.cash_450": "+R450 Imali Yokheshi",
    "reward.mokoena_sweep_trt": "-1 Iwashi Lomkhankaso Ka-Mokoena, +1 Idumela le-SAPS TRT",
    "reward.cash_600_heat": "+R600 Imali Yokuthulisa, -1 Ukushisa Kwesiteshi",
    "reward.cash_500_city_hall": "+R500 Imali Yokubonisana, +1 Idumela LaseHholo Ledolobha, -1 Ukushisa Kwesiteshi",
    "reward.crack_phone_composure": "+10% Ukuzola, +1 Iwashi Lokuvula Ucingo Lomcwaningi",
    "reward.crack_phone_clock": "+1 Iwashi Lokuvula Ucingo Lomcwaningi, +10% Ukuzola",
    "reward.precinct_heat_rest": "-1 Ukushisa Kwesiteshi, +10% Ukuzola (Kubiza R100)",
    "reward.cash_700_abasanta": "+R700 Imali Yokheshi, +1 Idumela Lase-Abasanta",
    "reward.mokoena_sweep_composure": "+15% Ukuzola, -1 Iwashi Lomkhankaso Ka-Mokoena",
    "reward.hawks_rep_heat": "+1 Idumela LoKlebe, -1 Ukushisa Kwesiteshi, +15% Ukuzola",
    "reward.trust_clock_contempt": "+1 Iwashi Lokulandelela i-Sovereign Pearl Trust, -1 Incwadi Yokuboshwa",
    "reward.cash_800_city_hall": "+R800 Imali Yaphesheya, +1 Idumela LaseHholo Ledolobha",
    "reward.telemetry_depot_hit_squad": "+1 Iwashi Lokuhlanganisa i-Super-Lab Telemetry, -1 Iwashi Lezinkabi",
    "reward.trust_contempt_composure": "+1 Iwashi Lokulandelela i-Sovereign Pearl Trust, -1 Incwadi Yokuboshwa, +10% Ukuzola",
    "reward.hit_squad_cash_abasanta": "-2 Iwashi Lezinkabi, +R900 Imali Yokheshi, +1 Idumela Lase-Abasanta",
    "reward.hit_squad_composure": "-2 Iwashi Lezinkabi, +15% Ukuzola"
  },
  xh: {
    "dialogue.intel_secured": "ULWAZI LUFUMANWE:",
    "ui.dismiss": "Gxotha",
    "dialogue.one_time_intel": "Ulwazi Lwexesha Elinye",
    "dialogue.select_response": "Khetha Umgca Wokuncinwa / Impendulo (Iindleko Zedeyisi ezingama-0)",

    "clocks.type_threat": "Iwotshi Yosongelo",
    "clocks.type_opportunity": "Uphando",
    "clocks.on_heat": "Kushushu",
    "clocks.on_roll": "Ngokuphosa",
    "ui.evidence_dossier": "Idosiye Yobungqina Nezixhobo",
    "ui.tap_to_inspect": "Cofa ukuze uhlole",
    "ui.speak_with_contact": "Thetha Noqhagamshelwano",
    "ui.menu": "IMENYU",

    "pnode.scene_2_the_door.role": "SAPS Amapolisa Kaloliwe Nomgwaqo Omkhulu (Owayesakuba nguMtsha Wakho)",
    "pnode.scene_3_the_ambush.role": "Umpempe-mvula Owenzakeleyo",

    "dialogue.n1_safehouse.role": "Umpempe-mvula Owenzakeleyo • Ingqina Elingundoqo",

    "mood.tracing_trembling_finger": "Ukulandelela umnwe ogxumagxumayo phezu kwe-invoyisi yekhabhoni.",
    "mood.eyes_fixed_rain": "Amehlo athe nzo kwimvula ephuma kwiglasi elungisiweyo.",
    "mood.fierce_relief": "Isiqabu esinzulu nesidinisayo sibonakala ebusweni bakhe.",

    "reward.audit_docket_composure": "+1 Iwotshi ye-Docket #409, +10% Ukuzola",
    "reward.nandi_wound_composure": "+15% Ukuzola, -1 Iwotshi Yenxeba LikaNandi",
    "reward.precinct_heat_syndicate": "-1 Ubushushu Besikhululo, +1 Idumela Lesindikethi Yasesitalatweni",
    "reward.cash_450": "+R450 Imali eyiKhesh",
    "reward.mokoena_sweep_trt": "-1 Iwotshi yoTshayelo lukaMokoena, +1 Idumela le-SAPS TRT",
    "reward.cash_600_heat": "+R600 Imali yoKuthula, -1 Ubushushu Besikhululo",
    "reward.cash_500_city_hall": "+R500 Imali yoCebo, +1 Idumela leHolo yeDolophu, -1 Ubushushu Besikhululo",
    "reward.crack_phone_composure": "+10% Ukuzola, +1 Iwotshi yoQhekezo lweFowuni yoMphicothi",
    "reward.crack_phone_clock": "+1 Iwotshi yoQhekezo lweFowuni yoMphicothi, +10% Ukuzola",
    "reward.precinct_heat_rest": "-1 Ubushushu Besikhululo, +10% Ukuzola (Ixabisa R100)",
    "reward.cash_700_abasanta": "+R700 Imali eyiKhesh, +1 Idumela lase-Abasanta",
    "reward.mokoena_sweep_composure": "+15% Ukuzola, -1 Iwotshi yoTshayelo lukaMokoena",
    "reward.hawks_rep_heat": "+1 Idumela looKhozi, -1 Ubushushu Besikhululo, +15% Ukuzola",
    "reward.trust_clock_contempt": "+1 Iwotshi yoLandelwano lwe-Sovereign Pearl Trust, -1 Iwaranti yokuDela iNkundla",
    "reward.cash_800_city_hall": "+R800 Imali yaPhesheya, +1 Idumela leHolo yeDolophu",
    "reward.telemetry_depot_hit_squad": "+1 Iwotshi ye-Super-Lab Telemetry, -1 Iwotshi yeQela leZinkabi",
    "reward.trust_contempt_composure": "+1 Iwotshi yoLandelwano lwe-Sovereign Pearl Trust, -1 Iwaranti, +10% Ukuzola",
    "reward.hit_squad_cash_abasanta": "-2 Iwotshi yeQela leZinkabi, +R900 Imali, +1 Idumela lase-Abasanta",
    "reward.hit_squad_composure": "-2 Iwotshi yeQela leZinkabi, +15% Ukuzola"
  },
  st: {
    "dialogue.intel_secured": "TLHAHISOLESEDING E FUMANOENG:",
    "ui.dismiss": "Hlakola",
    "dialogue.one_time_intel": "Tlhahisoleseding ea Hang",
    "dialogue.select_response": "Kgetha Mola oa Lipotso / Karabo (Tšenyo ea 0 ea Litaele)",

    "clocks.type_threat": "Oache ea Tšokelo",
    "clocks.type_opportunity": "Dipatlisiso",
    "clocks.on_heat": "Motsotsong oa Kotsi",
    "clocks.on_roll": "Ka ho Phutha",
    "ui.evidence_dossier": "Dossier ea Bopaki le Lisebelisoa",
    "ui.tap_to_inspect": "Tobetsa ho hlahloba",
    "ui.speak_with_contact": "Bua le Mokhatlo",
    "ui.menu": "LENANE",

    "pnode.scene_2_the_door.role": "SAPS Sepolesa sa Terene e Potlakileng le Mmila o Moholo (Motho oa Hao oa Pele)",
    "pnode.scene_3_the_ambush.role": "Mosenodi ea Lemetseng",

    "dialogue.n1_safehouse.role": "Mosenodi ea Lemetseng • Paki ea Bohlokoa",

    "mood.tracing_trembling_finger": "Ho sala monoana o thothomelang morao holim'a invoice ea khophi ea k'habone.",
    "mood.eyes_fixed_rain": "Mahlo a tsepame puleng e theohang holim'a khalase.",
    "mood.fierce_relief": "Phomolo e tebileng ebile e khathetseng e bonahala sefahlehong sa hae.",

    "reward.audit_docket_composure": "+1 Oache ea Tokomane #409, +10% Boiketlo",
    "reward.nandi_wound_composure": "+15% Boiketlo, -1 Oache ea Leqeba la Sethunya la Nandi",
    "reward.precinct_heat_syndicate": "-1 Kotsi ea Seteishene, +1 Botumo ba Selekane sa Seterata",
    "reward.cash_450": "+R450 Chelete",
    "reward.mokoena_sweep_trt": "-1 Oache ea Phallo ea Mokoena, +1 Botumo ba SAPS TRT",
    "reward.cash_600_heat": "+R600 Chelete ea Khutso, -1 Kotsi ea Seteishene",
    "reward.cash_500_city_hall": "+R500 Tefo ea Boeletsi, +1 Botumo ba Holo ea Toropo, -1 Kotsi ea Seteishene",
    "reward.crack_phone_composure": "+10% Boiketlo, +1 Oache ea Mohala oa Mohlahlobi",
    "reward.crack_phone_clock": "+1 Oache ea Mohala oa Mohlahlobi, +10% Boiketlo",
    "reward.precinct_heat_rest": "-1 Kotsi ea Seteishene, +10% Boiketlo (E bitsa R100)",
    "reward.cash_700_abasanta": "+R700 Chelete, +1 Botumo ba Abasanta",
    "reward.mokoena_sweep_composure": "+15% Boiketlo, -1 Oache ea Phallo ea Mokoena",
    "reward.hawks_rep_heat": "+1 Botumo ba Mankwe, -1 Kotsi ea Seteishene, +15% Boiketlo",
    "reward.trust_clock_contempt": "+1 Oache ea Sovereign Pearl Trust, -1 Lengolo la Nyeliso",
    "reward.cash_800_city_hall": "+R800 Chelete ea Kantle, +1 Botumo ba Holo ea Toropo",
    "reward.telemetry_depot_hit_squad": "+1 Oache ea Super-Lab Telemetry, -1 Oache ea Sehlopha sa Izinkabi",
    "reward.trust_contempt_composure": "+1 Oache ea Sovereign Pearl Trust, -1 Lengolo, +10% Boiketlo",
    "reward.hit_squad_cash_abasanta": "-2 Oache ea Sehlopha sa Izinkabi, +R900 Chelete, +1 Botumo ba Abasanta",
    "reward.hit_squad_composure": "-2 Oache ea Sehlopha sa Izinkabi, +15% Boiketlo"
  },
  nso: {
    "dialogue.intel_secured": "TSHEDIMOŠO E HWEDITŠWE:",
    "ui.dismiss": "Tloša",
    "dialogue.one_time_intel": "Tshedimošo ya Gatee",
    "dialogue.select_response": "Kgetha Mothalo wa Dipotšišo / Phetolo (Tšhelete ya Ditaese tše 0)",

    "clocks.type_threat": "Sešupanako sa Tšhošetšo",
    "clocks.type_opportunity": "Nyakišišo",
    "clocks.on_heat": "Tlasa Kgatelelo",
    "clocks.on_roll": "Ka Kgokološo",
    "ui.evidence_dossier": "Dossier ya Bohlatse le Ditlabakelo",
    "ui.tap_to_inspect": "Kgotla go lekola",
    "ui.speak_with_contact": "Bolela le Mokgokaganyi",
    "ui.menu": "LENANE",

    "pnode.scene_2_the_door.role": "SAPS Maphodisa a Terene ya Lebelo le Mmila o Mogolo (Yo a kilego a ba Moswa wa Gago)",
    "pnode.scene_3_the_ambush.role": "Mogaba-lephiri yo a Gobetšego",

    "dialogue.n1_safehouse.role": "Mogaba-lephiri yo a Gobetšego • Hlatse ya Bohlokwa",

    "mood.tracing_trembling_finger": "O goga monwana wo o thothomelago godimo ga inboisi ya khophi ya khabone.",
    "mood.eyes_fixed_rain": "Mahlo a tsepame puleng yeo e elelago lepokising la galase.",
    "mood.fierce_relief": "Kimologo ye kgolo le yeo e lapišitšego e tšwelela sefahlegong sa gagwe.",

    "reward.audit_docket_composure": "+1 Sešupanako sa Dokete #409, +10% Khutšo",
    "reward.nandi_wound_composure": "+15% Khutšo, -1 Sešupanako sa Ntho ya Sethunya ya Nandi",
    "reward.precinct_heat_syndicate": "-1 Fiša ya Seteišene, +1 Botumo bja Sendikheiti ya Mmileng",
    "reward.cash_450": "+R450 Tšhelete",
    "reward.mokoena_sweep_trt": "-1 Sešupanako sa Mokoena sa go Feka, +1 Botumo bja SAPS TRT",
    "reward.cash_600_heat": "+R600 Tšhelete ya go Homola, -1 Fiša ya Seteišene",
    "reward.cash_500_city_hall": "+R500 Tuelo ya Boeletši, +1 Botumo bja Holo ya Toropo, -1 Fiša ya Seteišene",
    "reward.crack_phone_composure": "+10% Khutšo, +1 Sešupanako sa go Pšhatla Founu ya Mohlakiši",
    "reward.crack_phone_clock": "+1 Sešupanako sa go Pšhatla Founu ya Mohlakiši, +10% Khutšo",
    "reward.precinct_heat_rest": "-1 Fiša ya Seteišene, +10% Khutšo (Tšhelete R100)",
    "reward.cash_700_abasanta": "+R700 Tšhelete, +1 Botumo bja Abasanta",
    "reward.mokoena_sweep_composure": "+15% Khutšo, -1 Sešupanako sa Mokoena sa go Feka",
    "reward.hawks_rep_heat": "+1 Botumo bja Dihlodi, -1 Fiša ya Seteišene, +15% Khutšo",
    "reward.trust_clock_contempt": "+1 Sešupanako sa Sovereign Pearl Trust, -1 Lengwalo la go Nyatša Kgoro",
    "reward.cash_800_city_hall": "+R800 Tšhelete ya ka Ntle, +1 Botumo bja Holo ya Toropo",
    "reward.telemetry_depot_hit_squad": "+1 Sešupanako sa Telemetri ya Super-Lab, -1 Sešupanako sa Sehlopha sa Izinkabi",
    "reward.trust_contempt_composure": "+1 Sešupanako sa Sovereign Pearl Trust, -1 Lengwalo, +10% Khutšo",
    "reward.hit_squad_cash_abasanta": "-2 Sešupanako sa Sehlopha sa Izinkabi, +R900 Tšhelete, +1 Botumo bja Abasanta",
    "reward.hit_squad_composure": "-2 Sešupanako sa Sehlopha sa Izinkabi, +15% Khutšo"
  },
  tn: {
    "dialogue.intel_secured": "TSHEDIMOSETSO E AMOGETSWE:",
    "ui.dismiss": "Tlosa",
    "dialogue.one_time_intel": "Tshedimosetso ya Gangwe Fela",
    "dialogue.select_response": "Tlhopha Mola wa Dipotsolotso / Karabo (Tuelo ya Ditaese di le 0)",

    "clocks.type_threat": "Watšhe ya Matshosetsi",
    "clocks.type_opportunity": "Ditshekatsheko",
    "clocks.on_heat": "Mo Mogoteng",
    "clocks.on_roll": "Ka Go Phutha",
    "ui.evidence_dossier": "Dossier ya Bosupi le Ditlamelo",
    "ui.tap_to_inspect": "Tobetsa go tlhatlhoba",
    "ui.speak_with_contact": "Bua le Motho wa Sephiri",
    "ui.menu": "LENANE",

    "pnode.scene_2_the_door.role": "SAPS Mapodisi a Terena e e Bonako le Mmila o Mogolo (Moithuti wa Gago wa Pele)",
    "pnode.scene_3_the_ambush.role": "Moitsisi wa Sephiri yo o Gobetseng",

    "dialogue.n1_safehouse.role": "Moitsisi wa Sephiri yo o Gobetseng • Mosupi yo Mogolo",

    "mood.tracing_trembling_finger": "O sala monwana o o roromang morago mo inboiseng ya khophi ya khabone.",
    "mood.eyes_fixed_rain": "Matlho a tsepame mo puleng e e elelang mo galaseng.",
    "mood.fierce_relief": "Kgololo e e boteng le e e lapisang e tlhagelela mo sefatlhegong sa gagwe.",

    "reward.audit_docket_composure": "+1 Watšhe ya Dokete #409, +10% Boikgapho",
    "reward.nandi_wound_composure": "+15% Boikgapho, -1 Watšhe ya Ntho ya ga Nandi",
    "reward.precinct_heat_syndicate": "-1 Mogote wa Seteishene, +1 Botumo jwa Sendikheiti ya Mmileng",
    "reward.cash_450": "+R450 Madi a Phatla",
    "reward.mokoena_sweep_trt": "-1 Watšhe ya ga Mokoena ya Phepafatso, +1 Botumo jwa SAPS TRT",
    "reward.cash_600_heat": "+R600 Madi a go Didimala, -1 Mogote wa Seteishene",
    "reward.cash_500_city_hall": "+R500 Tuelo ya Dikgakololo, +1 Botumo jwa Holo ya Toropo, -1 Mogote wa Seteishene",
    "reward.crack_phone_composure": "+10% Boikgapho, +1 Watšhe ya Mogala wa Mosekaseki",
    "reward.crack_phone_clock": "+1 Watšhe ya Mogala wa Mosekaseki, +10% Boikgapho",
    "reward.precinct_heat_rest": "-1 Mogote wa Seteishene, +10% Boikgapho (Tuelo R100)",
    "reward.cash_700_abasanta": "+R700 Madi a Phatla, +1 Botumo jwa Abasanta",
    "reward.mokoena_sweep_composure": "+15% Boikgapho, -1 Watšhe ya ga Mokoena ya Phepafatso",
    "reward.hawks_rep_heat": "+1 Botumo jwa Mankwe, -1 Mogote wa Seteishene, +15% Boikgapho",
    "reward.trust_clock_contempt": "+1 Watšhe ya Sovereign Pearl Trust, -1 Waranti ya go Nyatsa Kgotla",
    "reward.cash_800_city_hall": "+R800 Madi a Mafatshe a Sele, +1 Botumo jwa Holo ya Toropo",
    "reward.telemetry_depot_hit_squad": "+1 Watšhe ya Super-Lab Telemetry, -1 Watšhe ya Setlhopha sa Izinkabi",
    "reward.trust_contempt_composure": "+1 Watšhe ya Sovereign Pearl Trust, -1 Waranti, +10% Boikgapho",
    "reward.hit_squad_cash_abasanta": "-2 Watšhe ya Setlhopha sa Izinkabi, +R900 Madi, +1 Botumo jwa Abasanta",
    "reward.hit_squad_composure": "-2 Watšhe ya Setlhopha sa Izinkabi, +15% Boikgapho"
  },
  ts: {
    "dialogue.intel_secured": "VUXOKOXOKO BYI KUMILE:",
    "ui.dismiss": "Sula",
    "dialogue.one_time_intel": "Vuxokoxoko bya Nkarhi Wun'we",
    "dialogue.select_response": "Hlawula Ntila wo Vutisa / Nhlamulo (Nxavo wa Dasi wa 0)",

    "clocks.type_threat": "Wachi ya Nchavo",
    "clocks.type_opportunity": "Vulavisisi",
    "clocks.on_heat": "Ku Hiseni",
    "clocks.on_roll": "Hi ku Rhindzisa",
    "ui.evidence_dossier": "Fayili ya Vumbhoni na Switirho",
    "ui.tap_to_inspect": "Tshinya ku kambela",
    "ui.speak_with_contact": "Vulavula na Loyi a Tihlanganisaka na Yena",
    "ui.menu": "MENYU",

    "pnode.scene_2_the_door.role": "SAPS Maphorisa ya Xitimela xa Rivengo ni Patu Leyikulu (Loyi a a ri Mutirhi wa Wena wa Khale)",
    "pnode.scene_3_the_ambush.role": "Mutsundzuxi wa Vuxisi la Vavaliweke",

    "dialogue.n1_safehouse.role": "Mutsundzuxi wa Vuxisi la Vavaliweke • Mboni ya Nkoka",

    "mood.tracing_trembling_finger": "U kongomisa ritiho leri rhurhumelaka eka inivoyisi ya khophi ya khabhoni.",
    "mood.eyes_fixed_rain": "Mahlo ma langute mpfula leyi xikaka eka nghilazi ya xivalo.",
    "mood.fierce_relief": "Ku ntshunxeka lokukulu ni loku karhataka ku vonaka exikandzeni xa yena.",

    "reward.audit_docket_composure": "+1 Wachi ya Doketi #409, +10% Ku Rhula",
    "reward.nandi_wound_composure": "+15% Ku Rhula, -1 Wachi ya Xilondza xa Nandi",
    "reward.precinct_heat_syndicate": "-1 Ku Hisa ka Xitichi, +1 Ndhuma ya Sendikheti ya le Xitarateni",
    "reward.cash_450": "+R450 Mali ya Rhandi",
    "reward.mokoena_sweep_trt": "-1 Wachi ya Mokoena yo Kukula, +1 Ndhuma ya SAPS TRT",
    "reward.cash_600_heat": "+R600 Mali yo Miyeletisa, -1 Ku Hisa ka Xitichi",
    "reward.cash_500_city_hall": "+R500 Mali yo Tsundzuxa, +1 Ndhuma ya Holo ya Doroba, -1 Ku Hisa ka Xitichi",
    "reward.crack_phone_composure": "+10% Ku Rhula, +1 Wachi yo Pfula Riqingho ra Mukambisisi",
    "reward.crack_phone_clock": "+1 Wachi yo Pfula Riqingho ra Mukambisisi, +10% Ku Rhula",
    "reward.precinct_heat_rest": "-1 Ku Hisa ka Xitichi, +10% Ku Rhula (Nxavo R100)",
    "reward.cash_700_abasanta": "+R700 Mali ya Rhandi, +1 Ndhuma ya Abasanta",
    "reward.mokoena_sweep_composure": "+15% Ku Rhula, -1 Wachi ya Mokoena yo Kukula",
    "reward.hawks_rep_heat": "+1 Ndhuma ya Mphungu, -1 Ku Hisa ka Xitichi, +15% Ku Rhula",
    "reward.trust_clock_contempt": "+1 Wachi ya Sovereign Pearl Trust, -1 Xileriso xo Nyatsa Khoto",
    "reward.cash_800_city_hall": "+R800 Mali ya le Matikweni Mambe, +1 Ndhuma ya Holo ya Doroba",
    "reward.telemetry_depot_hit_squad": "+1 Wachi ya Super-Lab Telemetry, -1 Wachi ya Ntlawa wa Izinkabi",
    "reward.trust_contempt_composure": "+1 Wachi ya Sovereign Pearl Trust, -1 Xileriso, +10% Ku Rhula",
    "reward.hit_squad_cash_abasanta": "-2 Wachi ya Ntlawa wa Izinkabi, +R900 Mali, +1 Ndhuma ya Abasanta",
    "reward.hit_squad_composure": "-2 Wachi ya Ntlawa wa Izinkabi, +15% Ku Rhula"
  },
  ss: {
    "dialogue.intel_secured": "LWAZI LUTFOLAKELE:",
    "ui.dismiss": "Khipha",
    "dialogue.one_time_intel": "Lwazi Lwekukodvwa",
    "dialogue.select_response": "Khetsa Umugca Wekuphenywa / Imphendvulo (Tindleko Telidayisi letili-0)",

    "clocks.type_threat": "I-Washi Yekusongela",
    "clocks.type_opportunity": "Kuphenya",
    "clocks.on_heat": "Ekushiseni",
    "clocks.on_roll": "Ngekuphenya",
    "ui.evidence_dossier": "Ifayela Yebufakazi Netinsita",
    "ui.tap_to_inspect": "Cindzetela kute uhlole",
    "ui.speak_with_contact": "Khuluma Nemuntfu Loxhumana Naye",
    "ui.menu": "IMENYU",

    "pnode.scene_2_the_door.role": "SAPS Emaphoyisa Eloliwe Lemnyenti Nemgwaco Lomkhulu (Lobekangumfundzi Wakho)",
    "pnode.scene_3_the_ambush.role": "Umbhali Wemaciniso Lolimele",

    "dialogue.n1_safehouse.role": "Umbhali Wemaciniso Lolimele • Fakazi Lobalulekile",
    "clock.audit_docket_409.title": "Hlola i-Docket #409",

    "mood.tracing_trembling_finger": "Ulandzela umunwe lovevetelako etulu kwe-invoice yekhophi yekhabhoni.",
    "mood.eyes_fixed_rain": "Emehlo agcile emvuleni leyehla ewindini lelinezimbobo.",
    "mood.fierce_relief": "Kukhululeka lokukhulu nalokuphelelwa ngemandla kubonakala ebusweni bakhe.",

    "reward.audit_docket_composure": "+1 I-Washi Ye-Docket #409, +10% Kuthula",
    "reward.nandi_wound_composure": "+15% Kuthula, -1 I-Washi Yelinxeba LaNandi",
    "reward.precinct_heat_syndicate": "-1 Kufutfumala Kwasesiteshini, +1 Lidvumela Lesindikethe Yasesitaladini",
    "reward.cash_450": "+R450 Imali Yelukheshi",
    "reward.mokoena_sweep_trt": "-1 I-Washi Yekusesha yaMokoena, +1 Lidvumela le-SAPS TRT",
    "reward.cash_600_heat": "+R600 Imali Yekubamba Umlomo, -1 Kufutfumala Kwasesiteshini",
    "reward.cash_500_city_hall": "+R500 Imali Yekweluleka, +1 Lidvumela leHholwa Ledolobha, -1 Kufutfumala",
    "reward.crack_phone_composure": "+10% Kuthula, +1 I-Washi Yekuvula Lucingo Lwemcwaningi",
    "reward.crack_phone_clock": "+1 I-Washi Yekuvula Lucingo Lwemcwaningi, +10% Kuthula",
    "reward.precinct_heat_rest": "-1 Kufutfumala Kwasesiteshini, +10% Kuthula (Kubita R100)",
    "reward.cash_700_abasanta": "+R700 Imali Yelukheshi, +1 Lidvumela lase-Abasanta",
    "reward.mokoena_sweep_composure": "+15% Kuthula, -1 I-Washi Yekusesha yaMokoena",
    "reward.hawks_rep_heat": "+1 Lidvumela leMahlombe, -1 Kufutfumala Kwasesiteshini, +15% Kuthula",
    "reward.trust_clock_contempt": "+1 I-Washi Ye-Sovereign Pearl Trust, -1 Incwadzi Yekwedzelela Inkantolo",
    "reward.cash_800_city_hall": "+R800 Imali Yangesheya, +1 Lidvumela leHholwa Ledolobha",
    "reward.telemetry_depot_hit_squad": "+1 I-Washi Ye-Super-Lab Telemetry, -1 I-Washi Yelicembu Lezinkabi",
    "reward.trust_contempt_composure": "+1 I-Washi Ye-Sovereign Pearl Trust, -1 Incwadzi, +10% Kuthula",
    "reward.hit_squad_cash_abasanta": "-2 I-Washi Yelicembu Lezinkabi, +R900 Imali, +1 Lidvumela lase-Abasanta",
    "reward.hit_squad_composure": "-2 I-Washi Yelicembu Lezinkabi, +15% Kuthula"
  },
  ve: {
    "dialogue.intel_secured": "MAFHO NGO HO WANWA:",
    "ui.dismiss": "Bvisani",
    "dialogue.one_time_intel": "Mafhungo a Luthihi",
    "dialogue.select_response": "Nangani Muta wa Mbudziso / Phindulo (Mbadelo ya Daisi dza 0)",

    "clocks.type_threat": "Tshifhinga tsha Tshitshuwiso",
    "clocks.type_opportunity": "Thodisiso",
    "clocks.on_heat": "U Fhisa",
    "clocks.on_roll": "Nga u Posha",
    "ui.evidence_dossier": "Dossier ya Vhutanzi na Zwishumiswa",
    "ui.tap_to_inspect": "Dzidzanyani u itela u sedzulusa",
    "ui.speak_with_contact": "Ambhani na Mukwamani",
    "ui.menu": "MENYU",

    "pnode.scene_2_the_door.role": "SAPS Mapholisa a Zwidimela zwa Tshenzhemo na Bada Khulwane (Mugudi Wanu wa Kale)",
    "pnode.scene_3_the_ambush.role": "Mubviseli-Nnda o Khakhamalwaho",

    "dialogue.n1_safehouse.role": "Mubviseli-Nnda o Khakhamalwaho • Mboni ya Ntha",
    "clock.audit_docket_409.title": "Odithani Docket #409",

    "mood.tracing_trembling_finger": "U swika munwe u rerekaho ntha ha inwoisi ya khophi ya khaboni.",
    "mood.eyes_fixed_rain": "Mato o lavhelesa mvula i rothaho kha ngilasi.",
    "mood.fierce_relief": "U awela huhulwane na ho netisaho zwi tshi vhonala tshifhatuwoni tshawe.",

    "reward.audit_docket_composure": "+1 Tshifhinga tsha Docket #409, +10% Mulalo",
    "reward.nandi_wound_composure": "+15% Mulalo, -1 Tshifhinga tsha Mbonzhe ya Nandi",
    "reward.precinct_heat_syndicate": "-1 U Fhisa ha Tshititshi, +1 Vhukoni ha Sendikheithi ya Badani",
    "reward.cash_450": "+R450 Masheleni a Zwanndani",
    "reward.mokoena_sweep_trt": "-1 Tshifhinga tsha Mokoena tsha u Fhura, +1 Vhukoni ha SAPS TRT",
    "reward.cash_600_heat": "+R600 Masheleni a Tshiphiri, -1 U Fhisa ha Tshititshi",
    "reward.cash_500_city_hall": "+R500 Mbadelo ya Tshetshelo, +1 Vhukoni ha Holo ya Dorobo, -1 U Fhisa",
    "reward.crack_phone_composure": "+10% Mulalo, +1 Tshifhinga tsha u Vula Founu ya Muodithi",
    "reward.crack_phone_clock": "+1 Tshifhinga tsha u Vula Founu ya Muodithi, +10% Mulalo",
    "reward.precinct_heat_rest": "-1 U Fhisa ha Tshititshi, +10% Mulalo (Mbadelo R100)",
    "reward.cash_700_abasanta": "+R700 Masheleni, +1 Vhukoni ha Abasanta",
    "reward.mokoena_sweep_composure": "+15% Mulalo, -1 Tshifhinga tsha Mokoena tsha u Fhura",
    "reward.hawks_rep_heat": "+1 Vhukoni ha Mavhudzi, -1 U Fhisa ha Tshititshi, +15% Mulalo",
    "reward.trust_clock_contempt": "+1 Tshifhinga tsha Sovereign Pearl Trust, -1 Waranti ya u Nyadza Khothe",
    "reward.cash_800_city_hall": "+R800 Masheleni a Nnda, +1 Vhukoni ha Holo ya Dorobo",
    "reward.telemetry_depot_hit_squad": "+1 Tshifhinga tsha Super-Lab Telemetry, -1 Tshifhinga tsha Izinkabi",
    "reward.trust_contempt_composure": "+1 Tshifhinga tsha Sovereign Pearl Trust, -1 Waranti, +10% Mulalo",
    "reward.hit_squad_cash_abasanta": "-2 Tshifhinga tsha Izinkabi, +R900 Masheleni, +1 Vhukoni ha Abasanta",
    "reward.hit_squad_composure": "-2 Tshifhinga tsha Izinkabi, +15% Mulalo"
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
  console.log(`Updated ${lang}.json with ${count} dialogue, reward, and left-menu entries.`);
}

console.log(`Successfully injected ${totalInjected} translations across all 10 language files.`);
