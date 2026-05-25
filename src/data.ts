import { TrainingProgram, Achievement, HunterProfile } from './types';

// Hotlinked images from user specification
export const IMAGE_BLUEPRINT = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCiHEO2WC_fIxOOaj76D4mWyD1wod3wfgsVlJ1_Sw2mLLqzX_bu72-t_8SMcOSqdTtNV7qPqgtE323CECJNJZsGjh-5T3WGSnGyHVtjOImNMBshQGrVtvuo6_CzrWEBhbKg3-8TqzWC89Kaq9HWB7UM79_Gh7F-whI0eug4OK4hYr3g_Nitsr5QrDNDAb-P9Mumg_3Gqq3_NFEZXBIe5ofQoKN-Th1kCJ_QcbIwj2P2RVqgErQtQkZu8hNLvvT1XErpIWPJCM2h4Q';
export const IMAGE_PROFILE_DARK = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQuEfX8un6MiddxDAOyaMlL1cc51rxA2N4hzHEEDGfCL3Hbl1l6grzdlcgtT6ar7NntG1VxcHEYqlhnOnyal3fRvS27l1-zu6rUIw5FEmyg2abTbd7UbGMSKYxWSia64WP8jwbAfL7JGU4zTPTWZKAT0WcuoG4ynkzQVZtt2TTkdN01zpmVjHQUpIPnszodTkdJHPeI6ePRx6nuTMCa0DKgPmfNlpd5KmTkmlDnou-KdOao3o3xVnjUgn45G_D3mBMe5CXyEcTrs0';
export const IMAGE_PROTAGONIST_BLUE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpV7Jd4tnkVb2FG9eULHvR-c8_bUr46TwGr2a_f30LxE51JLmsm0a4h_sN3XgMymOapu_6MkxvBRg6A-cigvMs3X7km9V099qEoIrPwMV1BN0VRLNw99R8woF67YPaOm5f0tfVqyfHvyS8LWCEXk708dt3iwtgFrSqCiMF5YbcrE9Yk75nDoldcn_VLIekB8RdIOnkAf_UXoFOUs73PzbZFRH4z16Asq8c0kq_tXCsxAG1zmxtBBHzYLR8z5fdTZDPFafhzIMRmMM';
export const IMAGE_MONARCH_HOOD = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrv4YKaiQTC2OoUoSswlf0lGfOF_8ARaWYV3gP0CYaEPaZGEV7-WKgbXB4cFBTPQVU3OZMQXCUlnevXuLSZy0PxOjhsFgQxxMpsQffNpRFMqX086HVtAXJrM6jGB9z6TIGFGqukiVZROIB0rKb6IL-vkcce-og3GkiRZt9xIgjDqwInVwfof8OObSCeT7RE6rvwEaQFuosKXU5bQ3Utwpx3KnUy5T1BHD4oiVTq4Mmwe7QEVeP9S1OaYKDO4rJxQtJMgB3fkb91PQ';
export const IMAGE_ANIME_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPOeb7QVw0N154cf96VKB4H0qamS0zNvBHA0OIzkg3APjlxEWtvPMXOw3IoiSIkP1Mtol_i9wNchBpJYxg5LsSsPW9I8EhTtejHzAqZzvEOVwBtY9T44WMWXuJuHL-3Clz7Sw4LB51V5ePflJNNXP1BgZia3J96weYubeP3WZjbDw9gr0OwZ8AI6bK2FMAwSbo8ps_W-etsM361-ICUuM-zs-LobHCaiIe-ZaPcTGgn7S1KBjxH-agE2lye_NbsBKyeMJT5ZUurSg';

export const DEFAULT_PROFILE: HunterProfile = {
  name: 'JUNG SINWOO',
  age: 21,
  height: 182,
  weight: 78,
  objective: 'S-RANK PHYSIQUE',
  rank: 'E-RANK',
  level: 21,
  power: 1420,
  xp: 7420,
  xpMax: 10000,
  recovery: 88,
  calories: 1240,
  streak: 14,
  class: 'Fighter',
  title: 'Player',
  avatar: IMAGE_PROTAGONIST_BLUE,
  isInitialized: false, // Will start at onboarding
};

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: 'prog-1',
    title: 'Adaptive Fighter Physique',
    description: 'Three-day routine mixing weighted dips, pull-ups, pistol squats, and dynamic core exercises to build functional combat torque.',
    rank: 'S-RANK',
    pushups: 100,
    situps: 100,
    squats: 100,
    running: 10,
    image: IMAGE_MONARCH_HOOD,
  },
  {
    id: 'prog-2',
    title: 'Basic Daily Quest',
    description: '100 push-ups, 100 sit-ups, 100 squats, & a 10km run. Speed and stamina conditioning for modern gate clearers.',
    rank: 'E-RANK',
    pushups: 100,
    situps: 100,
    squats: 100,
    running: 10,
    image: IMAGE_PROFILE_DARK,
  },
  {
    id: 'prog-3',
    title: 'Shadow Devastator',
    description: 'Focuses purely on high-intensity muscle overload and recovery optimization. Excellent for rapid strength stats.',
    rank: 'A-RANK',
    pushups: 80,
    situps: 80,
    squats: 120,
    running: 5,
    image: IMAGE_ANIME_AVATAR,
  },
  {
    id: 'prog-4',
    title: 'Agility Conditioning Arc',
    description: 'High cadence shadow sprints, reactive plyometrics, and jump rope regimens designed to elevate kinetic reflexes.',
    rank: 'B-RANK',
    pushups: 40,
    situps: 60,
    squats: 60,
    running: 15,
    image: IMAGE_PROTAGONIST_BLUE,
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Shadow Monarch',
    description: 'Attain supreme control over the leveling interface and complete a perfect 7-day training streak.',
    rankType: 'UNIQUE',
    icon: 'Sparkles',
    unlocked: true,
  },
  {
    id: 'ach-2',
    title: 'First Dungeon Cleared',
    description: 'Complete your first initialized quest workout and claim the standard hunter status rewards.',
    rankType: 'LEGENDARY',
    icon: 'Sword',
    unlocked: true,
  },
  {
    id: 'ach-3',
    title: 'Master of Shadows',
    description: 'Achieve S-Rank profile leveling tier status by pushing average daily metrics to peak heights.',
    rankType: 'LOCKED',
    icon: 'Lock',
    unlocked: false,
  },
  {
    id: 'ach-4',
    title: '100 Day Grind',
    description: 'Maintain persistent tracking and completed quest cycles for 100 consecutive calendar marks.',
    rankType: 'EPIC',
    icon: 'MilitaryTech',
    unlocked: true,
  }
];
