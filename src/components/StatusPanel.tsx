import React, { useState, useEffect } from 'react';
import { Clock, Globe, Zap } from 'lucide-react';

export const StatusPanel: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPinging, setIsPinging] = useState(false);
  const [lastPing, setLastPing] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePing = async () => {
    setIsPinging(true);
    const start = Date.now();
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));
    
    const end = Date.now();
    setLastPing(end - start);
    setIsPinging(false);
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <h3 className="text-xl font-bold text-white mb-4">System Status</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Globe className="w-5 h-5 text-green-400" />
          <div>
            <div className="text-sm text-white/70">Hostname</div>
            <div className="text-white font-mono text-sm">
              {window.location.hostname || 'localhost'}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Clock className="w-5 h-5 text-blue-400" />
          <div>
            <div className="text-sm text-white/70">Local Time</div>
            <div className="text-white font-mono text-sm">
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Zap className="w-5 h-5 text-yellow-400" />
          <div className="flex-1">
            <div className="text-sm text-white/70">Network Check</div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePing}
                disabled={isPinging}
                className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded text-sm font-medium hover:scale-105 transition-transform disabled:opacity-50"
              >
                {isPinging ? 'Pinging...' : 'Ping'}
              </button>
              {lastPing && (
                <span className="text-white font-mono text-sm">
                  {lastPing}ms
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};