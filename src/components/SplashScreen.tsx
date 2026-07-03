// ============================================================
// MIMI – Splash Screen (Premium Animated)
// ============================================================

import { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import MimiLogo from './MimiLogo';

export default function SplashScreen() {
  const setScreen = useGameStore(s => s.setScreen);
  const [phase, setPhase] = useState<'logo' | 'name' | 'done'>('logo');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('name'), 600);
    const t2 = setTimeout(() => setPhase('done'), 1800);
    const t3 = setTimeout(() => setScreen('menu'), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [setScreen]);

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(160deg, #FAF7F2 0%, #E8D5B7 40%, #D4C3A3 100%)',
      }}
    >
      {/* Ambient background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full opacity-20 animate-spin-slow"
          style={{
            width: 400, height: 400,
            top: -100, right: -100,
            background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full opacity-15"
          style={{
            width: 300, height: 300,
            bottom: -50, left: -80,
            background: 'radial-gradient(circle, #A8D8EA 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Logo */}
      <div
        style={{
          transition: 'all 0.8s cubic-bezier(0.34,1.56,0.64,1)',
          opacity: phase === 'logo' ? 0 : 1,
          transform: phase === 'logo' ? 'scale(0.5) translateY(20px)' : 'scale(1) translateY(0)',
        }}
      >
        <MimiLogo size={140} />
      </div>

      {/* Game title */}
      <div
        style={{
          marginTop: 24,
          transition: 'all 0.7s ease',
          transitionDelay: '0.2s',
          opacity: phase === 'name' || phase === 'done' ? 1 : 0,
          transform: phase === 'name' || phase === 'done' ? 'translateY(0)' : 'translateY(16px)',
        }}
      >
        <h1
          className="font-playfair text-gold-gradient tracking-widest"
          style={{ fontSize: 52, fontWeight: 700, letterSpacing: '0.25em' }}
        >
          MIMI
        </h1>
        <p
          className="text-center font-montserrat"
          style={{
            color: '#6B6B6B',
            fontSize: 13,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginTop: 4,
            transition: 'opacity 0.5s ease',
            transitionDelay: '0.4s',
            opacity: phase === 'done' ? 1 : 0,
          }}
        >
          Mahjong Solitaire
        </p>
      </div>

      {/* Loading dots */}
      <div
        className="flex gap-2 mt-12"
        style={{
          transition: 'opacity 0.5s ease',
          opacity: phase === 'done' ? 1 : 0,
        }}
      >
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: 6, height: 6,
              background: '#D4AF37',
              animation: `float 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
