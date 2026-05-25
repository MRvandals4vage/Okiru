import React, { useState } from 'react';
import { Fingerprint, Bolt, Radio, HelpCircle, Loader2, User } from 'lucide-react';
import { HunterProfile } from '../types';
import { IMAGE_BLUEPRINT } from '../data';

interface HunterOnboardingProps {
  onComplete: (profile: Partial<HunterProfile>) => void;
}

export default function HunterOnboarding({ onComplete }: HunterOnboardingProps) {
  const [formData, setFormData] = useState({
    name: '',
    age: '21',
    height: '182',
    weight: '78',
    objective: 'S-RANK PHYSIQUE',
  });

  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLog, setScanLog] = useState('SYS_STANDBY');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('IDENTIFIER_NAME IS REQUIRED FOR GATE ENTRY.');
      return;
    }

    setIsScanning(true);
    setScanProgress(0);
    setScanLog('INITIALIZING SCAN...');

    const logs = [
      'ACCESSING MAIN SYSTEM ENGINE...',
      'CALIBRATING SENSORS [LATENCY: 12ms]...',
      'READING MUSCULOSKELETAL DENSITY...',
      'VITAL SYNC: 100% SECURE...',
      'E-RANK PREDICTION CONFIRMED: 98%...',
      'WRITING INDELIBLE SOUL ARCHIVE...',
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const next = prev + 5;
        if (next % 15 === 0 && currentStep < logs.length) {
          setScanLog(logs[currentStep]);
          currentStep++;
        }
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete({
              name: formData.name.toUpperCase(),
              age: parseInt(formData.age) || 21,
              height: parseInt(formData.height) || 182,
              weight: parseInt(formData.weight) || 78,
              objective: formData.objective,
              isInitialized: true,
            });
          }, 400);
          return 100;
        }
        return next;
      });
    }, 100);
  };

  return (
    <div className="flex-1 flex flex-col p-5 bg-[#0A0A0A] relative text-[#e5e2e1] overflow-y-auto">
      {/* Background visual artifacts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[30%] -right-16 w-48 h-48 bg-cyan-500/5 blur-[80px] rounded-full" />
        <div className="absolute bottom-[20%] -left-16 w-56 h-56 bg-purple-500/5 blur-[100px] rounded-full" />
      </div>

      <header className="flex justify-between items-center h-12 border-b border-cyan-400/20 mb-6 select-none relative z-10">
        <h1 className="font-display text-lg tracking-tighter text-[#a4e6ff] italic font-semibold">ARISE</h1>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] font-bold text-cyan-400/60 uppercase">SYS_V2.4</span>
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col max-w-md mx-auto w-full">
        {/* Header Titles */}
        <div className="mb-6">
          <p className="font-mono text-[9px] text-[#a4e6ff] tracking-[0.25em] font-semibold mb-1">
            AUTHORIZATION REQUIRED
          </p>
          <h2 className="font-display text-xl font-extrabold text-[#e5e2e1] uppercase leading-none">
            System Initialization:<br />
            <span className="text-[#a4e6ff] italic">Hunter Evaluation</span>
          </h2>
          <div className="w-full h-px bg-gradient-to-r from-cyan-400/45 to-transparent mt-3" />
        </div>

        {/* HUD Scanner Visual */}
        <div className="hud-border rounded-2xl h-[260px] mb-6 overflow-hidden flex items-center justify-center p-3 relative group">
          <div className="absolute inset-0 w-full h-full bg-[#0E0E0E]/80" />
          
          {/* Anatomical scanner element */}
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Holographic human blueprint image hotlinked */}
            <img 
              className="absolute inset-0 w-full h-full object-contain opacity-35 mix-blend-color-dodge transition-opacity duration-300"
              src={IMAGE_BLUEPRINT} 
              alt="System Evaluation Core"
              referrerPolicy="no-referrer"
            />
            
            {/* Person icon indicator with pulsed glow */}
            <div className="relative z-10 w-24 h-36 border border-cyan-400/20 rounded-xl flex items-center justify-center bg-cyan-400/5 backdrop-blur-md overflow-hidden shadow-[inset_0_0_20px_rgba(164,230,255,0.05)]">
              <User className="w-16 h-16 text-[#a4e6ff] opacity-40 animate-pulse" />
              <div className="scanline opacity-40" />
              
              {/* Laser Line of Scanning */}
              {isScanning && (
                <div 
                  className="absolute left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_8px_#59ff5b] animate-[bounce_2s_infinite]"
                  style={{ top: `${scanProgress}%` }}
                />
              )}
            </div>

            {/* Analysis Flashing Markers */}
            <div className="absolute top-10 left-6 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
            <div className="absolute bottom-16 right-10 w-1.5 h-1.5 bg-[#37fe11] rounded-full animate-ping" style={{ animationDelay: '1.2s' }} />
            
            {/* Rotating system vector border */}
            <div className="absolute w-36 h-36 border border-cyan-400/5 rounded-full animate-[spin_20s_linear_infinite]" />

            {/* Simulated Live System Logs */}
            <div className="absolute top-3 left-3 font-mono text-[8px] text-cyan-400/70 space-y-0.5">
              <p>VITAL_ENGINES_SYNCING...</p>
              <p>LATENCY: 12ms</p>
              <p>TARGET: CHRONO_ENTITY</p>
            </div>
            
            <div className="absolute bottom-3 right-3 text-right font-mono text-[8px] space-y-0.5">
              <p className="text-emerald-400/80">E-RANK_PREDICTION: 98%</p>
              <p className="text-[#859399]/70">CALIBRATING_SENSORS</p>
            </div>

            {/* Scanning Overlay State */}
            {isScanning && (
              <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-4">
                <Loader2 className="w-8 h-8 text-[#a4e6ff] animate-spin mb-3" />
                <div className="w-full max-w-[200px] bg-white/5 h-2 rounded-full overflow-hidden border border-white/10 mb-2">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-[#ce5dff] transition-all duration-100 ease-out shimmer-bar"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
                <p className="font-mono text-[10px] text-cyan-400 font-bold uppercase tracking-wide">{scanProgress}% CONNECTED</p>
                <p className="font-mono text-[8px] text-[#bbc9cf] mt-1 text-center h-4 truncate w-full">{scanLog}</p>
              </div>
            )}
          </div>
        </div>

        {/* Input Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Name Input */}
            <div className="space-y-1">
              <label className="font-mono text-[10px] text-[#859399] tracking-wider px-1 flex justify-between uppercase">
                <span>IDENTIFIER_NAME</span>
                <span className="text-cyan-400/60 text-[9px] font-bold">REQUIRED</span>
              </label>
              <div className="relative">
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="ENTER HUNTER NAME" 
                  maxLength={16}
                  className="w-full bg-[#1c1b1b] border border-[#3c494e] rounded-xl px-4 py-3 text-sm font-mono tracking-wider focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all placeholder:text-[#859399]/40 uppercase text-white"
                />
                <Fingerprint className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#859399]/50" />
              </div>
            </div>

            {/* Row inputs: Age and height */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-mono text-[10px] text-[#859399] tracking-wider px-1 uppercase">CHRONO_AGE</label>
                <input 
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="21" 
                  min={10} 
                  max={120}
                  className="w-full bg-[#1c1b1b] border border-[#3c494e] rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-cyan-400 transition-all text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="font-mono text-[10px] text-[#859399] tracking-wider px-1 uppercase">ALTITUDE_CM</label>
                <input 
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="182" 
                  min={100} 
                  max={250}
                  className="w-full bg-[#1c1b1b] border border-[#3c494e] rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-cyan-400 transition-all text-white"
                />
              </div>
            </div>

            {/* Row inputs: Weight and objective */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-mono text-[10px] text-[#859399] tracking-wider px-1 uppercase">MASS_KG</label>
                <input 
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="78" 
                  min={30} 
                  max={250}
                  className="w-full bg-[#1c1b1b] border border-[#3c494e] rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-cyan-400 transition-all text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="font-mono text-[10px] text-[#859399] tracking-wider px-1 uppercase">PRIMARY_OBJECTIVE</label>
                <select 
                  name="objective"
                  value={formData.objective}
                  onChange={handleChange}
                  className="w-full bg-[#1c1b1b] border border-[#3c494e] rounded-xl px-3 py-3 text-sm font-mono focus:outline-none focus:border-cyan-400 transition-all appearance-none text-white cursor-pointer"
                >
                  <option value="S-RANK PHYSIQUE">S-RANK PHYSIQUE</option>
                  <option value="AGILITY PEAK">AGILITY PEAK</option>
                  <option value="STRENGTH FOCUS">STRENGTH FOCUS</option>
                  <option value="ENDURANCE TIER">ENDURANCE TIER</option>
                </select>
              </div>
            </div>
          </div>

          {/* Evaluation Trigger Button */}
          <div className="pt-4 mt-auto">
            <button 
              type="submit"
              disabled={isScanning}
              className="w-full bg-[#e5e2e1] text-[#131313] hover:bg-white active:scale-[0.98] transition-all font-display text-base font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(164,230,255,0.4)] group overflow-hidden relative"
            >
              <span className="relative z-10 uppercase tracking-tighter">Initialize Evaluation</span>
              <Bolt className="relative z-10 w-4 h-4 text-cyan-500 fill-cyan-500 animate-pulse group-hover:translate-x-1.5 transition-transform" />
              {/* Shine glow slider */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
            <p className="text-center font-mono text-[8px] text-[#bbc9cf]/60 mt-3.5 uppercase tracking-wider leading-relaxed">
              WARNING: DATA INPUT IS PERMANENT FOR CURRENT QUEST ARC
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
