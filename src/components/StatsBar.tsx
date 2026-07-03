// ============================================================
// MIMI – Stats Bar Component (Header for Menu)
// ============================================================

import { useGameStore } from '../store/gameStore';
import CatIllustration from './CatIllustration';

export default function StatsBar() {
  const saveData = useGameStore(s => s.saveData);
  const setScreen = useGameStore(s => s.setScreen);

  const unlockedCats = saveData.unlockedCatIds;
  const latestCatId = unlockedCats[unlockedCats.length - 1];
  const totalStars = Object.values(saveData.levelProgress).reduce((sum, p) => sum + (p.stars || 0), 0);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        padding: '8px 16px',
        background: 'rgba(250,247,242,0.9)',
        borderBottom: '1px solid rgba(212,175,55,0.12)',
      }}
    >
      {/* Cat mascot */}
      <button
        onClick={() => setScreen('collection')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <div style={{ width: 36, height: 36 }}>
          {latestCatId ? (
            <CatIllustration catId={latestCatId} size={36} />
          ) : (
            <span style={{ fontSize: 28 }}>😺</span>
          )}
        </div>
        <span style={{ fontSize: 10, color: '#6B6B6B', fontFamily: 'Montserrat, sans-serif' }}>
          {unlockedCats.length}/4
          <br />chats
        </span>
      </button>

      {/* Stars count */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 14, color: '#D4AF37' }}>★</span>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 700, color: '#B8860B' }}>
          {totalStars}
        </span>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, color: '#6B6B6B' }}>étoiles</span>
      </div>

      {/* Coins */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 14 }}>💰</span>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 700, color: '#B8860B' }}>
          {saveData.coins}
        </span>
      </div>

      {/* Level */}
      <div
        style={{
          padding: '4px 10px',
          borderRadius: 12,
          background: 'linear-gradient(135deg, #D4AF37, #B8860B)',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', fontFamily: 'Montserrat, sans-serif' }}>Niv.</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: 'white', fontFamily: 'Montserrat, sans-serif' }}>
          {saveData.currentLevel}
        </span>
      </div>
    </div>
  );
}
