import { SupportedLanguage } from './settings';

export interface CutsceneBeat {
  locationStamp: string;
  speaker?: string;
  role?: string;
  text: string;
}

export interface CutsceneData {
  id: string;
  storyId: string;
  title: string;
  subtitle: string;
  image: string;
  audioMood: 'crisis' | 'triumph' | 'noir';
  beats: CutsceneBeat[];
  actionLabel: string;
  linkedEventId?: string;
}
