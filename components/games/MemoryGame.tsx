
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

const EMOJIS = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍍', '🥝', '🍉', '🦁', '🐯', '🐼', '🦊', '🐰', '🐭', '🐨', '🐸'];

const MemoryGame: React.FC<Props> = ({ level, difficulty, onWin, onCorrect, onIncorrect }) => {
  const [cards, setCards] = useState<{ id: number; icon: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isWon, setIsWon] = useState(false);

  const initializeGame = useCallback(() => {
    let diffBonus = 0;
    if (difficulty === 'medium') diffBonus = 1;
    if (difficulty === 'hard') diffBonus = 2;

    const pairCount = Math.min(2 + Math.floor(level / 3) + diffBonus, 12);
    const selectedIcons = EMOJIS.slice(0, pairCount);
    const deck = [...selectedIcons, ...selectedIcons]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({ id: index, icon, flipped: false, matched: false }));
    setCards(deck);
    setFlippedIndices([]);
    setIsWon(false);
  }, [level, difficulty]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [idx1, idx2] = flippedIndices;
      if (cards[idx1].icon === cards[idx2].icon) {
        playSound('correct');
        onCorrect?.();
        setCards(prev => {
          const next = [...prev];
          next[idx1].matched = true;
          next[idx2].matched = true;
          return next;
        });
        setFlippedIndices([]);
      } else {
        setTimeout(() => {
          playSound('incorrect');
          onIncorrect?.();
          setFlippedIndices([]);
        }, 1000);
      }
    }
  }, [flippedIndices, cards, onCorrect, onIncorrect]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.matched)) {
      setIsWon(true);
      playSound('win');
      setTimeout(onWin, 2500);
    }
  }, [cards, onWin]);

  const handleFlip = (index: number) => {
    if (flippedIndices.length < 2 && !flippedIndices.includes(index) && !cards[index].matched) {
      setFlippedIndices(prev => [...prev, index]);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/80 p-4 rounded-full mb-8 font-black text-orange-600 shadow-lg border-2 border-orange-100 animate-bounce-slow">
        المستوى {level} - طابق جميع الصور السحرية! ✨
      </div>
      
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 bg-white/40 p-8 rounded-[3rem] backdrop-blur-md shadow-2xl border-4 border-white/50 perspective-1000">
        {cards.map((card, idx) => {
          const isFlipped = card.matched || flippedIndices.includes(idx);
          return (
            <div
              key={card.id}
              onClick={() => handleFlip(idx)}
              className="w-16 h-16 sm:w-24 sm:h-24 cursor-pointer relative group"
              style={{ perspective: '1000px' }}
            >
              <div 
                className={`w-full h-full relative transition-all duration-700 ease-out transform-style-3d ${isFlipped ? 'rotate-y-180 scale-110' : 'hover:scale-105 hover:rotate-z-1'}`}
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg) rotateX(10deg)' : 'rotateY(0deg)'
                }}
              >
                {/* Back side (Pattern) */}
                <div 
                  className="absolute inset-0 rounded-2xl border-4 border-white shadow-xl flex items-center justify-center backface-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    backgroundColor: '#f97316', // orange-500
                    backgroundImage: `
                      radial-gradient(circle at 100% 150%, #f97316 24%, #fb923c 25%, #fb923c 28%, #f97316 29%, #f97316 36%, #fb923c 36%, #fb923c 40%, transparent 40%),
                      radial-gradient(circle at 0    150%, #f97316 24%, #fb923c 25%, #fb923c 28%, #f97316 29%, #f97316 36%, #fb923c 36%, #fb923c 40%, transparent 40%),
                      radial-gradient(circle at 50%  100%, #fb923c 10%, #f97316 11%, #f97316 23%, #fb923c 24%, #fb923c 30%, #f97316 31%, #f97316 43%, #fb923c 44%, #fb923c 50%, #f97316 51%, #f97316 63%, #fb923c 64%, #fb923c 71%, transparent 71%),
                      radial-gradient(circle at 100% 50%, #fb923c 5%, #f97316 6%, #f97316 15%, #fb923c 16%, #fb923c 20%, #f97316 21%, #f97316 30%, #fb923c 31%, #fb923c 35%, #f97316 36%, #f97316 45%, #fb923c 46%, #fb923c 49%, transparent 49%),
                      radial-gradient(circle at 0    50%, #fb923c 5%, #f97316 6%, #f97316 15%, #fb923c 16%, #fb923c 20%, #f97316 21%, #f97316 30%, #fb923c 31%, #fb923c 35%, #f97316 36%, #f97316 45%, #fb923c 46%, #fb923c 49%, transparent 49%)
                    `,
                    backgroundSize: '30px 30px'
                  }}
                >
                  <span className="text-3xl sm:text-4xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">✨</span>
                </div>

                {/* Front side (Emoji) */}
                <div 
                  className="absolute inset-0 rounded-2xl border-4 border-white bg-white shadow-2xl flex items-center justify-center backface-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <span className="text-3xl sm:text-5xl filter drop-shadow-md">{card.icon}</span>
                </div>
              </div>
              
              {card.matched && (
                <div className="absolute -top-3 -right-3 text-2xl animate-bounce z-10 pointer-events-none">⭐</div>
              )}
            </div>
          );
        })}
      </div>

      {isWon && (
        <div className="fixed inset-0 flex items-center justify-center bg-orange-500/20 backdrop-blur-sm z-50 animate-in fade-in zoom-in duration-500">
          <div className="bg-white p-12 rounded-[4rem] text-center shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-8 border-orange-100">
            <div className="text-9xl mb-6 animate-bounce">🎊</div>
            <h2 className="text-5xl font-black text-orange-600 mb-2">يا لك من عبقري!</h2>
            <p className="text-2xl text-gray-700 font-bold italic">ذاكرتك قوية جداً كالأبطال! 🚀</p>
          </div>
        </div>
      )}

      <div className="mt-8 text-orange-800 font-bold bg-white/50 px-6 py-2 rounded-full shadow-sm">
        {flippedIndices.length === 1 ? 'أين النصف الآخر؟ 🤔' : 'اختر بطاقة لتبدأ التحدي!'}
      </div>

      <style>{`
        .rotate-y-180 { transform: rotateY(180deg); }
        .rotate-z-1 { transform: rotateZ(1deg); }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </div>
  );
};

export default MemoryGame;
