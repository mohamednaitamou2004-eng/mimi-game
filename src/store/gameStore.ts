// ============================================================
// MIMI Mahjong – Global State Store (Zustand)
// ============================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  GameScreen, GameMode, GameState, GameSession, SaveData,
  GameSettings, Tile, CatCard,
} from '../types/game';
import {
  generateBoard, updateFreedom, findValidPairs,
  isBoardComplete, hasValidMoves, shuffleBoard, calculateScore,
  generateLevelConfig,
} from '../engine/mahjongEngine';
import { CAT_CARDS } from '../data/catCards';

// ── Default Settings
const defaultSettings: GameSettings = {
  musicVolume: 0.7,
  sfxVolume: 0.8,
  vibration: true,
  language: 'fr',
  textSize: 'normal',
  colorblindMode: 'none',
  highContrast: false,
  reduceMotion: false,
};

// ── Default Save Data
const defaultSave: SaveData = {
  coins: 100,
  unlockedCatIds: [],
  levelProgress: {},
  currentLevel: 1,
  totalLevelsCompleted: 0,
  settings: defaultSettings,
  dailyRewardLastClaim: null,
  dailyStreak: 0,
  totalPlayTime: 0,
};

// ── Store Interface
interface GameStore {
  // Navigation
  currentScreen: GameScreen;
  previousScreen: GameScreen;
  setScreen: (screen: GameScreen) => void;

  // Save Data (persisted)
  saveData: SaveData;
  updateCoins: (delta: number) => void;
  unlockCat: (catId: number) => void;
  recordLevelComplete: (levelId: number, stars: 1 | 2 | 3, score: number, time: number) => void;
  updateSettings: (partial: Partial<GameSettings>) => void;
  claimDailyReward: () => void;

  // Current Game Session
  session: GameSession | null;
  startLevel: (levelId: number, mode?: GameMode) => void;
  selectTile: (tile: Tile) => void;
  useHint: () => void;
  useShuffle: () => void;
  useUndo: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  restartLevel: () => void;
  exitLevel: () => void;
  tickTimer: (dt: number) => void;

  // UI State
  showTutorial: boolean;
  tutorialStep: number;
  setTutorialStep: (step: number) => void;
  closeTutorial: () => void;

  // Particles / Effects
  triggerEffect: string | null;
  setTriggerEffect: (effect: string | null) => void;

  // Collection
  selectedCat: CatCard | null;
  setSelectedCat: (cat: CatCard | null) => void;

  // Shop
  showShopModal: boolean;
  setShowShopModal: (v: boolean) => void;
}

// ── Store Implementation
export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // ── Navigation
      currentScreen: 'splash',
      previousScreen: 'menu',
      setScreen: (screen) =>
        set(s => ({ currentScreen: screen, previousScreen: s.currentScreen })),

      // ── Save Data
      saveData: defaultSave,

      updateCoins: (delta) =>
        set(s => ({
          saveData: { ...s.saveData, coins: Math.max(0, s.saveData.coins + delta) },
        })),

      unlockCat: (catId) =>
        set(s => {
          if (s.saveData.unlockedCatIds.includes(catId)) return s;
          return {
            saveData: {
              ...s.saveData,
              unlockedCatIds: [...s.saveData.unlockedCatIds, catId],
            },
            triggerEffect: `unlock_cat_${catId}`,
          };
        }),

      recordLevelComplete: (levelId, stars, score, time) =>
        set(s => {
          const existing = s.saveData.levelProgress[levelId];
          const newProgress = {
            levelId,
            stars: Math.max(existing?.stars ?? 0, stars) as 0 | 1 | 2 | 3,
            completed: true,
            bestTime: existing?.bestTime ? Math.min(existing.bestTime, time) : time,
            bestScore: existing?.bestScore ? Math.max(existing.bestScore, score) : score,
          };
          const totalCompleted = Object.values({
            ...s.saveData.levelProgress,
            [levelId]: newProgress,
          }).filter(p => p.completed).length;

          // Check cat unlocks
          const newUnlocked = [...s.saveData.unlockedCatIds];
          CAT_CARDS.forEach(cat => {
            if (!newUnlocked.includes(cat.id) && totalCompleted >= cat.unlockLevel) {
              newUnlocked.push(cat.id);
            }
          });

          return {
            saveData: {
              ...s.saveData,
              levelProgress: { ...s.saveData.levelProgress, [levelId]: newProgress },
              currentLevel: Math.max(s.saveData.currentLevel, levelId + 1),
              totalLevelsCompleted: totalCompleted,
              unlockedCatIds: newUnlocked,
            },
          };
        }),

      updateSettings: (partial) =>
        set(s => ({
          saveData: { ...s.saveData, settings: { ...s.saveData.settings, ...partial } },
        })),

      claimDailyReward: () =>
        set(s => ({
          saveData: {
            ...s.saveData,
            dailyRewardLastClaim: new Date().toDateString(),
            dailyStreak: s.saveData.dailyStreak + 1,
            coins: s.saveData.coins + 50 + s.saveData.dailyStreak * 10,
          },
        })),

      // ── Game Session
      session: null,

      startLevel: (levelId, mode = 'classic') => {
        const config = generateLevelConfig(levelId);
        const tiles = generateBoard(config);
        const session: GameSession = {
          levelConfig: config,
          mode,
          tiles,
          selectedTile: null,
          hintsUsed: 0,
          shufflesUsed: 0,
          undosUsed: 0,
          hintsRemaining: mode === 'relax' ? 999 : 3,
          shufflesRemaining: mode === 'relax' ? 999 : 2,
          undosRemaining: mode === 'relax' ? 999 : 5,
          startTime: Date.now(),
          elapsedTime: 0,
          score: 0,
          comboCount: 0,
          moveHistory: [],
          state: 'idle',
        };
        set({ session, currentScreen: 'gameplay' });
      },

      selectTile: (tile) => {
        const { session } = get();
        if (!session || session.state === 'paused' || session.state === 'victory' || session.state === 'defeat') return;
        if (!tile.isFree || tile.isMatched) return;

        const currentSelected = session.selectedTile;

        if (!currentSelected) {
          // First selection
          const updatedTiles = session.tiles.map(t => ({
            ...t,
            isSelected: t.id === tile.id,
            isHinted: false,
          }));
          set({ session: { ...session, tiles: updatedTiles, selectedTile: tile, state: 'selecting' } });
          return;
        }

        if (currentSelected.id === tile.id) {
          // Deselect
          const updatedTiles = session.tiles.map(t => ({ ...t, isSelected: false }));
          set({ session: { ...session, tiles: updatedTiles, selectedTile: null, state: 'idle' } });
          return;
        }

        if (currentSelected.type === tile.type) {
          // Match! Remove both tiles
          const record = { tile1: currentSelected, tile2: tile, timestamp: Date.now() };
          const updatedTiles = session.tiles.map(t => {
            if (t.id === currentSelected.id || t.id === tile.id) {
              return { ...t, isMatched: true, isSelected: false, isHinted: false };
            }
            return { ...t, isSelected: false, isHinted: false };
          });
          const freedTiles = updateFreedom(updatedTiles);
          const newCombo = session.comboCount + 1;

          const isComplete = isBoardComplete(freedTiles);
          const noMoves = !isComplete && !hasValidMoves(freedTiles);

          let newState: GameState = 'idle';
          let newScreen = get().currentScreen;
          let scoreResult = null;

          if (isComplete) {
            newState = 'victory';
            newScreen = 'victory';
            const elapsed = (Date.now() - session.startTime) / 1000 + session.elapsedTime;
            scoreResult = calculateScore(
              elapsed, session.levelConfig.targetTime,
              session.hintsUsed, session.shufflesUsed,
              newCombo, true,
            );
            // Record progress
            get().recordLevelComplete(
              session.levelConfig.id,
              scoreResult.stars as 1 | 2 | 3,
              scoreResult.total,
              elapsed,
            );
            get().updateCoins(
              scoreResult.stars === 3 ? session.levelConfig.rewards.coins3Stars :
              scoreResult.stars === 2 ? session.levelConfig.rewards.coins2Stars :
              session.levelConfig.rewards.coins1Star,
            );
          } else if (noMoves && session.shufflesRemaining <= 0) {
            newState = 'defeat';
            newScreen = 'defeat';
          }

          set({
            currentScreen: newScreen,
            session: {
              ...session,
              tiles: freedTiles,
              selectedTile: null,
              comboCount: newCombo,
              state: newState,
              moveHistory: [...session.moveHistory, record],
              score: scoreResult?.total ?? session.score,
            },
          });
        } else {
          // Wrong match – shake animation, deselect
          const updatedTiles = session.tiles.map(t => ({
            ...t,
            isSelected: t.id === tile.id,
            isHinted: false,
          }));
          set({ session: { ...session, tiles: updatedTiles, selectedTile: tile, state: 'selecting', comboCount: 0 } });
        }
      },

      useHint: () => {
        const { session } = get();
        if (!session || session.hintsRemaining <= 0) return;
        const pairs = findValidPairs(session.tiles);
        if (pairs.length === 0) return;
        const [t1, t2] = pairs[0];
        const updatedTiles = session.tiles.map(t => ({
          ...t,
          isHinted: t.id === t1.id || t.id === t2.id,
        }));
        set({
          session: {
            ...session,
            tiles: updatedTiles,
            hintsUsed: session.hintsUsed + 1,
            hintsRemaining: session.hintsRemaining - 1,
          },
        });
      },

      useShuffle: () => {
        const { session } = get();
        if (!session || session.shufflesRemaining <= 0) return;
        const shuffled = shuffleBoard(session.tiles, session.levelConfig.seed + session.shufflesUsed);
        set({
          session: {
            ...session,
            tiles: shuffled,
            selectedTile: null,
            shufflesUsed: session.shufflesUsed + 1,
            shufflesRemaining: session.shufflesRemaining - 1,
          },
        });
      },

      useUndo: () => {
        const { session } = get();
        if (!session || session.undosRemaining <= 0 || session.moveHistory.length === 0) return;
        const history = [...session.moveHistory];
        const lastMove = history.pop()!;
        const restoredTiles = session.tiles.map(t => {
          if (t.id === lastMove.tile1.id || t.id === lastMove.tile2.id) {
            return { ...t, isMatched: false, isSelected: false };
          }
          return t;
        });
        const freedTiles = updateFreedom(restoredTiles);
        set({
          session: {
            ...session,
            tiles: freedTiles,
            selectedTile: null,
            moveHistory: history,
            undosUsed: session.undosUsed + 1,
            undosRemaining: session.undosRemaining - 1,
            comboCount: Math.max(0, session.comboCount - 1),
          },
        });
      },

      pauseGame: () => {
        const { session } = get();
        if (!session) return;
        set({ session: { ...session, state: 'paused', elapsedTime: session.elapsedTime + (Date.now() - session.startTime) / 1000, startTime: Date.now() } });
      },

      resumeGame: () => {
        const { session } = get();
        if (!session) return;
        set({ session: { ...session, state: 'idle', startTime: Date.now() } });
      },

      restartLevel: () => {
        const { session } = get();
        if (!session) return;
        get().startLevel(session.levelConfig.id, session.mode);
      },

      exitLevel: () => {
        set({ session: null, currentScreen: 'levelSelect' });
      },

      tickTimer: (dt: number) => {
        const { session } = get();
        if (!session || session.state === 'paused' || session.state === 'victory' || session.state === 'defeat') return;
        set({ session: { ...session, elapsedTime: session.elapsedTime + dt } });
      },

      // ── Tutorial
      showTutorial: false,
      tutorialStep: 0,
      setTutorialStep: (step) => set({ tutorialStep: step }),
      closeTutorial: () => set({ showTutorial: false }),

      // ── Effects
      triggerEffect: null,
      setTriggerEffect: (effect) => set({ triggerEffect: effect }),

      // ── Collection
      selectedCat: null,
      setSelectedCat: (cat) => set({ selectedCat: cat }),

      // ── Shop
      showShopModal: false,
      setShowShopModal: (v) => set({ showShopModal: v }),
    }),
    {
      name: 'mimi-save',
      partialize: (state) => ({ saveData: state.saveData }),
    },
  ),
);

// ── Derived selectors
export const useCurrentSession = () => useGameStore(s => s.session);
export const useSaveData = () => useGameStore(s => s.saveData);
export const useSettings = () => useGameStore(s => s.saveData.settings);
export const useScreen = () => useGameStore(s => s.currentScreen);
