
import React, { useState } from 'react';
import { playSound } from '../../services/geminiService';

interface Props {
  onWin: () => void;
  onCorrect?: () => void;
}

const SHAPES = [
  { id: 'circle', icon: '🔴', label: 'دائرة' },
  { id: 'square', icon: '🟦', label: 'مربع' },
  { id: 'triangle', icon: '🔺', label: 'مثلث' },
  { id: 'star', icon: '⭐', label: 'نجمة' }
];

const ShapePuzzle: React.FC<Props> = ({ onWin, onCorrect }) => {
  const [matched, setMatched] = useState<string[]>([]);
  const [draggedShape, setDraggedShape] = useState<string | null>(null);

  const handleDrop = (id: string) => {
    if (draggedShape === id) {
      playSound('correct');
      onCorrect?.();
      const newMatched = [...matched, id];
      setMatched(newMatched);
      if (newMatched.length === SHAPES.length) {
        playSound('win');
        setTimeout(onWin, 1500);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-12 bg-white/80 p-12 rounded-[3rem] shadow-2xl border-8 border-white">
      <div className="flex gap-8">
        {SHAPES.map(s => (
          <div
            key={s.id}
            draggable={!matched.includes(s.id)}
            onDragStart={() => setDraggedShape(s.id)}
            className={`text-7xl p-6 rounded-2xl cursor-grab active:cursor-grabbing transition-all ${matched.includes(s.id) ? 'opacity-20 grayscale' : 'hover:scale-110 shadow-lg bg-white border-2 border-amber-100'}`}
          >
            {s.icon}
          </div>
        ))}
      </div>

      <div className="flex gap-8">
        {SHAPES.map(s => (
          <div
            key={s.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(s.id)}
            className={`w-32 h-32 rounded-2xl flex items-center justify-center border-4 border-dashed transition-colors ${matched.includes(s.id) ? 'bg-green-100 border-green-500' : 'bg-gray-100 border-gray-300'}`}
          >
            {matched.includes(s.id) ? (
              <span className="text-6xl animate-bounce">{s.icon}</span>
            ) : (
              <span className="text-4xl text-gray-300 opacity-50">؟</span>
            )}
          </div>
        ))}
      </div>
      
      <p className="text-amber-800 font-bold text-xl">اسحب الشكل الملون إلى الظل المناسب له!</p>
    </div>
  );
};

export default ShapePuzzle;
