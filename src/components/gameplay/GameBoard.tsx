// ============================================================
// MIMI – Game Board Component
// Renders all tiles in 2D pseudo-3D layout
// ============================================================

import { useMemo, useRef } from 'react';
import { Tile } from '../../types/game';
import TileComponent from './TileComponent';

interface Props {
  tiles: Tile[];
  onTileClick: (tile: Tile) => void;
  containerWidth: number;
  containerHeight: number;
}

export default function GameBoard({ tiles, onTileClick, containerWidth, containerHeight }: Props) {
  const boardRef = useRef<HTMLDivElement>(null);

  const { tileW, tileH, offsetX, offsetY } = useMemo(() => {
    if (tiles.length === 0) return { tileW: 52, tileH: 58, offsetX: 0, offsetY: 0 };

    const active = tiles.filter(t => !t.isMatched);
    if (active.length === 0) return { tileW: 52, tileH: 58, offsetX: 0, offsetY: 0 };

    const maxX = Math.max(...active.map(t => t.position.x)) + 1;
    const maxY = Math.max(...active.map(t => t.position.y)) + 1;
    const maxLayer = Math.max(...active.map(t => t.position.layer));

    // Available space
    const padding = 16;
    const availW = containerWidth - padding * 2;
    const availH = containerHeight - padding * 2;

    // Account for layer offsets
    const layerOffsetTotal = maxLayer * 4;

    // Calculate tile size to fit board
    const tileW = Math.min(
      Math.floor((availW - layerOffsetTotal) / maxX),
      Math.floor((availH - layerOffsetTotal) / maxY * 0.9),
      72,
    );
    const tileH = Math.round(tileW * 1.1);

    const boardW = maxX * tileW + layerOffsetTotal;
    const boardH = maxY * tileH + layerOffsetTotal;

    const offsetX = padding + (availW - boardW) / 2;
    const offsetY = padding + (availH - boardH) / 2;

    return { tileW, tileH, offsetX, offsetY };
  }, [tiles, containerWidth, containerHeight]);

  // Sort tiles: lower layers first, then by position
  const sortedTiles = useMemo(
    () =>
      [...tiles]
        .filter(t => !t.isMatched)
        .sort((a, b) => {
          if (a.position.layer !== b.position.layer) return a.position.layer - b.position.layer;
          if (a.position.y !== b.position.y) return a.position.y - b.position.y;
          return a.position.x - b.position.x;
        }),
    [tiles],
  );

  return (
    <div
      ref={boardRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {sortedTiles.map(tile => (
        <TileComponent
          key={tile.id}
          tile={tile}
          tileWidth={tileW}
          tileHeight={tileH}
          offsetX={offsetX}
          offsetY={offsetY}
          onClick={onTileClick}
        />
      ))}

      {/* Empty board message */}
      {sortedTiles.length === 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div style={{ fontSize: 48 }}>✨</div>
          <p style={{ color: '#D4AF37', fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 600 }}>
            Plateau vide !
          </p>
        </div>
      )}
    </div>
  );
}
