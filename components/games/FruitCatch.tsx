
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { playSound } from '../../services/geminiService';
import { Difficulty, Character } from '../../types';

interface Props {
  level: number;
  difficulty: Difficulty;
  character: Character;
  onWin: () => void;
  onCorrect?: () => void;
  onIncorrect?: () => void;
}

interface Item {
  id: number;
  icon: string;
  x: number;
  y: number;
  speed: number;
  type: 'fruit' | 'bomb';
}

const FRUITS = ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍒', '🥝'];
const BOMBS = ['💣'];

const FruitCatch: React.FC<Props> = ({ level, difficulty, character, onWin, onCorrect, onIncorrect }) => {
  const [basketX, setBasketX] = useState(50);
  const [items, setItems] = useState<Item[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  
  const targetScore = Math.min(10 + level * 2, 50);
  const speedMult = difficulty === 'hard' ? 1.5 : difficulty === 'medium' ? 1.2 : 1;

  // Basket control
  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (gameOver || !gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    let clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(5, Math.min(95, x)));
  };

  // Game Loop
  useEffect(() => {
    if (gameOver) return;

    const spawnInterval = setInterval(() => {
      const isBomb = Math.random() < (difficulty === 'easy' ? 0.05 : difficulty === 'medium' ? 0.15 : 0.25);
      const newItem: Item = {
        id: Date.now(),
        icon: isBomb ? BOMBS[0] : FRUITS[Math.floor(Math.random() * FRUITS.length)],
        x: Math.random() * 90 + 5,
        y: -10,
        speed: (2 + Math.random() * 2) * speedMult * (1 + level / 20),
        type: isBomb ? 'bomb' : 'fruit'
      };
      setItems(prev => [...prev, newItem]);
    }, 1000 - Math.min(level * 20, 500));

    const moveInterval = setInterval(() => {
      setItems(prev => {
        const next = prev.map(item => ({ ...item, y: item.y + item.speed }));
        
        // Collision Detection
        const remaining = next.filter(item => {
          const caught = item.y > 85 && item.y < 95 && Math.abs(item.x - basketX) < 10;
          const missed = item.y > 100;

          if (caught) {
            if (item.type === 'fruit') {
              setScore(s => {
                const newScore = s + 1;
                playSound('correct');
                onCorrect?.();
                if (newScore >= targetScore) {
                  setGameOver(true);
                  playSound('win');
                  setTimeout(onWin, 2000);
                }
                return newScore;
              });
            } else {
              playSound('incorrect');
              onIncorrect?.();
              setScore(s => Math.max(0, s - 5));
            }
            return false;
          }
          return !missed;
        });
        return remaining;
      });
    }, 30);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(moveInterval);
    };
  }, [basketX, gameOver, level, difficulty, speedMult, targetScore, onWin, onCorrect, onIncorrect]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="bg-white/80 px-8 py-3 rounded-full mb-6 shadow-xl flex gap-10">
        <div className="text-xl font-black text-green-600">اجمع الفواكه! {level}</div>
        <div className="text-xl font-black text-blue-600">النقاط: {score} / {targetScore}</div>
      </div>

      <div 
        ref={gameAreaRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        className="relative w-full max-w-2xl h-[500px] bg-sky-100 rounded-[3rem] border-8 border-white shadow-2xl overflow-hidden cursor-none touch-none"
      >
        {/* Background Decor */}
        <div className="absolute bottom-0 w-full h-24 bg-green-200"></div>
        <div className="absolute bottom-12 w-full flex justify-around opacity-30">
          <span className="text-6xl">🌳</span>
          <span className="text-6xl">🌳</span>
          <span className="text-6xl">🌳</span>
        </div>

        {/* Falling Items */}
        {items.map(item => (
          <div
            key={item.id}
            className="absolute text-5xl transition-all duration-30"
            style={{ left: `${item.x}%`, top: `${item.y}%`, transform: 'translateX(-50%)' }}
          >
            {item.icon}
          </div>
        ))}

        {/* Basket / Player */}
        <div 
          className="absolute bottom-4 h-24 w-24 flex flex-col items-center transition-all duration-30"
          style={{ left: `${basketX}%`, transform: 'translateX(-50%)' }}
        >
          <img 
            src={character.imageUrl} 
            className="w-16 h-16 rounded-full border-4 border-white shadow-md z-10" 
            alt="" 
          />
          <div className="w-20 h-10 bg-orange-800 rounded-b-3xl border-t-4 border-orange-900 shadow-lg -mt-2"></div>
          <div className="absolute -top-4 text-2xl animate-bounce">🧺</div>
        </div>

        {gameOver && score >= targetScore && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-12 rounded-[3rem] text-center shadow-2xl animate-bounce">
              <span className="text-8xl">🏆</span>
              <h2 className="text-4xl font-black text-green-600 mt-4">رائع!</h2>
              <p className="text-xl text-gray-700">لقد جمعت كل الفواكه!</p>
            </div>
          </div>
        )}
      </div>
      
      <p className="mt-4 text-gray-500 font-bold">حرك الفأرة أو إصبعك لتمسك الفواكه وتجنب القنابل!</p>
    </div>
  );
};

export default FruitCatch;
