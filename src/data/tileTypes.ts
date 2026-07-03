// ============================================================
// MIMI Mahjong – Tile Type Definitions
// All 36 tile types with symbols, names, colors
// ============================================================

import { TileTypeDefinition } from '../types/game';

export const TILE_TYPES: TileTypeDefinition[] = [
  // ── Characters (9)
  { id: 'char1', name: '一', nameEn: 'One Character', nameFr: 'Un Caractère', symbol: '一', category: 'character', color: '#4A4A4A', bgColor: '#F5F5F0' },
  { id: 'char2', name: '二', nameEn: 'Two Characters', nameFr: 'Deux Caractères', symbol: '二', category: 'character', color: '#4A4A4A', bgColor: '#F5F5F0' },
  { id: 'char3', name: '三', nameEn: 'Three Characters', nameFr: 'Trois Caractères', symbol: '三', category: 'character', color: '#4A4A4A', bgColor: '#F5F5F0' },
  { id: 'char4', name: '四', nameEn: 'Four Characters', nameFr: 'Quatre Caractères', symbol: '四', category: 'character', color: '#4A4A4A', bgColor: '#F5F5F0' },
  { id: 'char5', name: '五', nameEn: 'Five Characters', nameFr: 'Cinq Caractères', symbol: '五', category: 'character', color: '#4A4A4A', bgColor: '#F5F5F0' },
  { id: 'char6', name: '六', nameEn: 'Six Characters', nameFr: 'Six Caractères', symbol: '六', category: 'character', color: '#4A4A4A', bgColor: '#F5F5F0' },
  { id: 'char7', name: '七', nameEn: 'Seven Characters', nameFr: 'Sept Caractères', symbol: '七', category: 'character', color: '#4A4A4A', bgColor: '#F5F5F0' },
  { id: 'char8', name: '八', nameEn: 'Eight Characters', nameFr: 'Huit Caractères', symbol: '八', category: 'character', color: '#4A4A4A', bgColor: '#F5F5F0' },
  { id: 'char9', name: '九', nameEn: 'Nine Characters', nameFr: 'Neuf Caractères', symbol: '九', category: 'character', color: '#4A4A4A', bgColor: '#F5F5F0' },
  // ── Bamboo (9)
  { id: 'bam1', name: '🎋', nameEn: 'One Bamboo', nameFr: 'Un Bambou', symbol: '🎋', category: 'bamboo', color: '#2E7D32', bgColor: '#E8F5E9' },
  { id: 'bam2', name: '🎍', nameEn: 'Two Bamboo', nameFr: 'Deux Bambous', symbol: '🎍', category: 'bamboo', color: '#2E7D32', bgColor: '#E8F5E9' },
  { id: 'bam3', name: '🌿', nameEn: 'Three Bamboo', nameFr: 'Trois Bambous', symbol: '🌿', category: 'bamboo', color: '#2E7D32', bgColor: '#E8F5E9' },
  { id: 'bam4', name: '🍃', nameEn: 'Four Bamboo', nameFr: 'Quatre Bambous', symbol: '🍃', category: 'bamboo', color: '#388E3C', bgColor: '#E8F5E9' },
  { id: 'bam5', name: '🌱', nameEn: 'Five Bamboo', nameFr: 'Cinq Bambous', symbol: '🌱', category: 'bamboo', color: '#43A047', bgColor: '#E8F5E9' },
  { id: 'bam6', name: '🌾', nameEn: 'Six Bamboo', nameFr: 'Six Bambous', symbol: '🌾', category: 'bamboo', color: '#558B2F', bgColor: '#E8F5E9' },
  { id: 'bam7', name: '🍀', nameEn: 'Seven Bamboo', nameFr: 'Sept Bambous', symbol: '🍀', category: 'bamboo', color: '#1B5E20', bgColor: '#E8F5E9' },
  { id: 'bam8', name: '🌲', nameEn: 'Eight Bamboo', nameFr: 'Huit Bambous', symbol: '🌲', category: 'bamboo', color: '#2E7D32', bgColor: '#E8F5E9' },
  { id: 'bam9', name: '🌴', nameEn: 'Nine Bamboo', nameFr: 'Neuf Bambous', symbol: '🌴', category: 'bamboo', color: '#33691E', bgColor: '#E8F5E9' },
  // ── Circles (9)
  { id: 'circ1', name: '🔵', nameEn: 'One Circle', nameFr: 'Un Cercle', symbol: '①', category: 'circle', color: '#3A6B8C', bgColor: '#E3F0F8' },
  { id: 'circ2', name: '🔵', nameEn: 'Two Circles', nameFr: 'Deux Cercles', symbol: '②', category: 'circle', color: '#3A6B8C', bgColor: '#E3F0F8' },
  { id: 'circ3', name: '🔵', nameEn: 'Three Circles', nameFr: 'Trois Cercles', symbol: '③', category: 'circle', color: '#3A6B8C', bgColor: '#E3F0F8' },
  { id: 'circ4', name: '🔵', nameEn: 'Four Circles', nameFr: 'Quatre Cercles', symbol: '④', category: 'circle', color: '#3A6B8C', bgColor: '#E3F0F8' },
  { id: 'circ5', name: '🔵', nameEn: 'Five Circles', nameFr: 'Cinq Cercles', symbol: '⑤', category: 'circle', color: '#3A6B8C', bgColor: '#E3F0F8' },
  { id: 'circ6', name: '🔵', nameEn: 'Six Circles', nameFr: 'Six Cercles', symbol: '⑥', category: 'circle', color: '#3A6B8C', bgColor: '#E3F0F8' },
  { id: 'circ7', name: '🔵', nameEn: 'Seven Circles', nameFr: 'Sept Cercles', symbol: '⑦', category: 'circle', color: '#3A6B8C', bgColor: '#E3F0F8' },
  { id: 'circ8', name: '🔵', nameEn: 'Eight Circles', nameFr: 'Huit Cercles', symbol: '⑧', category: 'circle', color: '#3A6B8C', bgColor: '#E3F0F8' },
  { id: 'circ9', name: '🔵', nameEn: 'Nine Circles', nameFr: 'Neuf Cercles', symbol: '⑨', category: 'circle', color: '#3A6B8C', bgColor: '#E3F0F8' },
  // ── Winds (4)
  { id: 'wind_e', name: '東', nameEn: 'East Wind', nameFr: 'Vent Est', symbol: '東', category: 'wind', color: '#B8860B', bgColor: '#FFF8E1' },
  { id: 'wind_s', name: '南', nameEn: 'South Wind', nameFr: 'Vent Sud', symbol: '南', category: 'wind', color: '#B8860B', bgColor: '#FFF8E1' },
  { id: 'wind_w', name: '西', nameEn: 'West Wind', nameFr: 'Vent Ouest', symbol: '西', category: 'wind', color: '#B8860B', bgColor: '#FFF8E1' },
  { id: 'wind_n', name: '北', nameEn: 'North Wind', nameFr: 'Vent Nord', symbol: '北', category: 'wind', color: '#B8860B', bgColor: '#FFF8E1' },
  // ── Dragons (3)
  { id: 'drag_r', name: '中', nameEn: 'Red Dragon', nameFr: 'Dragon Rouge', symbol: '中', category: 'dragon', color: '#C62828', bgColor: '#FFEBEE' },
  { id: 'drag_g', name: '發', nameEn: 'Green Dragon', nameFr: 'Dragon Vert', symbol: '發', category: 'dragon', color: '#2E7D32', bgColor: '#E8F5E9' },
  { id: 'drag_w', name: '白', nameEn: 'White Dragon', nameFr: 'Dragon Blanc', symbol: '白', category: 'dragon', color: '#6B6B6B', bgColor: '#F5F5F5' },
  // ── Flowers (4) – each unique, appear once
  { id: 'flower1', name: '🌸', nameEn: 'Plum Blossom', nameFr: 'Fleur de Prunier', symbol: '🌸', category: 'flower', color: '#AD1457', bgColor: '#FCE4EC' },
  { id: 'flower2', name: '🌺', nameEn: 'Orchid', nameFr: 'Orchidée', symbol: '🌺', category: 'flower', color: '#C2185B', bgColor: '#FCE4EC' },
  { id: 'flower3', name: '🌼', nameEn: 'Chrysanthemum', nameFr: 'Chrysanthème', symbol: '🌼', category: 'flower', color: '#F57F17', bgColor: '#FFF8E1' },
  { id: 'flower4', name: '🎑', nameEn: 'Bamboo Flower', nameFr: 'Bambou fleuri', symbol: '🎑', category: 'flower', color: '#558B2F', bgColor: '#F1F8E9' },
  // ── Seasons (4) – each unique, appear once
  { id: 'season1', name: '🌞', nameEn: 'Summer', nameFr: 'Été', symbol: '🌞', category: 'season', color: '#F57F17', bgColor: '#FFF8E1' },
  { id: 'season2', name: '🍂', nameEn: 'Autumn', nameFr: 'Automne', symbol: '🍂', category: 'season', color: '#BF360C', bgColor: '#FBE9E7' },
  { id: 'season3', name: '❄️', nameEn: 'Winter', nameFr: 'Hiver', symbol: '❄️', category: 'season', color: '#0277BD', bgColor: '#E1F5FE' },
  { id: 'season4', name: '🌷', nameEn: 'Spring', nameFr: 'Printemps', symbol: '🌷', category: 'season', color: '#880E4F', bgColor: '#FCE4EC' },
];

export const TILE_TYPE_MAP: Record<string, TileTypeDefinition> =
  Object.fromEntries(TILE_TYPES.map(t => [t.id, t]));

// Types that appear 4× each (standard mahjong matching)
export const STANDARD_TILE_IDS = TILE_TYPES
  .filter(t => !['flower', 'season'].includes(t.category))
  .map(t => t.id);

// For easy levels, use a subset
export function getTileSubset(count: number): string[] {
  // count = number of distinct types needed (each ×4)
  const pool = [...STANDARD_TILE_IDS];
  return pool.slice(0, count);
}
