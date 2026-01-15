import { Character, Game, Soundtrack } from './types';

// GitHub Pages project site uses /Hero-World/ as base.
// Vite exposes that base as import.meta.env.BASE_URL.
const BASE = import.meta.env.BASE_URL;

// Helpers to make paths safe on GitHub Pages
const char = (file: string) => `${BASE}characters/${file}`;
const track = (file: string) => `${BASE}soundtracks/${file}`;

export const CHARACTERS: Character[] = [
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
];

// Keeping your current 3 games exactly as-is (no changes here)
export const GAMES: Game[] = [
  {
    id: 'memory',
    name: { en: 'Memory Cards', ar: 'بطاقات الذاكرة' },
    icon: '🎴',
    color: 'bg-purple-500',
    description: { en: 'Find matching pairs!', ar: 'جد البطاقات المتطابقة!' }
  },
  {
    id: 'math',
    name: { en: 'Math Hero', ar: 'بطل الرياضيات' },
    icon: '🔢',
    color: 'bg-blue-500',
    description: { en: 'Solve fun math problems!', ar: 'حل مسائل حسابية ممتعة!' }
  },
  {
    id: 'colors',
    name: { en: 'Color Master', ar: 'سيد الألوان' },
    icon: '🎨',
    color: 'bg-pink-500',
    description: { en: 'Match the colors!', ar: 'طابق الألوان!' }
  }
];

// ✅ NEW: local soundtracks ONLY (old URLs removed completely)
export const SOUNDTRACKS: Soundtrack[] = [
  { id: 't01', name: { en: 'Track 01', ar: 'مقطوعة 1' }, url: track('1.mp3') },
  { id: 't02', name: { en: 'Track 02', ar: 'مقطوعة 2' }, url: track('2.mp3') },
  { id: 't03', name: { en: 'Track 03', ar: 'مقطوعة 3' }, url: track('3.mp3') },
  { id: 't04', name: { en: 'Track 04', ar: 'مقطوعة 4' }, url: track('4.mp3') },
  { id: 't05', name: { en: 'Track 05', ar: 'مقطوعة 5' }, url: track('5.mp3') },
  { id: 't06', name: { en: 'Track 06', ar: 'مقطوعة 6' }, url: track('6.mp3') },
  { id: 't07', name: { en: 'Track 07', ar: 'مقطوعة 7' }, url: track('7.mp3') },
  { id: 't08', name: { en: 'Track 08', ar: 'مقطوعة 8' }, url: track('8.mp3') },
  { id: 't09', name: { en: 'Track 09', ar: 'مقطوعة 9' }, url: track('9.mp3') },
  { id: 't10', name: { en: 'Track 10', ar: 'مقطوعة 10' }, url: track('10.mp3') },
  { id: 't11', name: { en: 'Track 11', ar: 'مقطوعة 11' }, url: track('11.mp3') },
  { id: 't12', name: { en: 'Track 12', ar: 'مقطوعة 12' }, url: track('12.mp3') },
  { id: 't13', name: { en: 'Track 13', ar: 'مقطوعة 13' }, url: track('13.mp3') },
  { id: 't14', name: { en: 'Track 14', ar: 'مقطوعة 14' }, url: track('14.mp3') },
  { id: 't15', name: { en: 'Track 15', ar: 'مقطوعة 15' }, url: track('15.mp3') },
  { id: 't16', name: { en: 'Track 16', ar: 'مقطوعة 16' }, url: track('16.mp3') },
  { id: 't17', name: { en: 'Track 17', ar: 'مقطوعة 17' }, url: track('17.mp3') },
  { id: 't18', name: { en: 'Track 18', ar: 'مقطوعة 18' }, url: track('18.mp3') },
  { id: 't19', name: { en: 'Track 19', ar: 'مقطوعة 19' }, url: track('19.mp3') },
  { id: 't20', name: { en: 'Track 20', ar: 'مقطوعة 20' }, url: track('20.mp3') },
  { id: 't21', name: { en: 'Track 21', ar: 'مقطوعة 21' }, url: track('21.mp3') },
  { id: 't22', name: { en: 'Track 22', ar: 'مقطوعة 22' }, url: track('22.mp3') }
];
