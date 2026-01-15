
import { Character, Game, GameType } from './types';

export const CHARACTERS: Character[] = [
  { 
    id: 'taj', 
    name: { ar: 'تاج', en: 'Taj' }, 
    imageUrl: 'https://images.unsplash.com/photo-1595064085577-7c2ef98ec311?auto=format&fit=crop&q=80&w=400', 
    description: { ar: 'الأميرة الصغيرة التي تحب المغامرة', en: 'The little princess who loves adventure' }, 
    personality: 'royal' 
  },
  { 
    id: 'fares', 
    name: { ar: 'فارس', en: 'Fares' }, 
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400', 
    description: { ar: 'الدكتور الذكي الذي يساعد الجميع', en: 'The smart doctor who helps everyone' }, 
    personality: 'helpful' 
  },
  { 
    id: 'faisal', 
    name: { ar: 'فيصل', en: 'Faisal' }, 
    imageUrl: 'https://images.unsplash.com/photo-1530124560676-586cad3db2f9?auto=format&fit=crop&q=80&w=400', 
    description: { ar: 'بطل البالونات الملونة والمرحة', en: 'The champion of colorful balloons' }, 
    personality: 'cheerful' 
  },
  { 
    id: 'elyas', 
    name: { ar: 'إلياس', en: 'Elyas' }, 
    imageUrl: 'https://images.unsplash.com/photo-1544717297-fa95b3ee21f3?auto=format&fit=crop&q=80&w=400', 
    description: { ar: 'الطفل الضاحك الذي ينشر البهجة', en: 'The laughing child spreading joy' }, 
    personality: 'playful' 
  },
  { 
    id: 'misk', 
    name: { ar: 'مسك', en: 'Misk' }, 
    imageUrl: 'https://images.unsplash.com/photo-1519689689353-897c1d37cd05?auto=format&fit=crop&q=80&w=400', 
    description: { ar: 'جميلة بفيونكتها النجمية الرائعة', en: 'Beautiful with her amazing star bow' }, 
    personality: 'sweet' 
  },
  { 
    id: 'tanya', 
    name: { ar: 'تانيا', en: 'Tanya' }, 
    imageUrl: 'https://images.unsplash.com/photo-1496440737103-cd596325d314?auto=format&fit=crop&q=80&w=400', 
    description: { ar: 'البنت الأنيقة التي تحب التنظيم', en: 'The elegant girl who loves organization' }, 
    personality: 'elegant' 
  },
  { 
    id: 'joud', 
    name: { ar: 'جود', en: 'Joud' }, 
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=400', 
    description: { ar: 'النشيطة التي لا تتوقف عن الحركة واللعب', en: 'The active one who never stops playing' }, 
    personality: 'active' 
  },
  { 
    id: 'alice', 
    name: { ar: 'أليس', en: 'Alice' }, 
    imageUrl: 'https://images.unsplash.com/photo-1544717297-fa95b3ee21f3?auto=format&fit=crop&q=80&w=400', 
    description: { ar: 'الذكية التي تستكشف عالم التكنولوجيا', en: 'The smart explorer of technology' }, 
    personality: 'genius' 
  }
];

export const GAMES: Game[] = [
  { id: 'memory', title: { ar: 'تحدي الذاكرة', en: 'Memory Challenge' }, description: { ar: 'جد الصور المتطابقة واختبر ذكاءك!', en: 'Find matching photos!' }, icon: '🧠', color: 'bg-pink-400', type: GameType.MEMORY },
  { id: 'math', title: { ar: 'عبقري الأرقام', en: 'Math Genius' }, description: { ar: 'اجمع واطرح الأرقام بطريقة مسلية!', en: 'Add and subtract fun!' }, icon: '🔢', color: 'bg-blue-400', type: GameType.MATH },
  { id: 'odd_one', title: { ar: 'العنصر المختلف', en: 'Odd One Out' }, description: { ar: 'ابحث عن الشيء الذي لا ينتمي للمجموعة!', en: 'Find the odd one!' }, icon: '🔍', color: 'bg-amber-400', type: GameType.ODD_ONE_OUT },
  { id: 'counting', title: { ar: 'عدّ النجوم', en: 'Count the Stars' }, description: { ar: 'كم نجمة ترى في السماء السحرية؟', en: 'How many stars in the sky?' }, icon: '⭐', color: 'bg-indigo-500', type: GameType.COUNTING },
  { id: 'fruit_catch', title: { ar: 'سلة الفواكه', en: 'Fruit Basket' }, description: { ar: 'التقط الفواكه اللذيذة وتجنب القنابل!', en: 'Catch fruits, avoid bombs!' }, icon: '🍎', color: 'bg-green-400', type: GameType.FRUIT_CATCH },
  { id: 'drawing', title: { ar: 'مرسم الألوان', en: 'Color Pad' }, description: { ar: 'أطلق العنان للفنان بداخلك!', en: 'Unleash your inner artist!' }, icon: '🎨', color: 'bg-indigo-400', type: GameType.DRAWING_PAD },
  { id: 'shapes', title: { ar: 'أحجية الأشكال', en: 'Shape Puzzle' }, description: { ar: 'طابق الأشكال الهندسية الملونة!', en: 'Match the colorful shapes!' }, icon: '🔶', color: 'bg-amber-400', type: GameType.SHAPE_PUZZLE },
  { id: 'balloon_pop', title: { ar: 'فرقعة البالونات', en: 'Balloon Pop' }, description: { ar: 'فرقع البالونات الملونة!', en: 'Pop the balloons!' }, icon: '🎈', color: 'bg-sky-400', type: GameType.BALLOON_POP },
  { id: 'treasure_hunt', title: { ar: 'البحث عن الكنز', en: 'Treasure Hunt' }, description: { ar: 'كن مستكشفاً وابحث عن الذهب!', en: 'Find the hidden gold!' }, icon: '🗺️', color: 'bg-orange-800', type: GameType.TREASURE_HUNT },
  { id: 'alphabet', title: { ar: 'قطار الحروف', en: 'Alphabet Train' }, description: { ar: 'رحلة ممتعة لتعلم الحروف!', en: 'Learn letters adventure!' }, icon: '🔤', color: 'bg-purple-400', type: GameType.ALPHABET },
  { id: 'shadow', title: { ar: 'صائد الظلال', en: 'Shadow Catcher' }, description: { ar: 'طابق كل بطل بظله السري!', en: 'Match shadows!' }, icon: '👤', color: 'bg-emerald-400', type: GameType.SHADOW_MATCH },
  { id: 'piano', title: { ar: 'البيانو السحري', en: 'Magic Piano' }, description: { ar: 'اعزف ألحانك الخاصة!', en: 'Play your own music!' }, icon: '🎹', color: 'bg-cyan-500', type: GameType.PIANO },
];

export const SOUNDTRACKS = [
  { id: 'happy', name: { ar: 'مرح', en: 'Happy' }, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'adventure', name: { ar: 'مغامرة', en: 'Adventure' }, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
  { id: 'calm', name: { ar: 'هادئ', en: 'Calm' }, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' }
];
