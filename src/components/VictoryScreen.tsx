// ============================================================
// MIMI – Victory Screen Overlay
// ============================================================

import { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { calculateScore } from '../engine/mahjongEngine';

export default function VictoryScreen() {
  const session = useGameStore(s => s.session);
  const setScreen = useGameStore(s => s.setScreen);
  const startLevel = useGameStore(s => s.startLevel);
  const saveData = useGameStore(s => s.saveData);

  const [starsVisible, setStarsVisible] = useState([false, false, false]);
  const [scoreVisible, setScoreVisible] = useState(false);
  const [rewardVisible, setRewardVisible] = useState(false);

  useEffect(() => {
    // Animate stars appearing one by one
    const t1 = setTimeout(() => setStarsVisible([true, false, false]), 300);
    const t2 = setTimeout(() => setStarsVisible([true, true, false]), 700);
    const t3 = setTimeout(() => setStarsVisible([true, true, true]), 1100);
    const t4 = setTimeout(() => setScoreVisible(true), 1400);
    const t5 = setTimeout(() => setRewardVisible(true), 1700);
    return () => { [t1,t2,t3,t4,t5].forEach(clearTimeout); };
  }, []);

  if (!session) return null;

  const elapsed = session.elapsedTime;
  const scoreResult = calculateScore(
    elapsed,
    session.levelConfig.targetTime,
    session.hintsUsed,
    session.shufflesUsed,
    session.comboCount,
    true,
  );

  const stars = scoreResult.stars;
  const coins = stars === 3
    ? session.levelConfig.rewards.coins3Stars
    : stars === 2
    ? session.levelConfig.rewards.coins2Stars
    : session.levelConfig.rewards.coins1Star;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(74,74,74,0.7)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 300,
        padding: '0 16px 32px',
      }}
    >
      {/* Confetti particles */}
      <VictoryParticles />

      <div
        className="animate-slide-up"
        style={{
          width: '100%',
          maxWidth: 380,
          borderRadius: 28,
          background: 'rgba(250,247,242,0.98)',
          border: '1px solid rgba(212,175,55,0.3)',
          boxShadow: '0 -20px 60px rgba(212,175,55,0.2), 0 20px 60px rgba(0,0,0,0.3)',
          overflow: 'hidden',
        }}
      >
        {/* Gold header */}
        <div
          style={{
            padding: '20px 24px 16px',
            background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: 12, fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.15em' }}>
            NIVEAU {session.levelConfig.id}
          </p>
          <h2 style={{ margin: '4px 0 0', color: 'white', fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700 }}>
            Félicitations ! 🎉
          </h2>
        </div>

        {/* Stars */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 12,
            padding: '20px 24px 8px',
          }}
        >
          {[1, 2, 3].map(s => (
            <span
              key={s}
              style={{
                fontSize: 44,
                filter: s <= stars
                  ? 'drop-shadow(0 0 8px rgba(212,175,55,0.7))'
                  : 'grayscale(1) opacity(0.3)',
                transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                transform: starsVisible[s - 1]
                  ? 'scale(1) rotate(0deg)'
                  : 'scale(0) rotate(-30deg)',
                display: 'inline-block',
              }}
            >
              ★
            </span>
          ))}
        </div>

        {/* Score details */}
        <div
          style={{
            padding: '8px 24px 16px',
            opacity: scoreVisible ? 1 : 0,
            transform: scoreVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.5s ease',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { label: 'Score', value: scoreResult.total.toLocaleString(), icon: '🏆' },
              { label: 'Temps', value: formatTime(elapsed), icon: '⏱' },
              { label: 'Bonus temps', value: `+${scoreResult.timeBonus}`, icon: '⚡' },
              { label: 'Combos', value: `×${session.comboCount}`, icon: '🔥' },
            ].map(item => (
              <div
                key={item.label}
                style={{
                  padding: '10px 12px',
                  borderRadius: 12,
                  background: 'rgba(212,175,55,0.08)',
                  border: '1px solid rgba(212,175,55,0.12)',
                }}
              >
                <p style={{ margin: 0, fontSize: 11, color: '#6B6B6B', fontFamily: 'Montserrat, sans-serif' }}>
                  {item.icon} {item.label}
                </p>
                <p style={{ margin: '2px 0 0', fontSize: 16, fontWeight: 700, color: '#4A4A4A', fontFamily: 'Montserrat, sans-serif' }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Coin reward */}
          <div
            style={{
              marginTop: 12,
              padding: '12px 16px',
              borderRadius: 12,
              background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(184,134,11,0.1) 100%)',
              border: '1px solid rgba(212,175,55,0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              opacity: rewardVisible ? 1 : 0,
              transform: rewardVisible ? 'scale(1)' : 'scale(0.9)',
              transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            <span style={{ fontSize: 28 }}>💰</span>
            <div>
              <p style={{ margin: 0, fontSize: 12, color: '#6B6B6B', fontFamily: 'Montserrat, sans-serif' }}>Récompense</p>
              <p style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#B8860B', fontFamily: 'Montserrat, sans-serif' }}>
                +{coins} pièces
              </p>
            </div>
            <span style={{ marginLeft: 'auto', fontSize: 12, color: '#B8860B', fontWeight: 600, fontFamily: 'Montserrat, sans-serif' }}>
              Total: {saveData.coins}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={() => startLevel(session.levelConfig.id + 1, session.mode)}
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
            Niveau suivant ›
          </button>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => startLevel(session.levelConfig.id, session.mode)}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 14,
                border: '1.5px solid rgba(212,175,55,0.25)',
                background: 'transparent',
                color: '#4A4A4A',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 500,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              🔄 Rejouer
            </button>
            <button
              onClick={() => setScreen('levelSelect')}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 14,
                border: '1.5px solid rgba(212,175,55,0.25)',
                background: 'transparent',
                color: '#4A4A4A',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 500,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              ☰ Niveaux
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function VictoryParticles() {
  const emojis = ['⭐', '✨', '🌟', '💛', '🏆', '🐱', '🌸'];
  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 1.5,
    duration: 1.5 + Math.random() * 1.5,
    emoji: emojis[i % emojis.length],
    size: 14 + Math.random() * 16,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: '-20px',
            fontSize: p.size,
            animation: `victoryFall ${p.duration}s ${p.delay}s ease-in forwards`,
          }}
        >
          {p.emoji}
        </div>
      ))}
      <style>{`
        @keyframes victoryFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
