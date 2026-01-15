
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

const SudokuGame: React.FC<Props> = ({ level, difficulty, onWin, onCorrect, onIncorrect }) => {
  const [grid, setGrid] = useState<(number | null)[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [initialCells, setInitialCells] = useState<boolean[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);

  const generateGame = useCallback(() => {
    // Basic valid 4x4 Sudoku templates
    const templates = [
      [
        [1, 2, 3, 4],
        [3, 4, 1, 2],
        [2, 3, 4, 1],
        [4, 1, 2, 3]
      ],
      [
        [2, 3, 4, 1],
        [4, 1, 2, 3],
        [1, 2, 3, 4],
        [3, 4, 1, 2]
      ],
      [
        [4, 3, 2, 1],
        [2, 1, 4, 3],
        [3, 4, 1, 2],
        [1, 2, 3, 4]
      ]
    ];

    // Pick random template
    let sol = templates[Math.floor(Math.random() * templates.length)];
    
    // Shuffling: Permute rows and columns within blocks
    // (Skipping complex shuffle for child-friendliness and performance)
    
    setSolution(sol);

    // Determine how many cells to hide
    // Level 1: few hides. Level 30: more hides.
    let baseHides = Math.min(4 + Math.floor(level / 3), 10);
    if (difficulty === 'medium') baseHides += 2;
    if (difficulty === 'hard') baseHides += 4;
    
    const hidesCount = Math.min(baseHides, 14);

    const newGrid: (number | null)[][] = sol.map(row => [...row]);
    const init: boolean[][] = sol.map(() => [true, true, true, true]);

    let hidden = 0;
    while (hidden < hidesCount) {
      const r = Math.floor(Math.random() * 4);
      const c = Math.floor(Math.random() * 4);
      if (newGrid[r][c] !== null) {
        newGrid[r][c] = null;
        init[r][c] = false;
        hidden++;
      }
    }

    setGrid(newGrid);
    setInitialCells(init);
    setSelectedCell(null);
  }, [level, difficulty]);

  useEffect(() => {
    generateGame();
  }, [generateGame]);

  const handleInput = (val: number) => {
    if (!selectedCell) return;
    const { r, c } = selectedCell;
    if (initialCells[r][c]) return;

    const newGrid = grid.map(row => [...row]);
    newGrid[r][c] = val;
    setGrid(newGrid);

    // Immediate feedback
    if (val === solution[r][c]) {
      playSound('correct');
      onCorrect?.();
      
      // Check if board complete
      const isComplete = newGrid.every((row, ri) => 
        row.every((cell, ci) => cell === solution[ri][ci])
      );
      
      if (isComplete) {
        playSound('win');
        setTimeout(onWin, 2000);
      }
    } else {
      playSound('incorrect');
      onIncorrect?.();
      // Clear incorrect value after brief delay
      setTimeout(() => {
        const resetGrid = grid.map(row => [...row]);
        resetGrid[r][c] = null;
        setGrid(resetGrid);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/80 px-8 py-3 rounded-full mb-8 shadow-xl text-blue-600 font-black">
        رتب الأرقام من 1 إلى 4 بدون تكرار! المستوى {level}
      </div>

      <div className="bg-white rounded-[3rem] p-8 shadow-2xl border-8 border-blue-100 flex flex-col items-center">
        {/* Sudoku Grid */}
        <div className="grid grid-cols-4 gap-2 mb-10 bg-blue-50 p-2 rounded-2xl border-4 border-blue-200">
          {grid.map((row, r) => (
            row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                onClick={() => !initialCells[r][c] && setSelectedCell({ r, c })}
                className={`
                  w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-3xl font-black rounded-xl cursor-pointer transition-all
                  ${initialCells[r][c] ? 'bg-blue-100 text-blue-800 cursor-default' : 'bg-white text-orange-500 hover:scale-105 active:scale-95 shadow-sm'}
                  ${selectedCell?.r === r && selectedCell?.c === c ? 'ring-4 ring-orange-400 z-10' : ''}
                  ${(r === 1) ? 'mb-2' : ''}
                  ${(c === 1) ? 'mr-2' : ''}
                  border-b-4 border-gray-200
                `}
              >
                {cell || ''}
              </div>
            ))
          ))}
        </div>

        {/* Number Pad */}
        <div className="flex gap-4">
          {[1, 2, 3, 4].map(num => (
            <button
              key={num}
              onClick={() => handleInput(num)}
              className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-500 text-white rounded-2xl text-2xl font-black shadow-lg border-b-4 border-blue-700 hover:scale-110 active:scale-90 transition-transform"
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-8 text-blue-800 font-bold bg-white/50 px-6 py-2 rounded-full animate-pulse">
        {selectedCell ? 'اختر الرقم المناسب لهذه الخلية' : 'اضغط على خلية فارغة لتبدأ!'}
      </div>
    </div>
  );
};

export default SudokuGame;
