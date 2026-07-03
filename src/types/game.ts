// ============================================================
// MIMI Mahjong – Core Type Definitions
// ============================================================

export type Rarity = 'common' | 'rare' | 'legendary';
export type GameScreen = 'splash' | 'menu' | 'levelSelect' | 'gameplay' | 'collection' | 'shop' | 'settings' | 'victory' | 'defeat';
export type GameMode = 'classic' | 'daily' | 'timed' | 'relax';
export type GameState = 'idle' | 'selecting' | 'removing' | 'paused' | 'victory' | 'defeat';
export type TileType = string;

export interface TilePosition {
  x: number;
  y: number;
  layer: number;
}

export interface Tile {
  id: string;
  type: TileType;
  position: TilePosition;
  isFree: boolean;
  isSelected: boolean;
  isMatched: boolean;
  isHinted: boolean;
}

export interface TileTypeDefinition {
  id: string;
  name: string;
  nameEn: string;
  nameFr: string;
  symbol: string;
  category: 'character' | 'bamboo' | 'circle' | 'wind' | 'dragon' | 'flower' | 'season' | 'special';
  color: string;
  bgColor: string;
}

export interface CatCard {
  id: number;
  name: string;
  nameKey: string;
  rarity: Rarity;
  description: string;
  descriptionLong: string;
  unlockLevel: number;
  unlockCondition: string;
  isUnlocked: boolean;
  bonusDescription?: string;
  emoji: string;
  colorPrimary: string;
  colorSecondary: string;
  colorAccent: string;
  animationType: 'graceful' | 'joyful' | 'gentle' | 'playful';
}

export interface LevelConfig {
  id: number;
  seed: number;
  templateId: number;
  tileCount: number;
  targetTime: number; // seconds
  difficulty: 1 | 2 | 3 | 4 | 5;
  rewards: LevelRewards;
  name?: string;
}

export interface LevelRewards {
  coins1Star: number;
  coins2Stars: number;
  coins3Stars: number;
}

export interface LevelProgress {
  levelId: number;
  stars: 0 | 1 | 2 | 3;
  completed: boolean;
  bestTime?: number;
  bestScore?: number;
}

export interface GameSession {
  levelConfig: LevelConfig;
  mode: GameMode;
  tiles: Tile[];
  selectedTile: Tile | null;
  hintsUsed: number;
  shufflesUsed: number;
  undosUsed: number;
  hintsRemaining: number;
  shufflesRemaining: number;
  undosRemaining: number;
  startTime: number;
  elapsedTime: number;
  score: number;
  comboCount: number;
  moveHistory: MoveRecord[];
  state: GameState;
}

export interface MoveRecord {
  tile1: Tile;
  tile2: Tile;
  timestamp: number;
}

export interface SaveData {
  coins: number;
  unlockedCatIds: number[];
  levelProgress: Record<number, LevelProgress>;
  currentLevel: number;
  totalLevelsCompleted: number;
  settings: GameSettings;
  dailyRewardLastClaim: string | null;
  dailyStreak: number;
  totalPlayTime: number;
}

export interface GameSettings {
  musicVolume: number;
  sfxVolume: number;
  vibration: boolean;
  language: 'fr' | 'en' | 'ar' | 'es';
  textSize: 'small' | 'normal' | 'large';
  colorblindMode: 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia';
  highContrast: boolean;
  reduceMotion: boolean;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  priceType: 'coins' | 'real';
  icon: string;
  category: 'hints' | 'undos' | 'shuffles' | 'cosmetic' | 'premium';
}

export interface DailyReward {
  day: number;
  coins: number;
  special?: string;
}

export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
  emoji?: string;
}

export interface BoardTemplate {
  id: number;
  name: string;
  positions: TilePosition[];
  difficulty: number;
}
