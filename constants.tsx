import { Character, Game, Soundtrack, GameType } from './types';

// Vite sets BASE_URL based on `base` in vite.config.ts
// This keeps paths correct on GitHub Pages (/Hero-World/...)
const BASE = import.meta.env.BASE_URL;

export const CHARACTERS: Character[] = [
  {
    id: 'fares',
    name: { en: 'Fares', ar: 'فارس' },
    imageUrl: `${BASE}characters/fares.jpg`,
    color: 'from-blue-400 to-cyan-300',
    description: { en: 'The smart doctor who helps everyone', ar: 'الطبيب الذكي الذي يساعد الجميع' }
  },
  {
    id: 'taj',
    name: { en: 'Taj', ar: 'تاج' },
    imageUrl: `${BASE}characters/Taj.JPG`,
    color: 'from-pink-400 to-rose-300',
    description: { en: 'The little princess who loves adventure', ar: 'الأميرة الصغيرة التي تحب المغامرة' }
  },
  {
    id: 'faisal',
    name: { en: 'Faisal', ar: 'فيصل' },
    imageUrl: `${BASE}characters/Faisal.JPG`,
    color: 'from-yellow-400 to-orange-300',
    description: { en: 'The champion of colorful balloons', ar: 'بطل البالونات الملونة' }
  },
  {
    id: 'elyas',
    name: { en: 'Elyas', ar: 'إلياس' },
    imageUrl: `${BASE}characters/Elyas.JPG`,
    color: 'from-blue-500 to-indigo-400',
    description: { en: 'The brave doctor ready for any challenge', ar: 'الطبيب الشجاع المستعد لأي تحدي' }
  },
  {
    id: 'misk',
    name: { en: 'Misk', ar: 'مسك' },
    imageUrl: `${BASE}characters/Misk.JPG`,
    color: 'from-purple-400 to-pink-300',
    description: { en: 'The elegant girl with a kind heart', ar: 'الفتاة الأنيقة ذات القلب الطيب' }
  },
  {
    id: 'joud',
    name: { en: 'Joud', ar: 'جود' },
    imageUrl: `${BASE}characters/Joud.JPG`,
    color: 'from-red-300 to-pink-300',
    description: { en: 'The joyful star that brightens the day', ar: 'النجمة المرحة التي تضيء اليوم' }
  },
  {
    id: 'tanya',
    name: { en: 'Tanya', ar: 'تانيا' },
    imageUrl: `${BASE}characters/tanya.jpg`,
    color: 'from-amber-200 to-yellow-100',
    description: { en: 'The curious explorer with flowers', ar: 'المستكشفة الفضولية مع الزهور' }
  },
  {
    id: 'alice',
    name: { en: 'Alice', ar: 'أليس' },
    imageUrl: `${BASE}characters/Alice.JPG`,
    color: 'from-gray-700 to-gray-500',
    description: { en: 'The little princess full of smiles', ar: 'الأميرة الصغيرة المليئة بالابتسامات' }
  }
];

// Helper to keep compatibility if some parts use `name` and others use `title`
const mkGame = (g: {
  id: string;
  type: GameType;
  icon: string;
  color: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
}): Game => ({
  ...g,
  // @ts-expect-error: keep compatibility with older code that might use `name`
  name: g.title,
});

export const GAMES: Game[] = [
  mkGame({
    id: 'memory',
    type: GameType.MEMORY,
    icon: '🎴',
    color: 'bg-purple-500',
    title: { en: 'Memory Cards', ar: 'بطاقات الذاكرة' },
    description: { en: 'Find matching pairs!', ar: 'جد البطاقات المتطابقة!' }
  }),
  mkGame({
    id: 'math',
    type: GameType.MATH,
    icon: '🔢',
    color: 'bg-blue-500',
    title: { en: 'Math Hero', ar: 'بطل الرياضيات' },
    description: { en: 'Solve fun math problems!', ar: 'حل مسائل حسابية ممتعة!' }
  }),
  mkGame({
    id: 'colors',
    type: GameType.COLOR_MATCH,
    icon: '🎨',
    color: 'bg-pink-500',
    title: { en: 'Color Master', ar: 'سيد الألوان' },
    description: { en: 'Match the colors!', ar: 'طابق الألوان!' }
  }),

  // Add the rest (your GameView already supports these):
  mkGame({
    id: 'alphabet',
    type: GameType.ALPHABET,
    icon: '🔤',
    color: 'bg-emerald-500',
    title: { en: 'Alphabet Adventure', ar: 'مغامرة الحروف' },
    description: { en: 'Learn letters with fun!', ar: 'تعلّم الحروف بطريقة ممتعة!' }
  }),
  mkGame({
    id: 'piano',
    type: GameType.PIANO,
    icon: '🎹',
    color: 'bg-indigo-500',
    title: { en: 'Magical Piano', ar: 'البيانو السحري' },
    description: { en: 'Play music notes!', ar: 'اعزف نغمات جميلة!' }
  }),
  mkGame({
    id: 'shadow',
    type: GameType.SHADOW_MATCH,
    icon: '👤',
    color: 'bg-slate-600',
    title: { en: 'Shadow Match', ar: 'طابق الظلال' },
    description: { en: 'Match the shape to its shadow!', ar: 'طابق الشكل مع ظله!' }
  }),
  mkGame({
    id: 'fruit_catch',
    type: GameType.FRUIT_CATCH,
    icon: '🍓',
    color: 'bg-red-500',
    title: { en: 'Fruit Catch', ar: 'اصطياد الفواكه' },
    description: { en: 'Catch the fruits!', ar: 'التقط الفواكه بسرعة!' }
  }),
  mkGame({
    id: 'drawing',
    type: GameType.DRAWING_PAD,
    icon: '✏️',
    color: 'bg-amber-500',
    title: { en: 'Drawing Pad', ar: 'لوحة الرسم' },
    description: { en: 'Draw and color!', ar: 'ارسم ولوّن!' }
  }),
  mkGame({
    id: 'shape_puzzle',
    type: GameType.SHAPE_PUZZLE,
    icon: '🧩',
    color: 'bg-orange-500',
    title: { en: 'Shape Puzzle', ar: 'أحجية الأشكال' },
    description: { en: 'Fit shapes in the right place!', ar: 'ضع الشكل في المكان الصحيح!' }
  }),
  mkGame({
    id: 'balloon_pop',
    type: GameType.BALLOON_POP,
    icon: '🎈',
    color: 'bg-fuchsia-500',
    title: { en: 'Balloon Pop', ar: 'فرقعة البالونات' },
    description: { en: 'Pop the balloons!', ar: 'فرقع البالونات!' }
  }),
  mkGame({
    id: 'treasure',
    type: GameType.TREASURE_HUNT,
    icon: '🗺️',
    color: 'bg-teal-600',
    title: { en: 'Treasure Hunt', ar: 'البحث عن الكنز' },
    description: { en: 'Find the hidden treasure!', ar: 'اعثر على الكنز المخفي!' }
  }),
  mkGame({
    id: 'odd_one_out',
    type: GameType.ODD_ONE_OUT,
    icon: '🧐',
    color: 'bg-cyan-600',
    title: { en: 'Odd One Out', ar: 'المختلف' },
    description: { en: 'Pick what doesn’t belong!', ar: 'اختر العنصر المختلف!' }
  }),
  mkGame({
    id: 'counting',
    type: GameType.COUNTING,
    icon: '⭐',
    color: 'bg-yellow-500',
    title: { en: 'Counting Stars', ar: 'عدّ النجوم' },
    description: { en: 'Count and learn numbers!', ar: 'عدّ وتعلّم الأرقام!' }
  }),
  mkGame({
    id: 'logic_patterns',
    type: GameType.LOGIC,
    icon: '🧠',
    color: 'bg-lime-600',
    title: { en: 'Logic Patterns', ar: 'أنماط منطقية' },
    description: { en: 'Solve pattern puzzles!', ar: 'حل ألغاز الأنماط!' }
  }),
  mkGame({
    id: 'sudoku',
    type: GameType.LOGIC,
    icon: '🔲',
    color: 'bg-green-700',
    title: { en: 'Sudoku', ar: 'سودوكو' },
    description: { en: 'Fill the grid smartly!', ar: 'املأ الشبكة بذكاء!' }
  }),
  mkGame({
    id: 'simon',
    type: GameType.SIMON_SAYS,
    icon: '🟣',
    color: 'bg-violet-600',
    title: { en: 'Simon Says', ar: 'سيمون يقول' },
    description: { en: 'Repeat the sequence!', ar: 'كرر التسلسل الصحيح!' }
  }),
  mkGame({
    id: 'story',
    type: GameType.STORY_MAKER,
    icon: '📖',
    color: 'bg-rose-600',
    title: { en: 'Story Maker', ar: 'صانع القصص' },
    description: { en: 'Create a fun story!', ar: 'اصنع قصة ممتعة!' }
  }),
];

export const SOUNDTRACKS: Soundtrack[] = [
  {
    id: 'adventure',
    name: { en: 'Adventure', ar: 'مغامرة' },
    url: 'https://actions.google.com/sounds/v1/ambiences/forest_morning.ogg'
  },
  {
    id: 'happy',
    name: { en: 'Happy Day', ar: 'يوم سعيد' },
    url: 'https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg'
  },
  {
    id: 'calm',
    name: { en: 'Calm', ar: 'هدوء' },
    url: 'https://actions.google.com/sounds/v1/water/gentle_stream.ogg'
  }
];
