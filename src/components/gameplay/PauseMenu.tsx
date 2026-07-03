// ============================================================
// MIMI – Pause Menu Overlay
// ============================================================

import { useGameStore } from '../../store/gameStore';

export default function PauseMenu() {
  const resumeGame = useGameStore(s => s.resumeGame);
  const restartLevel = useGameStore(s => s.restartLevel);
  const exitLevel = useGameStore(s => s.exitLevel);
  const session = useGameStore(s => s.session);

  if (!session || session.state !== 'paused') return null;

  const matchedTiles = session.tiles.filter(t => t.isMatched).length;
  const totalTiles = session.tiles.length;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(74,74,74,0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
        padding: '0 24px',
      }}
    >
      <div
        className="animate-fade-in-scale"
        style={{
          width: '100%',
          maxWidth: 320,
          borderRadius: 24,
          background: 'rgba(250,247,242,0.97)',
          border: '1px solid rgba(212,175,55,0.25)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 24px 16px',
            textAlign: 'center',
            borderBottom: '1px solid rgba(212,175,55,0.15)',
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 8 }}>⏸</div>
          <h2 style={{ margin: 0, fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 600, color: '#4A4A4A' }}>
            Pause
          </h2>
          <p style={{ margin: '6px 0 0', fontFamily: 'Montserrat, sans-serif', fontSize: 13, color: '#6B6B6B' }}>
            Niveau {session.levelConfig.id} • {matchedTiles}/{totalTiles} tuiles retirées
          </p>
        </div>

        {/* Progress during pause */}
        <div style={{ padding: '16px 24px' }}>
          <div style={{ height: 6, borderRadius: 3, background: 'rgba(212,175,55,0.12)' }}>
            <div
              style={{
                height: '100%',
                width: `${(matchedTiles / totalTiles) * 100}%`,
                background: 'linear-gradient(90deg, #D4AF37, #B8860B)',
                borderRadius: 3,
              }}
            />
          </div>
          <p style={{ margin: '8px 0 0', textAlign: 'center', fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: '#6B6B6B' }}>
            {Math.round((matchedTiles / totalTiles) * 100)}% complété
          </p>
        </div>

        {/* Buttons */}
        <div style={{ padding: '8px 24px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={resumeGame}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 14,
              border: 'none',
              background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
              color: 'white',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 4px 15px rgba(212,175,55,0.35)',
              letterSpacing: '0.03em',
            }}
          >
            ▶ Reprendre
          </button>

          <button
            onClick={restartLevel}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 14,
              border: '1.5px solid rgba(212,175,55,0.25)',
              background: 'rgba(250,247,242,0.9)',
              color: '#4A4A4A',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 500,
              fontSize: 14,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            🔄 Recommencer
          </button>

          <button
            onClick={exitLevel}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 14,
              border: 'none',
              background: 'transparent',
              color: '#6B6B6B',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 500,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            ← Quitter le niveau
          </button>
        </div>
      </div>
    </div>
  );
}
