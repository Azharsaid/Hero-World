import React from 'react';
import { Character, Game, UserProgress } from '../types';
import { translations } from '../translations';

interface Props {
  character: Character;
  games: Game[];
  progress: UserProgress;
  onSelectGame: (game: Game) => void;
  onBack: () => void;
}

const GameLobby: React.FC<Props> = ({ character, games, progress, onSelectGame, onBack }) => {
  const lang = progress.language;
  const t = translations[lang];

  const getGameTitle = (game: any) => game?.title?.[lang] ?? game?.name?.[lang] ?? '';
  const getGameDesc  = (game: any) => game?.description?.[lang] ?? '';

  return (
    <div>
      <div className="flex items-center justify-between mb-12 bg-white/80 backdrop-blur p-4 rounded-3xl shadow-sm border-2 border-white">
        <div className="flex items-center gap-4">
          <img src={(character as any).imageUrl ?? (character as any).image} className="w-16 h-16 rounded-full border-4 border-orange-400 shadow-md" alt="" />
          <div>
            <h2 className="text-2xl font-black text-gray-800">{t.welcome_hero}</h2>
            <p className="text-gray-600">
              {t.i_am} <span className="text-orange-600 font-bold">{(character as any).name?.[lang]}</span> {t.share_fun}
            </p>
          </div>
        </div>
        <button
          onClick={onBack}
          className="bg-orange-500 text-white px-6 py-2 rounded-full font-bold hover:bg-orange-600 shadow-md transition-all hover:scale-105"
        >
          {t.change_char}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => {
          const unlocked = progress.unlockedLevels[game.id] || 1;
          return (
            <div
              key={game.id}
              onClick={() => onSelectGame(game)}
              className={`${(game as any).color} child-card rounded-3xl p-8 shadow-xl cursor-pointer text-white flex flex-col items-center text-center relative overflow-hidden group`}
            >
              <div className="game-icon text-6xl mb-4 animate-bounce-slow drop-shadow-lg transition-all duration-300">
                {(game as any).icon}
              </div>

              <h3 className="text-3xl font-black mb-2">{getGameTitle(game)}</h3>
              <p className="text-white/90 mb-6 text-lg">{getGameDesc(game)}</p>

              <div className="bg-white/30 px-6 py-2 rounded-full font-bold text-sm backdrop-blur-sm border border-white/20">
                {t.unlocked_level}: {unlocked} {t.of} 30
              </div>

              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameLobby;
