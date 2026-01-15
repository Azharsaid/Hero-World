import { Character, Game, Soundtrack } from './types';

// Updated Character List with new images
export const CHARACTERS: Character[] = [
  {
    id: 'fares',
    name: { en: 'Fares', ar: 'فارس' },
    image: './characters/fares.jpg',
    color: 'from-blue-400 to-cyan-300',
    description: { 
      en: 'The smart doctor who helps everyone', 
      ar: 'الطبيب الذكي الذي يساعد الجميع' 
    }
  },
  {
    id: 'taj',
    name: { en: 'Taj', ar: 'تاج' },
    image: './characters/taj.jpg',
    color: 'from-pink-400 to-rose-300',
    description: { 
      en: 'The little princess who loves adventure', 
      ar: 'الأميرة الصغيرة التي تحب المغامرة' 
    }
  },
  {
    id: 'faisal',
    name: { en: 'Faisal', ar: 'فيصل' },
    image: './characters/faisal.jpg',
    color: 'from-yellow-400 to-orange-300',
    description: { 
      en: 'The champion of colorful balloons', 
      ar: 'بطل البالونات الملونة' 
    }
  },
  {
    id: 'elyas',
    name: { en: 'Elyas', ar: 'إلياس' },
    image: './characters/elyas.jpg',
    color: 'from-blue-500 to-indigo-400',
    description: { 
      en: 'The brave doctor ready for any challenge', 
      ar: 'الطبيب الشجاع المستعد لأي تحدي' 
    }
  },
  {
    id: 'misk',
    name: { en: 'Misk', ar: 'مسك' },
    image: './characters/misk.jpg',
    color: 'from-purple-400 to-pink-300',
    description: { 
      en: 'The elegant girl with a kind heart', 
      ar: 'الفتاة الأنيقة ذات القلب الطيب' 
    }
  },
  {
    id: 'joud',
    name: { en: 'Joud', ar: 'جود' },
    image: './characters/joud.jpg',
    color: 'from-red-300 to-pink-300',
    description: { 
      en: 'The joyful star that brightens the day', 
      ar: 'النجمة المرحة التي تضيء اليوم' 
    }
  },
  {
    id: 'tanya',
    name: { en: 'Tanya', ar: 'تانيا' },
    image: './characters/tanya.jpg',
    color: 'from-amber-200 to-yellow-100',
    description: { 
      en: 'The curious explorer with flowers', 
      ar: 'المستكشفة الفضولية مع الزهور' 
    }
  },
  {
    id: 'alice',
    name: { en: 'Alice', ar: 'أليس' },
    image: './characters/alice.jpg',
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
    url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3'
  },
  {
    id: 'happy',
    name: { en: 'Happy Day', ar: 'يوم سعيد' },
    url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3'
  },
  {
    id: 'calm',
    name: { en: 'Calm', ar: 'هدوء' },
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3'
  }
];
