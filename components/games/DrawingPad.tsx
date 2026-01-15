
import React, { useRef, useState, useEffect } from 'react';
import { playSound } from '../../services/geminiService';

interface Props {
  onWin: () => void;
  onCorrect?: () => void;
}

const COLORS = ['#000000', '#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7', '#ec4899', '#fb923c'];

const DrawingPad: React.FC<Props> = ({ onWin, onCorrect }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="bg-white p-4 rounded-3xl shadow-xl flex gap-4 overflow-x-auto w-full max-w-lg">
        {COLORS.map(c => (
          <button
            key={c}
            onClick={() => { setColor(c); playSound('correct'); }}
            className={`w-10 h-10 rounded-full border-4 transition-transform ${color === c ? 'scale-125 border-gray-400' : 'border-white'}`}
            style={{ backgroundColor: c }}
          />
        ))}
        <div className="border-l-2 mx-2"></div>
        <input 
          type="range" min="1" max="30" value={brushSize} 
          onChange={(e) => setBrushSize(parseInt(e.target.value))}
          className="w-24"
        />
      </div>

      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="bg-white rounded-[2rem] shadow-2xl cursor-crosshair border-8 border-white touch-none"
      />

      <div className="flex gap-4">
        <button onClick={clearCanvas} className="bg-red-400 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-red-500">مسح اللوحة 🗑️</button>
        <button onClick={() => { playSound('win'); onWin(); }} className="bg-green-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-green-600">إنهاء الرسمة ✨</button>
      </div>
    </div>
  );
};

export default DrawingPad;
