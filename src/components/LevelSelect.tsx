// ============================================================
// MIMI – Level Select Screen
// ============================================================

import { useGameStore } from '../store/gameStore';
import { generateLevelConfig } from '../engine/mahjongEngine';

const TOTAL_LEVELS = 200;
const DIFFICULTY_COLORS = ['', '#52B788', '#A8D8EA', '#D4AF37', '#E07B39', '#C62828'];
const DIFFICULTY_LABELS = ['', 'Facile', 'Facile', 'Moyen', 'Difficile', 'Expert'];

export default function LevelSelect() {
  const setScreen = useGameStore(s => s.setScreen);
  const startLevel = useGameStore(s => s.startLevel);
  const saveData = useGameStore(s => s.saveData);
  const maxUnlocked = saveData.currentLevel;

  const levels = Array.from({ length: TOTAL_LEVELS }, (_, i) => i + 1);

  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ background: 'linear-gradient(160deg, #FAF7F2 0%, #F0E6D3 100%)' }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 pt-12 pb-4"
        style={{ background: 'rgba(250,247,242,0.9)', borderBottom: '1px solid rgba(212,175,55,0.15)' }}
      >
        <button
          onClick={() => setScreen('menu')}
          className="flex items-center justify-center rounded-full"
          style={{
            width: 38, height: 38,
            background: 'rgba(212,175,55,0.12)',
            border: '1px solid rgba(212,175,55,0.2)',
            fontSize: 18, cursor: 'pointer', color: '#4A4A4A',
          }}
        >
          ‹
        </button>
        <h2
          className="font-playfair"
          style={{ fontSize: 22, fontWeight: 600, color: '#4A4A4A', flex: 1 }}
        >
          Niveaux
        </h2>
        <span
          className="font-montserrat"
          style={{ fontSize: 12, color: '#B8860B', fontWeight: 500 }}
        >
          {saveData.totalLevelsCompleted}/{TOTAL_LEVELS}
        </span>
      </div>

      {/* Mode selector */}
      <div className="flex gap-2 px-5 py-3" style={{ borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
        {[
          { label: 'Classique', icon: '🏆' },
          { label: 'Chronométré', icon: '⏱' },
        ].map((mode, i) => (
          <button
            key={mode.label}
            style={{
              padding: '6px 16px',
              borderRadius: 20,
              border: i === 0 ? 'none' : '1px solid rgba(212,175,55,0.25)',
              background: i === 0 ? 'linear-gradient(135deg, #D4AF37, #B8860B)' : 'transparent',
              color: i === 0 ? 'white' : '#6B6B6B',
              fontSize: 13, fontWeight: 500, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            <span>{mode.icon}</span>{mode.label}
          </button>
        ))}
      </div>

      {/* Level grid */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ padding: '16px 16px 32px' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 10,
          }}
        >
          {levels.map(lvl => {
            const progress = saveData.levelProgress[lvl];
            const stars = progress?.stars ?? 0;
            const isUnlocked = lvl <= maxUnlocked;
            const config = generateLevelConfig(lvl);
            const diffColor = DIFFICULTY_COLORS[config.difficulty];

            return (
              <LevelCell
                key={lvl}
                level={lvl}
                stars={stars}
                isUnlocked={isUnlocked}
                difficulty={config.difficulty}
                diffColor={diffColor}
                onClick={() => isUnlocked && startLevel(lvl, 'classic')}
              />
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div
        className="flex gap-4 justify-center py-3"
        style={{ background: 'rgba(250,247,242,0.9)', borderTop: '1px solid rgba(212,175,55,0.1)' }}
      >
        {[1, 2, 3, 4, 5].map(d => (
          <div key={d} className="flex items-center gap-1">
            <div style={{ width: 8, height: 8, borderRadius: 2, background: DIFFICULTY_COLORS[d] }} />
            <span style={{ fontSize: 10, color: '#6B6B6B' }}>{DIFFICULTY_LABELS[d]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface LevelCellProps {
  level: number;
  stars: number;
  isUnlocked: boolean;
  difficulty: number;
  diffColor: string;
  onClick: () => void;
}

function LevelCell({ level, stars, isUnlocked, diffColor, onClick }: LevelCellProps) {
  const isCompleted = stars > 0;

  return (
    <button
      onClick={onClick}
      style={{
        aspectRatio: '1',
        borderRadius: 12,
        border: isCompleted
          ? `1.5px solid ${diffColor}40`
          : isUnlocked
          ? '1.5px solid rgba(212,175,55,0.2)'
          : '1.5px solid rgba(0,0,0,0.06)',
        background: isCompleted
          ? `linear-gradient(135deg, ${diffColor}18, ${diffColor}08)`
          : isUnlocked
          ? 'rgba(250,247,242,0.9)'
          : 'rgba(220,220,220,0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        cursor: isUnlocked ? 'pointer' : 'not-allowed',
        position: 'relative',
        transition: 'all 0.15s ease',
        boxShadow: isCompleted ? `0 2px 8px ${diffColor}20` : '0 1px 4px rgba(0,0,0,0.05)',
      }}
    >
      {/* Level number */}
      <span
        style={{
          fontSize: level > 99 ? 10 : 13,
          fontWeight: 700,
          fontFamily: 'Montserrat, sans-serif',
          color: isUnlocked ? '#4A4A4A' : '#AAAAAA',
        }}
      >
        {isUnlocked ? level : '🔒'}
      </span>

      {/* Stars */}
      {isCompleted && (
        <div className="flex gap-0.5">
          {[1, 2, 3].map(s => (
            <span
              key={s}
              style={{ fontSize: 7, color: s <= stars ? '#D4AF37' : '#D4C3A3', opacity: s <= stars ? 1 : 0.4 }}
            >
              ★
            </span>
          ))}
        </div>
      )}

      {/* Difficulty indicator */}
      <div
        style={{
          position: 'absolute', top: 4, right: 4,
          width: 5, height: 5, borderRadius: '50%',
          background: isUnlocked ? diffColor : 'transparent',
          opacity: 0.7,
        }}
      />
    </button>
  );
}
