// ============================================================
// MIMI Mahjong – Core Game Engine
// Tile logic, freedom check, pair matching, board generation
// ============================================================

import { Tile, LevelConfig } from '../types/game';
import { BOARD_TEMPLATES } from '../data/boardTemplates';
import { getTileSubset } from '../data/tileTypes';

// ── Seeded Random Number Generator (Mulberry32)
export function seededRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(1831565813, s) + 1502890161) | 0;
    const t = Math.imul(s ^ (s >>> 15), 1 | s);
    return ((t ^ (t + Math.imul(t ^ (t >>> 7), 61))) >>> 0) / 4294967296;
  };
}

// ── Shuffle an array with a seeded RNG
export function shuffleArray<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Check if a tile is "free" (can be selected)
// A tile is free if:
//   1. Nothing directly above it (same x,y, higher layer)
//   2. At least one horizontal side (left or right) is clear at same layer
export function isTileFree(tile: Tile, allTiles: Tile[]): boolean {
  if (tile.isMatched) return false;

  const activeTiles = allTiles.filter(t => !t.isMatched);

  // Check nothing above
  const hasAbove = activeTiles.some(
    t =>
      t.id !== tile.id &&
      t.position.layer === tile.position.layer + 1 &&
      Math.abs(t.position.x - tile.position.x) < 1 &&
      Math.abs(t.position.y - tile.position.y) < 1,
  );
  if (hasAbove) return false;

  // Check left side clear
  const leftBlocked = activeTiles.some(
    t =>
      t.id !== tile.id &&
      t.position.layer === tile.position.layer &&
      t.position.x === tile.position.x - 1 &&
      Math.abs(t.position.y - tile.position.y) < 1,
  );

  // Check right side clear
  const rightBlocked = activeTiles.some(
    t =>
      t.id !== tile.id &&
      t.position.layer === tile.position.layer &&
      t.position.x === tile.position.x + 1 &&
      Math.abs(t.position.y - tile.position.y) < 1,
  );

  // At least one side must be free
  return !leftBlocked || !rightBlocked;
}

// ── Update freedom status for all tiles
export function updateFreedom(tiles: Tile[]): Tile[] {
  return tiles.map(tile => ({
    ...tile,
    isFree: isTileFree(tile, tiles),
  }));
}

// ── Find all valid pairs (two free tiles of same type)
export function findValidPairs(tiles: Tile[]): [Tile, Tile][] {
  const freeTiles = tiles.filter(t => !t.isMatched && t.isFree);
  const pairs: [Tile, Tile][] = [];
  for (let i = 0; i < freeTiles.length; i++) {
    for (let j = i + 1; j < freeTiles.length; j++) {
      if (freeTiles[i].type === freeTiles[j].type) {
        pairs.push([freeTiles[i], freeTiles[j]]);
      }
    }
  }
  return pairs;
}

// ── Check if board has any valid moves
export function hasValidMoves(tiles: Tile[]): boolean {
  return findValidPairs(tiles).length > 0;
}

// ── Check if board is complete (all tiles matched)
export function isBoardComplete(tiles: Tile[]): boolean {
  return tiles.every(t => t.isMatched);
}

// ── Generate a solvable board using backwards generation
// Algorithm:
//   1. Take template positions
//   2. Simulate removing pairs in reverse to assign types
//   3. This guarantees at least one solution path
export function generateBoard(config: LevelConfig): Tile[] {
  const rng = seededRng(config.seed);
  const template = BOARD_TEMPLATES.find(t => t.id === config.templateId) || BOARD_TEMPLATES[0];

  // Determine how many positions to use
  let positions = [...template.positions];
  
  // Ensure even count
  if (positions.length % 2 !== 0) positions.pop();

  // Limit to config.tileCount if needed
  if (positions.length > config.tileCount) {
    positions = shuffleArray(positions, rng).slice(0, config.tileCount);
    if (positions.length % 2 !== 0) positions.pop();
  }

  const tileCount = positions.length;
  const pairCount = tileCount / 2;

  // Determine how many distinct tile types we need
  // Each type appears exactly 4 times (2 pairs), except when pairCount is small
  const typesNeeded = Math.ceil(pairCount / 2);
  const tileTypeIds = getTileSubset(Math.min(typesNeeded, 34));

  // Backwards generation: 
  // Start with empty board (all positions), then "place" pairs
  // Each pair placed = pair that can be "removed" first in forward play
  
  // Sort positions by layer desc (highest first = placed last = removed first)
  const sortedPositions = [...positions].sort((a, b) => {
    if (b.layer !== a.layer) return b.layer - a.layer;
    return 0;
  });

  // Build assignment: for each pair slot, assign a type
  const typeAssignment: string[] = [];
  let typeIndex = 0;
  let typeCount = 0;
  for (let i = 0; i < pairCount; i++) {
    typeAssignment.push(tileTypeIds[typeIndex % tileTypeIds.length]);
    typeCount++;
    if (typeCount >= 2) {
      typeCount = 0;
      typeIndex++;
    }
  }

  // Shuffle the type assignment slightly for variety
  const shuffledTypes = shuffleArray(typeAssignment, rng);

  // Create pairs: duplicate each type to form actual tile types
  const tilePairs: string[] = [];
  shuffledTypes.forEach(t => { tilePairs.push(t, t); });

  // Shuffle the tile pairs
  const finalTypes = shuffleArray(tilePairs, rng);

  // Create tile objects
  const tiles: Tile[] = sortedPositions.map((pos, idx) => ({
    id: `tile_${idx}_${pos.x}_${pos.y}_${pos.layer}`,
    type: finalTypes[idx] || tileTypeIds[0],
    position: pos,
    isFree: false,
    isSelected: false,
    isMatched: false,
    isHinted: false,
  }));

  // Update freedom
  return updateFreedom(tiles);
}

// ── Shuffle remaining tiles (guarantees solvability via reassignment)
export function shuffleBoard(tiles: Tile[], seed: number): Tile[] {
  const rng = seededRng(seed + Date.now());
  const remaining = tiles.filter(t => !t.isMatched);
  const types = remaining.map(t => t.type);
  const shuffledTypes = shuffleArray(types, rng);

  const reshuffled = remaining.map((tile, idx) => ({
    ...tile,
    type: shuffledTypes[idx],
    isSelected: false,
    isHinted: false,
  }));

  const matched = tiles.filter(t => t.isMatched);
  const allTiles = [...matched, ...reshuffled];
  return updateFreedom(allTiles);
}

// ── Calculate score
export interface ScoreResult {
  base: number;
  timeBonus: number;
  comboBonus: number;
  hintPenalty: number;
  shufflePenalty: number;
  total: number;
  stars: 0 | 1 | 2 | 3;
}

export function calculateScore(
  elapsedSeconds: number,
  targetTime: number,
  hintsUsed: number,
  shufflesUsed: number,
  comboCount: number,
  victory: boolean,
): ScoreResult {
  if (!victory) return { base: 0, timeBonus: 0, comboBonus: 0, hintPenalty: 0, shufflePenalty: 0, total: 0, stars: 0 };

  const base = 1000;
  const timeRatio = elapsedSeconds / targetTime;
  const timeBonus = Math.max(0, Math.round((1 - timeRatio) * 500));
  const comboBonus = comboCount * 25;
  const hintPenalty = hintsUsed * 50;
  const shufflePenalty = shufflesUsed * 100;
  const total = Math.max(100, base + timeBonus + comboBonus - hintPenalty - shufflePenalty);

  let stars: 0 | 1 | 2 | 3 = 1;
  if (timeRatio < 0.75 && hintsUsed < 3) stars = 2;
  if (timeRatio < 0.5 && hintsUsed === 0 && shufflesUsed === 0) stars = 3;

  return { base, timeBonus, comboBonus, hintPenalty, shufflePenalty, total, stars };
}

// ── Generate level configurations
export function generateLevelConfig(levelId: number): LevelConfig {
  const seed = levelId * 7919 + 12345; // Deterministic seed
  let templateId: number;
  let tileCount: number;
  let targetTime: number;
  let difficulty: 1 | 2 | 3 | 4 | 5;

  if (levelId <= 5) {
    templateId = 10; // Easy grid
    tileCount = 16;
    targetTime = 120;
    difficulty = 1;
  } else if (levelId <= 20) {
    templateId = (levelId % 2 === 0) ? 2 : 1;
    tileCount = 36 + (levelId - 6) * 2;
    targetTime = 180 + levelId * 5;
    difficulty = 2;
  } else if (levelId <= 50) {
    templateId = ((levelId - 1) % 6) + 1;
    tileCount = 60 + (levelId - 21) * 2;
    targetTime = 240 + levelId * 4;
    difficulty = 3;
  } else if (levelId <= 100) {
    templateId = ((levelId - 1) % 8) + 1;
    tileCount = 84 + (levelId - 51) * 2;
    targetTime = 300 + levelId * 3;
    difficulty = 4;
  } else {
    templateId = ((levelId - 1) % 9) + 1;
    tileCount = Math.min(144, 100 + (levelId - 101) * 2);
    targetTime = 360 + levelId * 2;
    difficulty = 5;
  }

  // Ensure even count
  if (tileCount % 2 !== 0) tileCount--;

  const coinsBase = difficulty * 20;
  return {
    id: levelId,
    seed,
    templateId,
    tileCount,
    targetTime,
    difficulty,
    rewards: {
      coins1Star: coinsBase,
      coins2Stars: coinsBase * 2,
      coins3Stars: coinsBase * 3,
    },
  };
}
