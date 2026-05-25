import React, { useState, useEffect } from 'react';
import { Award, Zap, Sparkles } from 'lucide-react';

interface QuestCompletedOverlayProps {
  onConfirm: () => void;
}

export default function QuestCompletedOverlay({ onConfirm }: QuestCompletedOverlayProps) {
  const [xpValue, setXpValue] = useState(0);
  const [strValue, setStrValue] = useState(0);
  const [agiValue, setAgiValue] = useState(0);
  const [stage, setStage] = useState(1);

  useEffect(() => {
    // Stage 1: Display Overlay, animate main title
    // Stage 2: Tick counters
    const xpTimer = setTimeout(() => {
      let currentXp = 0;
      const interval = setInterval(() => {
        currentXp += 25;
        if (currentXp >= 500) {
          setXpValue(500);
          clearInterval(interval);
          setStrValue(1);
          setAgiValue(1);
          setStage(3);
        } else {
          setXpValue(currentXp);
        }
      }, 35);
      return () => clearInterval(interval);
    }, 850);

    return () => clearTimeout(xpTimer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-5 bg-black/95 backdrop-blur-xl animate-[fadeIn_0.4s_ease-out_forwards]">
      {/* Visual Scanline aesthetics */}
      <div className="absolute inset-0 scanline opacity-30 pointer-events-none" />

      {/* Atmospheric neon blurs */}
      <div className="absolute top-[20%] w-[180px] h-[180px] bg-cyan-500/20 rounded-full blur-[70px] pointer-events-none" />
      <div className="absolute bottom-[20%] w-[200px] h-[200px] bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full max-w-sm flex flex-col items-center space-y-8 select-none z-10 relative">
        {/* Core title headers with glowing digital pulse shadows */}
        <div className="text-center">
          <p className="font-mono text-cyan-400 text-[11px] tracking-[0.4em] uppercase font-black mb-1.5 animate-[slideDown_0.3s_ease] uppercase leading-none select-none">
            NOTICE
          </p>
          <h2 className="font-display font-black text-3xl uppercase italic tracking-tighter text-[#a4e6ff] glitch-text-glow animate-pulse leading-none select-none">
            QUEST<br />COMPLETED
          </h2>
        </div>

        {/* Rewards grid sheet */}
        <div className="w-full space-y-4">
          
          {/* Item 1: Experience Points calculation row */}
          <div className="glass-panel p-4 rounded-xl border-emerald-500/30 flex items-center justify-between overflow-hidden shadow-[0_0_15px_rgba(55,254,17,0.05)] bg-[#131313]/90">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-emerald-500/10 border border-emerald-400/40 flex items-center justify-center">
                <Award className="w-6 h-6 text-emerald-400 fill-emerald-500/5" />
              </div>
              <div className="text-left">
                <div className="font-mono text-[8px] text-[#bbc9cf] uppercase tracking-widest font-bold">LEVEL PROGRESS</div>
                <div className="font-display text-xs text-emerald-400 font-extrabold uppercase leading-none mt-1">EXPERIENCE POINTS</div>
              </div>
            </div>
            
            <div className="font-mono text-lg text-emerald-400 font-extrabold select-none">
              +{xpValue}
            </div>
          </div>

          {/* Item 2: Stat attribute multipliers card */}
          <div className="glass-panel p-4 rounded-xl border-cyan-400/30 bg-[#131313]/90 space-y-3 shadow-[0_0_15px_rgba(164,230,255,0.05)]">
            <div className="flex items-center gap-1.5 border-b border-white/5 pb-2">
              <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/15" />
              <span className="font-mono text-[8px] text-[#bbc9cf] uppercase tracking-widest font-bold">PERMANENT STAT BOOST</span>
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono text-[#bbc9cf] font-medium uppercase">STRENGTH</span>
              <span className="font-mono text-cyan-400 font-bold select-none text-sm">
                +{strValue}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs border-t border-white/5 pt-2">
              <span className="font-mono text-[#bbc9cf] font-medium uppercase">AGILITY</span>
              <span className="font-mono text-cyan-400 font-bold select-none text-sm">
                +{agiValue}
              </span>
            </div>
          </div>

          {/* Item 3: Level Up notification badge */}
          {stage === 3 && (
            <div className="flex flex-col items-center pt-2 animate-[scaleUp_0.4s_cubic-bezier(0.18,0.89,0.32,1.28)]">
              <div className="px-5 py-2 bg-purple-500/10 border border-purple-500/40 rounded-full flex items-center gap-1 hover:border-purple-400 transition-all cursor-pointer">
                <Sparkles className="w-3 h-3 text-purple-400 fill-purple-400" />
                <span className="font-mono text-purple-400 text-[9px] font-black uppercase tracking-widest">
                  RANK UP SECURITY CONFIRMED
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Confirm trigger action button */}
        <button 
          onClick={onConfirm}
          className="w-full py-4.5 bg-[#e5e2e1] text-[#131313] hover:bg-white active:scale-95 transition-all font-display text-sm font-black rounded-xl tracking-widest uppercase shadow-[0_0_30px_rgba(164,230,255,0.35)] relative overflow-hidden"
        >
          <span>CONFIRM</span>
          <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </div>
  );
}
