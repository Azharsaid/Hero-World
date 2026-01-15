import { Character, Game, Soundtrack } from './types';

// FIXED: Exact file names from your screenshot (Case Sensitive!)
export const CHARACTERS: Character[] = [
  {
    id: 'fares',
    name: { en: 'Fares', ar: 'فارس' },
    image: '/Hero-World/characters/fares.jpg', // Fixed: .jpg (lowercase)
    color: 'from-blue-400 to-cyan-300',
    description: { 
      en: 'The smart doctor who helps everyone', 
      ar: 'الطبيب الذكي الذي يساعد الجميع' 
    }
  },
  {
    id: 'taj',
    name: { en: 'Taj', ar: 'تاج' },
    image: '/Hero-World/characters/Taj.JPG', // Fixed: .JPG (uppercase)
    color: 'from-pink-400 to-rose-300',
    description: { 
      en: 'The little princess who loves adventure', 
      ar: 'الأميرة الصغيرة التي تحب المغامرة' 
    }
  },
  {
    id: 'faisal',
    name: { en: 'Faisal', ar: 'فيصل' },
    image: '/Hero-World/characters/Faisal.JPG', // Fixed: .JPG (uppercase)
    color: 'from-yellow-400 to-orange-300',
    description: { 
      en: 'The champion of colorful balloons', 
      ar: 'بطل البالونات الملونة' 
    }
  },
  {
    id: 'elyas',
    name: { en: 'Elyas', ar: 'إلياس' },
    image: '/Hero-World/characters/Elyas.JPG', // Fixed: .JPG (uppercase)
    color: 'from-blue-500 to-indigo-400',
    description: { 
      en: 'The brave doctor ready for any challenge', 
      ar: 'الطبيب الشجاع المستعد لأي تحدي' 
    }
  },
  {
    id: 'misk',
    name: { en: 'Misk', ar: 'مسك' },
    image: '/Hero-World/characters/Misk.JPG', // Fixed: .JPG (uppercase)
    color: 'from-purple-400 to-pink-300',
    description: { 
      en: 'The elegant girl with a kind heart', 
      ar: 'الفتاة الأنيقة ذات القلب الطيب' 
    }
  },
  {
    id: 'joud',
    name: { en: 'Joud', ar: 'جود' },
    image: '/Hero-World/characters/Joud.JPG', // Fixed: .JPG (uppercase)
    color: 'from-red-300 to-pink-300',
    description: { 
      en: 'The joyful star that brightens the day', 
      ar: 'النجمة المرحة التي تضيء اليوم' 
    }
  },
  {
    id: 'tanya',
    name: { en: 'Tanya', ar: 'تانيا' },
    image: '/Hero-World/characters/tanya.jpg', // Fixed: .jpg (lowercase)
    color: 'from-amber-200 to-yellow-100',
    description: { 
      en: 'The curious explorer with flowers', 
      ar: 'المستكشفة الفضولية مع الزهور' 
    }
  },
  {
    id: 'alice',
    name: { en: 'Alice', ar: 'أليس' },
    image: '/Hero-World/characters/Alice.JPG', // Fixed: .JPG (uppercase)
    color: 'from-gray-700 to-gray-500',
    description: { 
      en: 'The little princess full of smiles', 
      ar: 'الأميرة الصغيرة المليئة بالابتسامات' 
    }
  }
];

export const GAMES: Game[] = [
  {
    id: 'memory',
    name: { en: 'Memory Cards', ar: 'بطاقات الذاكرة' },
    icon: '🎴',
    color: 'bg-purple-500',
    description: { 
      en: 'Find matching pairs!', 
      ar: 'جد البطاقات المتطابقة!' 
    }
  },
  {
    id: 'math',
    name: { en: 'Math Hero', ar: 'بطل الرياضيات' },
    icon: '🔢',
    color: 'bg-blue-500',
    description: { 
      en: 'Solve fun math problems!', 
      ar: 'حل مسائل حسابية ممتعة!' 
    }
  },
  {
    id: 'colors',
    name: { en: 'Color Master', ar: 'سيد الألوان' },
    icon: '🎨',
    color: 'bg-pink-500',
    description: { 
      en: 'Match the colors!', 
      ar: 'طابق الألوان!' 
    }
  }
];

export const SOUNDTRACKS: Soundtrack[] = [
  {
    id: 'adventure',
    name: { en: 'Adventure', ar: 'مغامرة' },
    // Using a reliable MP3 source to prevent 403 errors
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
