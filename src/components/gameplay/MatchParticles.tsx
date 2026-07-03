// ============================================================
// MIMI – Match Particle Effect
// ============================================================

import { useEffect, useRef } from 'react';

interface Props {
  x: number;
  y: number;
  onDone: () => void;
}

export default function MatchParticles({ x, y, onDone }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(onDone, 700);
    return () => clearTimeout(timer);
  }, [onDone]);

  const particles = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    const distance = 40 + Math.random() * 30;
    const vx = Math.cos(angle) * distance;
    const vy = Math.sin(angle) * distance;
    const colors = ['#D4AF37', '#C9A34E', '#B8860B', '#FAF7F2', '#A8D8EA'];
    const color = colors[i % colors.length];
    return { vx, vy, color };
  });

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 0,
        height: 0,
        pointerEvents: 'none',
        zIndex: 500,
      }}
    >
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: p.color,
            animation: 'particleAnim 0.6s ease-out forwards',
            '--vx': `${p.vx}px`,
            '--vy': `${p.vy}px`,
          } as React.CSSProperties}
        />
      ))}

      {/* Gold sparkle */}
      <div
        style={{
          position: 'absolute',
          left: -16, top: -16,
          fontSize: 32,
          animation: 'fadeInScale 0.2s ease, fadeOut 0.4s 0.3s ease forwards',
          pointerEvents: 'none',
        }}
      >
        ✨
      </div>

      <style>{`
        @keyframes particleAnim {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--vx), var(--vy)) scale(0); opacity: 0; }
        }
        @keyframes fadeOut {
          to { opacity: 0; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
}
