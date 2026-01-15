import { Character, Game, Soundtrack, GameType } from './types';

const withBase = (p: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const clean = p.replace(/^\//, '');
  return `${base}${clean}`;
};

export const CHARACTERS: Character[] = [
  {
    id: 'fares',
    name: { en: 'Fares', ar: 'فارس' },
    // IMPORTANT: put fares.jpg inside public/characters/ (recommended)
    // This URL will work both locally and on GitHub Pages.
    imageUrl: withBase('characters/fares.jpg'),
    color: 'from-blue-400 to-cyan-300',
    description: {
      en: 'The smart doctor who helps everyone',
      ar: 'الطبيب الذكي الذي يساعد الجميع',
    },
  },
  {
    id: 'taj',
    name: { en: 'Taj', ar: 'تاج' },
    imageUrl: withBase('characters/Taj.JPG'),
    color: 'from-pink-400 to-rose-300',
    description: {
      en: 'The little princess who loves adventure',
      ar: 'الأميرة الصغيرة التي تحب المغامرة',
    },
  },
  {
    id: 'faisal',
    name: { en: 'Faisal', ar: 'فيصل' },
    imageUrl: withBase('characters/Faisal.JPG'),
    color: 'from-yellow-400 to-orange-300',
    description: {
      en: 'The champion of colorful balloons',
      ar: 'بطل البالونات الملونة',
    },
  },
  {
    id: 'elyas',
    name: { en: 'Elyas', ar: 'إلياس' },
    imageUrl: withBase('characters/Elyas.JPG'),
    color: 'from-blue-500 to-indigo-400',
    description: {
      en: 'The brave doctor ready for any challenge',
      ar: 'الطبيب الشجاع المستعد لأي تحدي',
    },
  },
  {
    id: 'misk',
    name: { en: 'Misk', ar: 'مسك' },
    imageUrl: withBase('characters/Misk.JPG'),
    color: 'from-purple-400 to-pink-300',
    description: {
      en: 'The elegant girl with a kind heart',
      ar: 'الفتاة الأنيقة ذات القلب الطيب',
    },
  },
  {
    id: 'joud',
    name: { en: 'Joud', ar: 'جود' },
    imageUrl: withBase('characters/Joud.JPG'),
    color: 'from-red-300 to-pink-300',
    description: {
      en: 'The joyful star that brightens the day',
      ar: 'النجمة المرحة التي تضيء اليوم',
    },
  },
  {
    id: 'tanya',
    name: { en: 'Tanya', ar: 'تانيا' },
    // IMPORTANT: put tanya.jpg inside public/characters/ (recommended)
    imageUrl: withBase('characters/tanya.jpg'),
    color: 'from-amber-200 to-yellow-100',
    description: {
      en: 'The curious explorer with flowers',
      ar: 'المستكشفة الفضولية مع الزهور',
    },
  },
  {
    id: 'alice',
    name: { en: 'Alice', ar: 'أليس' },
    imageUrl: withBase('characters/Alice.JPG'),
    color: 'from-gray-700 to-gray-500',
    description: {
      en: 'The little princess full of smiles',
      ar: 'الأميرة الصغيرة المليئة بالابتسامات',
    },
  },
];

export const GAMES: Game[] = [
  {
    id: 'memory',
    type: GameType.MEMORY,
    icon: '🎴',
    color: 'bg-purple-500',
    title: { en: 'Memory Cards', ar: 'بطاقات الذاكرة' },
    description: { en: 'Find matching pairs!', ar: 'جد البطاقات المتطابقة!' },
  },
  {
    id: 'math',
    type: GameType.MATH,
    icon: '🔢',
    color: 'bg-blue-500',
    title: { en: 'Math Hero', ar: 'بطل الرياضيات' },
    description: { en: 'Solve fun math problems!', ar: 'حل مسائل حسابية ممتعة!' },
  },
  {
    id: 'colors',
    type: GameType.COLOR_MATCH,
    icon: '🎨',
    color: 'bg-pink-500',
    title: { en: 'Color Master', ar: 'سيد الألوان' },
    description: { en: 'Match the colors!', ar: 'طابق الألوان!' },
  },
];

export const SOUNDTRACKS: Soundtrack[] = [
  {
    id: 'adventure',
    name: { en: 'Adventure', ar: 'مغامرة' },
    url: 'https://actions.google.com/sounds/v1/ambiences/forest_morning.ogg',
  },
  {
    id: 'happy',
    name: { en: 'Happy Day', ar: 'يوم سعيد' },
    url: 'https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg',
  },
  {
    id: 'calm',
    name: { en: 'Calm', ar: 'هدوء' },
    url: 'https://actions.google.com/sounds/v1/water/gentle_stream.ogg',
  },
];
