
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

const MathGame: React.FC<Props> = ({ level, difficulty, onWin, onCorrect, onIncorrect }) => {
  const [problem, setProblem] = useState({ a: 0, b: 0, op: '+', answer: 0 });
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  
  const difficultyMult = difficulty === 'hard' ? 1.5 : difficulty === 'medium' ? 1.2 : 1;
  const targetScore = Math.floor(Math.min(3 + Math.floor(level / 2), 10) * difficultyMult);

  const generateProblem = useCallback(() => {
    let range = 5 + level;
    if (difficulty === 'medium') range += 10;
    if (difficulty === 'hard') range += 25;

    const a = Math.floor(Math.random() * range) + 1;
    const b = Math.floor(Math.random() * range) + 1;
    const op = (level > 5 || difficulty !== 'easy') && Math.random() > 0.5 ? '-' : '+';
    
    let answer = op === '+' ? a + b : a - b;
    if (answer < 0) {
      const tempA = Math.max(a, b);
      const tempB = Math.min(a, b);
      answer = tempA - tempB;
      setProblem({ a: tempA, b: tempB, op, answer });
    } else {
      setProblem({ a, b, op, answer });
    }

    const opts = [answer];
    while (opts.length < 4) {
      const wrong = Math.floor(Math.random() * (range * 2)) + 1;
      if (!opts.includes(wrong)) opts.push(wrong);
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
  }, [level, difficulty]);

  useEffect(() => {
    generateProblem();
  }, [generateProblem]);

  const handleAnswer = (val: number) => {
    if (val === problem.answer) {
      playSound('correct');
      onCorrect?.();
      const newScore = score + 1;
      if (newScore >= targetScore) {
        playSound('win');
        onWin();
      } else {
        setScore(newScore);
        generateProblem();
      }
    } else {
      playSound('incorrect');
      onIncorrect?.();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/80 px-8 py-4 rounded-full mb-8 shadow-xl flex gap-8">
        <div className="text-xl font-bold text-orange-600">المستوى: {level}</div>
        <div className="text-xl font-bold text-blue-600">النقاط: {score} / {targetScore}</div>
      </div>

      <div className="bg-white rounded-[3rem] p-12 shadow-2xl flex flex-col items-center border-8 border-blue-100 w-full max-w-lg">
        <div className="text-7xl font-black text-gray-800 mb-12 flex gap-4 items-center">
          <span>{problem.a}</span>
          <span className="text-blue-500">{problem.op === '+' ? '➕' : '➖'}</span>
          <span>{problem.b}</span>
          <span className="text-gray-400">=</span>
          <span className="text-blue-400">?</span>
        </div>

        <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className="bg-blue-400 text-white text-4xl font-black py-8 rounded-3xl shadow-lg border-b-8 border-blue-600 hover:scale-105 active:scale-95 transition-all"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MathGame;
