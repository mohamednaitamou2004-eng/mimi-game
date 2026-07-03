// ============================================================
// MIMI – Daily Reward Modal
// ============================================================

import { useState } from 'react';
import { useGameStore } from '../store/gameStore';

const DAILY_REWARDS = [
  { day: 1, coins: 50, icon: '💰' },
  { day: 2, coins: 75, icon: '💰' },
  { day: 3, coins: 100, icon: '💎' },
  { day: 4, coins: 100, icon: '💰' },
  { day: 5, coins: 150, icon: '💎' },
  { day: 6, coins: 150, icon: '💰' },
  { day: 7, coins: 300, icon: '👑', special: 'Semaine complète !' },
];

interface Props {
  onClose: () => void;
}

export default function DailyRewardModal({ onClose }: Props) {
  const saveData = useGameStore(s => s.saveData);
  const claimDailyReward = useGameStore(s => s.claimDailyReward);
  const [claimed, setClaimed] = useState(false);
  const [animating, setAnimating] = useState(false);

  const streak = saveData.dailyStreak;
  const rewardIndex = streak % 7;
  const reward = DAILY_REWARDS[rewardIndex];

  const handleClaim = () => {
    setAnimating(true);
    setTimeout(() => {
      claimDailyReward();
      setClaimed(true);
      setTimeout(onClose, 1500);
    }, 600);
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(74,74,74,0.8)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 500,
        padding: '20px',
      }}
    >
      <div
        className="animate-fade-in-scale"
        style={{
          width: '100%',
          maxWidth: 340,
          borderRadius: 28,
          background: 'rgba(250,247,242,0.98)',
          border: '1.5px solid rgba(212,175,55,0.3)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(212,175,55,0.15)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 24px 16px',
            background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <div style={{ fontSize: 44, marginBottom: 8, animation: 'float 2s ease-in-out infinite' }}>
            🌟
          </div>
          <h2 style={{ margin: 0, fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: 'white' }}>
            Récompense Quotidienne
          </h2>
          <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.8)', fontSize: 13, fontFamily: 'Montserrat, sans-serif' }}>
            Jour {streak + 1} • Série de {streak} jour{streak > 1 ? 's' : ''}
          </p>
        </div>

        {/* Weekly calendar */}
        <div style={{ padding: '16px 20px 8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
            {DAILY_REWARDS.map((r, i) => (
              <div
                key={r.day}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  padding: '6px 2px',
                  borderRadius: 8,
                  background: i < rewardIndex
                    ? 'rgba(82,183,136,0.15)'
                    : i === rewardIndex
                    ? 'rgba(212,175,55,0.15)'
                    : 'rgba(220,220,220,0.2)',
                  border: i === rewardIndex ? '1.5px solid rgba(212,175,55,0.4)' : '1px solid transparent',
                }}
              >
                <span style={{ fontSize: i === rewardIndex ? 16 : 13 }}>{i < rewardIndex ? '✅' : r.icon}</span>
                <span style={{ fontSize: 8, color: i === rewardIndex ? '#B8860B' : '#9A9A9A', fontFamily: 'Montserrat, sans-serif', fontWeight: i === rewardIndex ? 700 : 400 }}>
                  J{r.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's reward */}
        <div
          style={{
            margin: '8px 20px',
            padding: '16px',
            borderRadius: 16,
            background: 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(184,134,11,0.08))',
            border: '1px solid rgba(212,175,55,0.25)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 52,
              marginBottom: 8,
              transform: animating ? 'scale(1.3) rotate(10deg)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            {reward.icon}
          </div>
          <p style={{ margin: 0, fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, color: '#B8860B' }}>
            +{reward.coins} Pièces
          </p>
          {reward.special && (
            <p style={{ margin: '4px 0 0', fontSize: 12, color: '#52B788', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
              🎉 {reward.special}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div style={{ padding: '8px 20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={handleClaim}
            disabled={claimed}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 14,
              border: 'none',
              background: claimed
                ? 'linear-gradient(135deg, #52B788, #2D7A5C)'
                : 'linear-gradient(135deg, #D4AF37, #B8860B)',
              color: 'white',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: 15,
              cursor: claimed ? 'default' : 'pointer',
              boxShadow: '0 4px 15px rgba(212,175,55,0.35)',
              letterSpacing: '0.03em',
              transition: 'all 0.3s ease',
            }}
          >
            {claimed ? '✅ Réclamé !' : '🎁 Réclamer ma récompense'}
          </button>
          {!claimed && (
            <button
              onClick={onClose}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: 12,
                border: 'none',
                background: 'transparent',
                color: '#9A9A9A',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              Plus tard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Hook: check if daily reward is available
export function useDailyRewardAvailable() {
  const saveData = useGameStore(s => s.saveData);
  const lastClaim = saveData.dailyRewardLastClaim;
  const today = new Date().toDateString();
  return lastClaim !== today;
}
