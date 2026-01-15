import React from 'react';
import { CHARACTERS } from '../constants';
import { Character, Language } from '../types';
import { translations } from '../translations';

interface Props {
  onSelect: (char: Character) => void;
  lang: Language;
}

const getText = (obj: any, lang: Language, fallback = ''): string => {
  if (!obj) return fallback;
  return obj[lang] ?? obj.en ?? obj.ar ?? fallback;
};

const fallbackSrcFor = (src: string) => {
  // If images are accidentally in /public (root), try removing "characters/"
  if (src.includes('/characters/')) return src.replace('/characters/', '/');
  if (src.includes('characters/')) return src.replace('characters/', '');
  return src;
};

const CharacterSelection: React.FC<Props> = ({ onSelect, lang }) => {
  const t = (translations as any)[lang] || (translations as any).en;

  return (
    <div className="text-center">
      <h1 className="text-5xl font-black text-orange-600 mb-4 drop-shadow-sm">{t.select_hero}</h1>
      <p className="text-xl text-gray-700 mb-12">{t.who_plays}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {CHARACTERS.map((char: any) => {
          const src = char.imageUrl ?? char.image ?? '';
          const altSrc = fallbackSrcFor(src);

          return (
            <div
              key={char.id}
              onClick={() => onSelect(char)}
              className="child-card bg-white rounded-3xl p-6 shadow-xl cursor-pointer border-4 border-transparent hover:border-orange-400 transition-all flex flex-col items-center"
            >
              <div className="relative w-48 h-48 mb-4 overflow-hidden rounded-full border-8 border-yellow-200">
                <img
                  src={src}
                  alt={getText(char.name, lang, char.id)}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget;
                    // try fallback once
                    if (!img.dataset.fallbackTried) {
                      img.dataset.fallbackTried = '1';
                      img.src = altSrc;
                    }
                  }}
                />
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">{getText(char.name, lang, char.id)}</h2>
              <p className="text-gray-500">{getText(char.description, lang, '')}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterSelection;
