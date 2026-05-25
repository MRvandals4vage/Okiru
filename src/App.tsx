import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './supabaseClient';
import { Home, Dumbbell, Award, BarChart2, User, Sparkles } from 'lucide-react';
import PhoneSimulator from './components/PhoneSimulator';
import HunterOnboarding from './components/HunterOnboarding';
import HomeView from './components/HomeView';
import TrainingView from './components/TrainingView';
import QuestDetailsView from './components/QuestDetailsView';
import ProfileView from './components/ProfileView';
import QuestCompletedOverlay from './components/QuestCompletedOverlay';
import { DEFAULT_PROFILE } from './data';
import { HunterProfile, DailyQuest, TrainingProgram } from './types';

export default function App() {
  // Master Hunter profile state
  const [profile, setProfile] = useState<HunterProfile>(DEFAULT_PROFILE);

  // Master Quest state (taps, progressions)
  const [quest, setQuest] = useState<DailyQuest>({
    pushups: 20,
    pushupsMax: 100,
    situps: 45,
    situpsMax: 100,
    squats: 10,
    squatsMax: 100,
    running: 2.4,
    runningMax: 10,
    remainingTime: 14544, // 4 hours 2 minutes 24 seconds
    isCompleted: false,
  });

  const [activeTab, setActiveTab] = useState<number>(0);
  const [showCompletedOverlay, setShowCompletedOverlay] = useState<boolean>(false);
  const [levelUpAlert, setLevelUpAlert] = useState<string | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch initial data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: pData } = await supabase.from('profiles').select('*').eq('id', 'hunter_1').single();
        if (pData) setProfile(pData);
        
        const { data: qData } = await supabase.from('quests').select('*').eq('id', 'hunter_1').single();
        if (qData) setQuest(qData);
      } catch (e) {
        console.error('Error fetching from Supabase', e);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchData();
  }, []);

  // Sync state to Supabase
  useEffect(() => {
    if (!isLoaded) return;
    const saveProfile = async () => {
      await supabase.from('profiles').upsert({ id: 'hunter_1', ...profile });
    };
    saveProfile();
  }, [profile, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    const saveQuest = async () => {
      await supabase.from('quests').upsert({ id: 'hunter_1', ...quest });
    };
    saveQuest();
  }, [quest, isLoaded]);

  // Handle registration complete
  const handleOnboardingComplete = (onboardData: Partial<HunterProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...onboardData,
      isInitialized: true,
      rank: 'E-RANK',
      level: 21,
      power: 1420,
      xp: 7420,
    }));
  };

  // Switch training program and reset active progress reps to 0
  const handleSelectTrainingProgram = (prog: TrainingProgram) => {
    setQuest({
      pushups: 0,
      pushupsMax: prog.pushups,
      situps: 0,
      situpsMax: prog.situps,
      squats: 0,
      squatsMax: prog.squats,
      running: 0,
      runningMax: prog.running,
      remainingTime: 14544,
      isCompleted: false,
    });
    
    // Play sci-fi upgrade chime
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(620, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}

    // Jump immediately to Quest track screen to log reps
    setActiveTab(2);
  };

  const handleUpdateReps = (updatedReps: Partial<DailyQuest>) => {
    setQuest((prev) => ({
      ...prev,
      ...updatedReps,
    }));
  };

  const handleTriggerCompleteScreen = () => {
    setQuest((prev) => ({ ...prev, isCompleted: true }));
    setShowCompletedOverlay(true);

    // Heavy epic chime melody
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C Major upward sweep
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(freq, ctx.currentTime + (idx * 0.12));
        gain.gain.setValueAtTime(0.05, ctx.currentTime + (idx * 0.12));
        osc.start(ctx.currentTime + (idx * 0.12));
        osc.stop(ctx.currentTime + (idx * 0.12) + 0.25);
      });
    } catch (e) {}
  };

  // Trigger level up, increase power ratings, and close celebration modal
  const handleConfirmReset = () => {
    setShowCompletedOverlay(false);
    
    const nextLevel = profile.level + 1;
    const nextPower = profile.power + 20; // smaller power boost

    setProfile((prev) => ({
      ...prev,
      level: nextLevel,
      power: nextPower,
      streak: prev.streak + 1,
      calories: prev.calories + 500,
      xp: 0, // reset XP metrics to start progress to next milestone
      xpMax: Math.floor(prev.xpMax * 1.5), // Scale XP exponentially
    }));

    // Reset quest state representation
    setQuest({
      pushups: 0,
      pushupsMax: 100,
      situps: 0,
      situpsMax: 100,
      squats: 0,
      squatsMax: 100,
      running: 0,
      runningMax: 10,
      remainingTime: 14544,
      isCompleted: false,
    });

    // Fire ephemeral standard Level Up prompt toast
    setLevelUpAlert(`LEVEL UP! ATTRACTED TACTICAL ENERGETIC STATUS. CURRENT LEVEL: ${nextLevel}`);
    setTimeout(() => {
      setLevelUpAlert(null);
    }, 4500);

    // Route user to profile statistics tab to see visual polygon update
    setActiveTab(3);
  };

  // Direct power rating tweak from stats score changes
  const handleUpdatePower = (newPower: number) => {
    setProfile(prev => ({
      ...prev,
      power: newPower
    }));
  };

  // Reset profile back to onboarding for evaluation editing
  const handleResetProfileSystem = async () => {
    if (confirm('ARE YOU SURE YOU WANT TO CLEAR YOUR LEVEL RECORDS AND RE-INITIALIZE EVALUATION?')) {
      await supabase.from('profiles').delete().eq('id', 'hunter_1');
      await supabase.from('quests').delete().eq('id', 'hunter_1');
      window.location.reload();
    }
  };

  // Render correct view block based on selected active bottom navigation indicator
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <HomeView 
            profile={profile} 
            quest={quest} 
            onNavigateToTab={(tabIdx) => setActiveTab(tabIdx)} 
          />
        );
      case 1:
        return (
          <TrainingView 
            onSelectProgram={handleSelectTrainingProgram} 
          />
        );
      case 2:
        return (
          <QuestDetailsView 
            quest={quest} 
            profile={profile} 
            onUpdateReps={handleUpdateReps} 
            onCompleteQuest={handleTriggerCompleteScreen} 
          />
        );
      case 3:
      case 4:
        return (
          <ProfileView 
            profile={profile} 
            onUpdatePower={handleUpdatePower}
            onNavigateToTab={(tabIdx) => setActiveTab(tabIdx)}
          />
        );
      default:
        return <HomeView profile={profile} quest={quest} onNavigateToTab={setActiveTab} />;
    }
  };

  return (
    <PhoneSimulator>
      {/* Onboarding first setup lock */}
      {!profile.isInitialized ? (
        <HunterOnboarding onComplete={handleOnboardingComplete} />
      ) : (
        <div className="flex-1 flex flex-col h-full overflow-hidden select-none">
          {/* Main Container screen content */}
          <div className="flex-1 overflow-y-auto flex flex-col relative">
            {renderTabContent()}

            {/* Reset developer option */}
            <div className="py-2 text-center relative z-20 mt-auto bg-[#0A0A0A] border-t border-white/5 opacity-40 hover:opacity-100 transition-opacity">
              <button 
                onClick={handleResetProfileSystem}
                className="font-mono text-[8px] text-cyan-400 tracking-wider hover:underline"
              >
                [ RESET ALL SYSTEM RECORDS ]
              </button>
            </div>
          </div>

          {/* Fixed Floating Level Up Alert Toast message */}
          {levelUpAlert && (
            <div className="fixed top-16 left-6 right-6 bg-cyan-400 border border-cyan-300 text-slate-950 px-4 py-3 rounded-xl shadow-[0_0_25px_rgba(0,209,255,0.4)] z-[90] flex items-center gap-2 animate-[fadeIn_0.3s_ease] font-mono text-[9px] uppercase font-black tracking-wider text-center flex-col md:max-w-xs md:mx-auto">
              <div className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 fill-slate-950 text-slate-950 animate-bounce" />
                <span>Hunter Rating Upgraded</span>
              </div>
              <p className="text-[10px] text-slate-900 leading-tight mt-0.5">{levelUpAlert}</p>
            </div>
          )}

          {/* Complete celebration overlays modal trigger */}
          {showCompletedOverlay && (
            <QuestCompletedOverlay onConfirm={handleConfirmReset} />
          )}

          {/* Bottom HUD Tactical Navigation Bar Shell */}
          <nav className="shrink-0 h-[64px] bg-[#0E0E0E]/90 backdrop-blur-xl border-t border-cyan-400/25 flex justify-around items-center px-4 rounded-t-2xl shadow-[0_-5px_20px_rgba(164,230,255,0.06)] relative z-40">
            {/* Button Home Tab */}
            <button 
              onClick={() => setActiveTab(0)}
              className={`flex flex-col items-center justify-center py-1 flex-1 transition-all active:scale-90 ${
                activeTab === 0 
                  ? 'text-cyan-400 shadow-[0_0_10px_rgba(76,214,255,0.2)] font-black' 
                  : 'text-[#bbc9cf]/60 hover:text-white'
              }`}
            >
              <Home className={`w-4.5 h-4.5 ${activeTab === 0 ? 'stroke-[2.5]' : 'stroke-1.5'}`} />
              <span className="font-mono text-[8px] uppercase tracking-wider mt-1.5 font-bold">Home</span>
            </button>

            {/* Button Training Tab */}
            <button 
              onClick={() => setActiveTab(1)}
              className={`flex flex-col items-center justify-center py-1 flex-1 transition-all active:scale-90 ${
                activeTab === 1 
                  ? 'text-cyan-400 shadow-[0_0_10px_rgba(76,214,255,0.2)] font-black' 
                  : 'text-[#bbc9cf]/60 hover:text-white'
              }`}
            >
              <Dumbbell className={`w-4.5 h-4.5 ${activeTab === 1 ? 'stroke-[2.5]' : 'stroke-1.5'}`} />
              <span className="font-mono text-[8px] uppercase tracking-wider mt-1.5 font-bold">Training</span>
            </button>

            {/* Button Quests Tab */}
            <button 
              onClick={() => setActiveTab(2)}
              className={`flex flex-col items-center justify-center py-1 flex-1 transition-all active:scale-90 ${
                activeTab === 2 
                  ? 'text-cyan-400 shadow-[0_0_10px_rgba(76,214,255,0.2)] font-black' 
                  : 'text-[#bbc9cf]/60 hover:text-white'
              }`}
            >
              <Award className={`w-4.5 h-4.5 ${activeTab === 2 ? 'stroke-[2.5]' : 'stroke-1.5'}`} />
              <span className="font-mono text-[8px] uppercase tracking-wider mt-1.5 font-bold">Quests</span>
            </button>

            {/* Button Stats Tab */}
            <button 
              onClick={() => setActiveTab(3)}
              className={`flex flex-col items-center justify-center py-1 flex-1 transition-all active:scale-90 ${
                activeTab === 3 
                  ? 'text-cyan-400 shadow-[0_0_10px_rgba(76,214,255,0.2)] font-black' 
                  : 'text-[#bbc9cf]/60 hover:text-white'
              }`}
            >
              <BarChart2 className={`w-4.5 h-4.5 ${activeTab === 3 ? 'stroke-[2.5]' : 'stroke-1.5'}`} />
              <span className="font-mono text-[8px] uppercase tracking-wider mt-1.5 font-bold">Stats</span>
            </button>

            {/* Button Profile Tab */}
            <button 
              onClick={() => setActiveTab(4)}
              className={`flex flex-col items-center justify-center py-1 flex-1 transition-all active:scale-90 ${
                activeTab === 4 
                  ? 'text-cyan-400 shadow-[0_0_10px_rgba(76,214,255,0.2)] font-black' 
                  : 'text-[#bbc9cf]/60 hover:text-white'
              }`}
            >
              <User className={`w-4.5 h-4.5 ${activeTab === 4 ? 'stroke-[2.5]' : 'stroke-1.5'}`} />
              <span className="font-mono text-[8px] uppercase tracking-wider mt-1.5 font-bold">Profile</span>
            </button>
          </nav>
        </div>
      )}
    </PhoneSimulator>
  );
}
