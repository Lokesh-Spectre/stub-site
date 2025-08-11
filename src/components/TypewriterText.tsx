import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  messages: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  className?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  messages,
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
  className = ""
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentMessage = messages[currentMessageIndex];
    
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(pauseTimer);
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentMessage.length) {
          setCurrentText(currentMessage.slice(0, currentText.length + 1));
        } else {
          setIsPaused(true);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, currentMessageIndex, isDeleting, isPaused, messages, typeSpeed, deleteSpeed, pauseTime]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};