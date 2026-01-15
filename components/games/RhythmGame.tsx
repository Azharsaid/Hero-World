
import React, { useState, useEffect, useRef } from 'react';
import { playSound } from '../../services/geminiService';

interface Note {
  id: number;
  x: number;
  y: number;
  type: number;
}

interface Props {
  onWin: () => void;
  onCorrect?: () => void;
}

const RhythmGame: React.FC<Props> = ({ onWin, onCorrect }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [score, setScore] = useState(0);
  const targetScore = 15;
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newNote: Note = {
        id: Date.now(),
        x: Math.floor(Math.random() * 3), // 3 lanes
        y: -50,
        type: Math.floor(Math.random() * 3)
      };
      setNotes(prev => [...prev, newNote]);
    }, 1200);

    const moveInterval = setInterval(() => {
      setNotes(prev => {
        const next = prev.map(n => ({ ...n, y: n.y + 4 }));
        return next.filter(n => n.y < 550);
      });
    }, 30);

    return () => {
      clearInterval(interval);
      clearInterval(moveInterval);
    };
  }, []);

  const handleTap = (lane: number) => {
    const hitNote = notes.find(n => n.x === lane && n.y > 400 && n.y < 500);
    if (hitNote) {
      playSound('correct');
      onCorrect?.();
      setScore(s => {
        const next = s + 1;
        if (next >= targetScore) {
          playSound('win');
          setTimeout(onWin, 1500);
        }
        return next;
      });
      setNotes(prev => prev.filter(n => n.id !== hitNote.id));
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="bg-fuchsia-600 text-white px-8 py-2 rounded-full font-black text-2xl shadow-xl">
        النقاط: {score} / {targetScore}
      </div>

      <div ref={gameRef} className="relative w-80 h-[500px] bg-indigo-950 rounded-[2rem] border-8 border-indigo-900 shadow-2xl overflow-hidden">
        {/* Lanes */}
        <div className="absolute inset-0 flex">
          {[0, 1, 2].map(i => (
            <div key={i} className="flex-1 border-r border-white/10 last:border-0" />
          ))}
        </div>

        {/* Target Zone */}
        <div className="absolute bottom-20 w-full h-24 bg-fuchsia-500/20 border-y-4 border-fuchsia-400" />

        {/* Falling Notes */}
        {notes.map(n => (
          <div
            key={n.id}
            className="absolute text-5xl transition-all duration-30"
            style={{ left: `${(n.x * 33) + 5}%`, top: `${n.y}px` }}
          >
            {['⭐', '🎵', '🎈'][n.type]}
          </div>
        ))}

        {/* Buttons */}
        <div className="absolute bottom-4 inset-x-4 flex gap-4">
          {[0, 1, 2].map(i => (
            <button
              key={i}
              onClick={() => handleTap(i)}
              className="flex-1 h-16 bg-fuchsia-500 rounded-xl border-b-4 border-fuchsia-800 active:translate-y-1 active:border-0 transition-all text-white font-black text-2xl"
            >
              🎹
            </button>
          ))}
        </div>
      </div>
      
      <p className="text-indigo-900 font-bold animate-pulse">اضغط على الرموز عندما تدخل المنطقة الوردية!</p>
    </div>
  );
};

export default RhythmGame;
