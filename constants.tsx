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
    imageUrl: withBase('characters/fares.jpg'),
    color: 'from-blue-400 to-cyan-300',
    description: { en: 'The smart doctor who helps everyone', ar: 'الطبيب الذكي الذي يساعد الجميع' },
  },
  {
    id: 'taj',
    name: { en: 'Taj', ar: 'تاج' },
    imageUrl: withBase('characters/Taj.JPG'),
    color: 'from-pink-400 to-rose-300',
    description: { en: 'The little princess who loves adventure', ar: 'الأميرة الصغيرة التي تحب المغامرة' },
  },
  {
    id: 'faisal',
    name: { en: 'Faisal', ar: 'فيصل' },
    imageUrl: withBase('characters/Faisal.JPG'),
    color: 'from-yellow-400 to-orange-300',
    description: { en: 'The champion of colorful balloons', ar: 'بطل البالونات الملونة' },
  },
  {
    id: 'elyas',
    name: { en: 'Elyas', ar: 'إلياس' },
    imageUrl: withBase('characters/Elyas.JPG'),
    color: 'from-blue-500 to-indigo-400',
    description: { en: 'The brave doctor ready for any challenge', ar: 'الطبيب الشجاع المستعد لأي تحدي' },
  },
  {
    id: 'misk',
    name: { en: 'Misk', ar: 'مسك' },
    imageUrl: withBase('characters/Misk.JPG'),
    color: 'from-purple-400 to-pink-300',
    description: { en: 'The elegant girl with a kind heart', ar: 'الفتاة الأنيقة ذات القلب الطيب' },
  },
  {
    id: 'joud',
    name: { en: 'Joud', ar: 'جود' },
    imageUrl: withBase('characters/Joud.JPG'),
    color: 'from-red-300 to-pink-300',
    description: { en: 'The joyful star that brightens the day', ar: 'النجمة المرحة التي تضيء اليوم' },
  },
  {
    id: 'tanya',
    name: { en: 'Tanya', ar: 'تانيا' },
    imageUrl: withBase('characters/tanya.jpg'),
    color: 'from-amber-200 to-yellow-100',
    description: { en: 'The curious explorer with flowers', ar: 'المستكشفة الفضولية مع الزهور' },
  },
  {
    id: 'alice',
    name: { en: 'Alice', ar: 'أليس' },
    imageUrl: withBase('characters/Alice.JPG'),
    color: 'from-gray-700 to-gray-500',
    description: { en: 'The little princess full of smiles', ar: 'الأميرة الصغيرة المليئة بالابتسامات' },
  },
];

// Helper so your UI works whether it reads game.title or game.name
const mkGame = (g: any): Game => ({
  ...g,
  title: g.title ?? g.name,
  name: g.name ?? g.title,
});

export const GAMES: Game[] = [
  mkGame({
    id: 'memory',
    type: GameType.MEMORY,
    icon: '🎴',
    color: 'bg-purple-500',
    title: { en: 'Memory Cards', ar: 'بطاقات الذاكرة' },
    description: { en: 'Find matching pairs!', ar: 'جد البطاقات المتطابقة!' },
  }),
  mkGame({
    id: 'math',
    type: GameType.MATH,
    icon: '🔢',
    color: 'bg-blue-500',
    title: { en: 'Math Hero', ar: 'بطل الرياضيات' },
    description: { en: 'Solve fun math problems!', ar: 'حل مسائل حسابية ممتعة!' },
  }),
  mkGame({
    id: 'colors',
    type: GameType.COLOR_MATCH,
    icon: '🎨',
    color: 'bg-pink-500',
    title: { en: 'Color Master', ar: 'سيد الألوان' },
    description: { en: 'Match the colors!', ar: 'طابق الألوان!' },
  }),
  mkGame({
    id: 'alphabet',
    type: GameType.ALPHABET,
    icon: '🔤',
    color: 'bg-emerald-500',
    title: { en: 'Alphabet Adventure', ar: 'مغامرة الحروف' },
    description: { en: 'Learn letters with fun!', ar: 'تعلم الحروف بطريقة ممتعة!' },
  }),
  mkGame({
    id: 'piano',
    type: GameType.PIANO,
    icon: '🎹',
    color: 'bg-indigo-500',
    title: { en: 'Magical Piano', ar: 'البيانو السحري' },
    description: { en: 'Play sounds and melodies!', ar: 'اعزف أصوات وألحان!' },
  }),
  mkGame({
    id: 'shadow',
    type: GameType.SHADOW_MATCH,
    icon: '👤',
    color: 'bg-slate-600',
    title: { en: 'Shadow Match', ar: 'طابق الظل' },
    description: { en: 'Match the shape to its shadow!', ar: 'طابق الشكل مع ظله!' },
  }),
  mkGame({
    id: 'logic',
    type: GameType.LOGIC,
    icon: '🧠',
    color: 'bg-teal-500',
    title: { en: 'Logic Patterns', ar: 'أنماط المنطق' },
    description: { en: 'Spot patterns and solve!', ar: 'اكتشف الأنماط وحل!' },
  }),
  mkGame({
    id: 'sudoku',
    type: GameType.LOGIC,
    icon: '🧩',
    color: 'bg-cyan-600',
    title: { en: 'Sudoku', ar: 'سودوكو' },
    description: { en: 'A tiny kid-friendly sudoku!', ar: 'سودوكو مبسط للأطفال!' },
  }),
  mkGame({
    id: 'simon',
    type: GameType.SIMON_SAYS,
    icon: '🎛️',
    color: 'bg-fuchsia-600',
    title: { en: 'Simon Says', ar: 'سيمون يقول' },
    description: { en: 'Repeat the sequence!', ar: 'كرر التسلسل!' },
  }),
  mkGame({
    id: 'story',
    type: GameType.STORY_MAKER,
    icon: '📖',
    color: 'bg-amber-600',
    title: { en: 'Story Maker', ar: 'صانع القصص' },
    description: { en: 'Create a story with your hero!', ar: 'اصنع قصة مع بطلك!' },
  }),
  mkGame({
    id: 'fruit',
    type: GameType.FRUIT_CATCH,
    icon: '🍎',
    color: 'bg-red-500',
    title: { en: 'Fruit Catch', ar: 'التقاط الفواكه' },
    description: { en: 'Catch the fruit!', ar: 'التقط الفواكه!' },
  }),
  mkGame({
    id: 'drawing',
    type: GameType.DRAWING_PAD,
    icon: '✏️',
    color: 'bg-orange-500',
    title: { en: 'Drawing Pad', ar: 'لوحة الرسم' },
    description: { en: 'Draw and color!', ar: 'ارسم ولوّن!' },
  }),
  mkGame({
    id: 'shapes',
    type: GameType.SHAPE_PUZZLE,
    icon: '🔺',
    color: 'bg-lime-600',
    title: { en: 'Shape Puzzle', ar: 'أحجية الأشكال' },
    description: { en: 'Fit the shapes!', ar: 'ركّب الأشكال!' },
  }),
  mkGame({
    id: 'balloons',
    type: GameType.BALLOON_POP,
    icon: '🎈',
    color: 'bg-rose-500',
    title: { en: 'Balloon Pop', ar: 'فرقعة البالونات' },
    description: { en: 'Pop balloons quickly!', ar: 'فرقّع البالونات بسرعة!' },
  }),
  mkGame({
    id: 'treasure',
    type: GameType.TREASURE_HUNT,
    icon: '🪙',
    color: 'bg-yellow-600',
    title: { en: 'Treasure Hunt', ar: 'صيد الكنز' },
    description: { en: 'Find the treasure!', ar: 'اعثر على الكنز!' },
  }),
  mkGame({
    id: 'odd',
    type: GameType.ODD_ONE_OUT,
    icon: '❓',
    color: 'bg-violet-600',
    title: { en: 'Odd One Out', ar: 'الغريب بينهم' },
    description: { en: 'Pick the different one!', ar: 'اختر المختلف!' },
  }),
  mkGame({
    id: 'counting',
    type: GameType.COUNTING,
    icon: '⭐',
    color: 'bg-sky-600',
    title: { en: 'Counting Stars', ar: 'عدّ النجوم' },
    description: { en: 'Count and learn!', ar: 'عدّ وتعلّم!' },
  }),
];

export const SOUNDTRACKS: Soundtrack[] = [
  {
    id: 'forest',
    name: { en: 'Forest Morning', ar: 'صباح الغابة' },
    url: 'https://actions.google.com/sounds/v1/ambiences/forest_morning.ogg',
  },
  {
    id: 'stream',
    name: { en: 'Gentle Stream', ar: 'جدول هادئ' },
    url: 'https://actions.google.com/sounds/v1/water/gentle_stream.ogg',
  },
  {
    id: 'rain',
    name: { en: 'Light Rain', ar: 'مطر خفيف' },
    url: 'https://actions.google.com/sounds/v1/weather/rain.ogg',
  },
  {
    id: 'wind',
    name: { en: 'Soft Wind', ar: 'نسيم لطيف' },
    url: 'https://actions.google.com/sounds/v1/ambiences/wind_chimes.ogg',
  },
];
