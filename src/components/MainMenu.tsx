// ============================================================
// MIMI – Main Menu Screen (Premium)
// ============================================================

import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import MimiLogo from './MimiLogo';
import DailyRewardModal, { useDailyRewardAvailable } from './DailyRewardModal';

export default function MainMenu() {
  const setScreen = useGameStore(s => s.setScreen);
  const startLevel = useGameStore(s => s.startLevel);
  const saveData = useGameStore(s => s.saveData);
  const [pressed, setPressed] = useState<string | null>(null);
  const [showDailyReward, setShowDailyReward] = useState(false);
  const isDailyAvailable = useDailyRewardAvailable();

  const handlePress = (key: string, action: () => void) => {
    setPressed(key);
    setTimeout(() => { setPressed(null); action(); }, 120);
  };

  const totalStars = Object.values(saveData.levelProgress).reduce((s, p) => s + (p.stars || 0), 0);
  const unlockedCats = saveData.unlockedCatIds.length;

  const mainButtons = [
    {
      label: 'Jouer',
      icon: '▶',
      sub: `Niveau ${saveData.currentLevel}`,
      action: () => setScreen('levelSelect'),
      highlight: true,
    },
    {
      label: 'Défi Quotidien',
      icon: '🌟',
      sub: isDailyAvailable ? '🎁 Récompense disponible !' : 'Complété aujourd\'hui',
      action: () => {
        if (isDailyAvailable) setShowDailyReward(true);
        else startLevel(getDailyLevelId(), 'daily');
      },
      badge: isDailyAvailable,
    },
    {
      label: 'Mode Relax',
      icon: '🌸',
      sub: 'Indices & Mélanges illimités',
      action: () => startLevel(saveData.currentLevel, 'relax'),
    },
    {
      label: 'Ma Collection',
      icon: '🐱',
      sub: `${unlockedCats}/4 chattes débloquées`,
      action: () => setScreen('collection'),
    },
  ];

  const secondaryButtons = [
    { label: 'Boutique', icon: '💎', action: () => setScreen('shop') },
    { label: 'Paramètres', icon: '⚙️', action: () => setScreen('settings') },
  ];

  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{
        background: 'linear-gradient(160deg, #FAF7F2 0%, #F0E6D3 50%, #E8D5B7 100%)',
        overflowY: 'auto',
      }}
    >
      {/* Ambient decorations */}
      <AmbientDecor />

      {/* Top stats strip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '48px 16px 12px',
          zIndex: 1,
        }}
      >
        <StatChip icon="⭐" value={totalStars} label="étoiles" color="#D4AF37" />
        <StatChip icon="🏆" value={saveData.totalLevelsCompleted} label="niveaux" color="#3A6B8C" />
        <StatChip icon="💰" value={saveData.coins} label="pièces" color="#B8860B" />
        <StatChip icon="🐱" value={unlockedCats} label="/4 chats" color="#52B788" />
      </div>

      {/* Logo & Title */}
      <div className="flex flex-col items-center py-6 animate-fade-in" style={{ zIndex: 1 }}>
        <div className="animate-float">
          <MimiLogo size={120} />
        </div>
        <h1
          className="font-playfair text-gold-gradient mt-4"
          style={{ fontSize: 50, fontWeight: 700, letterSpacing: '0.2em', lineHeight: 1 }}
        >
          MIMI
        </h1>
        <p
          className="font-montserrat"
          style={{
            color: '#6B6B6B',
            fontSize: 11,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            marginTop: 4,
          }}
        >
          Mahjong Solitaire
        </p>
      </div>

      {/* Main buttons */}
      <div style={{ flex: 1, padding: '0 20px 8px', display: 'flex', flexDirection: 'column', gap: 10, zIndex: 1 }}>
        {mainButtons.map((btn, i) => (
          <button
            key={btn.label}
            onClick={() => handlePress(btn.label, btn.action)}
            className="animate-slide-up"
            style={{
              animationDelay: `${i * 0.06}s`,
              width: '100%',
              padding: '14px 20px',
              borderRadius: 18,
              border: btn.highlight ? 'none' : '1.5px solid rgba(212,175,55,0.22)',
              background: btn.highlight
                ? 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)'
                : pressed === btn.label
                ? 'rgba(212,175,55,0.12)'
                : 'rgba(250,247,242,0.92)',
              color: btn.highlight ? 'white' : '#4A4A4A',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: btn.highlight ? 700 : 500,
              fontSize: 16,
              letterSpacing: '0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              cursor: 'pointer',
              transform: pressed === btn.label ? 'scale(0.97)' : 'scale(1)',
              transition: 'all 0.15s ease',
              boxShadow: btn.highlight
                ? '0 6px 24px rgba(212,175,55,0.4)'
                : '0 2px 10px rgba(0,0,0,0.06)',
              position: 'relative',
            }}
          >
            <span style={{ fontSize: 22 }}>{btn.icon}</span>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: btn.highlight ? 17 : 15 }}>{btn.label}</div>
              {btn.sub && (
                <div style={{
                  fontSize: 11,
                  color: btn.highlight ? 'rgba(255,255,255,0.75)' : '#6B6B6B',
                  fontWeight: 400,
                  marginTop: 1,
                }}>
                  {btn.sub}
                </div>
              )}
            </div>
            {btn.badge && (
              <div
                style={{
                  position: 'absolute',
                  top: -4,
                  right: 16,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#E07B39',
                  border: '2px solid #FAF7F2',
                  animation: 'float 1.5s ease-in-out infinite',
                }}
              />
            )}
            <span style={{ fontSize: 20, opacity: 0.5 }}>›</span>
          </button>
        ))}

        {/* Secondary row */}
        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          {secondaryButtons.map((btn, i) => (
            <button
              key={btn.label}
              onClick={() => handlePress(btn.label, btn.action)}
              className="animate-slide-up"
              style={{
                animationDelay: `${(mainButtons.length + i) * 0.06}s`,
                flex: 1,
                padding: '12px',
                borderRadius: 16,
                border: '1.5px solid rgba(212,175,55,0.2)',
                background: 'rgba(250,247,242,0.9)',
                color: '#4A4A4A',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 500,
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                cursor: 'pointer',
                transform: pressed === btn.label ? 'scale(0.96)' : 'scale(1)',
                transition: 'all 0.15s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}
            >
              <span style={{ fontSize: 18 }}>{btn.icon}</span>
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Version footer */}
      <div
        className="pb-6 text-center font-montserrat"
        style={{ color: '#A8A8A8', fontSize: 10, letterSpacing: '0.12em', zIndex: 1 }}
      >
        MIMI v1.0.0 — Mahjong Solitaire Premium
      </div>

      {/* Daily Reward Modal */}
      {showDailyReward && (
        <DailyRewardModal onClose={() => setShowDailyReward(false)} />
      )}
    </div>
  );
}

function getDailyLevelId(): number {
  const d = new Date();
  return ((d.getFullYear() * 365 + d.getMonth() * 31 + d.getDate()) % 200) + 1;
}

function StatChip({ icon, value, label, color }: { icon: string; value: number; label: string; color: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        padding: '6px 10px',
        borderRadius: 12,
        background: `${color}12`,
        border: `1px solid ${color}22`,
        minWidth: 60,
      }}
    >
      <span style={{ fontSize: 14 }}>{icon}</span>
      <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 700, color }}>{value}</span>
      <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, color: '#6B6B6B' }}>{label}</span>
    </div>
  );
}

function AmbientDecor() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div style={{
        position: 'absolute', top: -80, right: -80,
        width: 280, height: 280, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', bottom: 20, left: -60,
        width: 200, height: 200, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,216,234,0.15) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', top: '50%', right: -30,
        width: 120, height: 120, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
      }} />
      {/* Decorative paw prints */}
      <div style={{ position: 'absolute', top: '60%', right: '4%', fontSize: 20, opacity: 0.05, transform: 'rotate(15deg)' }}>🐾</div>
      <div style={{ position: 'absolute', top: '42%', left: '3%', fontSize: 14, opacity: 0.04, transform: 'rotate(-20deg)' }}>🐾</div>
      {/* Gold dots */}
      {[
        { top: '18%', right: '6%', size: 5 },
        { top: '28%', right: '12%', size: 3 },
        { bottom: '35%', left: '5%', size: 4 },
        { bottom: '25%', right: '8%', size: 3 },
        { top: '70%', left: '8%', size: 5 },
      ].map((d, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: d.top, right: d.right, bottom: d.bottom, left: d.left,
            width: d.size, height: d.size,
            borderRadius: '50%',
            background: '#D4AF37',
            opacity: 0.25,
          }}
        />
      ))}
    </div>
  );
}
