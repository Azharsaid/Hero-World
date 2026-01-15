
/**
 * Hero World - Interactive Children's Game Platform
 * Repository: Hero World
 */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Character, Game, UserProgress, Language } from './types';
import { CHARACTERS, GAMES, SOUNDTRACKS } from './constants';
import { translations } from './translations';
import CharacterSelection from './components/CharacterSelection';
import GameLobby from './components/GameLobby';
import GameView from './components/GameView';

const App: React.FC = () => {
  const [step, setStep] = useState<'selection' | 'lobby' | 'game'>('selection');
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('hero_world_progress_v1');
    return saved ? JSON.parse(saved) : { selectedCharacterId: null, unlockedLevels: {}, language: 'ar' };
  });
  
  const [currentGame, setCurrentGame] = useState<Game | null>(null);

  const t = translations[progress.language];

  useEffect(() => {
    localStorage.setItem('hero_world_progress_v1', JSON.stringify(progress));
    document.documentElement.lang = progress.language;
    document.documentElement.dir = progress.language === 'ar' ? 'rtl' : 'ltr';
    // Update document title dynamically based on language
    document.title = progress.language === 'ar' ? 'Hero World | عالم الأبطال' : 'Hero World | Hero Universe';
  }, [progress]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleLanguage = () => {
    setProgress(prev => ({
      ...prev,
      language: prev.language === 'ar' ? 'en' : 'ar'
    }));
  };

  const changeTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % SOUNDTRACKS.length;
    setCurrentTrackIndex(nextIndex);
    if (audioRef.current) {
      audioRef.current.src = SOUNDTRACKS[nextIndex].url;
      audioRef.current.play();
    }
  };

  const handleSelectCharacter = async (char: Character) => {
    setProgress(prev => ({ ...prev, selectedCharacterId: char.id }));
    setStep('lobby');
    
    if (audioRef.current) {
      audioRef.current.play().catch(() => console.log("Music waiting for interaction"));
    }
  };

  const handleSelectGame = (game: Game) => {
    setCurrentGame(game);
    setStep('game');
  };

  const handleBackToLobby = () => {
    setCurrentGame(null);
    setStep('lobby');
  };

  const handleLevelComplete = async (gameId: string, level: number) => {
    const nextLevel = level + 1;
    setProgress(prev => ({
      ...prev,
      unlockedLevels: {
        ...prev.unlockedLevels,
        [gameId]: Math.max(prev.unlockedLevels[gameId] || 1, nextLevel)
      }
    }));
  };

  const selectedCharacter = CHARACTERS.find(c => c.id === progress.selectedCharacterId);

  const floatingElements = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      bottom: `-${Math.random() * 20 + 10}%`,
      delay: `${Math.random() * 20}s`,
      size: `${Math.random() * 100 + 50}px`,
      color: ['bg-pink-300', 'bg-blue-300', 'bg-green-300', 'bg-yellow-300', 'bg-purple-300'][Math.floor(Math.random() * 5)],
      shape: Math.random() > 0.5 ? 'rounded-full' : 'rounded-3xl rotate-45',
      duration: `${Math.random() * 10 + 15}s`
    }));
  }, []);

  const twinkles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`
    }));
  }, []);

  return (
    <div className={`min-h-screen relative overflow-hidden magical-bg ${progress.language === 'en' ? 'font-sans' : ''}`}>
      <audio 
        ref={audioRef} 
        loop 
        src={SOUNDTRACKS[currentTrackIndex].url} 
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingElements.map(el => (
          <div
            key={el.id}
            className={`floating-shape ${el.color} ${el.shape}`}
            style={{
              left: el.left,
              bottom: el.bottom,
              width: el.size,
              height: el.size,
              animationDelay: el.delay,
              animationDuration: el.duration
            }}
          />
        ))}

        {twinkles.map(t => (
          <div
            key={t.id}
            className="twinkle absolute text-yellow-400 text-xl"
            style={{ top: t.top, left: t.left, animationDelay: t.delay }}
          >
            ✦
          </div>
        ))}
        
        <div className="absolute top-10 left-10 w-64 h-64 bg-pink-400/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-400/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8">
        {step === 'selection' && (
          <CharacterSelection onSelect={handleSelectCharacter} lang={progress.language} />
        )}

        {step === 'lobby' && selectedCharacter && (
          <GameLobby 
            character={selectedCharacter} 
            games={GAMES} 
            progress={progress}
            onSelectGame={handleSelectGame}
            onBack={() => setStep('selection')}
          />
        )}

        {step === 'game' && currentGame && selectedCharacter && (
          <GameView 
            game={currentGame} 
            character={selectedCharacter}
            currentMaxLevel={progress.unlockedLevels[currentGame.id] || 1}
            onBack={handleBackToLobby}
            onComplete={handleLevelComplete}
            lang={progress.language}
          />
        )}
      </main>

      <div className={`fixed bottom-4 ${progress.language === 'ar' ? 'left-4' : 'right-4'} z-50 flex gap-2`}>
        <button 
          className="bg-white/90 backdrop-blur p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center h-12 border-2 border-orange-200 font-bold text-orange-600 min-w-[3rem]"
          onClick={toggleLanguage}
        >
          {t.lang_btn}
        </button>

        <button 
          className="bg-white/90 backdrop-blur p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center w-12 h-12 border-2 border-orange-200"
          onClick={changeTrack}
          title={SOUNDTRACKS[currentTrackIndex].name[progress.language]}
        >
          🎵
        </button>

        <button 
          className="bg-white/90 backdrop-blur p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center w-12 h-12 border-2 border-orange-200"
          onClick={toggleMute}
        >
          {isMuted ? '🔈' : '🔊'}
        </button>
      </div>
    </div>
  );
};

export default App;
