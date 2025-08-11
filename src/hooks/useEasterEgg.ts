import { useState, useEffect, useCallback } from 'react';

export const useEasterEgg = () => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);
  
  const secretCode = ['k', 'o', 'n', 'a', 'm', 'i']; // The famous Konami code start

  const resetSequence = useCallback(() => {
    setKeySequence([]);
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    
    setKeySequence(prev => {
      const newSequence = [...prev, key];
      
      // Check if we're on the right track
      const isValidPrefix = secretCode.slice(0, newSequence.length).every(
        (expectedKey, index) => newSequence[index] === expectedKey
      );
      
      if (!isValidPrefix) {
        return [key]; // Start over with this key
      }
      
      if (newSequence.length === secretCode.length) {
        setShowEasterEgg(true);
        return [];
      }
      
      return newSequence;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const closeEasterEgg = () => {
    setShowEasterEgg(false);
    resetSequence();
  };

  return {
    showEasterEgg,
    closeEasterEgg
  };
};