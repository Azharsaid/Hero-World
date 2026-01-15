
export type Language = 'ar' | 'en';

export interface Character {
  id: string;
  name: Record<Language, string>;
  imageUrl: string;
  description: Record<Language, string>;
  personality: string;
}

export interface Game {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: string;
  color: string;
  type: GameType;
}

export enum GameType {
  MEMORY = 'MEMORY',
  MATH = 'MATH',
  COLOR_MATCH = 'COLOR_MATCH',
  SHAPE_SORTER = 'SHAPE_SORTER',
  ALPHABET = 'ALPHABET',
  LOGIC = 'LOGIC',
  FRUIT_CATCH = 'FRUIT_CATCH',
  ODD_ONE_OUT = 'ODD_ONE_OUT',
  COUNTING = 'COUNTING',
  SHADOW_MATCH = 'SHADOW_MATCH',
  PIANO = 'PIANO',
  SIMON_SAYS = 'SIMON_SAYS',
  STORY_MAKER = 'STORY_MAKER',
  DRAWING_PAD = 'DRAWING_PAD',
  SHAPE_PUZZLE = 'SHAPE_PUZZLE',
  BALLOON_POP = 'BALLOON_POP',
  TREASURE_HUNT = 'TREASURE_HUNT'
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface UserProgress {
  selectedCharacterId: string | null;
  unlockedLevels: Record<string, number>; // GameId -> Max Unlocked Level
  language: Language;
}
