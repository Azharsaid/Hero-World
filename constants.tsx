import { Character, Game, Soundtrack, GameType } from './types';

// Vite base for GitHub Pages project sites is exposed here
const BASE = import.meta.env.BASE_URL;

const char = (file: string) => `${BASE}characters/${file}`;
const track = (file: string) => `${BASE}soundtracks/${file}`;

// ---- Characters ----
export const CHARACTERS = [
  {
    id: 'fares',
    name: { en: 'Fares', ar: 'فارس' },
    imageUrl: char('fares.jpg'),
    color: 'from-blue-400 to-cyan-300',
    description: { en: 'The smart doctor who helps everyone', ar: 'الطبيب الذكي الذي يساعد الجميع' }
  },
  {
    id: 'taj',
    name: { en: 'Taj', ar: 'تاج' },
    imageUrl: char('Taj.JPG'),
    color: 'from-pink-400 to-rose-300',
    description: { en: 'The little princess who loves adventure', ar: 'الأميرة الصغيرة التي تحب المغامرة' }
  },
  {
    id: 'faisal',
    name: { en: 'Faisal', ar: 'فيصل' },
    imageUrl: char('Faisal.JPG'),
    color: 'from-yellow-400 to-orange-300',
    description: { en: 'The champion of colorful balloons', ar: 'بطل البالونات الملونة' }
  },
  {
    id: 'elyas',
    name: { en: 'Elyas', ar: 'إلياس' },
    imageUrl: char('Elyas.JPG'),
    color: 'from-blue-500 to-indigo-400',
    description: { en: 'The brave doctor ready for any challenge', ar: 'الطبيب الشجاع المستعد لأي تحدي' }
  },
  {
    id: 'misk',
    name: { en: 'Misk', ar: 'مسك' },
    imageUrl: char('Misk.JPG'),
    color: 'from-purple-400 to-pink-300',
    description: { en: 'The elegant girl with a kind heart', ar: 'الفتاة الأنيقة ذات القلب الطيب' }
  },
  {
    id: 'joud',
    name: { en: 'Joud', ar: 'جود' },
    imageUrl: char('Joud.JPG'),
    color: 'from-red-300 to-pink-300',
    description: { en: 'The joyful star that brightens the day', ar: 'النجمة المرحة التي تضيء اليوم' }
  },
  {
    id: 'tanya',
    name: { en: 'Tanya', ar: 'تانيا' },
    imageUrl: char('tanya.jpg'),
    color: 'from-amber-200 to-yellow-100',
    description: { en: 'The curious explorer with flowers', ar: 'المستكشفة الفضولية مع الزهور' }
  },
  {
    id: 'alice',
    name: { en: 'Alice', ar: 'أليس' },
    imageUrl: char('Alice.JPG'),
    color: 'from-gray-700 to-gray-500',
    description: { en: 'The little princess full of smiles', ar: 'الأميرة الصغيرة المليئة بالابتسامات' }
  }
] as any;

// ---- Games ----
// Important: GameView uses game.type to decide which component to render.
// Also, some parts of your UI might use game.title OR game.name, so we include BOTH.
export const GAMES = [
  {
    id: 'memory',
    type: GameType.MEMORY,
    icon: '🎴',
    color: 'bg-purple-500',
    title: { en: 'Memory Cards', ar: 'بطاقات الذاكرة' },
    name:  { en: 'Memory Cards', ar: 'بطاقات الذاكرة' },
    description: { en: 'Find matching pairs!', ar: 'جد البطاقات المتطابقة!' }
  },
  {
    id: 'math',
    type: GameType.MATH,
    icon: '🔢',
    color: 'bg-blue-500',
    title: { en: 'Math Hero', ar: 'بطل الرياضيات' },
    name:  { en: 'Math Hero', ar: 'بطل الرياضيات' },
    description: { en: 'Solve fun math problems!', ar: 'حل مسائل حسابية ممتعة!' }
  },
  {
    id: 'colors',
    type: GameType.COLOR_MATCH,
    icon: '🎨',
    color: 'bg-pink-500',
    title: { en: 'Color Master', ar: 'سيد الألوان' },
    name:  { en: 'Color Master', ar: 'سيد الألوان' },
    description: { en: 'Match the colors!', ar: 'طابق الألوان!' }
  },

  // More games (your GameView already imports these components)
  {
    id: 'alphabet',
    type: GameType.ALPHABET,
    icon: '🔤',
    color: 'bg-emerald-500',
    title: { en: 'Alphabet Adventure', ar: 'مغامرة الحروف' },
    name:  { en: 'Alphabet Adventure', ar: 'مغامرة الحروف' },
    description: { en: 'Learn letters with fun!', ar: 'تعلّم الحروف بطريقة ممتعة!' }
  },
  {
    id: 'piano',
    type: GameType.PIANO,
    icon: '🎹',
    color: 'bg-indigo-500',
    title: { en: 'Magical Piano', ar: 'البيانو السحري' },
    name:  { en: 'Magical Piano', ar: 'البيانو السحري' },
    description: { en: 'Play music notes!', ar: 'اعزف نغمات جميلة!' }
  },
  {
    id: 'shadow',
    type: GameType.SHADOW_MATCH,
    icon: '👤',
    color: 'bg-slate-600',
    title: { en: 'Shadow Match', ar: 'طابق الظلال' },
    name:  { en: 'Shadow Match', ar: 'طابق الظلال' },
    description: { en: 'Match the shape to its shadow!', ar: 'طابق الشكل مع ظله!' }
  },
  {
    id: 'fruit_catch',
    type: GameType.FRUIT_CATCH,
    icon: '🍓',
    color: 'bg-red-500',
    title: { en: 'Fruit Catch', ar: 'اصطياد الفواكه' },
    name:  { en: 'Fruit Catch', ar: 'اصطياد الفواكه' },
    description: { en: 'Catch the fruits!', ar: 'التقط الفواكه بسرعة!' }
  },
  {
    id: 'drawing',
    type: GameType.DRAWING_PAD,
    icon: '✏️',
    color: 'bg-amber-500',
    title: { en: 'Drawing Pad', ar: 'لوحة الرسم' },
    name:  { en: 'Drawing Pad', ar: 'لوحة الرسم' },
    description: { en: 'Draw and color!', ar: 'ارسم ولوّن!' }
  },
  {
    id: 'shape_puzzle',
    type: GameType.SHAPE_PUZZLE,
    icon: '🧩',
    color: 'bg-orange-500',
    title: { en: 'Shape Puzzle', ar: 'أحجية الأشكال' },
    name:  { en: 'Shape Puzzle', ar: 'أحجية الأشكال' },
    description: { en: 'Fit shapes in the right place!', ar: 'ضع الشكل في المكان الصحيح!' }
  },
  {
    id: 'balloon_pop',
    type: GameType.BALLOON_POP,
    icon: '🎈',
    color: 'bg-fuchsia-500',
    title: { en: 'Balloon Pop', ar: 'فرقعة البالونات' },
    name:  { en: 'Balloon Pop', ar: 'فرقعة البالونات' },
    description: { en: 'Pop the balloons!', ar: 'فرقع البالونات!' }
  },
  {
    id: 'treasure',
    type: GameType.TREASURE_HUNT,
    icon: '🗺️',
    color: 'bg-teal-600',
    title: { en: 'Treasure Hunt', ar: 'البحث عن الكنز' },
    name:  { en: 'Treasure Hunt', ar: 'البحث عن الكنز' },
    description: { en: 'Find the hidden treasure!', ar: 'اعثر على الكنز المخفي!' }
  },
  {
    id: 'odd_one_out',
    type: GameType.ODD_ONE_OUT,
    icon: '🧐',
    color: 'bg-cyan-600',
    title: { en: 'Odd One Out', ar: 'المختلف' },
    name:  { en: 'Odd One Out', ar: 'المختلف' },
    description: { en: 'Pick what doesn’t belong!', ar: 'اختر العنصر المختلف!' }
  },
  {
    id: 'counting',
    type: GameType.COUNTING,
    icon: '⭐',
    color: 'bg-yellow-500',
    title: { en: 'Counting Stars', ar: 'عدّ النجوم' },
    name:  { en: 'Counting Stars', ar: 'عدّ النجوم' },
    description: { en: 'Count and learn numbers!', ar: 'عدّ وتعلّم الأرقام!' }
  },
  {
    id: 'logic_patterns',
    type: GameType.LOGIC,
    icon: '🧠',
    color: 'bg-lime-600',
    title: { en: 'Logic Patterns', ar: 'أنماط منطقية' },
    name:  { en: 'Logic Patterns', ar: 'أنماط منطقية' },
    description: { en: 'Solve pattern puzzles!', ar: 'حل ألغاز الأنماط!' }
  },
  {
    id: 'sudoku',
    type: GameType.LOGIC,
    icon: '🔲',
    color: 'bg-green-700',
    title: { en: 'Sudoku', ar: 'سودوكو' },
    name:  { en: 'Sudoku', ar: 'سودوكو' },
    description: { en: 'Fill the grid smartly!', ar: 'املأ الشبكة بذكاء!' }
  },
  {
    id: 'simon',
    type: GameType.SIMON_SAYS,
    icon: '🟣',
    color: 'bg-violet-600',
    title: { en: 'Simon Says', ar: 'سيمون يقول' },
    name:  { en: 'Simon Says', ar: 'سيمون يقول' },
    description: { en: 'Repeat the sequence!', ar: 'كرر التسلسل الصحيح!' }
  },
  {
    id: 'story',
    type: GameType.STORY_MAKER,
    icon: '📖',
    color: 'bg-rose-600',
    title: { en: 'Story Maker', ar: 'صانع القصص' },
    name:  { en: 'Story Maker', ar: 'صانع القصص' },
    description: { en: 'Create a fun story!', ar: 'اصنع قصة ممتعة!' }
  }
] as any;

// ---- Soundtracks (local only) ----
export const SOUNDTRACKS = Array.from({ length: 22 }).map((_, i) => {
  const n = i + 1;
  const id = `t${String(n).padStart(2, '0')}`;
  return {
    id,
    name: { en: `Track ${String(n).padStart(2, '0')}`, ar: `مقطوعة ${n}` },
    url: track(`${n}.mp3`)
  };
}) as any;
