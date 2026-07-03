// ============================================================
// MIMI – Gameplay Background (Decorative elements)
// ============================================================

interface Props {
  mode: string;
}

export default function GameBackground({ mode }: Props) {
  const bgColors = {
    classic: 'linear-gradient(160deg, #FAF7F2 0%, #F0E6D3 60%, #E8D5B7 100%)',
    relax: 'linear-gradient(160deg, #FAF7F2 0%, #E8F5E9 60%, #DCEDC8 100%)',
    timed: 'linear-gradient(160deg, #FAF7F2 0%, #FFF3E0 60%, #FFE0B2 100%)',
    daily: 'linear-gradient(160deg, #FAF7F2 0%, #E8EAF6 60%, #D1C4E9 100%)',
  };

  const bg = bgColors[mode as keyof typeof bgColors] || bgColors.classic;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: bg,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Corner decorations */}
      <div style={{
        position: 'absolute',
        top: -40,
        right: -40,
        width: 160,
        height: 160,
        borderRadius: '50%',
        background: 'rgba(212,175,55,0.06)',
        border: '1px solid rgba(212,175,55,0.08)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: -60,
        left: -40,
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'rgba(168,216,234,0.08)',
      }} />

      {/* Subtle pattern dots */}
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: '#D4AF37',
            opacity: 0.08,
            left: `${(i * 37 + 5) % 90}%`,
            top: `${(i * 53 + 10) % 85}%`,
          }}
        />
      ))}

      {/* Paw prints (very subtle) */}
      {[
        { x: '5%', y: '20%', rot: 15, op: 0.04 },
        { x: '88%', y: '40%', rot: -20, op: 0.035 },
        { x: '8%', y: '75%', rot: 10, op: 0.04 },
        { x: '85%', y: '80%', rot: -15, op: 0.03 },
      ].map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            fontSize: 28,
            opacity: p.op,
            transform: `rotate(${p.rot}deg)`,
          }}
        >
          🐾
        </div>
      ))}
    </div>
  );
}
