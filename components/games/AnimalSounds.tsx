
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { playSound } from '../../services/geminiService';
import { Difficulty } from '../../types';

interface Animal {
  id: string;
  name: string;
  emoji: string;
  soundUrl: string;
}

interface Props {
  level: number;
  difficulty: Difficulty;
  onWin: () => void;
  onCorrect?: () => void;
  onIncorrect?: () => void;
}

const ANIMALS: Animal[] = [
  { id: 'lion', name: 'أسد', emoji: '🦁', soundUrl: 'https://www.soundjay.com/nature/sounds/lion-roar-01.mp3' },
  { id: 'cow', name: 'بقرة', emoji: '🐮', soundUrl: 'https://www.soundjay.com/nature/sounds/cow-moo-1.mp3' },
  { id: 'duck', name: 'بطة', emoji: '🦆', soundUrl: 'https://www.soundjay.com/nature/sounds/duck-quack-1.mp3' },
  { id: 'sheep', name: 'خروف', emoji: '🐑', soundUrl: 'https://www.soundjay.com/nature/sounds/sheep-lamb-1.mp3' },
  { id: 'dog', name: 'كلب', emoji: '🐶', soundUrl: 'https://www.soundjay.com/nature/sounds/dog-bark-1.mp3' },
  { id: 'cat', name: 'قطة', emoji: '🐱', soundUrl: 'https://www.soundjay.com/nature/sounds/cat-meow-1.mp3' },
  { id: 'elephant', name: 'فيل', emoji: '🐘', soundUrl: 'https://www.soundjay.com/nature/sounds/elephant-trumpeting-1.mp3' },
  { id: 'horse', name: 'حصان', emoji: '🐴', soundUrl: 'https://www.soundjay.com/nature/sounds/horse-whinny-1.mp3' },
  { id: 'monkey', name: 'قرد', emoji: '🐒', soundUrl: 'https://www.soundjay.com/nature/sounds/monkey-chatter-1.mp3' },
  { id: 'rooster', name: 'ديك', emoji: '🐓', soundUrl: 'https://www.soundjay.com/nature/sounds/rooster-crowing-1.mp3' },
];

const AnimalSounds: React.FC<Props> = ({ level, difficulty, onWin, onCorrect, onIncorrect }) => {
  const [currentTarget, setCurrentTarget] = useState<Animal | null>(null);
  const [options, setOptions] = useState<Animal[]>([]);
  const [score, setScore] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const targetScore = Math.min(3 + Math.floor(level / 2), 10);

  const generateRound = useCallback(() => {
    const shuffled = [...ANIMALS].sort(() => Math.random() - 0.5);
    const target = shuffled[0];
    
    let optCount = 4;
    if (difficulty === 'medium') optCount = 6;
    if (difficulty === 'hard') optCount = 8;

    const roundOptions = shuffled.slice(0, optCount).sort(() => Math.random() - 0.5);
    
    setCurrentTarget(target);
    setOptions(roundOptions);
    setIsPlaying(false);
  }, [difficulty]);

  useEffect(() => {
    generateRound();
  }, [generateRound]);

  const playAnimalSound = () => {
    if (!currentTarget || isPlaying) return;
    setIsPlaying(true);
    
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    audioRef.current = new Audio(currentTarget.soundUrl);
    audioRef.current.onended = () => setIsPlaying(false);
    audioRef.current.play().catch(e => {
      console.error("Audio play failed:", e);
      setIsPlaying(false);
    });
  };

  const handleGuess = (animal: Animal) => {
    if (!currentTarget || isWon) return;

    if (animal.id === currentTarget.id) {
      playSound('correct');
      onCorrect?.();
      const nextScore = score + 1;
      if (nextScore >= targetScore) {
        setIsWon(true);
        playSound('win');
        setTimeout(onWin, 2500);
      } else {
        setScore(nextScore);
        generateRound();
      }
    } else {
      playSound('incorrect');
      onIncorrect?.();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/90 px-8 py-3 rounded-full mb-8 shadow-xl flex gap-10 border-2 border-teal-200">
        <div className="text-xl font-black text-teal-600 italic">خمّن الحيوان من صوته! 🔊</div>
        <div className="text-xl font-black text-orange-500">النقاط: {score} / {targetScore}</div>
      </div>

      <div className="bg-white rounded-[3rem] p-10 shadow-2xl text-center w-full max-w-2xl border-8 border-teal-100 flex flex-col items-center">
        
        <div className="mb-12 relative">
          <button
            onClick={playAnimalSound}
            disabled={isPlaying}
            className={`
              w-32 h-32 rounded-full flex items-center justify-center text-5xl transition-all shadow-xl border-8 border-white
              ${isPlaying ? 'bg-teal-200 animate-pulse' : 'bg-teal-500 hover:scale-110 active:scale-95'}
            `}
          >
            {isPlaying ? '🎵' : '🔊'}
          </button>
          <div className="mt-4 font-black text-teal-700 text-xl">اضغط لتسمع صوت الحيوان!</div>
          
          {isPlaying && (
            <div className="absolute -top-4 -right-4 flex gap-1">
              <span className="animate-bounce delay-0 text-teal-500 text-2xl">♪</span>
              <span className="animate-bounce delay-100 text-teal-500 text-2xl">♫</span>
              <span className="animate-bounce delay-200 text-teal-500 text-2xl">♪</span>
            </div>
          )}
        </div>

        <div className={`grid ${options.length > 4 ? 'grid-cols-3 sm:grid-cols-4' : 'grid-cols-2'} gap-6 w-full`}>
          {options.map((animal) => (
            <button
              key={animal.id}
              onClick={() => handleGuess(animal)}
              className="bg-teal-50 border-4 border-teal-100 hover:border-teal-400 rounded-3xl p-6 transition-all hover:scale-105 active:scale-90 shadow-lg group flex flex-col items-center"
            >
              <span className="text-6xl mb-2 group-hover:animate-bounce">{animal.emoji}</span>
              <span className="font-bold text-teal-800 text-lg">{animal.name}</span>
            </button>
          ))}
        </div>
      </div>

      {isWon && (
        <div className="fixed inset-0 flex items-center justify-center bg-teal-500/20 backdrop-blur-sm z-50 animate-in fade-in zoom-in duration-500">
          <div className="bg-white p-12 rounded-[4rem] text-center shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-8 border-teal-100">
            <div className="text-9xl mb-6 animate-bounce">🦁🦊🐮</div>
            <h2 className="text-5xl font-black text-teal-600 mb-2">خبير الغابة!</h2>
            <p className="text-2xl text-gray-700 font-bold italic">أنت تعرف أصوات كل الحيوانات! 🌟</p>
          </div>
        </div>
      )}

      <div className="mt-8 text-teal-900 font-bold bg-white/50 px-6 py-2 rounded-full shadow-sm animate-pulse">
        {isPlaying ? 'استمع بتركيز...' : 'أي صديق من الحيوانات يصدر هذا الصوت؟'}
      </div>
    </div>
  );
};

export default AnimalSounds;
