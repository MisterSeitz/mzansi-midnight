import { EndingId, FactionId } from '../types/game';

export interface ActEnding {
  id: EndingId;
  pathLabel: string;
  title: string;
  subtitle: string;
  accentColor: 'amber' | 'cyan' | 'purple' | 'red';
  summaryQuote: string;
  epilogueParagraphs: string[];
  cityAftermath: {
    heading: string;
    detail: string;
  }[];
  act2Hook: string;
}

export const ACT_1_ENDINGS: Partial<Record<EndingId, ActEnding>> = {
  ending_vigilante: {
    id: 'ending_vigilante',
    pathLabel: 'THE VIGILANTE PATH // BLOOD ON THE BREAKWATER',
    title: 'The Harbour Fire',
    subtitle: 'Pier 2 Container Terminal • 01:40 AM (Stage 6 Blackout)',
    accentColor: 'amber',
    summaryQuote:
      '"When the law is bought and the state is captured, the only justice left is the match you strike in the dark."',
    epilogueParagraphs: [
      'When Stage 6 kills the harbour floodlights at midnight, Bra Bheki’s minibus convoy cuts its headlights and blocks the Pier 2 weighbridge. Fifteen heavily armed izinkabi step out from behind the rusting container stacks just as Brigadier Mokoena’s unmarked TRT vans escort the municipal water tankers onto Berth 14.',
      'The firefight echoes across the Natal Port Channel for twenty minutes. Punctured chemical drums spill across the wet asphalt, catching a tracer round and sending a wall of orange flame forty metres into the humid night sky.',
      'In the chaos, you breach the lead armoured command van, haul out two steel cases of Abasanta bearer cash, and pull Constable Nandi into your getaway car before the port sirens even spin up.',
    ],
    cityAftermath: [
      {
        heading: 'Abasanta Cartel Crippled',
        detail:
          'R80 million in Mexican chemical precursors burn on the quay. Zuko Ndlovu retreats to his inland citrus estates, vowing to purge the port security directorate.',
      },
      {
        heading: 'Queen Street Ascendant',
        detail:
          'Bra Bheki’s syndicate seizes control of the Umgeni transport corridor, forcing City Hall to pay his 30% forum cut on every tanker truck.',
      },
      {
        heading: 'The Ghost of Mercury Arcade',
        detail:
          'With R450,000 in stolen cartel cash funding your off-grid clinic and armoury, you become the CBD’s untouchable shadow fixer.',
      },
    ],
    act2Hook:
      'ACT 2 PREVIEW: As turf war spreads to the northern townships, a national commission of inquiry arrives from Pretoria—and both Zuko and Mokoena want you silenced before you testify.',
  },

  ending_whistleblower: {
    id: 'ending_whistleblower',
    pathLabel: 'THE WHISTLEBLOWER PATH // TRUTH IN THE DARK',
    title: 'Front Page of The Daily Veld',
    subtitle: 'Old Archive Sub-Basement & National Broadcast • 06:00 AM',
    accentColor: 'cyan',
    summaryQuote:
      '"They can burn a paper docket and buy a magistrate, but they cannot put four hundred million Rand back in the dark once the whole country hears the tape."',
    epilogueParagraphs: [
      'At 04:00 AM, Colonel Piet van der Merwe’s loyal Hawks task force seals the steel blast doors of the Old Archive Basement. While Constable Nandi is smuggled onto a light aircraft bound for a witness-protection safe farm in the Drakensberg, you upload the decrypted Berth 14 audio and the audited Zululand Aqua-Logistics ledgers to every independent newsroom in the country.',
      'By sunrise, Brigadier Mokoena’s voice—ordering the execution of the municipal auditor and clearing the N2 weighbridge for Zuko’s chemical tankers—is playing on every taxi radio and morning news bulletin from Durban to Johannesburg.',
      'Outside City Hall, thousands of residents whose taps have been dry for months flood the streets, surrounding Councillor Ma-Sibi’s motorcade.',
    ],
    cityAftermath: [
      {
        heading: 'City Hall in Freefall',
        detail:
          'National Treasury freezes the R400m water-tanker contract by noon. Ma-Sibi’s Chief of Staff is arrested at King Shaka International Airport trying to board a flight to Dubai.',
      },
      {
        heading: 'SAPS Internal Purge',
        detail:
          'IPID and the Hawks raid Central Precinct’s 13th Floor. Brigadier Mokoena goes underground with a rogue detachment of loyal TRT officers.',
      },
      {
        heading: 'Badge Restored, Target Painted',
        detail:
          'Colonel van der Merwe reinstates your Warrant Officer credentials—but Abasanta’s Chemical Ghost hitmen have just placed a R5 million bounty on your badge.',
      },
    ],
    act2Hook:
      'ACT 2 PREVIEW: With Mokoena on the run as a rogue warlord and Nandi preparing to testify at the High Court, you must keep your star witness alive for 72 hours.',
  },

  ending_kingpin: {
    id: 'ending_kingpin',
    pathLabel: 'THE KINGPIN PATH // THE GLASS HOUSE COMPACT',
    title: 'Twenty Percent of the Taps',
    subtitle: 'Penthouse Atop the Harbour Grain Silos • Midnight',
    accentColor: 'purple',
    summaryQuote:
      '"In eThekwini-Gold, nobody beats the machine. You either get crushed beneath the tankers, or you buy a seat at the valve."',
    epilogueParagraphs: [
      'The private elevator to The Glass House rises above the rusted container cranes into air-conditioned silence. Zuko Ndlovu pours two glasses of single malt while Brigadier Mokoena and Councillor Ma-Sibi’s Chief of Staff watch you lay the bloodstained original pages of Docket #409 and the auditor’s decrypted drive onto the glass table.',
      '"Logistics is about removing friction," Zuko says softly, looking out over the darkened city grid. "You proved more capable than Brigadier Mokoena’s entire regiment. Name your tariff."',
      'You strike the match yourself. As the original forensic annexures curl into ash, your suspension is wiped from the SAPS mainframe, Constable Nandi’s name is cleared with a quiet medical pension, and your newly registered consulting firm is awarded 20% of the Zululand Aqua-Logistics pipeline.',
    ],
    cityAftermath: [
      {
        heading: 'The Syndicate Consolidates',
        detail:
          'The Berth 14 precursor shipment rolls through the N2 weighbridge untouched under blue-light escort. The methamphetamine super-labs double their output.',
      },
      {
        heading: 'Hawks Task Force Shuttered',
        detail:
          'Without Docket #409, Colonel van der Merwe’s inquiry collapses for lack of evidence. His basement unit is reassigned to rural stock-theft duty.',
      },
      {
        heading: 'The New Fixer-General',
        detail:
          'You move out of the Mercury Arcade flat into a Ridge penthouse—wealthy, reinstated, and permanently chained to Zuko Ndlovu’s ledger.',
      },
    ],
    act2Hook:
      'ACT 2 PREVIEW: Constable Nandi refuses your blood money and disappears into the townships with a hidden photocopy of the docket—forcing you to hunt down your own former partner.',
  },

  ending_captured: {
    id: 'ending_captured',
    pathLabel: 'SYSTEMIC FAILURE // SWALLOWED BY THE GRID',
    title: 'Buried in Shaft 9',
    subtitle: 'Abandoned Gold & Coal Workings Outside Town • Pre-Dawn',
    accentColor: 'red',
    summaryQuote:
      '"The city doesn’t need a trial when a Stage 6 blackout and an unmarked bakkie do the job before sunrise."',
    epilogueParagraphs: [
      'Exhausted, broke, and boxed in by Operation Shanela roadblocks, your trail finally runs out in the rain-swept alleys behind Queen Street. When the grid drops to Stage 6, the streetlights die—and four unmarked TRT Volkswagen Golfs box you against the shuttered roller doors.',
      'Brigadier Mokoena doesn’t read you your rights. He pulls Docket #409 and the dead auditor’s phone from your coat pocket, checks the seal, and nods to Sergeant Dlamini.',
      'By the time the morning commuters crowd the taxi rank, theMercury Arcade flat has been scrubbed clean, and another anonymous dossier has vanished into the furnace of eThekwini-Gold.',
    ],
    cityAftermath: [
      {
        heading: 'State Capture Unchecked',
        detail:
          'Ma-Sibi wins the municipal coalition vote unopposed, expanding the emergency water-tanker contracts by another R600 million.',
      },
      {
        heading: 'Docket #409 Erased',
        detail:
          'The N2 Cash-in-Transit massacre is officially closed as an unsolved syndicate hijacking.',
      },
    ],
    act2Hook:
      'TRY ANOTHER TIMELINE: Manage your Composure, use the Queen Street taxi network to bleed off Mokoena’s Sweep clock, and unlock Pier 2 before the dragnet closes.',
  },

  // ===========================================================================
  // ACT 2 GRAND FINALE ENDINGS ("THE COMMISSION OF INQUIRY")
  // ===========================================================================
  ending_act2_reckoning: {
    id: 'ending_act2_reckoning',
    pathLabel: 'ACT 2 FINALE // THE CONSTITUTIONAL RECKONING',
    title: 'Live on National Television',
    subtitle: 'King Shaka Hangar 7 & High Court Steps • Sunrise',
    accentColor: 'cyan',
    summaryQuote:
      '"For the first time in twenty years, the blue-light sirens weren’t clearing traffic for the VIPs—they were taking them in handcuffs."',
    epilogueParagraphs: [
      'As Gulfstream ZS-900 turns onto the active taxiway, four unmarked Hawks interceptors and a High Court sheriff’s van block the nose gear. You step out into the blinding sodium glare holding the certified Sovereign Pearl Trust Deed and the Midlands super-lab batch logs.',
      'Brigadier Mokoena reaches for his holster, but seeing twenty DPCI rifles trained on the airstairs—and a live broadcast camera streaming directly to the Commission’s emergency feed—he slowly lowers his weapon. Councillor Ma-Sibi and Zuko Ndlovu are led down the wet stairs in steel cuffs.',
      'By morning, the KwaZulu-Natal High Court places Zululand Aqua-Logistics under judicial administration, and the northern township reservoirs open to full pressure for the first time in a year.',
    ],
    cityAftermath: [
      {
        heading: 'The Triumvirate Indicted',
        detail:
          'Zuko Ndlovu, Councillor Ma-Sibi, and Brigadier Mokoena face 142 counts of racketeering, treasonous sabotage, and murder before a special High Court tribunal.',
      },
      {
        heading: 'Midlands Super-Lab Dismantled',
        detail:
          'Forensic teams seize R1.2 billion in offshore escrow and dismantle the Howick hydroponic precursor plant.',
      },
      {
        heading: 'Commander of the Clean Slate',
        detail:
          'Promoted to Major in the rebuilt DPCI Organised Crime Directorate, you and Constable Nandi take over the 13th Floor of Central Precinct.',
      },
    ],
    act2Hook:
      'CAMPAIGN COMPLETE (ACT 1 + ACT 2): You survived the blackouts, unmasked the Sovereign Pearl conspiracy, and brought eThekwini-Gold’s untouchables to justice.',
  },

  ending_act2_revolution: {
    id: 'ending_act2_revolution',
    pathLabel: 'ACT 2 FINALE // THE DRY-TAP UPRISING',
    title: "The People's Convoy",
    subtitle: 'Northern Township Reservoir & Hangar 7 • Dawn',
    accentColor: 'amber',
    summaryQuote:
      '"They stole the water and sold us the drought. Tonight we took back the trucks, the taps, and the bank account."',
    epilogueParagraphs: [
      'Instead of waiting for slow court orders, you broadcast the Hangar 7 coordinates and the Sovereign Pearl escrow keys directly to Bra Bheki’s Queen Street marshals and the Northern Township strike committees.',
      'Within thirty minutes, three hundred minibus taxis and forty hijacked municipal water tankers smash through the cargo apron perimeter fence, surrounding Gulfstream ZS-900 on the runway. Zuko’s mercenaries drop their rifles and flee into the sugarcane fields.',
      'Before sunrise, the syndicate’s R400 million liquid escrow is wired directly into community water cooperatives, and a convoy of freshly flushed tankers rolls into KwaMashu with sirens blaring in celebration.',
    ],
    cityAftermath: [
      {
        heading: 'Direct Civic Control',
        detail:
          'The Northern Township Water Forum seizes permanent control of the municipal tanker fleet, ending the artificial drought overnight.',
      },
      {
        heading: 'City Hall Coalition Collapses',
        detail:
          'Stripped of both their cartel protection and offshore slush funds, Ma-Sibi’s coalition resigns en masse amid citywide street celebrations.',
      },
      {
        heading: 'Legend of the Ranks',
        detail:
          'Every minibus from Point Road to the Midlands carries your callsign on the rear window—the outlaw Hawk who gave the city back to its streets.',
      },
    ],
    act2Hook:
      'CAMPAIGN COMPLETE (ACT 1 + ACT 2): You broke the state-capture syndicate from the ground up and returned eThekwini-Gold’s lifeblood to its people.',
  },

  ending_act2_syndicate_state: {
    id: 'ending_act2_syndicate_state',
    pathLabel: 'ACT 2 FINALE // THE GHOST SOVEREIGN',
    title: 'Chairman of the Board',
    subtitle: 'Umhlanga Ridge Penthouse 01 • Midnight',
    accentColor: 'purple',
    summaryQuote:
      '"Empires don’t fall when the king boards a plane. They just change signatures on the trust deed."',
    epilogueParagraphs: [
      'You stand alone in the rain at Hangar 7 with your thumb on the encrypted broadcast switch. Zuko Ndlovu looks at the High Court subpoena in your left hand and the Dubai flight plan in your right, then smiles and signs the transfer of Sovereign Pearl Holdings.',
      'At 00:05 AM, you call off the Hawks interceptors and watch Gulfstream ZS-900 climb into the storm clouds toward the Indian Ocean. Ten minutes later, Colonel van der Merwe receives a sanitized docket pinning the entire conspiracy on a dead deputy clerk.',
      'From the top floor of the Umhlanga Ridge glass tower, you watch Stage 6 plunge the city below into darkness—while your private turbines hum without a flicker.',
    ],
    cityAftermath: [
      {
        heading: 'The New Sovereign',
        detail:
          'With Zuko, Ma-Sibi, and Mokoena exiled in Dubai, you assume 100% control of Sovereign Pearl Holdings, the harbour cranes, and the Midlands estate.',
      },
      {
        heading: 'Commission Quietly Adjourned',
        detail:
          'The State Capture Inquiry releases a toothless 900-page report recommending "administrative reforms" with zero high-profile convictions.',
      },
      {
        heading: 'Untouchable Above the Grid',
        detail:
          'You own the judges, the taxi ranks, and the municipal tenders. In eThekwini-Gold, midnight now belongs to you.',
      },
    ],
    act2Hook:
      'CAMPAIGN COMPLETE (ACT 1 + ACT 2): You outmaneuvered every faction in eThekwini-Gold and claimed the throne of the shadow state.',
  },

  ending_act2_vanished: {
    id: 'ending_act2_vanished',
    pathLabel: 'ACT 2 FAILURE // REDACTED FROM THE RECORD',
    title: 'Sealed for Fifty Years',
    subtitle: 'King Shaka Cargo Apron • 01:15 AM',
    accentColor: 'red',
    summaryQuote:
      '"By order of the Chairperson, Exhibit 409-B is hereby classified under National Key Points regulations."',
    epilogueParagraphs: [
      'Arriving at Hangar 7 without certified proof of either the Sovereign Pearl trust or the Midlands batch telemetry leaves you exposed on the open tarmac. When Stage 6 cuts the airport perimeter lights, Brigadier Mokoena’s sniper team pins your vehicle behind a cargo loader.',
      'Gulfstream ZS-900 roars down the runway and lifts into the coastal clouds carrying every original ledger and witness out of South African jurisdiction.',
      'Three weeks later, the Commission of Inquiry closes its proceedings behind locked doors, sealing your uncorroborated testimony in the National Archives for fifty years.',
    ],
    cityAftermath: [
      {
        heading: 'Clean Getaway',
        detail:
          'Zuko Ndlovu and Ma-Sibi relocate their logistics empire to Dubai while retaining silent proxies inside City Hall.',
      },
      {
        heading: 'Case Closed',
        detail:
          'Without the Sovereign Pearl deed or Midlands telemetry, the High Court dismisses all remaining charges.',
      },
    ],
    act2Hook:
      'TRY ACT 2 AGAIN: Complete either the "Trace Sovereign Pearl Trust" clock (at The Ridge or High Court) or the "Synthesize Super-Lab Telemetry" clock (at Northern Township Depot) before intercepting Flight ZS-900!',
  },
};

import { HIGHVELD_ENDINGS } from './story2HighveldEndings';
import { NAMAQUA_ENDINGS } from './story3NamaquaEndings';
import { CAPE_ENDINGS } from './story4CapeEndings';
import { OCTAGON_ENDINGS } from './story5OctagonEndings';

export const ALL_CAMPAIGN_ENDINGS: Record<EndingId, ActEnding> = {
  ...(ACT_1_ENDINGS as Record<EndingId, ActEnding>),
  ...(HIGHVELD_ENDINGS as Record<EndingId, ActEnding>),
  ...(NAMAQUA_ENDINGS as Record<EndingId, ActEnding>),
  ...(CAPE_ENDINGS as Record<EndingId, ActEnding>),
  ...(OCTAGON_ENDINGS as Record<EndingId, ActEnding>),
};
