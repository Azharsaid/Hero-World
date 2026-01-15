
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

const EMOJIS = ['🍎', '🍌', '🍇', '🍓', '🚗', '✈️', '🚂', '🚁', '🦁', '🐯', '🐻', '🐼', '⚽', '🏀', '🎾', '🏐'];

const LogicPatterns: React.FC<Props> = ({ level, difficulty, onWin, onCorrect, onIncorrect }) => {
  const [pattern, setPattern] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  
  const targetScore = Math.min(3 + Math.floor(level / 2), 10);

  const generatePattern = useCallback(() => {
    const symbols = EMOJIS.sort(() => Math.random() - 0.5).slice(0, 3);
    const A = symbols[0];
    const B = symbols[1];
    const C = symbols[2];
    
    let fullPattern: string[] = [];
    let correctAnswer = '';
    
    // Pattern logic based on difficulty and level
    const type = level % 3;
    if (difficulty === 'easy' || (type === 0 && difficulty !== 'hard')) {
      // ABAB?
      fullPattern = [A, B, A, B];
      correctAnswer = A;
    } else if (difficulty === 'medium' || type === 1) {
      // AABAAB?
      fullPattern = [A, A, B, A, A, B];
      correctAnswer = A;
    } else {
      // ABCABC?
      fullPattern = [A, B, C, A, B, C];
      correctAnswer = A;
    }

    setPattern(fullPattern);
    setAnswer(correctAnswer);

    const opts = [correctAnswer];
    while (opts.length < 4) {
      const rand = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      if (!opts.includes(rand)) opts.push(rand);
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
  }, [level, difficulty]);

  useEffect(() => {
    generatePattern();
  }, [generatePattern]);

  const handleSelect = (choice: string) => {
    if (choice === answer) {
      playSound('correct');
      onCorrect?.();
      const newScore = score + 1;
      if (newScore >= targetScore) {
        playSound('win');
        onWin();
      } else {
        setScore(newScore);
        generatePattern();
      }
    } else {
      playSound('incorrect');
      onIncorrect?.();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/80 px-8 py-4 rounded-full mb-8 shadow-xl flex gap-8">
        <div className="text-xl font-bold text-orange-600">أكمل النمط!</div>
        <div className="text-xl font-bold text-blue-600">{score} / {targetScore}</div>
      </div>

      <div className="bg-white rounded-[3rem] p-12 shadow-2xl border-8 border-orange-100 w-full max-w-2xl flex flex-col items-center">
        {/* Pattern Display */}
        <div className="flex gap-4 mb-16 bg-orange-50 p-6 rounded-3xl border-2 border-dashed border-orange-200">
          {pattern.map((icon, i) => (
            <div key={i} className="text-5xl sm:text-6xl animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
              {icon}
            </div>
          ))}
          <div className="text-6xl sm:text-7xl font-black text-orange-400 animate-bounce">
            ؟
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              className="bg-white border-4 border-orange-200 hover:border-orange-500 rounded-3xl p-6 text-5xl transition-all hover:scale-110 active:scale-90 shadow-lg hover:shadow-orange-200"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogicPatterns;
