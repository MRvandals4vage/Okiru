import React, { useState, useEffect } from 'react';
import { Menu, Dumbbell, Award, Flame, Zap, Calendar, Clock, Sparkles } from 'lucide-react';
import { HunterProfile, DailyQuest } from '../types';

interface HomeViewProps {
  profile: HunterProfile;
  quest: DailyQuest;
  onNavigateToTab: (index: number) => void;
}

export default function HomeView({ profile, quest, onNavigateToTab }: HomeViewProps) {
  const [formattedTime, setFormattedTime] = useState('04:22:15');

  useEffect(() => {
    // Generate simulated ticking counting down for daily reset
    const interval = setInterval(() => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      const diff = Math.max(0, endOfDay.getTime() - now.getTime());
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      const hStr = hours < 10 ? `0${hours}` : hours;
      const mStr = minutes < 10 ? `0${minutes}` : minutes;
      const sStr = seconds < 10 ? `0${seconds}` : seconds;
      setFormattedTime(`${hStr}:${mStr}:${sStr}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const xpPercent = (profile.xp / profile.xpMax) * 100;

  return (
    <div className="flex-1 flex flex-col p-5 bg-[#0A0A0A] relative text-[#e5e2e1] overflow-y-auto">
      {/* Background Visual Grid Scanlines */}
      <div className="scanline pointer-events-none" />

      {/* Screen Title HUD Anchor */}
      <div className="flex items-center justify-between h-12 border-b border-cyan-400/20 mb-5 relative z-10">
        <div className="flex items-center gap-2">
          <Menu className="w-5 h-5 text-cyan-400 cursor-pointer hover:brightness-125 transition-all" />
          <h1 className="font-display text-lg tracking-tighter text-[#a4e6ff] italic font-extrabold select-none">ARISE</h1>
        </div>
        
        {/* Glowing circular player avatar frame */}
        <div 
          onClick={() => onNavigateToTab(4)}
          className="w-9 h-9 rounded-full border border-cyan-400/50 overflow-hidden ring-2 ring-cyan-400/10 hover:border-white transition-all cursor-pointer"
        >
          <img 
            alt="User Profile Anchor" 
            className="w-full h-full object-cover grayscale brightness-110" 
            src={profile.avatar}
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="space-y-6 pb-20 relative z-10 w-full max-w-md mx-auto">
        {/* HUD Performance Stat Blocks */}
        <section className="flex items-center justify-between gap-3">
          {/* Card Item: Rank status */}
          <div className="glass-panel p-3.5 flex-1 rounded-2xl flex flex-col items-center justify-center text-center">
            <span className="font-mono text-[9px] text-[#bbc9cf] mb-1.5 uppercase tracking-widest font-bold">RANK</span>
            <div className="rank-badge-clip bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-900 font-display text-xs font-black italic px-3.5 py-1 uppercase tracking-wider relative">
              {profile.rank}
            </div>
          </div>
          
          {/* Card Item: Level gauge */}
          <div className="glass-panel p-3.5 flex-1 rounded-2xl flex flex-col items-center justify-center text-center border-cyan-400/40 shadow-[0_0_15px_rgba(164,230,255,0.15)] relative">
            <div className="absolute top-1 right-2 w-1.5 h-1.5 bg-[#37fe11] rounded-full animate-ping" />
            <span className="font-mono text-[9px] text-[#bbc9cf] mb-1.5 uppercase tracking-widest font-bold">LEVEL</span>
            <span className="font-display text-2xl text-cyan-400 font-black tracking-widest select-none">
              {profile.level}
            </span>
          </div>

          {/* Card Item: Total Power rating */}
          <div className="glass-panel p-3.5 flex-1 rounded-2xl flex flex-col items-center justify-center text-center">
            <span className="font-mono text-[9px] text-[#bbc9cf] mb-1.5 uppercase tracking-widest font-bold">POWER</span>
            <span className="font-display text-2xl text-[#e5e2e1] font-extrabold select-none">
              {profile.power}
            </span>
          </div>
        </section>

        {/* Experience Meter Progress Panel */}
        <section className="space-y-2">
          <div className="flex justify-between items-end">
            <h2 className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase font-bold">
              Experience Progress
            </h2>
            <span className="font-mono text-[10px] text-[#bbc9cf]">
              {profile.xp.toLocaleString()} / {profile.xpMax.toLocaleString()} XP
            </span>
          </div>
          <div className="h-3.5 w-full bg-[#1c1b1b] rounded-full overflow-hidden border border-cyan-400/20">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 shimmer-bar transition-all duration-500 shadow-[0_0_10px_rgba(164,230,255,0.4)]"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </section>

        {/* Daily Quest Bento Summary Card */}
        <section className="glass-panel rounded-2xl p-5 border-cyan-400/30 relative overflow-hidden group">
          {/* Neon Corner Grid Accents */}
          <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none opacity-25">
            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#a4e6ff]" />
          </div>

          <div 
            onClick={() => onNavigateToTab(2)}
            className="flex items-center gap-2 mb-4 hover:text-cyan-400 cursor-pointer transition-colors"
          >
            <Award className="w-5 h-5 text-cyan-400" />
            <h3 className="font-display text-[#e5e2e1] font-extrabold tracking-tight">Main Daily Quest</h3>
          </div>

          {/* Individual quest check items */}
          <div className="space-y-3 mb-5">
            <div className="flex justify-between items-center glass-panel bg-[#201f1f]/35 py-3 px-4 rounded-xl border-white/5">
              <span className="font-sans text-sm text-[#bbc9cf] font-medium">Push-ups</span>
              <span className="font-mono text-xs text-[#a4e6ff] font-bold">
                [{quest.pushups} / {quest.pushupsMax}]
              </span>
            </div>
            
            <div className="flex justify-between items-center glass-panel bg-[#201f1f]/35 py-3 px-4 rounded-xl border-white/5">
              <span className="font-sans text-sm text-[#bbc9cf] font-medium">Sit-ups</span>
              <span className="font-mono text-xs text-[#a4e6ff] font-bold">
                [{quest.situps} / {quest.situpsMax}]
              </span>
            </div>

            <div className="flex justify-between items-center glass-panel bg-[#201f1f]/35 py-3 px-4 rounded-xl border-white/5">
              <span className="font-sans text-sm text-[#bbc9cf] font-medium">Running</span>
              <span className="font-mono text-xs text-[#a4e6ff] font-bold">
                [{quest.running.toFixed(1)} / {quest.runningMax} km]
              </span>
            </div>
          </div>

          {/* Quest System Warnings & Ticking Countdown */}
          <div className="flex items-center justify-between text-rose-400 font-mono text-[9px] font-bold border-t border-rose-500/20 pt-3 italic uppercase tracking-wider">
            <span>FAILURE PENALTY: ???</span>
            <div className="flex items-center gap-1 text-rose-400/80">
              <Clock className="w-3.5 h-3.5" />
              <span>{formattedTime}</span>
            </div>
          </div>
        </section>

        {/* Quick HUD Metrics Stats Grid */}
        <section className="grid grid-cols-2 gap-3">
          {/* Stat Element: Energy Recovery index */}
          <div className="glass-panel p-4 rounded-2xl space-y-1 bg-[#131313]/55">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Zap className="w-3.5 h-3.5 fill-emerald-400" />
              <span className="font-mono text-[9px] font-black uppercase tracking-widest">RECOVERY</span>
            </div>
            <div className="font-display text-[#37fe11] text-lg font-black">{profile.recovery}%</div>
          </div>

          {/* Stat Element: Calories gauge */}
          <div className="glass-panel p-4 rounded-xl space-y-1 bg-[#131313]/55">
            <div className="flex items-center gap-1.5 text-[#ebb2ff]">
              <Flame className="w-3.5 h-3.5 fill-[#ebb2ff]" />
              <span className="font-mono text-[9px] font-black uppercase tracking-widest">CALORIES</span>
            </div>
            <div className="font-display text-[#ebb2ff] text-lg font-black">{profile.calories.toLocaleString()}</div>
          </div>

          {/* Row item: Streak count (2-column spanned) */}
          <div className="glass-panel p-4 rounded-2xl border-cyan-400/10 col-span-2 flex justify-between items-center bg-[#131313]/55">
            <div>
              <div className="flex items-center gap-1.5 text-[#bbc9cf]">
                <Calendar className="w-3.5 h-3.5" />
                <span className="font-mono text-[9px] font-black uppercase tracking-widest">CURRENT STREAK</span>
              </div>
              <div className="font-display text-[#e5e2e1] text-lg font-black uppercase">
                {profile.streak} Days
              </div>
            </div>
            
            {/* Minimalist neon indicators reflecting streak level */}
            <div className="flex gap-1.5 pt-1">
              <div className="w-1.5 h-8 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(164,230,255,0.6)]" />
              <div className="w-1.5 h-8 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(164,230,255,0.6)]" />
              <div className="w-1.5 h-8 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(164,230,255,0.6)]" />
              <div className="w-1.5 h-8 bg-[#353534] rounded-full" />
            </div>
          </div>
        </section>

        {/* Global CTA Initiate Training Session */}
        <button 
          onClick={() => onNavigateToTab(2)}
          className="w-full bg-[#e5e2e1] text-[#131313] hover:bg-white active:scale-95 transition-all font-display text-sm font-black py-4 rounded-full flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.12)] uppercase tracking-wider relative overflow-hidden group"
        >
          <Dumbbell className="w-4.5 h-4.5" />
          <span>Start Training</span>
          {/* Pulse light overlay */}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    </div>
  );
}
