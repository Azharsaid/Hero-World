
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { playSound } from '../../services/geminiService';
import { Difficulty } from '../../types';

interface Balloon {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  speed: number;
  popped: boolean;
}

interface Props {
  level: number;
  difficulty: Difficulty;
  onWin: () => void;
  onCorrect?: () => void;
}

const BALLOON_COLORS = [
  'bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 
  'bg-pink-400', 'bg-purple-400', 'bg-orange-400'
];

const BalloonPop: React.FC<Props> = ({ level, difficulty, onWin, onCorrect }) => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const targetScore = Math.min(10 + level * 2, 40);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const speedMult = difficulty === 'hard' ? 1.6 : difficulty === 'medium' ? 1.3 : 1;

  const spawnBalloon = useCallback(() => {
    if (gameOver) return;
    const newBalloon: Balloon = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10,
      y: 110, // Start below screen
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
      size: Math.random() * 20 + 60, // 60px to 80px
      speed: (1 + Math.random() * 1.5) * speedMult * (1 + level / 25),
      popped: false,
    };
    setBalloons(prev => [...prev, newBalloon]);
  }, [gameOver, level, difficulty, speedMult]);

  // Spawn interval
  useEffect(() => {
    const spawnRate = Math.max(1200 - (level * 20), 400);
    const interval = setInterval(spawnBalloon, spawnRate);
    return () => clearInterval(interval);
  }, [spawnBalloon, level]);

  // Movement loop
  useEffect(() => {
    const moveLoop = setInterval(() => {
      setBalloons(prev => {
        const next = prev.map(b => ({ ...b, y: b.y - b.speed }));
        // Remove balloons that flew away
        return next.filter(b => b.y > -20);
      });
    }, 20);
    return () => clearInterval(moveLoop);
  }, []);

  const handlePop = (id: number) => {
    if (gameOver) return;

    setBalloons(prev => prev.map(b => {
      if (b.id === id && !b.popped) {
        playSound('correct');
        onCorrect?.();
        setScore(s => {
          const next = s + 1;
          if (next >= targetScore) {
            setGameOver(true);
            playSound('win');
            setTimeout(onWin, 2000);
          }
          return next;
        });
        return { ...b, popped: true };
      }
      return b;
    }));

    // Remove popped balloon after animation
    setTimeout(() => {
      setBalloons(prev => prev.filter(b => b.id !== id));
    }, 300);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="bg-white/90 px-8 py-3 rounded-full mb-6 shadow-xl flex gap-10 border-2 border-sky-200">
        <div className="text-xl font-black text-sky-600 italic">فرقع البالونات! 🎈</div>
        <div className="text-xl font-black text-orange-500">النقاط: {score} / {targetScore}</div>
      </div>

      <div 
        ref={gameAreaRef}
        className="relative w-full max-w-2xl h-[500px] bg-gradient-to-b from-sky-200 to-sky-100 rounded-[3rem] border-8 border-white shadow-2xl overflow-hidden cursor-crosshair"
      >
        {/* Decorative Clouds */}
        <div className="absolute top-10 left-10 text-6xl opacity-40 animate-pulse">☁️</div>
        <div className="absolute top-40 right-20 text-7xl opacity-40 animate-pulse" style={{animationDelay: '1s'}}>☁️</div>
        <div className="absolute bottom-20 left-1/4 text-5xl opacity-30 animate-pulse" style={{animationDelay: '1.5s'}}>☁️</div>

        {/* Balloons */}
        {balloons.map(b => (
          <div
            key={b.id}
            onClick={() => handlePop(b.id)}
            className={`
              absolute rounded-full shadow-lg cursor-pointer transition-transform duration-300
              ${b.color}
              ${b.popped ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}
            `}
            style={{ 
              left: `${b.x}%`, 
              top: `${b.y}%`, 
              width: `${b.size}px`, 
              height: `${b.size * 1.2}px`,
              transform: 'translateX(-50%)',
              borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%'
            }}
          >
            {/* Balloon String */}
            {!b.popped && (
              <div className="absolute -bottom-10 left-1/2 w-0.5 h-10 bg-white/40 -translate-x-1/2"></div>
            )}
            {/* Highlight */}
            {!b.popped && (
              <div className="absolute top-2 left-3 w-1/4 h-1/4 bg-white/30 rounded-full"></div>
            )}
          </div>
        ))}

        {gameOver && score >= targetScore && (
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-12 rounded-[4rem] text-center shadow-[0_20px_50px_rgba(0,0,0,0.15)] animate-bounce border-8 border-sky-100">
              <span className="text-8xl">🎈✨</span>
              <h2 className="text-4xl font-black text-sky-600 mt-4">يا لك من رائع!</h2>
              <p className="text-xl text-gray-700 font-bold">فرقعتها جميعاً!</p>
            </div>
          </div>
        )}
      </div>
      
      <p className="mt-6 text-sky-800 font-black animate-pulse bg-white/50 px-6 py-2 rounded-full border-2 border-white shadow-sm">
        اضغط على البالونات الطائرة قبل أن تختفي! 🎈💨
      </p>
    </div>
  );
};

export default BalloonPop;
