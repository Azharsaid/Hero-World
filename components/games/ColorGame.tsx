
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

const COLORS = [
  { name: 'أحمر', hex: '#ef4444' },
  { name: 'أزرق', hex: '#3b82f6' },
  { name: 'أخضر', hex: '#22c55e' },
  { name: 'أصفر', hex: '#eab308' },
  { name: 'برتقالي', hex: '#f97316' },
  { name: 'بنفسجي', hex: '#a855f7' },
  { name: 'وردي', hex: '#ec4899' },
  { name: 'بني', hex: '#78350f' },
  { name: 'رمادي', hex: '#6b7280' },
  { name: 'أسود', hex: '#000000' }
];

const ColorGame: React.FC<Props> = ({ level, difficulty, onWin, onCorrect, onIncorrect }) => {
  const [target, setTarget] = useState(COLORS[0]);
  const [options, setOptions] = useState(COLORS);
  const [score, setScore] = useState(0);
  
  const targetScore = Math.min(3 + level + (difficulty === 'hard' ? 5 : difficulty === 'medium' ? 2 : 0), 20);

  const generateRound = useCallback(() => {
    let poolSize = Math.min(3 + Math.floor(level / 5), COLORS.length);
    if (difficulty === 'medium') poolSize = Math.min(poolSize + 2, COLORS.length);
    if (difficulty === 'hard') poolSize = COLORS.length;

    const roundColors = COLORS.slice(0, poolSize).sort(() => Math.random() - 0.5);
    const correct = roundColors[Math.floor(Math.random() * roundColors.length)];
    
    setTarget(correct);
    setOptions(roundColors);
  }, [level, difficulty]);

  useEffect(() => {
    generateRound();
  }, [generateRound]);

  const handleSelect = (color: typeof COLORS[0]) => {
    if (color.hex === target.hex) {
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
        <div className="text-xl font-bold text-yellow-600">تحدي الألوان</div>
        <div className="text-xl font-bold text-blue-600">{score} / {targetScore}</div>
      </div>

      <div className="bg-white rounded-[3rem] p-10 shadow-2xl text-center w-full max-w-lg border-8 border-yellow-100">
        <h2 className="text-4xl font-black mb-10 text-gray-800">اختر اللون: <span className="text-yellow-500">{target.name}</span></h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {options.map((color) => (
            <button
              key={color.hex}
              onClick={() => handleSelect(color)}
              className="h-20 sm:h-24 rounded-2xl shadow-lg border-4 border-white transition-transform hover:scale-110 active:scale-95"
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorGame;
