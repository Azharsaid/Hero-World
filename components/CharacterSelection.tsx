
import React from 'react';
import { CHARACTERS } from '../constants';
import { Character, Language } from '../types';
import { translations } from '../translations';

interface Props {
  onSelect: (char: Character) => void;
  lang: Language;
}

const CharacterSelection: React.FC<Props> = ({ onSelect, lang }) => {
  const t = translations[lang];

  return (
    <div className="text-center">
      <h1 className="text-5xl font-black text-orange-600 mb-4 drop-shadow-sm">{t.select_hero}</h1>
      <p className="text-xl text-gray-700 mb-12">{t.who_plays}</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {CHARACTERS.map((char) => (
          <div 
            key={char.id}
            onClick={() => onSelect(char)}
            className="child-card bg-white rounded-3xl p-6 shadow-xl cursor-pointer border-4 border-transparent hover:border-orange-400 transition-all flex flex-col items-center"
          >
            <div className="relative w-48 h-48 mb-4 overflow-hidden rounded-full border-8 border-yellow-200">
              <img 
                src={char.imageUrl} 
                alt={char.name[lang]}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{char.name[lang]}</h2>
            <p className="text-gray-500">{char.description[lang]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterSelection;
