import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Smartphone, AppWindow } from 'lucide-react';

interface PhoneSimulatorProps {
  children: React.ReactNode;
}

export default function PhoneSimulator({ children }: PhoneSimulatorProps) {
  const [currentTime, setCurrentTime] = useState('05:06');
  const [simulatedMode, setSimulatedMode] = useState<boolean>(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
      setCurrentTime(`${hours}:${minutesStr}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-0 md:p-6 transition-colors duration-500 selection:bg-cyan-500/30">
      {/* Dev Mode Switches */}
      <div className="hidden md:flex gap-4 mb-4 items-center bg-[#131313]/90 backdrop-blur border border-white/10 px-4 py-2 rounded-full text-xs text-on-surface-variant z-50">
        <span className="font-mono text-cyan-400">INTERFACE ENGINE ACTIVED</span>
        <div className="h-4 w-px bg-white/10" />
        <button 
          onClick={() => setSimulatedMode(true)}
          className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all ${
            simulatedMode ? 'bg-[#a4e6ff] text-background font-semibold' : 'hover:bg-white/5'
          }`}
        >
          <Smartphone className="w-3 w-3" />
          Mobile Simulator View
        </button>
        <button 
          onClick={() => setSimulatedMode(false)}
          className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all ${
            !simulatedMode ? 'bg-[#a4e6ff] text-background font-semibold' : 'hover:bg-white/5'
          }`}
        >
          <AppWindow className="w-3 h-3" />
          Full Screen View
        </button>
      </div>

      {simulatedMode ? (
        <div className="relative w-full max-w-[430px] h-[900px] bg-[#0A0A0A] rounded-[55px] border-[12px] border-[#222] shadow-[0_0_50px_rgba(0,209,255,0.15)] overflow-hidden flex flex-col">
          {/* Speaker, Notch & Sensors */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-black rounded-b-3xl z-50 flex items-center justify-center">
            {/* Camera dot */}
            <div className="w-3 h-3 bg-[#111] rounded-full mr-4 border border-[#222]" />
            {/* Speaker Line */}
            <div className="w-16 h-1 bg-[#222] rounded-full" />
          </div>

          {/* Status Bar */}
          <div className="h-14 px-8 pt-3 flex justify-between items-end text-white text-xs font-semibold select-none z-40 bg-transparent absolute top-0 left-0 w-full">
            <span className="font-display pl-2">{currentTime}</span>
            <div className="flex items-center gap-1.5 pr-2">
              {/* Signal Bars */}
              <div className="flex items-end gap-0.5 h-3">
                <div className="w-0.5 h-1 bg-white rounded-2xs" />
                <div className="w-0.5 h-1.5 bg-white rounded-2xs" />
                <div className="w-0.5 h-2 bg-white rounded-2xs" />
                <div className="w-0.5 h-2.5 bg-white rounded-2xs" />
              </div>
              {/* LTE / 5G */}
              <span className="font-mono text-[9px] font-bold tracking-tight text-cyan-400">5G</span>
              {/* Battery */}
              <div className="relative w-5 h-2.5 border border-white/60 rounded-[3px] p-px flex items-center">
                <div className="h-full w-[85%] bg-[#37fe11] rounded-3xs" />
                <div className="absolute -right-1.5 w-1 h-1 bg-white/60 rounded-r-3xs" />
              </div>
            </div>
          </div>

          {/* Inner Content Screen */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden pt-12 pb-6 flex flex-col relative">
            {children}
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-36 h-1 bg-white/60 rounded-full z-50 pointer-events-none" />
        </div>
      ) : (
        <div className="w-full max-w-5xl h-[88vh] bg-[#0A0A0A] rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col relative">
          <div className="flex-1 overflow-y-auto flex flex-col">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
