import React, { useState } from 'react';
import { Sparkles, Swords, Lock, Trophy, Plus, TrendingUp, Menu } from 'lucide-react';
import { HunterProfile, Achievement } from '../types';
import { ACHIEVEMENTS } from '../data';

interface ProfileViewProps {
  profile: HunterProfile;
  onUpdatePower: (newPower: number) => void;
  onNavigateToTab: (index: number) => void;
}

export default function ProfileView({ profile, onUpdatePower, onNavigateToTab }: ProfileViewProps) {
  // Configurable Hunter Stats
  const [stats, setStats] = useState({
    str: 142,
    agi: 115,
    end: 98,
    rec: 84,
    dis: 120,
  });

  const handleStatIncrement = (type: keyof typeof stats) => {
    const updatedVal = stats[type] + 1;
    setStats({
      ...stats,
      [type]: updatedVal,
    });
    // Dynamically increase total tactical power slightly
    onUpdatePower(profile.power + 1);
  };

  // Convert stats to a SVG Radar Polygon outline string
  // Pentagonal shape coordinates relative to center (100, 100)
  // Scale factor: multiplier to stretch parameters
  const getRadarPoints = () => {
    const scale = 0.5; // multiplier
    const center = { x: 100, y: 100 };
    
    // Angles for pentagon vertices: STR top (90 deg), AGI (18 deg), END (306 deg), REC (234 deg), DIS (162 deg)
    const points = [
      { x: center.x, y: center.y - (stats.str * scale) }, // STR (Top point)
      { x: center.x + (stats.agi * scale * Math.cos(18 * Math.PI / 180)), y: center.y - (stats.agi * scale * Math.sin(18 * Math.PI / 180)) }, // AGI
      { x: center.x + (stats.end * scale * Math.cos(306 * Math.PI / 180)), y: center.y - (stats.end * scale * Math.sin(306 * Math.PI / 180)) }, // END
      { x: center.x + (stats.rec * scale * Math.cos(234 * Math.PI / 180)), y: center.y - (stats.rec * scale * Math.sin(234 * Math.PI / 180)) }, // REC
      { x: center.x + (stats.dis * scale * Math.cos(162 * Math.PI / 180)), y: center.y - (stats.dis * scale * Math.sin(162 * Math.PI / 180)) }  // DIS
    ];

    return points.map(p => `${Math.min(190, Math.max(10, p.x)).toFixed(1)},${Math.min(190, Math.max(10, p.y)).toFixed(1)}`).join(' ');
  };

  return (
    <div className="flex-1 flex flex-col p-5 bg-[#0A0A0A] relative text-[#e5e2e1] overflow-y-auto">
      {/* Visual artifacts scanline */}
      <div className="scanline pointer-events-none" />

      {/* Screen Title HUD Anchor */}
      <div className="flex items-center justify-between h-12 border-b border-cyan-400/20 mb-5 relative z-10 w-full max-w-md mx-auto">
        <div className="flex items-center gap-2">
          <Menu className="w-5 h-5 text-cyan-400 cursor-pointer" />
          <h1 className="font-display text-lg tracking-tighter text-[#a4e6ff] italic font-semibold select-none">ARISE</h1>
        </div>
        
        {/* Glow Circular Avatar */}
        <div className="w-9 h-9 rounded-full border border-cyan-400/50 overflow-hidden ring-2 ring-cyan-400/10">
          <img 
            alt="User profile circular" 
            className="w-full h-full object-cover" 
            src={profile.avatar}
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="space-y-6 pb-24 relative z-10 w-full max-w-md mx-auto">
        
        {/* Hunter ID Card (Obsidian layout with neon elements) */}
        <section className="glass-panel rounded-2xl p-4 relative overflow-hidden neon-glow-primary border-cyan-400/25 bg-[#141414]/80">
          <div className="absolute top-0 right-0 w-36 h-1 bg-[#a4e6ff]/10" />
          
          <div className="flex gap-4">
            {/* Left Box: Display avatar with S Rank badge sticker overlay */}
            <div className="relative">
              <div className="w-24 h-24 rounded-xl overflow-hidden border border-cyan-400/30">
                <img 
                  alt={profile.name} 
                  className="w-full h-full object-cover grayscale brightness-110" 
                  src={profile.avatar}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-cyan-400 text-slate-950 font-mono text-[8px] font-black tracking-wider px-2 py-1 rounded shadow-lg uppercase">
                RANK S
              </div>
            </div>

            {/* Right Box: Profile statistics labels */}
            <div className="flex-1 space-y-1 select-none">
              <h2 className="font-display text-lg font-black text-white italic tracking-tight uppercase leading-none">
                {profile.name}
              </h2>
              <p className="font-mono text-[9px] text-[#a4e6ff] font-bold">@shadow_monarch_99</p>
              
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-cyan-400/10 mt-2">
                <div>
                  <p className="font-mono text-[8px] text-[#bbc9cf]/60 uppercase tracking-widest font-bold">Class</p>
                  <p className="font-mono text-[10px] text-white font-semibold leading-tight">{profile.class}</p>
                </div>
                <div>
                  <p className="font-mono text-[8px] text-[#bbc9cf]/60 uppercase tracking-widest font-bold">Title</p>
                  <p className="font-mono text-[10px] text-[#ebb2ff] font-semibold leading-tight">{profile.title}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Level progress strip */}
          <div className="mt-4 pt-3 border-t border-cyan-400/10 flex justify-between items-end select-none">
            <div className="space-y-1">
              <p className="font-mono text-[8px] text-[#bbc9cf] uppercase tracking-wider font-bold">Level Progression</p>
              <div className="w-40 h-2 bg-white/5 rounded-full overflow-hidden border border-cyan-400/10">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 w-[82%] shadow-[0_0_8px_rgba(164,230,255,0.45)]" />
              </div>
            </div>
            <div className="text-right">
              <span className="font-display text-xl text-cyan-400 font-extrabold select-none">LV. 99</span>
            </div>
          </div>
        </section>

        {/* Dynamic Interactive Radar Chart Pentagon Display */}
        <section className="space-y-2">
          <div className="px-1 flex justify-between items-center">
            <h3 className="font-mono text-[10px] text-[#bbc9cf] uppercase tracking-widest font-bold">Ability Scores</h3>
            <span className="font-mono text-[8px] text-purple-400 font-bold uppercase tracking-wide">TAP STATS TO LEVEL STATS</span>
          </div>
          
          <div className="glass-panel rounded-2xl p-4 flex flex-col items-center border-[#ebb2ff]/30 shadow-[0_0_20px_rgba(235,178,255,0.06)] bg-[#141414]/80">
            
            {/* SVG Plot space container */}
            <div className="relative w-full aspect-square max-w-[240px] flex items-center justify-center select-none">
              <svg className="w-full h-full transform -rotate-18" viewBox="0 0 200 200">
                {/* Visual grid pentagon anchors */}
                <polygon className="stroke-purple-400/25 stroke-[1] fill-none" points="100,20 176,75 147,165 53,165 24,75" />
                <polygon className="stroke-purple-400/15 stroke-[1] fill-none" points="100,45 157,86 135,149 65,149 43,86" />
                <polygon className="stroke-purple-400/5 stroke-[1] fill-none" points="100,70 138,97 123,132 77,132 62,97" />
                
                {/* Axis center vectors */}
                <line className="stroke-purple-400/15 stroke-[1]" x1="100" y1="100" x2="100" y2="20" />
                <line className="stroke-purple-400/15 stroke-[1]" x1="100" y1="100" x2="176" y2="75" />
                <line className="stroke-purple-400/15 stroke-[1]" x1="100" y1="100" x2="147" y2="165" />
                <line className="stroke-purple-400/15 stroke-[1]" x1="100" y1="100" x2="53" y2="165" />
                <line className="stroke-purple-400/15 stroke-[1]" x1="100" y1="100" x2="24" y2="75" />
                
                {/* Styled dynamic stats Area Polygon */}
                <polygon 
                  className="fill-[#ebb2ff]/20 stroke-[#ebb2ff] stroke-[2] transition-all duration-300 pointer-events-none"
                  points={getRadarPoints()}
                />
              </svg>
              
              {/* Pentagonal Text Highlighters */}
              <span className="absolute top-3 font-mono text-[9px] text-[#ebb2ff] font-bold">STR</span>
              <span className="absolute top-[37%] right-2 font-mono text-[9px] text-[#ebb2ff] font-bold">AGI</span>
              <span className="absolute bottom-4 right-10 font-mono text-[9px] text-[#ebb2ff] font-bold">END</span>
              <span className="absolute bottom-4 left-10 font-mono text-[9px] text-[#ebb2ff] font-bold">REC</span>
              <span className="absolute top-[37%] left-1 font-mono text-[9px] text-[#ebb2ff] font-bold">DIS</span>
            </div>

            {/* Clickable stat logging values and increase icons */}
            <div className="grid grid-cols-5 w-full mt-4 gap-1 border-t border-white/5 pt-4 select-none">
              {/* Stat STR */}
              <div 
                onClick={() => handleStatIncrement('str')}
                className="text-center group cursor-pointer hover:bg-white/5 rounded-lg py-1 transition-all"
              >
                <p className="font-mono text-[8px] text-[#bbc9cf] uppercase">STR</p>
                <p className="font-mono text-xs font-bold text-white mt-0.5">{stats.str}</p>
                <Plus className="w-3 h-3 text-cyan-400 mx-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              {/* Stat AGI */}
              <div 
                onClick={() => handleStatIncrement('agi')}
                className="text-center group cursor-pointer hover:bg-white/5 rounded-lg py-1 transition-all"
              >
                <p className="font-mono text-[8px] text-[#bbc9cf] uppercase">AGI</p>
                <p className="font-mono text-xs font-bold text-white mt-0.5">{stats.agi}</p>
                <Plus className="w-3 h-3 text-cyan-400 mx-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Stat END */}
              <div 
                onClick={() => handleStatIncrement('end')}
                className="text-center group cursor-pointer hover:bg-white/5 rounded-lg py-1 transition-all"
              >
                <p className="font-mono text-[8px] text-[#bbc9cf] uppercase">END</p>
                <p className="font-mono text-xs font-bold text-white mt-0.5">{stats.end}</p>
                <Plus className="w-3 h-3 text-cyan-400 mx-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Stat REC */}
              <div 
                onClick={() => handleStatIncrement('rec')}
                className="text-center group cursor-pointer hover:bg-white/5 rounded-lg py-1 transition-all"
              >
                <p className="font-mono text-[8px] text-[#bbc9cf] uppercase">REC</p>
                <p className="font-mono text-xs font-bold text-white mt-0.5">{stats.rec}</p>
                <Plus className="w-3 h-3 text-cyan-400 mx-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Stat DIS */}
              <div 
                onClick={() => handleStatIncrement('dis')}
                className="text-center group cursor-pointer hover:bg-white/5 rounded-lg py-1 transition-all"
              >
                <p className="font-mono text-[8px] text-[#bbc9cf] uppercase">DIS</p>
                <p className="font-mono text-xs font-bold text-white mt-0.5">{stats.dis}</p>
                <Plus className="w-3 h-3 text-cyan-400 mx-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </section>

        {/* Growth progression panel */}
        <section className="space-y-2">
          <h3 className="font-mono text-[10px] text-[#bbc9cf] uppercase tracking-widest px-1 font-bold">Growth Progression</h3>
          <div className="glass-panel rounded-2xl p-4 h-36 relative flex items-end gap-2 overflow-hidden bg-[#141414]/80">
            <div className="absolute inset-0 p-4 pointer-events-none opacity-10">
              <div className="w-full h-full border-b border-l border-cyan-400" />
            </div>
            
            {/* Bars */}
            <div className="flex-1 bg-white/10 rounded-t h-[30%] hover:bg-[#a4e6ff] transition-all" title="Mon: 30%" />
            <div className="flex-1 bg-white/10 rounded-t h-[45%] hover:bg-[#a4e6ff] transition-all" title="Tue: 45%" />
            <div className="flex-1 bg-white/10 rounded-t h-[42%] hover:bg-[#a4e6ff] transition-all" title="Wed: 42%" />
            <div className="flex-1 bg-cyan-400/40 rounded-t h-[65%] hover:bg-[#a4e6ff] transition-all" title="Thu: 65%" />
            <div className="flex-1 bg-cyan-400/60 rounded-t h-[80%] hover:bg-[#a4e6ff] transition-all" title="Fri: 80%" />
            <div className="flex-1 bg-gradient-to-t from-cyan-400 to-cyan-300 rounded-t h-[95%] shadow-[0_0_12px_rgba(0,209,255,0.35)]" title="Sat: 95%" />
            <div className="flex-1 bg-white/10 rounded-t h-[20%] hover:bg-[#a4e6ff] transition-all" title="Sun: 20%" />

            {/* Float trend metrics badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-[10px] text-emerald-400 font-bold">+12.4% THIS WEEK</span>
            </div>
          </div>
        </section>

        {/* Achievements Matrix Panel */}
        <section className="space-y-2">
          <h3 className="font-mono text-[10px] text-[#bbc9cf] uppercase tracking-widest px-1 font-bold">Achievements</h3>
          <div className="grid grid-cols-2 gap-3 pb-8">
            {/* Achievement UNIQUE */}
            <div className="p-3.5 rounded-2xl glass-panel border border-[#ebb2ff]/20 bg-[#141414]/80 flex flex-col items-center justify-center text-center gap-1 select-none flex-1">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-[#ebb2ff]/30 flex items-center justify-center mb-1">
                <Sparkles className="w-5 h-5 text-[#ebb2ff] fill-purple-400/10" />
              </div>
              <span className="font-mono text-[8px] text-[#ebb2ff] font-extrabold tracking-wider">UNIQUE</span>
              <p className="font-mono text-[11px] font-bold text-white leading-normal">Shadow Monarch</p>
            </div>

            {/* Achievement LEGENDARY */}
            <div className="p-3.5 rounded-2xl glass-panel border border-cyan-400/20 bg-[#141414]/80 flex flex-col items-center justify-center text-center gap-1 select-none flex-1 select-none">
              <div className="w-10 h-10 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center mb-1 animate-pulse">
                <Swords className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="font-mono text-[8px] text-cyan-400 font-extrabold tracking-wider">LEGENDARY</span>
              <p className="font-mono text-[11px] font-bold text-white leading-normal">First Clear</p>
            </div>

            {/* Achievement LOCKED */}
            <div className="p-3.5 rounded-2xl glass-panel border border-white/5 bg-[#141414]/40 flex flex-col items-center justify-center text-center gap-1 select-none opacity-45 flex-1 select-none">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-1">
                <Lock className="w-5 h-5 text-neutral-500" />
              </div>
              <span className="font-mono text-[8px] text-neutral-500 font-extrabold tracking-wider">LOCKED</span>
              <p className="font-mono text-[11px] font-bold text-neutral-400 leading-normal">Shadow Master</p>
            </div>

            {/* Achievement EPIC */}
            <div className="p-3.5 rounded-2xl glass-panel border border-[#37fe11]/20 bg-[#141414]/80 flex flex-col items-center justify-center text-center gap-1 select-none flex-1 select-none">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-400/35 flex items-center justify-center mb-1">
                <Trophy className="w-5 h-5 text-[#37fe11] fill-emerald-500/5" />
              </div>
              <span className="font-mono text-[8px] text-[#37fe11] font-extrabold tracking-wider">EPIC</span>
              <p className="font-mono text-[11px] font-bold text-white leading-normal">100 Day Grind</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
