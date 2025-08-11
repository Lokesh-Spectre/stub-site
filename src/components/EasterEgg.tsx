import React, { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';

interface EasterEggProps {
  isVisible: boolean;
  onClose: () => void;
}

export const EasterEgg: React.FC<EasterEggProps> = ({ isVisible, onClose }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setAnimate(true);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div 
        className={`bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 p-1 rounded-2xl transform transition-all duration-500 ${
          animate ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
        }`}
      >
        <div className="bg-gray-900 rounded-xl p-8 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Congratulations!
          </h2>
          <p className="text-lg text-white/80 mb-4">
            You're the 1,000,000th visitor!*
          </p>
          <div className="flex items-center justify-center space-x-2 text-yellow-400 mb-4">
            <Gift className="w-5 h-5" />
            <span className="font-medium">Your prize: This popup!</span>
          </div>
          <p className="text-xs text-white/60">
            *Results may vary. Prize has no monetary value. 
            <br />
            Void where prohibited. Not actually the millionth visitor.
          </p>
        </div>
      </div>
    </div>
  );
};