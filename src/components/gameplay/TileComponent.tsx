// ============================================================
// MIMI – Tile Component (Premium 2D Tile Rendering)
// ============================================================

import { Tile } from '../../types/game';
import { TILE_TYPE_MAP } from '../../data/tileTypes';

interface Props {
  tile: Tile;
  tileWidth: number;
  tileHeight: number;
  offsetX: number;
  offsetY: number;
  onClick: (tile: Tile) => void;
}

const LAYER_OFFSET_X = 3;
const LAYER_OFFSET_Y = 3;

export default function TileComponent({ tile, tileWidth, tileHeight, offsetX, offsetY, onClick }: Props) {
  const def = TILE_TYPE_MAP[tile.type];
  const layer = tile.position.layer;

  // Visual position with layer offset (3D stacking effect)
  const x = offsetX + tile.position.x * tileWidth - layer * LAYER_OFFSET_X;
  const y = offsetY + tile.position.y * tileHeight - layer * LAYER_OFFSET_Y;

  const isEmoji = def?.symbol.length > 1 || def?.symbol.match(/\p{Emoji}/u);

  const shadowClass =
    layer >= 3 ? 'tile-shadow-layer-3' :
    layer >= 2 ? 'tile-shadow-layer-2' :
    'tile-shadow-layer';

  let className = `tile ${shadowClass}`;
  if (tile.isSelected) className += ' tile-selected';
  else if (tile.isHinted) className += ' tile-hinted';
  if (tile.isFree && !tile.isSelected) className += ' tile-free';
  else if (!tile.isFree) className += ' tile-blocked';

  return (
    <div
      className={className}
      onClick={() => onClick(tile)}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: tileWidth - 2,
        height: tileHeight - 2,
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        // Background gradient based on layer and state
        background: tile.isSelected
          ? 'linear-gradient(145deg, #FFF9E8 0%, #FFF0C0 100%)'
          : tile.isHinted
          ? 'linear-gradient(145deg, #FFF8D6 0%, #FFEDAA 100%)'
          : !tile.isFree
          ? 'linear-gradient(145deg, #E0DDD8 0%, #D4D0CA 100%)'
          : `linear-gradient(145deg, ${def?.bgColor || '#FAF7F2'} 0%, #EDE6DA 100%)`,
        // Border
        border: tile.isSelected
          ? '1.5px solid #D4AF37'
          : tile.isHinted
          ? '1.5px solid rgba(212,175,55,0.7)'
          : '1px solid rgba(212,175,55,0.18)',
        // Z-index (higher layer = on top, selected always on top)
        zIndex: tile.isSelected ? 100 + layer : 10 + layer,
        // Opacity for blocked tiles
        opacity: tile.isMatched ? 0 : !tile.isFree ? 0.72 : 1,
        pointerEvents: tile.isMatched ? 'none' : 'auto',
        cursor: tile.isFree && !tile.isMatched ? 'pointer' : 'default',
        transition: tile.isSelected ? 'none' : 'box-shadow 0.2s ease, transform 0.15s ease',
      }}
    >
      {/* Layer shadow bar (3D effect) */}
      {layer > 0 && (
        <div
          style={{
            position: 'absolute',
            bottom: -LAYER_OFFSET_Y * layer,
            right: -LAYER_OFFSET_X * layer,
            width: '100%',
            height: '100%',
            borderRadius: 6,
            background: 'rgba(0,0,0,0.12)',
            zIndex: -1,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Top highlight bar */}
      <div
        style={{
          position: 'absolute',
          top: 2, left: 4, right: 4,
          height: 2,
          borderRadius: 1,
          background: 'rgba(255,255,255,0.6)',
          pointerEvents: 'none',
        }}
      />

      {/* Tile symbol */}
      <span
        style={{
          fontSize: isEmoji ? tileWidth * 0.38 : tileWidth * 0.42,
          lineHeight: 1,
          color: !tile.isFree ? '#9A9A9A' : def?.color || '#4A4A4A',
          userSelect: 'none',
          pointerEvents: 'none',
          filter: tile.isSelected ? 'drop-shadow(0 0 4px rgba(212,175,55,0.5))' : 'none',
        }}
      >
        {def?.symbol || '?'}
      </span>

      {/* Category indicator (small dot) */}
      {tile.isFree && (
        <div
          style={{
            position: 'absolute',
            bottom: 2, right: 3,
            width: 3, height: 3,
            borderRadius: '50%',
            background: def?.color || '#D4AF37',
            opacity: 0.4,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Gold shine on selected */}
      {tile.isSelected && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 6,
            background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}
