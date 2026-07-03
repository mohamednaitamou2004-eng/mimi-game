// ============================================================
// MIMI – Shop Screen
// ============================================================

import { useState } from 'react';
import { useGameStore } from '../store/gameStore';

const SHOP_ITEMS = [
  {
    id: 'hints_3', icon: '💡', name: '+3 Indices', desc: 'Débloquez 3 indices pour vos prochains niveaux', price: 80, category: 'tools',
  },
  {
    id: 'undos_5', icon: '↩️', name: '+5 Annulations', desc: 'Annulez jusqu\'à 5 derniers mouvements', price: 60, category: 'tools',
  },
  {
    id: 'shuffles_3', icon: '🔀', name: '+3 Mélanges', desc: 'Réorganisez le plateau 3 fois', price: 100, category: 'tools',
  },
  {
    id: 'coins_sm', icon: '💰', name: '500 Pièces', desc: 'Pack de pièces — Trésor du débutant', price: 0.99, isPremium: true, category: 'coins',
  },
  {
    id: 'coins_md', icon: '💎', name: '1500 Pièces', desc: 'Pack de pièces — Coffre du joueur', price: 2.49, isPremium: true, category: 'coins',
  },
  {
    id: 'coins_lg', icon: '👑', name: '5000 Pièces', desc: 'Pack de pièces — Trésor royal', price: 4.99, isPremium: true, category: 'coins', highlight: true,
  },
  {
    id: 'no_ads', icon: '🌟', name: 'Sans Publicités', desc: 'Supprimez définitivement toutes les publicités', price: 1.99, isPremium: true, category: 'premium',
  },
  {
    id: 'premium', icon: '✨', name: 'MIMI Premium', desc: 'Pas de pubs · Indices illimités · Double pièces · Accès VIP', price: 3.99, isPremium: true, category: 'premium', highlight: true,
  },
];

type Category = 'all' | 'tools' | 'coins' | 'premium';

export default function ShopScreen() {
  const setScreen = useGameStore(s => s.setScreen);
  const saveData = useGameStore(s => s.saveData);
  const updateCoins = useGameStore(s => s.updateCoins);
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [purchasedId, setPurchasedId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const categories: { key: Category; label: string; icon: string }[] = [
    { key: 'all', label: 'Tout', icon: '🛍️' },
    { key: 'tools', label: 'Outils', icon: '⚙️' },
    { key: 'coins', label: 'Pièces', icon: '💰' },
    { key: 'premium', label: 'Premium', icon: '✨' },
  ];

  const filtered = SHOP_ITEMS.filter(
    item => activeCategory === 'all' || item.category === activeCategory,
  );

  const handlePurchase = (item: typeof SHOP_ITEMS[0]) => {
    if (!item.isPremium) {
      if (saveData.coins >= item.price) {
        updateCoins(-item.price);
        setPurchasedId(item.id);
        setShowSuccess(true);
        setTimeout(() => { setPurchasedId(null); setShowSuccess(false); }, 2000);
      }
    } else {
      // Simulate premium purchase
      setPurchasedId(item.id);
      setShowSuccess(true);
      setTimeout(() => { setPurchasedId(null); setShowSuccess(false); }, 2000);
    }
  };

  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ background: 'linear-gradient(160deg, #FAF7F2 0%, #F0E6D3 100%)' }}
    >
      {/* Header */}
      <div
        style={{
          padding: '48px 20px 16px',
          background: 'linear-gradient(135deg, #D4AF37, #B8860B)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', bottom: -30, left: -10, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
          <button
            onClick={() => setScreen('menu')}
            style={{
              width: 36, height: 36,
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.15)',
              fontSize: 18, cursor: 'pointer', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            ‹
          </button>
          <div>
            <h2 style={{ margin: 0, fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: 'white' }}>
              Boutique MIMI
            </h2>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: 12, fontFamily: 'Montserrat, sans-serif' }}>
              Enrichissez votre expérience
            </p>
          </div>

          {/* Coin display */}
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              borderRadius: 20,
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          >
            <span style={{ fontSize: 16 }}>💰</span>
            <span style={{ color: 'white', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 15 }}>
              {saveData.coins}
            </span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          padding: '12px 16px',
          background: 'rgba(250,247,242,0.95)',
          borderBottom: '1px solid rgba(212,175,55,0.1)',
          overflowX: 'auto',
        }}
      >
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            style={{
              padding: '7px 16px',
              borderRadius: 20,
              border: activeCategory === cat.key ? 'none' : '1px solid rgba(212,175,55,0.25)',
              background: activeCategory === cat.key
                ? 'linear-gradient(135deg, #D4AF37, #B8860B)'
                : 'transparent',
              color: activeCategory === cat.key ? 'white' : '#4A4A4A',
              fontSize: 13,
              fontWeight: 500,
              fontFamily: 'Montserrat, sans-serif',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <span>{cat.icon}</span>{cat.label}
          </button>
        ))}
      </div>

      {/* Items */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px 16px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {filtered.map(item => (
          <ShopItem
            key={item.id}
            item={item}
            coins={saveData.coins}
            onPurchase={() => handlePurchase(item)}
            purchased={purchasedId === item.id}
          />
        ))}
      </div>

      {/* Success toast */}
      {showSuccess && (
        <div
          className="animate-slide-up"
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '12px 24px',
            borderRadius: 16,
            background: 'linear-gradient(135deg, #52B788, #2D7A5C)',
            color: 'white',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600,
            fontSize: 14,
            boxShadow: '0 6px 20px rgba(82,183,136,0.4)',
            zIndex: 400,
            whiteSpace: 'nowrap',
          }}
        >
          ✅ Achat réussi !
        </div>
      )}
    </div>
  );
}

// ── Shop Item Component
function ShopItem({
  item,
  coins,
  onPurchase,
  purchased,
}: {
  item: typeof SHOP_ITEMS[0];
  coins: number;
  onPurchase: () => void;
  purchased: boolean;
}) {
  const canAfford = item.isPremium || coins >= item.price;

  return (
    <div
      style={{
        borderRadius: 16,
        border: item.highlight
          ? '1.5px solid rgba(212,175,55,0.4)'
          : '1px solid rgba(212,175,55,0.15)',
        background: item.highlight
          ? 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(184,134,11,0.05) 100%)'
          : 'rgba(250,247,242,0.9)',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        boxShadow: item.highlight ? '0 4px 15px rgba(212,175,55,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Best value badge */}
      {item.highlight && (
        <div
          style={{
            position: 'absolute',
            top: 8, right: 8,
            padding: '2px 8px',
            borderRadius: 6,
            background: 'linear-gradient(135deg, #D4AF37, #B8860B)',
            color: 'white',
            fontSize: 9,
            fontWeight: 700,
            fontFamily: 'Montserrat, sans-serif',
            letterSpacing: '0.05em',
          }}
        >
          MEILLEUR CHOIX
        </div>
      )}

      {/* Icon */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: item.highlight
            ? 'linear-gradient(135deg, #D4AF37, #B8860B)'
            : 'rgba(212,175,55,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 26,
          flexShrink: 0,
          boxShadow: item.highlight ? '0 4px 12px rgba(212,175,55,0.3)' : 'none',
        }}
      >
        {item.icon}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4 style={{ margin: 0, fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 700, color: '#4A4A4A' }}>
          {item.name}
        </h4>
        <p style={{ margin: '2px 0 0', fontSize: 12, color: '#6B6B6B', fontFamily: 'Montserrat, sans-serif', lineHeight: 1.4 }}>
          {item.desc}
        </p>
      </div>

      {/* Price & buy button */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: item.isPremium ? '#B8860B' : canAfford ? '#4A4A4A' : '#E07B39',
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          {item.isPremium ? `${item.price}€` : `${item.price} 💰`}
        </span>
        <button
          onClick={onPurchase}
          style={{
            padding: '7px 14px',
            borderRadius: 10,
            border: 'none',
            background: purchased
              ? '#52B788'
              : canAfford
              ? 'linear-gradient(135deg, #D4AF37, #B8860B)'
              : 'rgba(220,220,220,0.5)',
            color: purchased || canAfford ? 'white' : '#9A9A9A',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600,
            fontSize: 12,
            cursor: canAfford ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
            boxShadow: canAfford && !purchased ? '0 2px 8px rgba(212,175,55,0.3)' : 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {purchased ? '✅ Acheté' : item.isPremium ? 'Acheter' : canAfford ? 'Acheter' : 'Insuffisant'}
        </button>
      </div>
    </div>
  );
}
