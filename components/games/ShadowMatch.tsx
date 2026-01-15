
import React, { useState, useEffect, useCallback } from 'react';
import { playSound } from '../../services/geminiService';
import { Difficulty } from '../../types';

interface Props {
  level: number;
  difficulty: Difficulty;
  onWin: () => void;
  onCorrect?: () => void;
  onIncorrect?: () => void;
}

const ITEMS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺'];

const ShadowMatch: React.FC<Props> = ({ level, difficulty, onWin, onCorrect, onIncorrect }) => {
  const [pairs, setPairs] = useState<{ icon: string; matched: boolean }[]>([]);
  const [shuffledIcons, setShuffledIcons] = useState<string[]>([]);
  const [selectedShadow, setSelectedShadow] = useState<number | null>(null);

  const initGame = useCallback(() => {
    let count = Math.min(3 + Math.floor(level / 3), 6);
    if (difficulty === 'medium') count += 2;
    if (difficulty === 'hard') count += 4;
    count = Math.min(count, 12);

    const selected = ITEMS.sort(() => Math.random() - 0.5).slice(0, count);
    setPairs(selected.map(icon => ({ icon, matched: false })));
    setShuffledIcons([...selected].sort(() => Math.random() - 0.5));
    setSelectedShadow(null);
  }, [level, difficulty]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleIconClick = (icon: string) => {
    if (selectedShadow === null) return;

    if (pairs[selectedShadow].icon === icon) {
      playSound('correct');
      onCorrect?.();
      const newPairs = [...pairs];
      newPairs[selectedShadow].matched = true;
      setPairs(newPairs);
      setSelectedShadow(null);

      if (newPairs.every(p => p.matched)) {
        playSound('win');
        setTimeout(onWin, 2000);
      }
    } else {
      playSound('incorrect');
      onIncorrect?.();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/90 p-4 rounded-full mb-8 font-black text-emerald-700 shadow-lg border-2 border-emerald-100">
        طابق كل حيوان بظله الصحيح! المستوى {level}
      </div>

      <div className="grid grid-cols-2 gap-8 sm:gap-16 w-full max-w-3xl bg-white/60 p-10 rounded-[4rem] backdrop-blur-md border-8 border-white shadow-2xl">
        {/* Shadow Column */}
        <div className="flex flex-col gap-6">
          <h3 className="text-center font-black text-slate-500 mb-2 text-xl underline underline-offset-8">الظلال 👤</h3>
          {pairs.map((p, idx) => (
            <div
              key={idx}
              onClick={() => !p.matched && setSelectedShadow(idx)}
              className={`
                h-24 sm:h-28 rounded-[2rem] flex items-center justify-center text-6xl sm:text-7xl transition-all cursor-pointer border-4
                ${p.matched ? 'bg-green-100 border-green-400 opacity-30 grayscale' : selectedShadow === idx ? 'bg-emerald-200 border-emerald-500 scale-105 shadow-2xl' : 'bg-slate-100 border-slate-200 hover:bg-white hover:border-emerald-300'}
              `}
            >
              <span 
                style={{ 
                  filter: p.matched ? 'none' : 'brightness(0) contrast(1.2)', 
                  opacity: p.matched ? 1 : 0.85 
                }}
                className="select-none"
              >
                {p.icon}
              </span>
            </div>
          ))}
        </div>

        {/* Icons Column */}
        <div className="flex flex-col gap-6">
          <h3 className="text-center font-black text-emerald-600 mb-2 text-xl underline underline-offset-8">الألوان 🎨</h3>
          {shuffledIcons.map((icon, idx) => {
            const isMatched = pairs.find(p => p.icon === icon)?.matched;
            return (
              <div
                key={idx}
                onClick={() => !isMatched && handleIconClick(icon)}
                className={`
                  h-24 sm:h-28 rounded-[2rem] flex items-center justify-center text-6xl sm:text-7xl transition-all cursor-pointer border-4 bg-white
                  ${isMatched ? 'opacity-10 grayscale scale-90 border-transparent' : 'border-emerald-100 hover:scale-110 hover:shadow-xl active:scale-95 shadow-lg drop-shadow-md'}
                `}
              >
                {icon}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Selection Help Message */}
      <div className="mt-8 text-emerald-800 font-bold bg-white/50 px-6 py-2 rounded-full animate-pulse">
        {selectedShadow === null ? 'اضغط على ظل أولاً!' : 'الآن اختر الحيوان الملون المناسب!'}
      </div>
    </div>
  );
};

export default ShadowMatch;
