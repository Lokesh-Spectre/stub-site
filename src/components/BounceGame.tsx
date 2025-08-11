import React, { useState, useEffect, useCallback } from 'react';

interface EmojiPosition {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

export const BounceGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState<EmojiPosition>({
    x: 300,
    y: 200,
    dx: 3,
    dy: 2
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameArea, setGameArea] = useState({ width: 600, height: 400 });

  const emojis = ['🎯', '⭐', '💎', '🎪', '🎨', '🚀', '🎭', '🎪'];
  const [currentEmoji, setCurrentEmoji] = useState(emojis[0]);

  useEffect(() => {
    const updateGameArea = () => {
      const container = document.getElementById('game-container');
      if (container) {
        const rect = container.getBoundingClientRect();
        setGameArea({ width: rect.width, height: rect.height });
      }
    };
    
    updateGameArea();
    window.addEventListener('resize', updateGameArea);
    return () => window.removeEventListener('resize', updateGameArea);
  }, []);

  const handleCatch = useCallback(() => {
    setScore(prev => prev + 1);
    setCurrentEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
    // Add a little celebration effect
    setPosition(prev => ({
      ...prev,
      dx: prev.dx * 1.1,
      dy: prev.dy * 1.1
    }));
  }, [emojis]);

  useEffect(() => {
    if (!isPlaying) return;

    const gameLoop = setInterval(() => {
      setPosition(prev => {
        let newX = prev.x + prev.dx;
        let newY = prev.y + prev.dy;
        let newDx = prev.dx;
        let newDy = prev.dy;

        // Bounce off walls
        if (newX <= 30 || newX >= gameArea.width - 30) {
          newDx = -prev.dx;
          newX = Math.max(30, Math.min(gameArea.width - 30, newX));
        }
        if (newY <= 30 || newY >= gameArea.height - 30) {
          newDy = -prev.dy;
          newY = Math.max(30, Math.min(gameArea.height - 30, newY));
        }

        return { x: newX, y: newY, dx: newDx, dy: newDy };
      });
    }, 16);

    return () => clearInterval(gameLoop);
  }, [isPlaying, gameArea]);

  const toggleGame = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setScore(0);
      setPosition({ x: 300, y: 200, dx: 3, dy: 2 });
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Catch the Bouncer!</h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">Score: {score}</div>
          <button
            onClick={toggleGame}
            className="mt-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:scale-105 transition-transform"
          >
            {isPlaying ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
      
      <div 
        id="game-container"
        className="relative w-full h-64 bg-black/20 rounded-xl overflow-hidden cursor-crosshair"
        style={{ minHeight: '16rem' }}
      >
        {isPlaying && (
          <div
            className="absolute text-4xl cursor-pointer select-none hover:scale-125 transition-transform"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={handleCatch}
          >
            {currentEmoji}
          </div>
        )}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center text-white/60">
            Click "Start" to begin the bouncing emoji chase!
          </div>
        )}
      </div>
    </div>
  );
};