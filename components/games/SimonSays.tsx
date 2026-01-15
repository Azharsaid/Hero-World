
import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  { id: 0, color: 'bg-red-500', active: 'bg-red-300', border: 'border-red-700', freq: 261.63 },
  { id: 1, color: 'bg-blue-500', active: 'bg-blue-300', border: 'border-blue-700', freq: 329.63 },
  { id: 2, color: 'bg-green-500', active: 'bg-green-300', border: 'border-green-700', freq: 392.00 },
  { id: 3, color: 'bg-yellow-500', active: 'bg-yellow-300', border: 'border-yellow-700', freq: 523.25 },
];

const SimonSays: React.FC<Props> = ({ level, difficulty, onWin, onCorrect, onIncorrect }) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [isWon, setIsWon] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playNote = (index: number) => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.setValueAtTime(COLORS[index].freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
    
    setActiveButton(index);
    setTimeout(() => setActiveButton(null), 300);
  };

  const startSequence = useCallback(() => {
    let length = Math.min(3 + Math.floor(level / 2), 10);
    if (difficulty === 'medium') length += 2;
    if (difficulty === 'hard') length += 4;

    const newSeq = Array.from({ length }, () => Math.floor(Math.random() * 4));
    setSequence(newSeq);
    setUserSequence([]);
    setIsPlaying(true);
    setIsWon(false);
  }, [level, difficulty]);

  useEffect(() => {
    startSequence();
  }, [startSequence]);

  useEffect(() => {
    if (isPlaying && sequence.length > 0) {
      let i = 0;
      const speed = difficulty === 'hard' ? 400 : difficulty === 'medium' ? 600 : 800;
      const interval = setInterval(() => {
        playNote(sequence[i]);
        i++;
        if (i >= sequence.length) {
          clearInterval(interval);
          setTimeout(() => setIsPlaying(false), 500);
        }
      }, speed);
      return () => clearInterval(interval);
    }
  }, [isPlaying, sequence, difficulty]);

  const handleButtonClick = (id: number) => {
    if (isPlaying || isWon) return;
    playNote(id);
    const nextUserSeq = [...userSequence, id];
    setUserSequence(nextUserSeq);

    if (sequence[nextUserSeq.length - 1] !== id) {
      playSound('incorrect');
      onIncorrect?.();
      setUserSequence([]);
      setTimeout(() => setIsPlaying(true), 1000);
      return;
    }

    if (nextUserSeq.length === sequence.length) {
      setIsWon(true);
      playSound('win');
      onCorrect?.();
      setTimeout(onWin, 3000);
    } else {
      onCorrect?.();
    }
  };

  return (
    <div className="flex flex-col items-center relative">
      <div className="bg-white/80 px-6 py-2 rounded-full mb-8 font-black text-rose-600 shadow-lg z-10">
        كرر النمط الذي تراه! المستوى {level}
      </div>

      <div className="relative w-80 h-80 bg-gray-800 rounded-full p-4 shadow-2xl border-8 border-gray-700 flex flex-wrap gap-2 overflow-hidden z-10">
        {COLORS.map((c) => (
          <button
            key={c.id}
            disabled={isPlaying || isWon}
            onClick={() => handleButtonClick(c.id)}
            className={`
              w-[calc(50%-4px)] h-[calc(50%-4px)] transition-all duration-200
              ${activeButton === c.id ? c.active + ' scale-95 shadow-inner' : c.color + ' hover:brightness-110'}
              ${c.id === 0 ? 'rounded-tl-full' : ''}
              ${c.id === 1 ? 'rounded-tr-full' : ''}
              ${c.id === 2 ? 'rounded-bl-full' : ''}
              ${c.id === 3 ? 'rounded-br-full' : ''}
              border-4 ${c.border}
              ${isWon ? 'animate-pulse' : ''}
            `}
          />
        ))}
        {/* Center decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gray-800 rounded-full border-8 border-gray-700 flex items-center justify-center">
          <span className="text-4xl">{isWon ? '🥳' : isPlaying ? '👂' : '👉'}</span>
        </div>
      </div>

      <div className="mt-8 flex gap-4 z-10">
        {userSequence.map((_, i) => (
          <div key={i} className="w-4 h-4 rounded-full bg-rose-500 animate-bounce" />
        ))}
        {Array.from({ length: Math.max(0, sequence.length - userSequence.length) }).map((_, i) => (
          <div key={i} className="w-4 h-4 rounded-full bg-gray-300" />
        ))}
      </div>

      {/* Win Celebration Overlay */}
      {isWon && (
        <div className="absolute inset-0 -top-20 flex items-center justify-center z-50 pointer-events-none">
          <div className="relative w-full h-full flex items-center justify-center">
             {/* Confetti Particles */}
             {[...Array(20)].map((_, i) => (
               <div
                 key={i}
                 className="absolute text-3xl animate-ping"
                 style={{
                   left: `${Math.random() * 100}%`,
                   top: `${Math.random() * 100}%`,
                   animationDelay: `${Math.random() * 2}s`,
                   animationDuration: `${1 + Math.random()}s`
                 }}
               >
                 {['✨', '🎉', '🌟', '🎊', '🎈'][Math.floor(Math.random() * 5)]}
               </div>
             ))}

             <div className="bg-white/90 backdrop-blur-md p-10 rounded-[4rem] text-center shadow-2xl border-8 border-rose-100 scale-110 animate-bounce flex flex-col items-center">
                <div className="text-8xl mb-4">🏆</div>
                <h2 className="text-5xl font-black text-rose-600 mb-2">رائع جداً!</h2>
                <p className="text-2xl text-gray-700 font-bold">لقد حفظت النمط ببراعة!</p>
                <div className="mt-4 flex gap-2">
                   <span className="animate-ping">🌟</span>
                   <span className="animate-ping delay-100">🌟</span>
                   <span className="animate-ping delay-200">🌟</span>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Flashing Light Effect during win */}
      {isWon && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-[2px] animate-pulse z-40 pointer-events-none" />
      )}
    </div>
  );
};

export default SimonSays;
