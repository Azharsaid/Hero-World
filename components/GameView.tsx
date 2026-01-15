import React, { useState } from 'react';
import { Game, Character, GameType, Difficulty, Language } from '../types';
import { translations } from '../translations';
import MemoryGame from './games/MemoryGame';
import MathGame from './games/MathGame';
import ColorGame from './games/ColorGame';
import AlphabetGame from './games/AlphabetGame';
import MagicalPiano from './games/MagicalPiano';
import ShadowMatch from './games/ShadowMatch';
import LogicPatterns from './games/LogicPatterns';
import SimonSays from './games/SimonSays';
import StoryMaker from './games/StoryMaker';
import SudokuGame from './games/SudokuGame';
import FruitCatch from './games/FruitCatch';
import DrawingPad from './games/DrawingPad';
import ShapePuzzle from './games/ShapePuzzle';
import BalloonPop from './games/BalloonPop';
import TreasureHunt from './games/TreasureHunt';
import OddOneOut from './games/OddOneOut';
import CountingStars from './games/CountingStars';

interface Props {
  game: Game;
  character: Character;
  currentMaxLevel: number;
  onBack: () => void;
  onComplete: (gameId: string, level: number) => void;
  lang: Language;
}

type Emotion = 'idle' | 'happy' | 'sad';

const getText = (obj: any, lang: Language, fallback = ''): string => {
  if (!obj) return fallback;
  return obj[lang] ?? obj.en ?? obj.ar ?? fallback;
};

const fallbackSrcFor = (src: string) => {
  if (src.includes('/characters/')) return src.replace('/characters/', '/');
  if (src.includes('characters/')) return src.replace('characters/', '');
  return src;
};

const inferType = (g: any): GameType | undefined => {
  if (g?.type) return g.type;
  // fallback by id (prevents undefined type if constants are incomplete)
  switch (g?.id) {
    case 'memory':
      return GameType.MEMORY;
    case 'math':
      return GameType.MATH;
    case 'colors':
      return GameType.COLOR_MATCH;
    default:
      return undefined;
  }
};

const GameView: React.FC<Props> = ({ game, character, currentMaxLevel, onBack, onComplete, lang }) => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [emotion, setEmotion] = useState<Emotion>('idle');

  const t = (translations as any)[lang] || (translations as any).en;

  const triggerReaction = (type: Emotion) => {
    setEmotion(type);
    setTimeout(() => setEmotion('idle'), 1200);
  };

  const renderGame = () => {
    if (!selectedLevel || !difficulty) return null;

    const winAction = () => {
      triggerReaction('happy');
      onComplete(game.id, selectedLevel);
      setSelectedLevel(null);
    };

    const commonProps = {
      level: selectedLevel,
      difficulty: difficulty,
      onWin: winAction,
      onCorrect: () => triggerReaction('happy'),
      onIncorrect: () => triggerReaction('sad'),
    };

    const type = inferType(game as any);

    switch (type) {
      case GameType.MEMORY:
        return <MemoryGame {...commonProps} />;
      case GameType.MATH:
        return <MathGame {...commonProps} />;
      case GameType.COLOR_MATCH:
        return <ColorGame {...commonProps} />;
      case GameType.ALPHABET:
        return <AlphabetGame {...commonProps} />;
      case GameType.PIANO:
        return <MagicalPiano {...commonProps} />;
      case GameType.SHADOW_MATCH:
        return <ShadowMatch {...commonProps} />;
      case GameType.FRUIT_CATCH:
        return <FruitCatch {...commonProps} character={character} />;
      case GameType.DRAWING_PAD:
        return <DrawingPad {...commonProps} />;
      case GameType.SHAPE_PUZZLE:
        return <ShapePuzzle {...commonProps} />;
      case GameType.BALLOON_POP:
        return <BalloonPop {...commonProps} />;
      case GameType.TREASURE_HUNT:
        return <TreasureHunt {...commonProps} />;
      case GameType.ODD_ONE_OUT:
        return <OddOneOut {...commonProps} />;
      case GameType.COUNTING:
        return <CountingStars {...commonProps} />;
      case GameType.LOGIC:
        if ((game as any).id === 'sudoku') return <SudokuGame {...commonProps} />;
        return <LogicPatterns {...commonProps} />;
      case GameType.SIMON_SAYS:
        return <SimonSays {...commonProps} />;
      case GameType.STORY_MAKER:
        return <StoryMaker {...commonProps} character={character} lang={lang} />;
      default:
        return (
          <div className="bg-white/80 p-6 rounded-3xl text-center text-gray-700">
            This game type is not configured yet.
          </div>
        );
    }
  };

  const handleBack = () => {
    if (selectedLevel) setSelectedLevel(null);
    else if (difficulty) setDifficulty(null);
    else onBack();
  };

  const charAny: any = character;
  const charSrc = charAny.imageUrl ?? charAny.image ?? '';
  const charAltSrc = fallbackSrcFor(charSrc);

  const titleObj = (game as any).title ?? (game as any).name;
  const gameTitle = getText(titleObj, lang, game.id);

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <button onClick={handleBack} className="text-4xl hover:scale-125 transition-transform bg-white/80 p-2 rounded-full shadow-md">
          🔙
        </button>

        <div className="flex items-center gap-4 bg-white/90 px-6 py-2 rounded-full shadow-md border-2 border-orange-200">
          <span className="text-2xl">{(game as any).icon}</span>
          <h1 className="text-2xl font-black text-gray-800">{gameTitle}</h1>
        </div>

        <div className="relative group">
          <div
            className={`
              absolute -inset-2 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity
              ${emotion === 'happy' ? 'animate-ping' : ''}
            `}
          ></div>
          <img
            src={charSrc}
            className={`
              w-20 h-20 rounded-full border-4 border-white shadow-xl transition-all duration-500 relative z-10 object-cover
              ${emotion === 'happy' ? 'scale-110 animate-bounce' : ''}
              ${emotion === 'sad' ? 'grayscale brightness-75 animate-shake' : ''}
              ${emotion === 'idle' ? 'animate-bounce-slow' : ''}
            `}
            alt={getText(charAny.name, lang, '')}
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.dataset.fallbackTried) {
                img.dataset.fallbackTried = '1';
                img.src = charAltSrc;
              }
            }}
          />
        </div>
      </div>

      {!difficulty ? (
        <div className="bg-white/80 backdrop-blur-md rounded-[3rem] p-10 shadow-2xl border-4 border-white text-center">
          <h2 className="text-4xl font-black text-orange-600 mb-8">{t.choose_difficulty}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <button onClick={() => setDifficulty('easy')} className="bg-green-100 border-b-8 border-green-500 rounded-3xl p-8 hover:scale-105 transition-all">
              <span className="text-6xl block mb-4">👶</span>
              <span className="text-2xl font-black text-green-700">{t.easy}</span>
            </button>
            <button onClick={() => setDifficulty('medium')} className="bg-yellow-100 border-b-8 border-yellow-500 rounded-3xl p-8 hover:scale-105 transition-all">
              <span className="text-6xl block mb-4">👦</span>
              <span className="text-2xl font-black text-yellow-700">{t.medium}</span>
            </button>
            <button onClick={() => setDifficulty('hard')} className="bg-red-100 border-b-8 border-red-500 rounded-3xl p-8 hover:scale-105 transition-all">
              <span className="text-6xl block mb-4">🚀</span>
              <span className="text-2xl font-black text-red-700">{t.hard}</span>
            </button>
          </div>
        </div>
      ) : !selectedLevel ? (
        <div className="bg-white/50 backdrop-blur-md rounded-[3rem] p-10 shadow-2xl border-4 border-white overflow-hidden relative">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-orange-600">{t.choose_stage}</h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-4">
            {Array.from({ length: 30 }).map((_, i) => {
              const level = i + 1;
              const isLocked = level > currentMaxLevel;
              return (
                <button
                  key={level}
                  disabled={isLocked}
                  onClick={() => setSelectedLevel(level)}
                  className={`h-16 rounded-2xl flex items-center justify-center text-xl font-black transition-all shadow-md ${
                    isLocked
                      ? 'bg-gray-200 text-gray-400 grayscale'
                      : 'bg-white text-orange-500 border-b-4 border-orange-200 hover:scale-110 active:scale-95'
                  }`}
                >
                  {isLocked ? '🔒' : level}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="relative">{renderGame()}</div>
      )}
    </div>
  );
};

export default GameView;
