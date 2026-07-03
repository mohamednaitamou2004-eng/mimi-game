// ============================================================
// MIMI – Tutorial Overlay
// ============================================================

import { useState } from 'react';

interface Props {
  onClose: () => void;
}

const STEPS = [
  {
    icon: '🎯',
    title: 'Bienvenue dans MIMI !',
    text: 'Votre mission : retirer toutes les tuiles du plateau en les associant par paires identiques.',
    subtext: 'Une expérience zen et relaxante vous attend.',
  },
  {
    icon: '🔓',
    title: 'Tuiles Libres',
    text: 'Une tuile est libre si aucune tuile ne la recouvre ET si au moins un de ses côtés (gauche ou droit) est dégagé.',
    subtext: 'Les tuiles bloquées apparaissent légèrement plus sombres.',
  },
  {
    icon: '✨',
    title: 'Former des Paires',
    text: 'Tapez sur deux tuiles identiques et libres pour les retirer du plateau.',
    subtext: 'Un clin d\'œil doré confirme chaque paire réussie !',
  },
  {
    icon: '💡',
    title: 'Outils d\'Aide',
    text: 'Utilisez les Indices pour trouver des paires, l\'Annulation pour revenir en arrière, ou le Mélange si vous êtes bloqué.',
    subtext: 'En mode Relax, ces outils sont illimités !',
  },
  {
    icon: '⭐',
    title: 'Système d\'Étoiles',
    text: 'Gagnez jusqu\'à 3 étoiles selon votre vitesse et l\'utilisation d\'indices. Débloquez les chattes en progressant !',
    subtext: 'MIMI elle-même vous attend au niveau 150...',
  },
  {
    icon: '🐱',
    title: 'Votre Collection',
    text: 'Déverrouillez TOUTOU, HBIBA, SISSA et la légendaire MIMI en complétant des niveaux.',
    subtext: 'Chaque chatte a un bonus unique qui améliore vos parties.',
  },
];

export default function TutorialOverlay({ onClose }: Props) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(74,74,74,0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 600,
        padding: '20px',
      }}
    >
      <div
        key={step}
        className="animate-fade-in-scale"
        style={{
          width: '100%',
          maxWidth: 340,
          borderRadius: 28,
          background: 'rgba(250,247,242,0.98)',
          border: '1.5px solid rgba(212,175,55,0.3)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
          overflow: 'hidden',
        }}
      >
        {/* Progress dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 6,
            padding: '16px 24px 0',
          }}
        >
          {STEPS.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === step ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: i <= step ? '#D4AF37' : 'rgba(212,175,55,0.2)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: '20px 24px' }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(184,134,11,0.1))',
              border: '1.5px solid rgba(212,175,55,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
              margin: '0 auto 16px',
            }}
          >
            {current.icon}
          </div>

          <h3 style={{ margin: '0 0 10px', fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: '#4A4A4A', textAlign: 'center' }}>
            {current.title}
          </h3>

          <p style={{ margin: '0 0 10px', fontFamily: 'Montserrat, sans-serif', fontSize: 14, color: '#4A4A4A', lineHeight: 1.6, textAlign: 'center' }}>
            {current.text}
          </p>

          <p style={{ margin: 0, fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: '#6B6B6B', textAlign: 'center', fontStyle: 'italic' }}>
            {current.subtext}
          </p>
        </div>

        {/* Buttons */}
        <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={() => {
              if (isLast) onClose();
              else setStep(s => s + 1);
            }}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 14,
              border: 'none',
              background: 'linear-gradient(135deg, #D4AF37, #B8860B)',
              color: 'white',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(212,175,55,0.35)',
              letterSpacing: '0.03em',
            }}
          >
            {isLast ? '🎮 Commencer à jouer !' : 'Suivant →'}
          </button>

          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#9A9A9A',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 13,
                cursor: 'pointer',
                padding: '8px',
              }}
            >
              ← Précédent
            </button>
          )}

          {!isLast && (
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#9A9A9A',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 12,
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              Passer le tutoriel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
