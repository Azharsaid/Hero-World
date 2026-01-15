
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

const NOTES = [
  { name: 'دو', freq: 261.63, color: 'bg-red-500', emoji: '🍎' },
  { name: 'ري', freq: 293.66, color: 'bg-orange-500', emoji: '🍊' },
  { name: 'مي', freq: 329.63, color: 'bg-yellow-500', emoji: '🍌' },
  { name: 'فا', freq: 349.23, color: 'bg-green-500', emoji: '🍐' },
  { name: 'صول', freq: 392.00, color: 'bg-blue-500', emoji: '🫐' },
  { name: 'لا', freq: 440.00, color: 'bg-indigo-500', emoji: '🍇' },
  { name: 'سي', freq: 493.88, color: 'bg-purple-500', emoji: '🍆' },
  { name: 'دو العالية', freq: 523.25, color: 'bg-pink-500', emoji: '🍓' },
];

const MagicalPiano: React.FC<Props> = ({ level, difficulty, onWin, onCorrect, onIncorrect }) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeKey, setActiveKey] = useState<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  };

  const playNote = (index: number) => {
    initAudio();
    const ctx = audioCtxRef.current!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(NOTES[index].freq, ctx.currentTime);
    
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.5);
    
    setActiveKey(index);
    setTimeout(() => setActiveKey(null), 300);
  };

  const startNewSequence = useCallback(() => {
    let seqLength = Math.min(2 + Math.floor(level / 2), 6);
    if (difficulty === 'medium') seqLength += 2;
    if (difficulty === 'hard') seqLength += 4;

    const newSeq = Array.from({ length: seqLength }, () => Math.floor(Math.random() * NOTES.length));
    setSequence(newSeq);
    setUserSequence([]);
    setIsPlaying(true);
  }, [level, difficulty]);

  useEffect(() => {
    startNewSequence();
  }, [startNewSequence]);

  useEffect(() => {
    if (isPlaying && sequence.length > 0) {
      let i = 0;
      const speed = difficulty === 'hard' ? 400 : difficulty === 'medium' ? 600 : 800;
      const interval = setInterval(() => {
        playNote(sequence[i]);
        i++;
        if (i >= sequence.length) {
          clearInterval(interval);
          setTimeout(() => setIsPlaying(false), 600);
        }
      }, speed);
      return () => clearInterval(interval);
    }
  }, [isPlaying, sequence, difficulty]);

  const handleKeyClick = (index: number) => {
    if (isPlaying) return;

    playNote(index);
    const newUserSeq = [...userSequence, index];
    setUserSequence(newUserSeq);

    // Check progress
    if (sequence[newUserSeq.length - 1] !== index) {
      playSound('incorrect');
      onIncorrect?.();
      setUserSequence([]);
      // Small delay before re-playing the sequence
      setTimeout(() => setIsPlaying(true), 1000);
      return;
    }

    if (newUserSeq.length === sequence.length) {
      playSound('win');
      onCorrect?.(); // Technically a win is also a correct streak
      setTimeout(onWin, 2000);
    } else {
      playSound('correct');
      onCorrect?.();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/80 px-8 py-4 rounded-full mb-8 shadow-xl flex gap-8">
        <div className="text-xl font-bold text-cyan-600">البيانو السحري - مستوى {level}</div>
        <div className="text-xl font-bold text-blue-600">كرر العزف!</div>
      </div>

      <div className="bg-white rounded-[3rem] p-8 shadow-2xl border-8 border-cyan-100 w-full max-w-2xl relative overflow-hidden">
        {/* Visual feedback area */}
        <div className="h-24 flex items-center justify-center mb-8 bg-cyan-50 rounded-2xl border-2 border-dashed border-cyan-200">
           {activeKey !== null && (
             <div className="text-7xl animate-bounce">
               {NOTES[activeKey].emoji}
             </div>
           )}
           {activeKey === null && sequence.length > 0 && !isPlaying && (
             <div className="text-gray-400 italic">بانتظار عزفك المبدع...</div>
           )}
           {isPlaying && (
             <div className="text-cyan-600 font-bold animate-pulse text-2xl">استمع للألحان... 🎵</div>
           )}
        </div>

        {/* Piano Keys */}
        <div className="flex justify-center gap-2 h-64">
          {NOTES.map((note, idx) => (
            <button
              key={idx}
              disabled={isPlaying}
              onClick={() => handleKeyClick(idx)}
              className={`
                flex-1 flex flex-col items-center justify-end pb-4 rounded-b-2xl border-b-8 shadow-lg transition-all
                ${activeKey === idx ? 'scale-95 translate-y-2 brightness-110 shadow-inner' : 'hover:-translate-y-1'}
                ${note.color} border-black/20 text-white font-black text-lg
              `}
              style={{ minWidth: '40px' }}
            >
              <span className="bg-white/20 p-1 rounded-full text-xs mb-2 opacity-50">{note.name}</span>
              <span className="text-2xl">{note.emoji}</span>
            </button>
          ))}
        </div>
        
        {/* Footer info */}
        <div className="mt-8 flex justify-between items-center text-sm text-gray-500">
           <div>{userSequence.length} / {sequence.length} نغمات</div>
           <button 
             onClick={() => setIsPlaying(true)} 
             disabled={isPlaying}
             className="bg-cyan-500 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-cyan-600 disabled:opacity-50"
           >
             أعد سماع اللحن 🔁
           </button>
        </div>
      </div>
    </div>
  );
};

export default MagicalPiano;
