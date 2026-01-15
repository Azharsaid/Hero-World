
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

const CountingStars: React.FC<Props> = ({ level, difficulty, onWin, onCorrect, onIncorrect }) => {
  const [stars, setStars] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);
  const [count, setCount] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  
  const targetScore = Math.min(3 + Math.floor(level / 3), 8);

  const generateRound = useCallback(() => {
    let maxStars = 5 + Math.floor(level / 2);
    if (difficulty === 'medium') maxStars += 5;
    if (difficulty === 'hard') maxStars += 10;
    maxStars = Math.min(maxStars, 20);

    const starCount = Math.floor(Math.random() * (maxStars - 2)) + 2;
    const newStars = Array.from({ length: starCount }, () => ({
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 10,
      size: Math.random() * 20 + 30,
      delay: Math.random() * 2
    }));

    const opts = [starCount];
    while (opts.length < 4) {
      const wrong = Math.max(1, starCount + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1));
      if (!opts.includes(wrong) && wrong > 0) opts.push(wrong);
    }

    setStars(newStars);
    setCount(starCount);
    setOptions(opts.sort(() => Math.random() - 0.5));
  }, [level, difficulty]);

  useEffect(() => {
    generateRound();
  }, [generateRound]);

  const handleGuess = (guess: number) => {
    if (guess === count) {
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

  return (
    <div className="flex flex-col items-center w-full">
      <div className="bg-white/90 px-8 py-3 rounded-full mb-8 shadow-xl flex gap-10 border-2 border-indigo-200">
        <div className="text-xl font-black text-indigo-600 italic">كم نجمة تلمع في السماء؟ ⭐</div>
        <div className="text-xl font-black text-orange-500">النقاط: {score} / {targetScore}</div>
      </div>

      <div className="relative w-full max-w-2xl h-[400px] bg-indigo-950 rounded-[3rem] border-8 border-white shadow-2xl overflow-hidden mb-10">
        {/* Sky Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 to-purple-900 opacity-50"></div>
        
        {/* Animated Stars */}
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute animate-pulse text-yellow-300 drop-shadow-[0_0_10px_rgba(255,255,0,0.8)]"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              fontSize: `${star.size}px`,
              animationDelay: `${star.delay}s`
            }}
          >
            ⭐
          </div>
        ))}
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-xl">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleGuess(opt)}
            className="bg-white border-b-8 border-indigo-200 hover:border-indigo-500 rounded-3xl p-6 text-5xl font-black text-indigo-600 transition-all hover:scale-110 active:scale-90 shadow-xl"
          >
            {opt}
          </button>
        ))}
      </div>
      
      <p className="mt-8 text-indigo-900 font-bold bg-white/50 px-6 py-2 rounded-full shadow-sm">
        عدّ النجوم اللامعة واختر الرقم الصحيح! 🌟
      </p>
    </div>
  );
};

export default CountingStars;
