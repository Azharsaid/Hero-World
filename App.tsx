import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Character, Game, UserProgress, Language } from './types';
import { CHARACTERS, GAMES, SOUNDTRACKS } from './constants';
import { translations } from './translations';
import CharacterSelection from './components/CharacterSelection';
import GameLobby from './components/GameLobby';
import GameView from './components/GameView';

const normalizeLang = (l: any): Language => (l === 'en' ? 'en' : 'ar');

const App: React.FC = () => {
  const [step, setStep] = useState<'selection' | 'lobby' | 'game'>('selection');
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('hero_world_progress_v1');
    const parsed = saved ? JSON.parse(saved) : null;
    return parsed || { selectedCharacterId: null, unlockedLevels: {}, language: 'ar' };
  });

  const lang = normalizeLang(progress.language);
  const t = (translations as any)[lang] || (translations as any).en;

  const [currentGame, setCurrentGame] = useState<Game | null>(null);

  useEffect(() => {
    const next = { ...progress, language: lang };
    localStorage.setItem('hero_world_progress_v1', JSON.stringify(next));

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = lang === 'ar' ? 'Hero World | عالم الأبطال' : 'Hero World | Hero Universe';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Unlock audio with first real user interaction (browser autoplay policy)
  // Browsers block autoplay until a gesture. :contentReference[oaicite:2]{index=2}
  useEffect(() => {
    const unlock = async () => {
      if (!audioRef.current) return;
      try {
        await audioRef.current.play();
        setAudioUnlocked(true);
      } catch {
        // still blocked — keep unlocked=false
      }
    };

    const onFirstGesture = () => unlock();

    window.addEventListener('pointerdown', onFirstGesture, { once: true });
    window.addEventListener('keydown', onFirstGesture, { once: true });

    return () => {
      window.removeEventListener('pointerdown', onFirstGesture as any);
      window.removeEventListener('keydown', onFirstGesture as any);
    };
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleLanguage = () => {
    setProgress((prev) => ({
      ...prev,
      language: normalizeLang(prev.language) === 'ar' ? 'en' : 'ar',
    }));
  };

  const changeTrack = async () => {
    const nextIndex = (currentTrackIndex + 1) % SOUNDTRACKS.length;
    setCurrentTrackIndex(nextIndex);

    if (!audioRef.current) return;

    audioRef.current.src = SOUNDTRACKS[nextIndex].url;

    try {
      await audioRef.current.play();
      setAudioUnlocked(true);
    } catch {
      // blocked until gesture
      setAudioUnlocked(false);
      console.log('Music waiting for interaction');
    }
  };

  const handleSelectCharacter = async (char: Character) => {
    setProgress((prev) => ({ ...prev, selectedCharacterId: (char as any).id }));
    setStep('lobby');

    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setAudioUnlocked(true);
      } catch {
        setAudioUnlocked(false);
        console.log('Music waiting for interaction');
      }
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
    setProgress((prev) => ({
      ...prev,
      unlockedLevels: {
        ...prev.unlockedLevels,
        [gameId]: Math.max(prev.unlockedLevels[gameId] || 1, nextLevel),
      },
    }));
  };

  const selectedCharacter = CHARACTERS.find((c: any) => c.id === progress.selectedCharacterId) || null;

  const floatingElements = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      bottom: `-${Math.random() * 20 + 10}%`,
      delay: `${Math.random() * 20}s`,
      size: `${Math.random() * 100 + 50}px`,
      color: ['bg-pink-300', 'bg-blue-300', 'bg-green-300', 'bg-yellow-300', 'bg-purple-300'][Math.floor(Math.random() * 5)],
      shape: Math.random() > 0.5 ? 'rounded-full' : 'rounded-3xl rotate-45',
      duration: `${Math.random() * 10 + 15}s`,
    }));
  }, []);

  const twinkles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
    }));
  }, []);

  const trackName =
    (SOUNDTRACKS[currentTrackIndex]?.name as any)?.[lang] ||
    (SOUNDTRACKS[currentTrackIndex]?.name as any)?.en ||
    'Music';

  return (
    <div className={`min-h-screen relative overflow-hidden magical-bg ${lang === 'en' ? 'font-sans' : ''}`}>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={SOUNDTRACKS[currentTrackIndex]?.url}
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingElements.map((el) => (
          <div
            key={el.id}
            className={`floating-shape ${el.color} ${el.shape}`}
            style={{
              left: el.left,
              bottom: el.bottom,
              width: el.size,
              height: el.size,
              animationDelay: el.delay,
              animationDuration: el.duration,
            }}
          />
        ))}

        {twinkles.map((tw) => (
          <div
            key={tw.id}
            className="twinkle absolute text-yellow-400 text-xl"
            style={{ top: tw.top, left: tw.left, animationDelay: tw.delay }}
          >
            ✦
          </div>
        ))}
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8">
        {step === 'selection' && <CharacterSelection onSelect={handleSelectCharacter} lang={lang} />}

        {step === 'lobby' && selectedCharacter && (
          <GameLobby
            character={selectedCharacter as any}
            games={GAMES}
            progress={{ ...progress, language: lang }}
            onSelectGame={handleSelectGame}
            onBack={() => setStep('selection')}
          />
        )}

        {step === 'game' && currentGame && selectedCharacter && (
          <GameView
            game={currentGame}
            character={selectedCharacter as any}
            currentMaxLevel={progress.unlockedLevels[currentGame.id] || 1}
            onBack={handleBackToLobby}
            onComplete={handleLevelComplete}
            lang={lang}
          />
        )}
      </main>

      {/* Music unlock hint */}
      {!audioUnlocked && !isMuted && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-orange-200 text-sm font-bold text-orange-600">
          Tap / Click anywhere to enable music 🎵
        </div>
      )}

      <div className={`fixed bottom-4 ${lang === 'ar' ? 'left-4' : 'right-4'} z-50 flex gap-2 items-center`}>
        <button
          className="bg-white/90 backdrop-blur p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center h-12 border-2 border-orange-200 font-bold text-orange-600 min-w-[3rem]"
          onClick={toggleLanguage}
        >
          {t.lang_btn}
        </button>

        {/* Show track name + change track */}
        <button
          className="bg-white/90 backdrop-blur px-4 py-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center h-12 border-2 border-orange-200 font-bold text-gray-700"
          onClick={changeTrack}
          title={trackName}
        >
          🎵 <span className="ml-2 text-sm font-bold">{trackName}</span>
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
