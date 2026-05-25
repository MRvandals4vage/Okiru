export interface HunterProfile {
  name: string;
  age: number;
  height: number; // in cm
  weight: number; // in kg
  objective: string;
  rank: 'E-RANK' | 'D-RANK' | 'C-RANK' | 'B-RANK' | 'A-RANK' | 'S-RANK';
  level: number;
  power: number;
  xp: number;
  xpMax: number;
  recovery: number; // percentage
  calories: number;
  streak: number;
  class: string;
  title: string;
  avatar: string;
  isInitialized: boolean;
}

export interface DailyQuest {
  pushups: number;
  pushupsMax: number;
  situps: number;
  situpsMax: number;
  squats: number;
  squatsMax: number;
  running: number; // in km
  runningMax: number;
  remainingTime: number; // total seconds remaining for formatting (e.g. 14544 is 4h 2m 24s)
  isCompleted: boolean;
}

export interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  rank: 'E-RANK' | 'D-RANK' | 'C-RANK' | 'B-RANK' | 'A-RANK' | 'S-RANK';
  pushups: number;
  situps: number;
  squats: number;
  running: number;
  image: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  rankType: 'UNIQUE' | 'LEGENDARY' | 'EPIC' | 'LOCKED';
  icon: string; // lucide icon name
  unlocked: boolean;
}
