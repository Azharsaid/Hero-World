
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Character, Difficulty, Language } from '../../types';
import { playSound } from '../../services/geminiService';
import { translations } from '../../translations';

interface Props {
  level: number;
  difficulty: Difficulty;
  character: Character;
  onWin: () => void;
  onCorrect?: () => void;
  onIncorrect?: () => void;
  lang: Language;
}

const STICKERS = ['🦁', '🚀', '🏰', '🌈', '🍦', '🧚', '🐉', '⚽', '🚗', '🐱', '🍕', '🛸'];

const StoryMaker: React.FC<Props> = ({ level, difficulty, character, onWin, onCorrect, lang }) => {
  const [selectedStickers, setSelectedStickers] = useState<string[]>([]);
  const [story, setStory] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const t = translations[lang];

  const stickerLimit = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4;

  const generateStory = async () => {
    if (selectedStickers.length < stickerLimit) return;
    setIsLoading(true);
    // Initialize GoogleGenAI instance right before use to ensure updated configuration.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      // Localized prompt logic using current language and character property maps.
      const prompt = lang === 'ar' 
        ? `أنت راوي قصص للأطفال. اكتب قصة قصيرة جداً (3-4 جمل) بأسلوب مبهج وبسيط جداً. 
          الشخصية الرئيسية هي "${character.name[lang]}" (التي هي ${character.description[lang]}).
          يجب أن تتضمن القصة هذه العناصر: ${selectedStickers.join(', ')}.
          اجعل القصة تنتهي بنهاية سعيدة ومشجعة. باللغة العربية.`
        : `You are a storyteller for children. Write a very short story (3-4 sentences) in a cheerful and very simple style. 
          The main character is "${character.name[lang]}" (who is ${character.description[lang]}).
          The story must include these elements: ${selectedStickers.join(', ')}.
          Make the story end with a happy and encouraging ending. In English.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      setStory(response.text || (lang === 'ar' ? "حدث خطأ في تأليف القصة، حاول مرة أخرى!" : "An error occurred while creating the story, try again!"));
      playSound('win');
      onCorrect?.();
    } catch (error) {
      setStory(lang === 'ar' ? "أوه! يبدو أن خيالنا يحتاج لراحة قليلاً. حاول مرة أخرى!" : "Oh! It seems our imagination needs a little rest. Try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSticker = (s: string) => {
    if (selectedStickers.includes(s)) {
      setSelectedStickers(prev => prev.filter(x => x !== s));
    } else if (selectedStickers.length < stickerLimit) {
      setSelectedStickers(prev => [...prev, s]);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/90 px-8 py-3 rounded-full mb-8 shadow-xl text-center">
        <h2 className="text-2xl font-black text-violet-700">
          {lang === 'ar' ? `اختر ${stickerLimit} ملصقات لنؤلف قصة! 📖` : `Pick ${stickerLimit} stickers to make a story! 📖`}
        </h2>
        {/* Fix: use character.name[lang] instead of the character.name object to avoid React rendering errors. */}
        <p className="text-gray-600 text-sm">
          {lang === 'ar' ? `أنت البطل يا ${character.name[lang]}!` : `You are the hero, ${character.name[lang]}!`}
        </p>
      </div>

      <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-8 border-violet-100 w-full max-w-3xl flex flex-col items-center">
        {/* Sticker Selection */}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 mb-10">
          {STICKERS.map(s => (
            <button
              key={s}
              onClick={() => toggleSticker(s)}
              className={`
                text-5xl p-4 rounded-2xl transition-all duration-300
                ${selectedStickers.includes(s) ? 'bg-violet-400 scale-110 rotate-12 shadow-inner border-4 border-white' : 'bg-violet-50 hover:bg-violet-100 border-4 border-transparent'}
              `}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={generateStory}
          disabled={selectedStickers.length < stickerLimit || isLoading}
          className={`
            px-10 py-4 rounded-full text-2xl font-black text-white transition-all shadow-xl mb-10
            ${selectedStickers.length < stickerLimit || isLoading 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:scale-105 active:scale-95'}
          `}
        >
          {isLoading 
            ? (lang === 'ar' ? 'جاري تأليف القصة... ✨' : 'Creating story... ✨') 
            : (lang === 'ar' ? 'ابدأ القصة! 🚀' : 'Start Story! 🚀')}
        </button>

        {/* Story Display */}
        {story && (
          <div className="bg-violet-50 p-8 rounded-[2rem] border-4 border-white shadow-inner w-full text-right animate-in slide-in-from-bottom duration-500">
            <div className={`text-2xl font-bold text-gray-800 leading-relaxed mb-6 italic ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              "{story}"
            </div>
            <button 
              onClick={onWin}
              className="bg-green-500 text-white px-8 py-2 rounded-full font-bold hover:bg-green-600 shadow-md"
            >
              {t.next_level}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryMaker;
