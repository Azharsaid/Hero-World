
import React, { useState, useEffect, useCallback } from 'react';
import { playSound } from '../../services/geminiService';
import { Difficulty } from '../../types';

interface Cell {
  id: number;
  revealed: boolean;
  content: string | null; // null for empty, string for treasure emoji
}

interface Props {
  level: number;
  difficulty: Difficulty;
  onWin: () => void;
  onCorrect?: () => void;
  onIncorrect?: () => void;
}

const TREASURES = ['💎', '👑', '💰', '💍', '📜', '🔱', '🏺', '🗝️'];

const TreasureHunt: React.FC<Props> = ({ level, difficulty, onWin, onCorrect, onIncorrect }) => {
  const [grid, setGrid] = useState<Cell[]>([]);
  const [foundCount, setFoundCount] = useState(0);
  const [totalTreasures, setTotalTreasures] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const initializeGame = useCallback(() => {
    let gridSize = 4;
    let treasureCount = 3;

    if (difficulty === 'medium') {
      gridSize = 5;
      treasureCount = 5;
    } else if (difficulty === 'hard') {
      gridSize = 6;
      treasureCount = 7;
    }

    // Add level progression
    treasureCount = Math.min(treasureCount + Math.floor(level / 5), gridSize * gridSize - 5);
    setTotalTreasures(treasureCount);
    setFoundCount(0);
    setIsWon(false);

    const newGrid: Cell[] = Array.from({ length: gridSize * gridSize }, (_, i) => ({
      id: i,
      revealed: false,
      content: null,
    }));

    // Place treasures randomly
    let placed = 0;
    while (placed < treasureCount) {
      const randomIndex = Math.floor(Math.random() * newGrid.length);
      if (newGrid[randomIndex].content === null) {
        newGrid[randomIndex].content = TREASURES[Math.floor(Math.random() * TREASURES.length)];
        placed++;
      }
    }

    setGrid(newGrid);
  }, [level, difficulty]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleCellClick = (index: number) => {
    if (grid[index].revealed || isWon) return;

    const newGrid = [...grid];
    newGrid[index].revealed = true;
    setGrid(newGrid);

    if (newGrid[index].content) {
      playSound('correct');
      onCorrect?.();
      const newFoundCount = foundCount + 1;
      setFoundCount(newFoundCount);

      if (newFoundCount === totalTreasures) {
        setIsWon(true);
        playSound('win');
        setTimeout(onWin, 2500);
      }
    } else {
      playSound('incorrect');
      onIncorrect?.();
    }
  };

  const gridSize = Math.sqrt(grid.length);

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/80 p-4 rounded-full mb-8 font-black text-orange-800 shadow-lg border-2 border-orange-100 flex gap-6">
        <span>المستوى {level}</span>
        <span className="text-orange-500">الكنوز: {foundCount} / {totalTreasures} 🗺️</span>
      </div>

      <div 
        className="grid gap-2 bg-amber-900/20 p-6 rounded-[2rem] backdrop-blur-md shadow-2xl border-4 border-amber-800/30"
        style={{ 
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          width: 'min(90vw, 500px)'
        }}
      >
        {grid.map((cell, idx) => (
          <div
            key={cell.id}
            onClick={() => handleCellClick(idx)}
            className={`
              aspect-square flex items-center justify-center text-3xl sm:text-4xl rounded-xl cursor-pointer transition-all duration-300 transform
              ${cell.revealed 
                ? (cell.content ? 'bg-yellow-100 border-2 border-yellow-400 scale-100' : 'bg-amber-800/40 border-2 border-amber-900/10 scale-95 opacity-50') 
                : 'bg-amber-700 hover:bg-amber-600 border-b-4 border-amber-900 hover:scale-105 active:scale-95 shadow-lg'}
            `}
          >
            {cell.revealed ? (cell.content || '🕳️') : '🧱'}
          </div>
        ))}
      </div>

      <div className="mt-8 text-amber-900 font-bold bg-white/50 px-6 py-2 rounded-full animate-bounce">
        {foundCount === totalTreasures ? 'لقد وجدت كل الكنوز! 🎉' : 'احفر في الرمل لتجد الكنز المفقود!'}
      </div>

      {isWon && (
        <div className="fixed inset-0 flex items-center justify-center bg-orange-500/20 backdrop-blur-sm z-50 animate-in fade-in zoom-in duration-500">
          <div className="bg-white p-12 rounded-[4rem] text-center shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-8 border-orange-100">
            <div className="text-9xl mb-6 animate-bounce">💎💰</div>
            <h2 className="text-5xl font-black text-orange-600 mb-2">مكتشف الكنوز!</h2>
            <p className="text-2xl text-gray-700 font-bold italic">لقد جمعت كل القطع الذهبية! 🏆</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreasureHunt;
