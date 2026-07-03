// ============================================================
// MIMI – Cat SVG Illustrations
// All 4 cats rendered as SVG for crisp display at any size
// ============================================================

interface Props {
  catId: number;
  size?: number;
  animate?: boolean;
  isLocked?: boolean;
}

export default function CatIllustration({ catId, size = 80, animate = false, isLocked = false }: Props) {
  if (isLocked) {
    return <LockedCat size={size} />;
  }
  switch (catId) {
    case 1: return <ToutouSVG size={size} animate={animate} />;
    case 2: return <HbibaSVG size={size} animate={animate} />;
    case 3: return <SissaSVG size={size} animate={animate} />;
    case 4: return <MimiSVG size={size} animate={animate} />;
    default: return <ToutouSVG size={size} animate={animate} />;
  }
}

// ── Locked cat placeholder
function LockedCat({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="48" fill="rgba(180,180,180,0.2)" stroke="rgba(180,180,180,0.3)" strokeWidth="1" />
      <text x="50" y="58" textAnchor="middle" fontSize="36" fill="rgba(150,150,150,0.6)">🔒</text>
    </svg>
  );
}

// ── TOUTOU – Small white cat with grey spots
function ToutouSVG({ size, animate }: { size: number; animate: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={animate ? { animation: 'float 2s ease-in-out infinite' } : {}}
    >
      {/* Head */}
      <ellipse cx="50" cy="55" rx="32" ry="30" fill="#F5F5F5" />
      {/* Ear left */}
      <polygon points="24,45 18,22 34,36" fill="#F5F5F5" />
      <polygon points="25,42 21,27 32,36" fill="#F8C8C8" opacity="0.8" />
      {/* Ear right */}
      <polygon points="76,45 82,22 66,36" fill="#F5F5F5" />
      <polygon points="75,42 79,27 68,36" fill="#F8C8C8" opacity="0.8" />
      {/* Grey spots */}
      <ellipse cx="35" cy="48" rx="8" ry="7" fill="#C0C0C0" opacity="0.6" />
      <ellipse cx="62" cy="44" rx="6" ry="5" fill="#C0C0C0" opacity="0.5" />
      <ellipse cx="50" cy="72" rx="10" ry="6" fill="#C0C0C0" opacity="0.4" />
      {/* Face */}
      <ellipse cx="50" cy="62" rx="22" ry="18" fill="white" opacity="0.7" />
      {/* Eyes – big and bright */}
      <ellipse cx="40" cy="52" rx="7" ry="8" fill="white" />
      <ellipse cx="40" cy="53" rx="5" ry="6" fill="#3A2510" />
      <ellipse cx="40" cy="53" rx="3" ry="4" fill="#0A0500" />
      <circle cx="38" cy="50" r="2" fill="white" opacity="0.9" />
      <ellipse cx="60" cy="52" rx="7" ry="8" fill="white" />
      <ellipse cx="60" cy="53" rx="5" ry="6" fill="#3A2510" />
      <ellipse cx="60" cy="53" rx="3" ry="4" fill="#0A0500" />
      <circle cx="58" cy="50" r="2" fill="white" opacity="0.9" />
      {/* Nose */}
      <path d="M 47 62 L 50 59 L 53 62 Q 50 65 47 62 Z" fill="#FFAAAA" />
      {/* Mouth */}
      <path d="M 47 64 Q 50 68 53 64" stroke="#CC8888" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Whiskers */}
      <line x1="28" y1="62" x2="44" y2="64" stroke="#AAAAAA" strokeWidth="0.8" opacity="0.7" />
      <line x1="28" y1="66" x2="44" y2="66" stroke="#AAAAAA" strokeWidth="0.8" opacity="0.7" />
      <line x1="72" y1="62" x2="56" y2="64" stroke="#AAAAAA" strokeWidth="0.8" opacity="0.7" />
      <line x1="72" y1="66" x2="56" y2="66" stroke="#AAAAAA" strokeWidth="0.8" opacity="0.7" />
      {/* Small hearts (playful) */}
      <text x="15" y="30" fontSize="8" fill="#FFB3C1" opacity={animate ? "0.8" : "0"}>♥</text>
      <text x="78" y="35" fontSize="6" fill="#FFB3C1" opacity={animate ? "0.7" : "0"}>♥</text>
    </svg>
  );
}

// ── HBIBA – Gentle white/grey cat with orange touches
function HbibaSVG({ size, animate }: { size: number; animate: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={animate ? { animation: 'float 2.5s ease-in-out infinite' } : {}}
    >
      {/* Fluffy body outline */}
      <ellipse cx="50" cy="56" rx="34" ry="32" fill="#FAFAFA" />
      {/* Fluffy texture */}
      {[22, 30, 50, 70, 78].map((x, i) => (
        <ellipse key={i} cx={x} cy={56 + (i % 2) * 4} rx="6" ry="5" fill="white" opacity="0.5" />
      ))}
      {/* Ear left */}
      <polygon points="22,44 15,20 35,35" fill="#FAFAFA" />
      <polygon points="24,42 19,25 33,35" fill="#F0D0D0" opacity="0.8" />
      {/* Ear right */}
      <polygon points="78,44 85,20 65,35" fill="#FAFAFA" />
      <polygon points="76,42 81,25 67,35" fill="#F0D0D0" opacity="0.8" />
      {/* Orange accent patches */}
      <ellipse cx="30" cy="50" rx="9" ry="8" fill="#E8B88A" opacity="0.5" />
      <ellipse cx="68" cy="48" rx="7" ry="6" fill="#E8B88A" opacity="0.4" />
      {/* Grey patches */}
      <ellipse cx="50" cy="38" rx="8" ry="6" fill="#A8A8A8" opacity="0.35" />
      {/* Face light area */}
      <ellipse cx="50" cy="62" rx="24" ry="20" fill="white" opacity="0.6" />
      {/* Eyes – half closed (peaceful) */}
      <ellipse cx="40" cy="54" rx="7" ry="5" fill="white" />
      <ellipse cx="40" cy="55" rx="5" ry="3.5" fill="#4A3520" />
      {/* Eyelid */}
      <ellipse cx="40" cy="52" rx="7" ry="3" fill="#FAFAFA" opacity="0.9" />
      <circle cx="38" cy="54" r="1.5" fill="white" opacity="0.8" />
      <ellipse cx="60" cy="54" rx="7" ry="5" fill="white" />
      <ellipse cx="60" cy="55" rx="5" ry="3.5" fill="#4A3520" />
      <ellipse cx="60" cy="52" rx="7" ry="3" fill="#FAFAFA" opacity="0.9" />
      <circle cx="58" cy="54" r="1.5" fill="white" opacity="0.8" />
      {/* Nose */}
      <path d="M 47 64 L 50 61 L 53 64 Q 50 67 47 64 Z" fill="#FFCCCC" />
      {/* Tender smile */}
      <path d="M 46 66 Q 50 70 54 66" stroke="#CC9999" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Whiskers */}
      <line x1="25" y1="63" x2="43" y2="65" stroke="#BBBBBB" strokeWidth="0.8" opacity="0.6" />
      <line x1="25" y1="67" x2="43" y2="67" stroke="#BBBBBB" strokeWidth="0.8" opacity="0.6" />
      <line x1="75" y1="63" x2="57" y2="65" stroke="#BBBBBB" strokeWidth="0.8" opacity="0.6" />
      <line x1="75" y1="67" x2="57" y2="67" stroke="#BBBBBB" strokeWidth="0.8" opacity="0.6" />
      {/* Soft glow */}
      {animate && <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(168,216,234,0.3)" strokeWidth="3" />}
    </svg>
  );
}

// ── SISSA – Large tricolor cat (white, black, orange)
function SissaSVG({ size, animate }: { size: number; animate: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={animate ? { animation: 'float 2s ease-in-out infinite' } : {}}
    >
      {/* Large head */}
      <ellipse cx="50" cy="54" rx="36" ry="34" fill="#F5F5F5" />
      {/* Black patches */}
      <ellipse cx="30" cy="46" rx="14" ry="12" fill="#2C2C2C" opacity="0.85" />
      <ellipse cx="66" cy="58" rx="12" ry="10" fill="#2C2C2C" opacity="0.8" />
      {/* Orange patches */}
      <ellipse cx="62" cy="44" rx="12" ry="10" fill="#E07B39" opacity="0.85" />
      <ellipse cx="38" cy="65" rx="10" ry="8" fill="#E07B39" opacity="0.7" />
      {/* Ear left */}
      <polygon points="20,42 10,16 36,33" fill="#F5F5F5" />
      <polygon points="22,40 14,22 34,33" fill="#2C2C2C" opacity="0.4" />
      <polygon points="23,39 17,26 33,34" fill="#F0C0C0" opacity="0.7" />
      {/* Ear right */}
      <polygon points="80,42 90,16 64,33" fill="#E07B39" opacity="0.8" />
      <polygon points="78,40 86,22 66,33" fill="#F0C0C0" opacity="0.7" />
      {/* Face light */}
      <ellipse cx="50" cy="62" rx="24" ry="20" fill="white" opacity="0.5" />
      {/* Eyes – round and warm */}
      <ellipse cx="38" cy="52" rx="8" ry="8" fill="white" />
      <ellipse cx="38" cy="53" rx="5.5" ry="6" fill="#3A2510" />
      <ellipse cx="38" cy="53" rx="3.5" ry="4" fill="#0A0000" />
      <circle cx="36" cy="50" r="2.2" fill="white" opacity="0.9" />
      <ellipse cx="62" cy="52" rx="8" ry="8" fill="white" />
      <ellipse cx="62" cy="53" rx="5.5" ry="6" fill="#3A2510" />
      <ellipse cx="62" cy="53" rx="3.5" ry="4" fill="#0A0000" />
      <circle cx="60" cy="50" r="2.2" fill="white" opacity="0.9" />
      {/* Nose */}
      <path d="M 46 63 L 50 59.5 L 54 63 Q 50 67 46 63 Z" fill="#E07B39" opacity="0.9" />
      {/* Big smile */}
      <path d="M 44 66 Q 50 72 56 66" stroke="#C05A20" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 41 65 Q 43 63 44 66" stroke="#C05A20" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M 56 66 Q 57 63 59 65" stroke="#C05A20" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Whiskers */}
      <line x1="20" y1="62" x2="43" y2="65" stroke="#999999" strokeWidth="0.9" opacity="0.7" />
      <line x1="20" y1="67" x2="43" y2="67" stroke="#999999" strokeWidth="0.9" opacity="0.7" />
      <line x1="80" y1="62" x2="57" y2="65" stroke="#999999" strokeWidth="0.9" opacity="0.7" />
      <line x1="80" y1="67" x2="57" y2="67" stroke="#999999" strokeWidth="0.9" opacity="0.7" />
      {/* Joyful stars if animating */}
      {animate && <>
        <text x="8" y="20" fontSize="10" fill="#D4AF37" opacity="0.7">⭐</text>
        <text x="82" y="18" fontSize="8" fill="#D4AF37" opacity="0.6">✨</text>
      </>}
    </svg>
  );
}

// ── MIMI – Elegant grey tabby cat (the legendary one)
function MimiSVG({ size, animate }: { size: number; animate: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={animate ? { animation: 'float 2.2s ease-in-out infinite' } : {}}
    >
      {/* Outer glow (legendary) */}
      {animate && (
        <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(212,175,55,0.25)" strokeWidth="3" style={{ animation: 'glow-gold 2s ease-in-out infinite' }} />
      )}
      {/* Head */}
      <ellipse cx="50" cy="55" rx="33" ry="31" fill="#ADADAD" />
      {/* Tiger stripes */}
      <path d="M 30 44 Q 34 38 38 42" stroke="#6B6B6B" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
      <path d="M 26 52 Q 30 46 35 50" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M 70 44 Q 66 38 62 42" stroke="#6B6B6B" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
      <path d="M 74 52 Q 70 46 65 50" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
      {/* Forehead stripe */}
      <path d="M 46 36 Q 50 30 54 36" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
      {/* Ears */}
      <polygon points="22,44 14,18 38,33" fill="#ADADAD" />
      <polygon points="24,41 18,24 36,33" fill="#C9A4A4" opacity="0.7" />
      <polygon points="78,44 86,18 62,33" fill="#ADADAD" />
      <polygon points="76,41 82,24 64,33" fill="#C9A4A4" opacity="0.7" />
      {/* Lighter face area */}
      <ellipse cx="50" cy="62" rx="25" ry="22" fill="#C8C8C8" opacity="0.45" />
      {/* Eyes – oval with gold rims (signature) */}
      <ellipse cx="38" cy="52" rx="8.5" ry="9" fill="white" />
      <ellipse cx="38" cy="53" rx="6" ry="7" fill="#4A3520" />
      <ellipse cx="38" cy="53" rx="4" ry="5" fill="#0A0500" />
      <ellipse cx="38" cy="53" rx="6" ry="7" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
      <circle cx="36" cy="50" r="2.2" fill="white" opacity="0.9" />
      <circle cx="40" cy="55" r="1" fill="white" opacity="0.5" />
      <ellipse cx="62" cy="52" rx="8.5" ry="9" fill="white" />
      <ellipse cx="62" cy="53" rx="6" ry="7" fill="#4A3520" />
      <ellipse cx="62" cy="53" rx="4" ry="5" fill="#0A0500" />
      <ellipse cx="62" cy="53" rx="6" ry="7" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
      <circle cx="60" cy="50" r="2.2" fill="white" opacity="0.9" />
      {/* Thin elegant eyebrows */}
      <path d="M 30 42 Q 38 38 46 41" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M 54 41 Q 62 38 70 42" stroke="#5A5A5A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Nose */}
      <path d="M 46 63 L 50 59.5 L 54 63 Q 50 67 46 63 Z" fill="#D4808A" />
      {/* Sophisticated smile */}
      <path d="M 46 65 Q 50 70 54 65" stroke="#B06070" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M 43 65 Q 45 63 46 65" stroke="#B06070" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M 54 65 Q 55 63 57 65" stroke="#B06070" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Long elegant whiskers */}
      <line x1="16" y1="63" x2="43" y2="66" stroke="#999999" strokeWidth="0.9" opacity="0.7" />
      <line x1="14" y1="68" x2="43" y2="68" stroke="#999999" strokeWidth="0.8" opacity="0.65" />
      <line x1="84" y1="63" x2="57" y2="66" stroke="#999999" strokeWidth="0.9" opacity="0.7" />
      <line x1="86" y1="68" x2="57" y2="68" stroke="#999999" strokeWidth="0.8" opacity="0.65" />
      {/* Gold bow at collar */}
      <ellipse cx="50" cy="82" rx="14" ry="5" fill="#D4AF37" opacity="0.9" />
      <circle cx="50" cy="82" r="3.5" fill="#B8860B" />
      <path d="M 36 82 L 42 78 L 42 86 Z" fill="#D4AF37" />
      <path d="M 64 82 L 58 78 L 58 86 Z" fill="#D4AF37" />
      {/* Legendary sparkles */}
      {animate && <>
        <text x="5" y="22" fontSize="12" fill="#D4AF37" opacity="0.8">✨</text>
        <text x="80" y="20" fontSize="10" fill="#D4AF37" opacity="0.7">⭐</text>
        <text x="10" y="80" fontSize="8" fill="#D4AF37" opacity="0.6">✦</text>
        <text x="85" y="78" fontSize="9" fill="#D4AF37" opacity="0.7">✦</text>
      </>}
    </svg>
  );
}
