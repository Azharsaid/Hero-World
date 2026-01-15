
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

const LETTERS = 'أبتثجحخدذرزسشصضطظعغفقكلمنهوي'.split('');

const AlphabetGame: React.FC<Props> = ({ level, difficulty, onWin, onCorrect, onIncorrect }) => {
  const [target, setTarget] = useState('أ');
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  
  const diffBonus = difficulty === 'hard' ? 6 : difficulty === 'medium' ? 3 : 0;
  const targetScore = Math.min(3 + Math.floor(level / 3) + diffBonus, 15);

  const generateRound = useCallback(() => {
    const idx = Math.floor(Math.random() * LETTERS.length);
    const correct = LETTERS[idx];
    const opts = [correct];
    
    let optCount = 4;
    if (difficulty === 'medium') optCount = 6;
    if (difficulty === 'hard') optCount = 8;

    while (opts.length < optCount) {
      const randomChar = LETTERS[Math.floor(Math.random() * LETTERS.length)];
      if (!opts.includes(randomChar)) opts.push(randomChar);
    }
    
    setTarget(correct);
    setOptions(opts.sort(() => Math.random() - 0.5));
  }, [difficulty]);

  useEffect(() => {
    generateRound();
  }, [generateRound]);

  const handleSelect = (char: string) => {
    if (char === target) {
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
    <div className="flex flex-col items-center">
      <div className="bg-white/80 px-8 py-4 rounded-full mb-8 shadow-xl flex gap-8">
        <div className="text-xl font-bold text-purple-600">رحلة الحروف</div>
        <div className="text-xl font-bold text-blue-600">{score} / {targetScore}</div>
      </div>

      <div className="bg-white rounded-[3rem] p-10 shadow-2xl text-center w-full max-w-lg border-8 border-purple-100">
        <div className="text-9xl font-black text-purple-600 mb-12 animate-bounce">{target}</div>
        
        <div className={`grid ${difficulty === 'easy' ? 'grid-cols-2' : 'grid-cols-3'} gap-6`}>
          {options.map((char) => (
            <button
              key={char}
              onClick={() => handleSelect(char)}
              className="bg-purple-100 text-purple-600 text-4xl sm:text-5xl font-black py-4 sm:py-6 rounded-3xl shadow-md border-b-8 border-purple-300 hover:bg-purple-200 transition-all"
            >
              {char}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlphabetGame;
