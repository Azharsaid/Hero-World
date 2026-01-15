
import React, { useState, useEffect, useCallback } from 'react';
import { playSound } from '../../services/geminiService';
import { Difficulty } from '../../types';

interface Round {
  options: string[];
  answer: string;
  category: string;
}

interface Props {
  level: number;
  difficulty: Difficulty;
  onWin: () => void;
  onCorrect?: () => void;
  onIncorrect?: () => void;
}

const CATEGORIES = [
  { name: 'فواكه', items: ['🍎', '🍌', '🍇', '🍓', '🍒', '🍍', '🥝', '🍉'] },
  { name: 'حيوانات', items: ['🦁', '🐯', '🐼', '🦊', '🐰', '🐭', '🐨', '🐸'] },
  { name: 'مركبات', items: ['🚗', '✈️', '🚂', '🚁', '🚢', '🚲', '🚀', '🚜'] },
  { name: 'رياضة', items: ['⚽', '🏀', '🎾', '🏐', '🏈', '⚾', '🎱', '🏓'] },
  { name: 'حلويات', items: ['🍦', '🍩', '🍪', '🍰', '🧁', '🍭', '🍬', '🍫'] }
];

const OddOneOut: React.FC<Props> = ({ level, difficulty, onWin, onCorrect, onIncorrect }) => {
  const [round, setRound] = useState<Round | null>(null);
  const [score, setScore] = useState(0);
  const targetScore = Math.min(3 + Math.floor(level / 2), 10);

  const generateRound = useCallback(() => {
    // Pick 2 random categories
    const shuffledCats = [...CATEGORIES].sort(() => Math.random() - 0.5);
    const mainCat = shuffledCats[0];
    const oddCat = shuffledCats[1];

    let count = 3;
    if (difficulty === 'medium') count = 5;
    if (difficulty === 'hard') count = 7;

    const mainItems = [...mainCat.items].sort(() => Math.random() - 0.5).slice(0, count);
    const oddItem = oddCat.items[Math.floor(Math.random() * oddCat.items.length)];
    
    const options = [...mainItems, oddItem].sort(() => Math.random() - 0.5);
    
    setRound({
      options,
      answer: oddItem,
      category: mainCat.name
    });
  }, [difficulty]);

  useEffect(() => {
    generateRound();
  }, [generateRound]);

  const handleSelect = (item: string) => {
    if (!round) return;

    if (item === round.answer) {
      playSound('correct');
      onCorrect?.();
      const nextScore = score + 1;
      if (nextScore >= targetScore) {
        playSound('win');
        onWin();
      } else {
        setScore(nextScore);
        generateRound();
      }
    } else {
      playSound('incorrect');
      onIncorrect?.();
    }
  };

  if (!round) return null;

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/90 px-8 py-3 rounded-full mb-8 shadow-xl flex gap-10 border-2 border-amber-200">
        <div className="text-xl font-black text-amber-600 italic">ابحث عن العنصر المختلف! 🔍</div>
        <div className="text-xl font-black text-orange-500">النقاط: {score} / {targetScore}</div>
      </div>

      <div className="bg-white rounded-[3rem] p-10 shadow-2xl text-center w-full max-w-2xl border-8 border-amber-100">
        <p className="mb-8 text-2xl font-bold text-gray-700 italic">كل هذه الأشياء تنتمي لمجموعة <span className="text-amber-600 underline">{round.category}</span>.. ما عدا واحد!</p>
        
        <div className={`grid ${round.options.length > 4 ? 'grid-cols-4' : 'grid-cols-2'} gap-6`}>
          {round.options.map((item, i) => (
            <button
              key={i}
              onClick={() => handleSelect(item)}
              className="bg-amber-50 border-4 border-amber-100 hover:border-amber-400 rounded-3xl p-8 text-7xl transition-all hover:scale-110 active:scale-90 shadow-lg group"
            >
              <span className="group-hover:animate-bounce inline-block">{item}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 text-amber-900 font-bold bg-white/50 px-6 py-2 rounded-full animate-pulse shadow-sm">
        ركز جيداً.. من هو الغريب؟ 🤔
      </div>
    </div>
  );
};

export default OddOneOut;
