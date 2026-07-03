// ============================================================
// MIMI – Defeat Screen Overlay
// ============================================================

import { useGameStore } from '../store/gameStore';

export default function DefeatScreen() {
  const session = useGameStore(s => s.session);
  const restartLevel = useGameStore(s => s.restartLevel);
  const useShuffle = useGameStore(s => s.useShuffle);
  const exitLevel = useGameStore(s => s.exitLevel);

  if (!session) return null;

  const matchedTiles = session.tiles.filter(t => t.isMatched).length;
  const totalTiles = session.tiles.length;
  const progress = Math.round((matchedTiles / totalTiles) * 100);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(74,74,74,0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 300,
        padding: '0 16px 32px',
      }}
    >
      <div
        className="animate-slide-up"
        style={{
          width: '100%',
          maxWidth: 380,
          borderRadius: 28,
          background: 'rgba(250,247,242,0.98)',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 24px 16px',
            background: 'linear-gradient(135deg, #6B6B6B 0%, #4A4A4A 100%)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 44, marginBottom: 8 }}>😿</div>
          <h2 style={{ margin: 0, color: 'white', fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 600 }}>
            Plus de mouvements !
          </h2>
          <p style={{ margin: '6px 0 0', color: 'rgba(255,255,255,0.7)', fontSize: 13, fontFamily: 'Montserrat, sans-serif' }}>
            Niveau {session.levelConfig.id} • {progress}% complété
          </p>
        </div>

        {/* Progress */}
        <div style={{ padding: '20px 24px 8px' }}>
          <div style={{ height: 8, borderRadius: 4, background: 'rgba(212,175,55,0.12)' }}>
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #D4AF37, #B8860B)',
                borderRadius: 4,
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontSize: 12, color: '#6B6B6B', fontFamily: 'Montserrat, sans-serif' }}>
              {matchedTiles} paires retirées
            </span>
            <span style={{ fontSize: 12, color: '#B8860B', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
              {totalTiles - matchedTiles} restantes
            </span>
          </div>
        </div>

        {/* Message from MIMI */}
        <div
          style={{
            margin: '0 24px 16px',
            padding: '12px 16px',
            borderRadius: 12,
            background: 'rgba(212,175,55,0.08)',
            border: '1px solid rgba(212,175,55,0.15)',
            display: 'flex',
            gap: 10,
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 24 }}>🐱</span>
          <p style={{ margin: 0, fontSize: 13, color: '#4A4A4A', fontFamily: 'Montserrat, sans-serif', fontStyle: 'italic' }}>
            « Ne te décourage pas ! Chaque essai te rapproche de la maîtrise. »
          </p>
        </div>

        {/* Buttons */}
        <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={restartLevel}
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
              boxShadow: '0 4px 15px rgba(212,175,55,0.35)',
              letterSpacing: '0.03em',
            }}
          >
            🔄 Recommencer
          </button>

          {session.shufflesRemaining > 0 && (
            <button
              onClick={useShuffle}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 14,
                border: '1.5px solid rgba(82,183,136,0.4)',
                background: 'rgba(82,183,136,0.08)',
                color: '#2D7A5C',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              🔀 Utiliser un mélange ({session.shufflesRemaining})
            </button>
          )}

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
            ← Retour aux niveaux
          </button>
        </div>
      </div>
    </div>
  );
}
