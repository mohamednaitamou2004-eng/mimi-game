// ============================================================
// MIMI Mahjong – Board Layout Templates
// Each template defines tile positions (x, y, layer)
// x,y are grid coordinates; layer 0 = bottom
// ============================================================

import { BoardTemplate, TilePosition } from '../types/game';

// ── Helper to generate rectangle layouts
function rect(x0: number, y0: number, w: number, h: number, layer: number): TilePosition[] {
  const pos: TilePosition[] = [];
  for (let y = y0; y < y0 + h; y++)
    for (let x = x0; x < x0 + w; x++)
      pos.push({ x, y, layer });
  return pos;
}

// ── Helper to generate diamond
function diamond(cx: number, cy: number, r: number, layer: number): TilePosition[] {
  const pos: TilePosition[] = [];
  for (let y = cy - r; y <= cy + r; y++)
    for (let x = cx - r; x <= cx + r; x++)
      if (Math.abs(x - cx) + Math.abs(y - cy) <= r)
        pos.push({ x, y, layer });
  return pos;
}

// Deduplicate positions (same x,y,layer)
function dedup(positions: TilePosition[]): TilePosition[] {
  const seen = new Set<string>();
  return positions.filter(p => {
    const key = `${p.x},${p.y},${p.layer}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ── Template 1: Classic Turtle (36 tiles, 3 layers)
function buildTurtle(): TilePosition[] {
  const positions: TilePosition[] = [];
  // Layer 0: 8×6 base
  positions.push(...rect(0, 0, 8, 6, 0));
  // Layer 1: 6×4 middle  
  positions.push(...rect(1, 1, 6, 4, 1));
  // Layer 2: 4×2 top
  positions.push(...rect(2, 2, 4, 2, 2));
  return dedup(positions);
}

// ── Template 2: Pyramid (28 tiles)
function buildPyramid(): TilePosition[] {
  const positions: TilePosition[] = [];
  // Layer 0: 7×2
  positions.push(...rect(0, 2, 7, 2, 0));
  // Layer 1: 5×2
  positions.push(...rect(1, 2, 5, 2, 1));
  // Layer 2: 3×2
  positions.push(...rect(2, 2, 3, 2, 2));
  // Layer 3: 1×2
  positions.push(...rect(3, 2, 1, 2, 3));
  return dedup(positions);
}

// ── Template 3: Diamond (48 tiles)
function buildDiamond(): TilePosition[] {
  const positions: TilePosition[] = [];
  positions.push(...diamond(5, 5, 4, 0));
  positions.push(...diamond(5, 5, 3, 1));
  positions.push(...diamond(5, 5, 2, 2));
  return dedup(positions);
}

// ── Template 4: Cross (44 tiles)
function buildCross(): TilePosition[] {
  const positions: TilePosition[] = [];
  // Horizontal bar
  positions.push(...rect(0, 3, 10, 2, 0));
  // Vertical bar
  positions.push(...rect(4, 0, 2, 8, 0));
  // Layer 1
  positions.push(...rect(1, 3, 8, 2, 1));
  positions.push(...rect(4, 1, 2, 6, 1));
  return dedup(positions);
}

// ── Template 5: Fish (32 tiles)
function buildFish(): TilePosition[] {
  const positions: TilePosition[] = [];
  // Body: 5×4
  positions.push(...rect(2, 1, 5, 4, 0));
  // Tail: 2×4 left
  positions.push({ x: 0, y: 0, layer: 0 });
  positions.push({ x: 0, y: 5, layer: 0 });
  positions.push({ x: 1, y: 1, layer: 0 });
  positions.push({ x: 1, y: 4, layer: 0 });
  // Layer 1
  positions.push(...rect(3, 2, 3, 2, 1));
  return dedup(positions);
}

// ── Template 6: Butterfly (56 tiles)
function buildButterfly(): TilePosition[] {
  const positions: TilePosition[] = [];
  // Left wing
  positions.push(...rect(0, 0, 5, 4, 0));
  // Right wing  
  positions.push(...rect(7, 0, 5, 4, 0));
  // Body center
  positions.push(...rect(5, 1, 2, 6, 0));
  // Layer 1
  positions.push(...rect(1, 1, 3, 2, 1));
  positions.push(...rect(8, 1, 3, 2, 1));
  return dedup(positions);
}

// ── Template 7: Tower (36 tiles)
function buildTower(): TilePosition[] {
  const positions: TilePosition[] = [];
  positions.push(...rect(0, 4, 8, 2, 0));
  positions.push(...rect(1, 3, 6, 2, 0));
  positions.push(...rect(2, 2, 4, 2, 0));
  positions.push(...rect(3, 1, 2, 2, 0));
  positions.push(...rect(1, 3, 4, 2, 1));
  positions.push(...rect(2, 2, 2, 2, 1));
  return dedup(positions);
}

// ── Template 8: Flower (60 tiles)
function buildFlower(): TilePosition[] {
  const positions: TilePosition[] = [];
  // Center
  positions.push(...rect(4, 3, 4, 3, 0));
  // Petals
  positions.push(...rect(0, 0, 3, 3, 0));
  positions.push(...rect(9, 0, 3, 3, 0));
  positions.push(...rect(0, 6, 3, 3, 0));
  positions.push(...rect(9, 6, 3, 3, 0));
  // Layer 1
  positions.push(...rect(5, 4, 2, 1, 1));
  return dedup(positions);
}

// ── Template 9: Spiral (40 tiles)
function buildSpiral(): TilePosition[] {
  const positions: TilePosition[] = [];
  // Outer ring
  positions.push(...rect(0, 0, 8, 1, 0));
  positions.push(...rect(0, 1, 1, 6, 0));
  positions.push(...rect(7, 1, 1, 6, 0));
  positions.push(...rect(0, 7, 8, 1, 0));
  // Inner
  positions.push(...rect(2, 2, 4, 1, 0));
  positions.push(...rect(2, 2, 1, 3, 0));
  positions.push(...rect(2, 5, 3, 1, 0));
  positions.push(...rect(4, 3, 1, 2, 0));
  // Layer 1
  positions.push(...rect(3, 3, 2, 2, 1));
  return dedup(positions);
}

// ── Template 10: Easy grid (16 tiles)
function buildEasyGrid(): TilePosition[] {
  return dedup([
    ...rect(0, 0, 4, 4, 0),
  ]);
}

export const BOARD_TEMPLATES: BoardTemplate[] = [
  { id: 1, name: 'Tortue Classique', positions: buildTurtle(), difficulty: 2 },
  { id: 2, name: 'Pyramide', positions: buildPyramid(), difficulty: 1 },
  { id: 3, name: 'Diamant', positions: buildDiamond(), difficulty: 3 },
  { id: 4, name: 'Croix Royale', positions: buildCross(), difficulty: 2 },
  { id: 5, name: 'Poisson', positions: buildFish(), difficulty: 2 },
  { id: 6, name: 'Papillon', positions: buildButterfly(), difficulty: 3 },
  { id: 7, name: 'Tour', positions: buildTower(), difficulty: 2 },
  { id: 8, name: 'Fleur', positions: buildFlower(), difficulty: 4 },
  { id: 9, name: 'Spirale', positions: buildSpiral(), difficulty: 3 },
  { id: 10, name: 'Grille Simple', positions: buildEasyGrid(), difficulty: 1 },
];
