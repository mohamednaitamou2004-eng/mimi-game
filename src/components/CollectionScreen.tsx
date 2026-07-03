// ============================================================
// MIMI – Collection Screen (Cat Cards Gallery)
// ============================================================

import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { CAT_CARDS } from '../data/catCards';
import { CatCard } from '../types/game';
import CatIllustration from './CatIllustration';

const RARITY_COLORS = {
  common: '#6B6B6B',
  rare: '#3A6B8C',
  legendary: '#D4AF37',
};

const RARITY_LABELS = {
  common: 'Commun',
  rare: 'Rare',
  legendary: '✨ Légendaire',
};

const CAT_ANIMATIONS = {
  toutou: '🐾 Petit bond',
  hbiba: '🌸 Hochement doux',
  sissa: '😸 Grand sourire',
  mimi: '✨ Rotation gracieuse',
};

export default function CollectionScreen() {
  const setScreen = useGameStore(s => s.setScreen);
  const saveData = useGameStore(s => s.saveData);
  const [selectedCat, setSelectedCat] = useState<CatCard | null>(null);
  const [flipped, setFlipped] = useState(false);

  const unlockedIds = saveData.unlockedCatIds;
  const totalCompleted = saveData.totalLevelsCompleted;

  const cats = CAT_CARDS.map(c => ({
    ...c,
    isUnlocked: unlockedIds.includes(c.id),
  }));

  const handleCatClick = (cat: CatCard) => {
    setSelectedCat(cat);
    setFlipped(false);
  };

  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ background: 'linear-gradient(160deg, #FAF7F2 0%, #F0E6D3 100%)' }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '48px 20px 16px',
          background: 'rgba(250,247,242,0.95)',
          borderBottom: '1px solid rgba(212,175,55,0.15)',
        }}
      >
        <button
          onClick={() => setScreen('menu')}
          style={{
            width: 38, height: 38,
            borderRadius: 10,
            border: '1px solid rgba(212,175,55,0.2)',
            background: 'rgba(212,175,55,0.08)',
            fontSize: 20, cursor: 'pointer', color: '#4A4A4A',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          ‹
        </button>
        <div>
          <h2 style={{ margin: 0, fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 600, color: '#4A4A4A' }}>
            Ma Collection
          </h2>
          <p style={{ margin: 0, fontSize: 12, color: '#B8860B', fontFamily: 'Montserrat, sans-serif' }}>
            {unlockedIds.length}/{cats.length} chattes débloquées
          </p>
        </div>
      </div>

      {/* Progress summary */}
      <div
        style={{
          margin: '16px 16px 0',
          padding: '12px 16px',
          borderRadius: 14,
          background: 'rgba(212,175,55,0.08)',
          border: '1px solid rgba(212,175,55,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span style={{ fontSize: 24 }}>🏆</span>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 12, color: '#6B6B6B', fontFamily: 'Montserrat, sans-serif' }}>
            Niveaux complétés
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'rgba(212,175,55,0.15)' }}>
              <div
                style={{
                  height: '100%',
                  width: `${Math.min(100, (totalCompleted / 150) * 100)}%`,
                  background: 'linear-gradient(90deg, #D4AF37, #B8860B)',
                  borderRadius: 2,
                }}
              />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#B8860B', fontFamily: 'Montserrat, sans-serif' }}>
              {totalCompleted}/150
            </span>
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 14,
          alignContent: 'start',
        }}
      >
        {cats.map(cat => (
          <CatCardCell
            key={cat.id}
            cat={cat}
            totalCompleted={totalCompleted}
            onClick={() => handleCatClick(cat)}
          />
        ))}
      </div>

      {/* Cat detail modal */}
      {selectedCat && (
        <CatDetailModal
          cat={{ ...selectedCat, isUnlocked: unlockedIds.includes(selectedCat.id) }}
          flipped={flipped}
          onFlip={() => setFlipped(!flipped)}
          onClose={() => setSelectedCat(null)}
          totalCompleted={totalCompleted}
        />
      )}
    </div>
  );
}

// ── Cat Card Cell
function CatCardCell({
  cat,
  totalCompleted,
  onClick,
}: {
  cat: CatCard & { isUnlocked: boolean };
  totalCompleted: number;
  onClick: () => void;
}) {
  const progress = Math.min(1, totalCompleted / cat.unlockLevel);
  const rarityColor = RARITY_COLORS[cat.rarity];

  return (
    <button
      onClick={onClick}
      style={{
        borderRadius: 18,
        border: cat.isUnlocked
          ? `1.5px solid ${rarityColor}40`
          : '1.5px solid rgba(0,0,0,0.06)',
        background: cat.isUnlocked
          ? `linear-gradient(145deg, ${cat.colorPrimary}20, ${cat.colorSecondary}15)`
          : 'rgba(220,220,220,0.3)',
        padding: '16px 12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
        boxShadow: cat.isUnlocked ? `0 4px 15px ${rarityColor}15` : '0 2px 6px rgba(0,0,0,0.05)',
      }}
    >
      {/* Rarity badge */}
      <div
        style={{
          position: 'absolute',
          top: 8, right: 8,
          padding: '2px 8px',
          borderRadius: 6,
          background: cat.isUnlocked ? rarityColor : 'rgba(180,180,180,0.5)',
          color: 'white',
          fontSize: 9,
          fontWeight: 700,
          fontFamily: 'Montserrat, sans-serif',
          letterSpacing: '0.05em',
        }}
      >
        {RARITY_LABELS[cat.rarity]}
      </div>

      {/* Cat illustration */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 20,
          background: cat.isUnlocked
            ? `linear-gradient(145deg, ${cat.colorPrimary}30, ${cat.colorSecondary}20)`
            : 'rgba(200,200,200,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: cat.isUnlocked ? `0 4px 12px ${rarityColor}25` : 'none',
          overflow: 'hidden',
        }}
      >
        <CatIllustration catId={cat.id} size={72} isLocked={!cat.isUnlocked} />
      </div>

      {/* Name */}
      <h3
        style={{
          margin: 0,
          fontFamily: 'Playfair Display, serif',
          fontSize: 18,
          fontWeight: 700,
          color: cat.isUnlocked ? '#4A4A4A' : '#9A9A9A',
          letterSpacing: '0.05em',
        }}
      >
        {cat.name}
      </h3>

      {/* Description preview */}
      <p
        style={{
          margin: 0,
          fontSize: 11,
          color: cat.isUnlocked ? '#6B6B6B' : '#9A9A9A',
          fontFamily: 'Montserrat, sans-serif',
          textAlign: 'center',
          lineHeight: 1.4,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {cat.isUnlocked ? cat.description : cat.unlockCondition}
      </p>

      {/* Progress bar (if locked) */}
      {!cat.isUnlocked && (
        <div style={{ width: '100%' }}>
          <div style={{ height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.08)' }}>
            <div
              style={{
                height: '100%',
                width: `${progress * 100}%`,
                background: 'linear-gradient(90deg, #D4AF37, #B8860B)',
                borderRadius: 2,
              }}
            />
          </div>
          <p style={{ margin: '4px 0 0', fontSize: 10, color: '#9A9A9A', textAlign: 'center', fontFamily: 'Montserrat, sans-serif' }}>
            Niveau {Math.min(totalCompleted, cat.unlockLevel)}/{cat.unlockLevel}
          </p>
        </div>
      )}
    </button>
  );
}

// ── Cat Detail Modal
function CatDetailModal({
  cat,
  flipped,
  onFlip,
  onClose,
  totalCompleted,
}: {
  cat: CatCard & { isUnlocked: boolean };
  flipped: boolean;
  onFlip: () => void;
  onClose: () => void;
  totalCompleted: number;
}) {
  const rarityColor = RARITY_COLORS[cat.rarity];

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
        padding: '20px 16px',
      }}
      onClick={onClose}
    >
      <div
        className="animate-fade-in-scale"
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 340,
          borderRadius: 24,
          background: 'rgba(250,247,242,0.98)',
          border: `1.5px solid ${rarityColor}30`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.25), 0 0 30px ${rarityColor}20`,
          overflow: 'hidden',
        }}
      >
        {/* Card header with gradient */}
        <div
          style={{
            padding: '24px',
            background: `linear-gradient(145deg, ${cat.colorPrimary}30, ${cat.colorSecondary}20)`,
            textAlign: 'center',
            borderBottom: `1px solid ${rarityColor}15`,
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 25,
              background: `linear-gradient(145deg, ${cat.colorPrimary}25, ${cat.colorSecondary}15)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px',
              boxShadow: cat.isUnlocked ? `0 8px 25px ${rarityColor}35` : 'none',
              cursor: cat.isUnlocked ? 'pointer' : 'default',
              transition: 'transform 0.3s ease',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
              overflow: 'hidden',
            }}
            onClick={cat.isUnlocked ? onFlip : undefined}
          >
            <CatIllustration catId={cat.id} size={90} animate={!flipped && cat.isUnlocked} isLocked={!cat.isUnlocked} />
          </div>

          <div
            style={{
              display: 'inline-block',
              padding: '3px 12px',
              borderRadius: 8,
              background: rarityColor,
              color: 'white',
              fontSize: 10,
              fontWeight: 700,
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '0.1em',
              marginBottom: 8,
            }}
          >
            {RARITY_LABELS[cat.rarity]}
          </div>

          <h2 style={{ margin: '0 0 4px', fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#4A4A4A', letterSpacing: '0.1em' }}>
            {cat.name}
          </h2>
        </div>

        {/* Details */}
        <div style={{ padding: '16px 20px 20px' }}>
          <p style={{ margin: '0 0 12px', fontSize: 14, color: '#4A4A4A', fontFamily: 'Montserrat, sans-serif', lineHeight: 1.6, fontStyle: 'italic' }}>
            {cat.isUnlocked ? cat.descriptionLong : cat.description}
          </p>

          {cat.isUnlocked && cat.bonusDescription && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: 10,
                background: 'rgba(212,175,55,0.08)',
                border: '1px solid rgba(212,175,55,0.2)',
                marginBottom: 12,
                display: 'flex',
                gap: 8,
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: 18 }}>🎁</span>
              <div>
                <p style={{ margin: 0, fontSize: 10, color: '#6B6B6B', fontFamily: 'Montserrat, sans-serif' }}>Bonus spécial</p>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#B8860B', fontFamily: 'Montserrat, sans-serif' }}>
                  {cat.bonusDescription}
                </p>
              </div>
            </div>
          )}

          {!cat.isUnlocked && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: '#6B6B6B', fontFamily: 'Montserrat, sans-serif' }}>Progression</span>
                <span style={{ fontSize: 12, color: '#B8860B', fontWeight: 600, fontFamily: 'Montserrat, sans-serif' }}>
                  {Math.min(totalCompleted, cat.unlockLevel)}/{cat.unlockLevel}
                </span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: 'rgba(212,175,55,0.12)' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min(100, (totalCompleted / cat.unlockLevel) * 100)}%`,
                    background: 'linear-gradient(90deg, #D4AF37, #B8860B)',
                    borderRadius: 3,
                  }}
                />
              </div>
              <p style={{ margin: '6px 0 0', fontSize: 12, color: '#6B6B6B', fontFamily: 'Montserrat, sans-serif' }}>
                🔓 {cat.unlockCondition}
              </p>
            </div>
          )}

          {cat.isUnlocked && (
            <p style={{ margin: '0 0 12px', fontSize: 11, color: '#9A9A9A', fontFamily: 'Montserrat, sans-serif', textAlign: 'center' }}>
              Animation : {CAT_ANIMATIONS[cat.name.toLowerCase() as keyof typeof CAT_ANIMATIONS] || '✨'}
              {' '}• Tapez sur l'avatar pour la voir
            </p>
          )}

          <button
            onClick={onClose}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 12,
              border: 'none',
              background: 'linear-gradient(135deg, #D4AF37, #B8860B)',
              color: 'white',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(212,175,55,0.3)',
            }}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
