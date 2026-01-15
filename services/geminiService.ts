
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SOUNDS = {
  correct: 'https://www.soundjay.com/buttons/sounds/button-3.mp3',
  incorrect: 'https://www.soundjay.com/buttons/sounds/button-10.mp3',
  win: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3'
};

export const playSound = (type: 'correct' | 'incorrect' | 'win') => {
  const audio = new Audio(SOUNDS[type]);
  audio.volume = 0.4;
  audio.play().catch(e => console.error("Sound play error:", e));
};

/**
 * Speech is disabled as per user request. 
 * Function remains as a no-op to prevent breaking existing code during transition if needed,
 * but calls are being removed from components.
 */
export const speakPhrase = async (text: string) => {
  console.log("Speech disabled:", text);
};

export const getMotivationalPhrase = async (type: 'win' | 'lose' | 'intro', characterName: string) => {
  try {
    const prompt = type === 'win' 
      ? `أعطني عبارة تشجيعية قصيرة جداً ومبهجة لطفل فاز بمرحلة في لعبة. يجب أن تذكر اسم الشخصية "${characterName}".`
      : type === 'lose'
      ? `أعطني عبارة تشجيعية رقيقة ومحفزة لطفل لم ينجح في مرحلة، تشجعه على المحاولة مرة أخرى. اذكر اسم "${characterName}".`
      : `عبارة ترحيبية قصيرة جداً للطفل عند اختيار شخصية "${characterName}".`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || (type === 'win' ? "أحسنت يا بطل!" : "لا بأس، حاول مرة أخرى!");
  } catch (e) {
    return type === 'win' ? "أحسنت!" : "حاول ثانية!";
  }
};
