// ============================================================
// MIMI – Game HUD (Score, Timer, Controls)
// ============================================================

import { GameSession } from '../../types/game';
import { findValidPairs } from '../../engine/mahjongEngine';

interface Props {
  session: GameSession;
  onPause: () => void;
  onHint: () => void;
  onShuffle: () => void;
  onUndo: () => void;
  elapsed: number;
}

export default function GameHUD({ session, onPause, onHint, onShuffle, onUndo, elapsed }: Props) {
  const totalTiles = session.tiles.length;
  const matchedTiles = session.tiles.filter(t => t.isMatched).length;
  const remaining = totalTiles - matchedTiles;
  const progress = matchedTiles / totalTiles;

  const validPairs = findValidPairs(session.tiles).length;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const timeLimit = session.levelConfig.targetTime * 2; // Double for deadline (not hard limit)
  const timeRatio = Math.min(1, elapsed / timeLimit);
  const timeColor = timeRatio > 0.75 ? '#E07B39' : timeRatio > 0.5 ? '#D4AF37' : '#4A4A4A';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        paddingTop: 0,
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px 8px',
          background: 'rgba(250,247,242,0.95)',
          borderBottom: '1px solid rgba(212,175,55,0.12)',
        }}
      >
        {/* Pause button */}
        <button
          onClick={onPause}
          style={{
            width: 36, height: 36,
            borderRadius: 10,
            border: '1px solid rgba(212,175,55,0.2)',
            background: 'rgba(212,175,55,0.08)',
            fontSize: 15, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          ⏸
        </button>

        {/* Level info */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: 11, color: '#6B6B6B', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.1em' }}>
            NIVEAU {session.levelConfig.id}
          </p>
          <p style={{ margin: 0, fontSize: 13, color: '#4A4A4A', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
            {remaining} tuiles
            {validPairs === 0 && remaining > 0 && (
              <span style={{ color: '#E07B39', marginLeft: 6, fontSize: 11 }}>⚠️ Bloqué</span>
            )}
          </p>
        </div>

        {/* Timer */}
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0, fontSize: 11, color: '#6B6B6B', fontFamily: 'Montserrat, sans-serif' }}>Temps</p>
          <p style={{ margin: 0, fontSize: 16, fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: timeColor }}>
            {formatTime(elapsed)}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: 'rgba(212,175,55,0.12)', position: 'relative' }}>
        <div
          style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: 'linear-gradient(90deg, #D4AF37, #B8860B)',
            transition: 'width 0.4s ease',
            borderRadius: '0 2px 2px 0',
          }}
        />
      </div>

      {/* Tools bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '8px 12px',
          background: 'rgba(250,247,242,0.9)',
          borderBottom: '1px solid rgba(212,175,55,0.1)',
          gap: 8,
        }}
      >
        <ToolButton
          icon="💡"
          label="Indice"
          count={session.hintsRemaining}
          disabled={session.hintsRemaining <= 0 || validPairs === 0}
          onClick={onHint}
          color="#D4AF37"
        />
        <ToolButton
          icon="↩"
          label="Annuler"
          count={session.undosRemaining}
          disabled={session.undosRemaining <= 0 || session.moveHistory.length === 0}
          onClick={onUndo}
          color="#3A6B8C"
        />
        <ToolButton
          icon="🔀"
          label="Mélanger"
          count={session.shufflesRemaining}
          disabled={session.shufflesRemaining <= 0}
          onClick={onShuffle}
          color="#52B788"
        />

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            minWidth: 60,
          }}
        >
          <span style={{ fontSize: 11, color: '#6B6B6B', fontFamily: 'Montserrat, sans-serif' }}>
            Combos
          </span>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#D4AF37', fontFamily: 'Montserrat, sans-serif' }}>
            ×{session.comboCount}
          </span>
        </div>
      </div>
    </div>
  );
}

interface ToolBtnProps {
  icon: string;
  label: string;
  count: number;
  disabled: boolean;
  onClick: () => void;
  color: string;
}

function ToolButton({ icon, label, count, disabled, onClick, color }: ToolBtnProps) {
  const isRelax = count >= 999;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        padding: '6px 10px',
        borderRadius: 12,
        border: `1px solid ${disabled ? 'rgba(0,0,0,0.06)' : `${color}30`}`,
        background: disabled ? 'rgba(220,220,220,0.2)' : `${color}12`,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.15s ease',
        minWidth: 58,
      }}
    >
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span style={{ fontSize: 10, color: '#4A4A4A', fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
        {label}
      </span>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: disabled ? '#AAAAAA' : color,
          fontFamily: 'Montserrat, sans-serif',
        }}
      >
        {isRelax ? '∞' : count}
      </span>
    </button>
  );
}
