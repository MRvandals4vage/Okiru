import React from 'react';
import { Sparkles, Trophy, Flame, ChevronRight, Zap } from 'lucide-react';
import { TrainingProgram } from '../types';
import { TRAINING_PROGRAMS } from '../data';

interface TrainingViewProps {
  onSelectProgram: (program: TrainingProgram) => void;
}

export default function TrainingView({ onSelectProgram }: TrainingViewProps) {
  // Separate S/A/B rank premium routines vs standard rank routines
  const premiumRoutines = TRAINING_PROGRAMS.filter(p => p.rank === 'S-RANK' || p.rank === 'A-RANK');
  const standardRoutines = TRAINING_PROGRAMS.filter(p => p.rank !== 'S-RANK' && p.rank !== 'A-RANK');

  return (
    <div className="flex-1 flex flex-col p-5 bg-[#0A0A0A] relative text-[#e5e2e1] overflow-y-auto">
      {/* Background aesthetics */}
      <div className="scanline pointer-events-none" />

      {/* Screen Title */}
      <div className="mb-6 relative z-10 w-full max-w-md mx-auto">
        <p className="font-mono text-[9px] text-[#bbc9cf]/60 tracking-[0.25em] font-semibold mb-1 uppercase">ARCHIVE_SYSTEM</p>
        <h2 className="font-display text-2xl font-extrabold uppercase italic tracking-tight text-white">
          TRAINING PROGRAMS
        </h2>
        <div className="w-full h-px bg-gradient-to-r from-cyan-400/40 to-transparent mt-2" />
      </div>

      <div className="space-y-6 pb-24 relative z-10 w-full max-w-md mx-auto">
        {/* Section 1: Peak Hunter Arc (Routines like S-Rank Adaptive Fighter Physique) */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-purple-400 fill-purple-400" />
            <span className="font-mono text-[10px] text-purple-300 font-bold uppercase tracking-wider">PREMIUM HUNTER ARC</span>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scrollbar-none">
            {premiumRoutines.map((prog) => (
              <div 
                key={prog.id}
                onClick={() => onSelectProgram(prog)}
                className="snap-start shrink-0 w-[240px] glass-panel rounded-2xl overflow-hidden border border-purple-500/10 cursor-pointer active:scale-98 transition-all hover:border-purple-400/30 flex flex-col group relative"
              >
                {/* Glowing edge indicator for S Rank */}
                <div className="absolute top-2 right-2 bg-purple-500/20 border border-purple-400 text-purple-300 font-mono text-[8px] font-bold px-2 py-0.5 rounded-full z-20">
                  {prog.rank}
                </div>

                {/* Cover graphic */}
                <div className="h-32 relative bg-neutral-900 border-b border-white/5 flex items-center justify-center">
                  <img 
                    src={prog.image} 
                    alt={prog.title}
                    className="w-full h-full object-cover opacity-60 grayscale group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                {/* Body Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <h4 className="font-display text-sm font-extrabold text-[#e5e2e1] group-hover:text-purple-300 transition-colors leading-snug">
                      {prog.title}
                    </h4>
                    <p className="text-[10px] text-[#bbc9cf] font-mono leading-relaxed line-clamp-3">
                      {prog.description}
                    </p>
                  </div>

                  {/* Summary workout rep metrics tags */}
                  <div className="border-t border-white/5 pt-2 flex items-center justify-between text-[#859399]">
                    <div className="flex gap-2 text-[8px] font-mono">
                      <span>PUSH: {prog.pushups}</span>
                      <span>SQUAT: {prog.squats}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Standard gate routines */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="font-mono text-[10px] text-cyan-300 font-bold uppercase tracking-wider">STANDARD GATE TRIALS</span>
          </div>

          <div className="space-y-3">
            {standardRoutines.map((prog) => (
              <div 
                key={prog.id}
                onClick={() => onSelectProgram(prog)}
                className="glass-panel p-4 rounded-2xl flex gap-4 cursor-pointer active:scale-98 transition-all hover:border-cyan-400/30 border border-cyan-400/10 group relative"
              >
                {/* Ranking Tag strip on left */}
                <div className="absolute top-3 right-3 bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 font-mono text-[8px] font-bold px-2 py-0.5 rounded uppercase">
                  {prog.rank}
                </div>

                {/* Cover graphic */}
                <div className="w-16 h-16 rounded-xl bg-neutral-900 overflow-hidden border border-white/5 shrink-0">
                  <img 
                    src={prog.image} 
                    alt={prog.title}
                    className="w-full h-full object-cover opacity-60 grayscale group-hover:scale-105 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Workout text fields */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="pr-10">
                    <h4 className="font-display text-xs font-bold text-[#e5e2e1] group-hover:text-cyan-300 transition-colors leading-tight">
                      {prog.title}
                    </h4>
                    <p className="text-[9px] text-[#bbc9cf] font-mono leading-normal line-clamp-2 mt-1">
                      {prog.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[8px] font-mono text-[#bbc9cf] mt-2 pt-1.5 border-t border-white/5">
                    <span>GOAL: {prog.pushups} PUSH | {prog.situps} SIT | {prog.squats} SQUAT | {prog.running}KM RUN</span>
                    <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Tip */}
        <div className="bg-[#131313]/40 border border-white/5 rounded-xl p-3 flex gap-2.5 items-start mt-4">
          <Trophy className="w-4 h-4 text-yellow-500 fill-yellow-500/20 mt-0.5 shrink-0" />
          <p className="font-mono text-[9px] text-[#bbc9cf] leading-normal uppercase">
            Selecting any routine will replace your active Main Character Path values immediately. Clear dungeons to accumulate EXP safely.
          </p>
        </div>
      </div>
    </div>
  );
}
