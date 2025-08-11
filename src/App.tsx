import React, { useState } from 'react';
import { TypewriterText } from './components/TypewriterText';
import { BounceGame } from './components/BounceGame';
import { StatusPanel } from './components/StatusPanel';
import { EasterEgg } from './components/EasterEgg';
import { ThemeToggle } from './components/ThemeToggle';
import { useEasterEgg } from './hooks/useEasterEgg';
import { Github, Coffee, Server } from 'lucide-react';

const heroMessages = [
  "Yes, it's alive! (Well... kind of.)",
  "Congrats, the internet found me!",
  "If you can read this, DNS magic worked!",
  "Testing, testing... Is this thing on?",
  "Your domain is dressed and ready to party!",
  "Hello from the void of cyberspace!"
];

const footerMessages = [
  "Hosted somewhere between your cache and a coffee machine",
  "If you're reading this, my server hasn't exploded yet",
  "Powered by hopes, dreams, and excessive caffeine",
  "Running on hamster wheels and good intentions",
  "Brought to you by the magic of the internets"
];

function App() {
  const [isDark, setIsDark] = useState(true);
  const [currentFooterIndex, setCurrentFooterIndex] = useState(0);
  const { showEasterEgg, closeEasterEgg } = useEasterEgg();

  const toggleTheme = () => setIsDark(!isDark);

  const cycleFooterMessage = () => {
    setCurrentFooterIndex((prev) => (prev + 1) % footerMessages.length);
  };

  const themeClasses = isDark 
    ? "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" 
    : "bg-gradient-to-br from-purple-400 via-pink-400 to-red-400";

  return (
    <div className={`min-h-screen ${themeClasses} relative overflow-hidden transition-all duration-1000`}>
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-bounce"
          style={{ 
            left: '20%', 
            top: '10%',
            animationDelay: '0s',
            animationDuration: '8s'
          }}
        ></div>
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-bounce"
          style={{ 
            right: '20%', 
            bottom: '10%',
            animationDelay: '2s',
            animationDuration: '6s'
          }}
        ></div>
      </div>

      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="text-6xl md:text-8xl mb-8 animate-bounce">
              🚀
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <TypewriterText 
                messages={heroMessages}
                typeSpeed={80}
                deleteSpeed={40}
                pauseTime={3000}
              />
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Your shiny new domain is ready for action. 
              This placeholder is just here to make sure everything's working perfectly.
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <BounceGame />
              <StatusPanel />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div 
              className="text-white/60 mb-4 cursor-pointer hover:text-white/80 transition-colors"
              onClick={cycleFooterMessage}
            >
              {footerMessages[currentFooterIndex]}
            </div>
            
            <div className="flex items-center justify-center space-x-6 text-white/70">
              <a 
                href="https://github.com" 
                className="flex items-center space-x-2 hover:text-white transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>GitHub</span>
              </a>
              
              <div className="flex items-center space-x-2">
                <Server className="w-4 h-4" />
                <span>Status: Online</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Coffee className="w-4 h-4" />
                <span>Caffeine: High</span>
              </div>
            </div>
            
            <div className="mt-4 text-xs text-white/50">
              Press "konami" for a surprise 🎮
            </div>
          </div>
        </footer>
      </div>

      <EasterEgg isVisible={showEasterEgg} onClose={closeEasterEgg} />
    </div>
  );
}

export default App;