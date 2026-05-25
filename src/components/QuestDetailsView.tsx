import React, { useState, useEffect } from 'react';
import { AlertCircle, Clock, Zap, Award } from 'lucide-react';
import { DailyQuest, HunterProfile } from '../types';

interface QuestDetailsViewProps {
  quest: DailyQuest;
  profile: HunterProfile;
  onUpdateReps: (reps: Partial<DailyQuest>) => void;
  onCompleteQuest: () => void;
}

export default function QuestDetailsView({ 
  quest, 
  profile, 
  onUpdateReps, 
  onCompleteQuest 
}: QuestDetailsViewProps) {
  const [isActive, setIsActive] = useState(false);
  const [formattedTime, setFormattedTime] = useState('04:02:22');

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

  const handleSimulateRep = (type: 'pushups' | 'situps' | 'squats' | 'running', amount: number) => {
    const current = quest[type];
    const max = type === 'running' ? quest.runningMax : quest[`${type}Max` as keyof DailyQuest] as number;
    const updated = Math.min(max, current + amount);
    
    // Play audio frequency as synthesis sound cue for reps
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(type === 'running' ? 380 : 520, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      // Audio context may be blocked by user activation protocol, which is fine
    }

    onUpdateReps({ [type]: updated });
  };

  // Check if all goals reached
  const allCompleted = 
    quest.pushups >= quest.pushupsMax &&
    quest.situps >= quest.situpsMax &&
    quest.squats >= quest.squatsMax &&
    quest.running >= quest.runningMax;

  return (
    <div className="flex-1 flex flex-col p-5 bg-[#0A0A0A] relative text-[#e5e2e1] overflow-y-auto">
      {/* Background aesthetics */}
      <div className="scanline pointer-events-none" />

      {/* Screen Title */}
      <div className="mb-4 text-center relative z-10 w-full max-w-md mx-auto">
        <div className="flex items-center justify-center gap-2 mb-1">
          <AlertCircle className="w-4 h-4 text-cyan-400 stroke-[2.5]" />
          <span className="font-mono text-[9px] text-cyan-400 tracking-widest font-black uppercase">Quest Info</span>
        </div>
        <h2 className="font-display text-2xl font-extrabold text-[#e5e2e1] uppercase italic leading-none select-none">
          Daily Training
        </h2>
      </div>

      <div className="space-y-4 pb-24 relative z-10 w-full max-w-md mx-auto flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Main Quest Glass Card Frame with Neon Shadows */}
          <div className="glass-panel text-[#e5e2e1] rounded-2xl p-5 border-cyan-400/30 shadow-[inset_0_0_30px_rgba(0,209,255,0.06),0_0_20px_rgba(0,209,255,0.04)] relative overflow-hidden group">
            {/* Top neon indicator accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />

            <h3 className="font-display text-sm font-extrabold text-cyan-300 border-b border-cyan-400/10 pb-3 mb-4 flex justify-between items-center select-none">
              Main Character Path
              <span className="font-mono text-[8px] text-[#bbc9cf] px-2 py-0.5 border border-white/10 rounded font-bold">
                DAILY ARC
              </span>
            </h3>

            {/* Workout Objectives Sheet with Dotted Spacer Lines */}
            <div className="space-y-3">
              <p className="font-mono text-[9px] text-[#bbc9cf] uppercase tracking-wider font-bold">Goal:</p>
              
              {/* Objective Item PUSH-UP */}
              <div className="flex justify-between items-end group min-h-6">
                <span className="font-mono text-[10px] text-[#bbc9cf] font-bold group-hover:text-cyan-300 transition-colors">
                  PUSH-UP
                </span>
                <div className="flex-1 border-b border-dotted border-white/15 mx-2 mb-1" />
                <span className="font-mono text-[11px] text-[#a4e6ff] font-bold">
                  [{quest.pushups} / {quest.pushupsMax}]
                </span>
              </div>

              {/* Objective Item SIT-UP */}
              <div className="flex justify-between items-end group min-h-6">
                <span className="font-mono text-[10px] text-[#bbc9cf] font-bold group-hover:text-cyan-300 transition-colors">
                  SIT-UP
                </span>
                <div className="flex-1 border-b border-dotted border-white/15 mx-2 mb-1" />
                <span className="font-mono text-[11px] text-[#a4e6ff] font-bold">
                  [{quest.situps} / {quest.situpsMax}]
                </span>
              </div>

              {/* Objective Item SQUAT */}
              <div className="flex justify-between items-end group min-h-6">
                <span className="font-mono text-[10px] text-[#bbc9cf] font-bold group-hover:text-cyan-300 transition-colors">
                  SQUAT
                </span>
                <div className="flex-1 border-b border-dotted border-white/15 mx-2 mb-1" />
                <span className="font-mono text-[11px] text-[#a4e6ff] font-bold">
                  [{quest.squats} / {quest.squatsMax}]
                </span>
              </div>

              {/* Objective Item RUN */}
              <div className="flex justify-between items-end group min-h-6">
                <span className="font-mono text-[10px] text-[#bbc9cf] font-bold group-hover:text-cyan-300 transition-colors">
                  RUN
                </span>
                <div className="flex-1 border-b border-dotted border-white/15 mx-2 mb-1" />
                <span className="font-mono text-[11px] text-[#a4e6ff] font-bold">
                  [{quest.running.toFixed(1)} / {quest.runningMax} km]
                </span>
              </div>
            </div>

            {/* Warning Alert Banner */}
            <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl mt-5">
              <div className="flex gap-2.5 items-start">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5 fill-rose-500/10" />
                <p className="font-mono text-[9px] text-rose-300 leading-normal uppercase">
                  WARNING - Failure to complete the quest within the allotted time will incur an appropriate penalty.
                </p>
              </div>
            </div>

            {/* Countdown timer ticker */}
            <div className="flex flex-col items-center border-t border-cyan-400/10 pt-4 mt-5">
              <div className="flex items-center gap-1.5 mb-1 text-cyan-400">
                <Clock className="w-4.5 h-4.5" />
                <span className="font-mono text-xl text-[#e5e2e1] tracking-[0.25em] font-bold">
                  {formattedTime}
                </span>
              </div>
              <span className="font-mono text-[8px] text-[#bbc9cf] uppercase tracking-widest font-semibold select-none">
                Remaining Time
              </span>
            </div>
          </div>

          {/* Rewards Bento Panel Info Block */}
          {!isActive && (
            <div className="grid grid-cols-2 gap-3 select-none">
              {/* Card XP */}
              <div className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center gap-1 border-cyan-400/10 text-center">
                <Award className="w-7 h-7 text-emerald-400 fill-emerald-500/10" />
                <span className="font-mono text-xs text-emerald-400 font-bold tracking-tight">+500 XP</span>
                <p className="font-mono text-[8px] text-[#bbc9cf]/60 uppercase">Level Progress</p>
              </div>

              {/* Card Stat Boost parameters */}
              <div className="glass-panel p-4 rounded-xl flex flex-col gap-2 border-cyan-400/10">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[9px] text-[#bbc9cf] uppercase font-bold tracking-wider">Stat Boost</span>
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
                
                <div className="flex flex-col gap-1 w-full border-t border-white/5 pt-1.5">
                  <div className="flex justify-between text-[11px] font-mono leading-none">
                    <span className="text-[#bbc9cf]">STR</span>
                    <span className="text-cyan-400 font-bold">+1</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-mono leading-none mt-1">
                    <span className="text-[#bbc9cf]">AGI</span>
                    <span className="text-cyan-400 font-bold">+1</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic workout interactive controls to log actual reps */}
        {isActive ? (
          <div className="space-y-3 bg-[#111] p-4 rounded-2xl border border-cyan-400/20 shadow-lg relative overflow-hidden">
            {/* Visual scanline */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-cyan-400/30 animate-pulse" />

            <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2 mb-2 select-none">
              <span className="font-mono uppercase font-black text-cyan-400">QUEST IN PROGRESS</span>
              <span className="font-mono text-[#bbc9cf] text-[10px]">TAP REPS TO RECORD METRICS</span>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {/* Push up simulation click */}
              <div className="glass-panel p-3 rounded-xl flex flex-col items-center gap-2 select-none">
                <span className="font-mono text-[9px] text-[#bbc9cf] uppercase">PUSH-UPS</span>
                <div className="flex gap-1">
                  <button 
                    onClick={() => handleSimulateRep('pushups', 10)}
                    className="bg-cyan-500/15 hover:bg-cyan-500/35 border border-cyan-400/30 font-mono text-[10px] text-cyan-300 px-2 py-1.5 rounded-lg active:scale-90 transition-all font-bold"
                  >
                    +10 reps
                  </button>
                  <button 
                    onClick={() => handleSimulateRep('pushups', 20)}
                    className="bg-purple-500/15 hover:bg-purple-500/35 border border-purple-400/30 font-mono text-[10px] text-purple-300 px-2 py-1.5 rounded-lg active:scale-90 transition-all font-bold"
                  >
                    +20 reps
                  </button>
                </div>
              </div>

              {/* Sit up simulation click */}
              <div className="glass-panel p-3 rounded-xl flex flex-col items-center gap-2 select-none">
                <span className="font-mono text-[9px] text-[#bbc9cf] uppercase">SIT-UPS</span>
                <div className="flex gap-1">
                  <button 
                    onClick={() => handleSimulateRep('situps', 10)}
                    className="bg-cyan-500/15 hover:bg-cyan-500/35 border border-cyan-400/30 font-mono text-[10px] text-cyan-300 px-2 py-1.5 rounded-lg active:scale-90 transition-all font-bold"
                  >
                    +10 reps
                  </button>
                  <button 
                    onClick={() => handleSimulateRep('situps', 20)}
                    className="bg-purple-500/15 hover:bg-purple-500/35 border border-purple-400/30 font-mono text-[10px] text-purple-300 px-2 py-1.5 rounded-lg active:scale-90 transition-all font-bold"
                  >
                    +20 reps
                  </button>
                </div>
              </div>

              {/* Squats simulation click */}
              <div className="glass-panel p-3 rounded-xl flex flex-col items-center gap-2 select-none">
                <span className="font-mono text-[9px] text-[#bbc9cf] uppercase">SQUATS</span>
                <div className="flex gap-1">
                  <button 
                    onClick={() => handleSimulateRep('squats', 10)}
                    className="bg-cyan-500/15 hover:bg-cyan-500/35 border border-cyan-400/30 font-mono text-[10px] text-cyan-300 px-2 py-1.5 rounded-lg active:scale-90 transition-all font-bold"
                  >
                    +10 reps
                  </button>
                  <button 
                    onClick={() => handleSimulateRep('squats', 20)}
                    className="bg-purple-500/15 hover:bg-purple-500/35 border border-purple-400/30 font-mono text-[10px] text-purple-300 px-2 py-1.5 rounded-lg active:scale-90 transition-all font-bold"
                  >
                    +20 reps
                  </button>
                </div>
              </div>

              {/* Running distance simulation click */}
              <div className="glass-panel p-3 rounded-xl flex flex-col items-center gap-2 select-none">
                <span className="font-mono text-[9px] text-[#bbc9cf] uppercase">RUNNING (KM)</span>
                <div className="flex gap-1">
                  <button 
                    onClick={() => handleSimulateRep('running', 1.0)}
                    className="bg-cyan-500/15 hover:bg-cyan-500/35 border border-cyan-400/30 font-mono text-[10px] text-cyan-300 px-3 py-1.5 rounded-lg active:scale-90 transition-all font-bold"
                  >
                    +1 km
                  </button>
                  <button 
                    onClick={() => handleSimulateRep('running', 2.5)}
                    className="bg-purple-500/15 hover:bg-purple-500/35 border border-purple-400/30 font-mono text-[10px] text-purple-300 px-3 py-1.5 rounded-lg active:scale-90 transition-all font-bold"
                  >
                    +2.5 km
                  </button>
                </div>
              </div>
            </div>

            {/* Quick claim reward click */}
            <div className="pt-2">
              {allCompleted ? (
                <button 
                  onClick={onCompleteQuest}
                  className="w-full bg-[#131313] hover:bg-purple-500 text-purple-200 border border-purple-500 font-mono text-[11px] font-black py-3 rounded-xl tracking-widest uppercase hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(206,93,255,0.4)] px-3 select-none flex justify-center items-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-purple-300 animate-bounce" />
                  Claim Completed Rewards
                </button>
              ) : (
                <button 
                  onClick={() => setIsActive(false)}
                  className="w-full bg-transparent hover:bg-white/5 border border-white/10 font-mono text-[9px] text-[#bbc9cf] py-2 rounded-xl uppercase transition-all"
                >
                  Minimize Tracking Panel
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="pt-4 select-none">
            {allCompleted ? (
              <button 
                onClick={onCompleteQuest}
                className="w-full bg-gradient-to-r from-emerald-400 to-[#37fe11] text-background hover:brightness-110 active:scale-95 transition-all font-display text-sm font-black py-4 rounded-full uppercase tracking-widest shadow-[0_0_30px_rgba(55,254,17,0.5)] flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5 fill-slate-900" />
                Claim Rewards Info
              </button>
            ) : (
              <button 
                onClick={() => setIsActive(true)}
                className="w-full bg-white text-black hover:bg-slate-100 active:scale-95 transition-all font-display text-sm font-black py-4 rounded-full uppercase tracking-widest shadow-[0_0_25px_rgba(255,255,255,0.18)]"
              >
                Start Quest
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
