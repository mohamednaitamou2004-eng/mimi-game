// ============================================================
// MIMI – SVG Logo Component (Cat Face)
// Hand-crafted SVG illustration of MIMI
// ============================================================

interface Props {
  size?: number;
  className?: string;
}

export default function MimiLogo({ size = 100, className = '' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer glow ring */}
      <circle cx="100" cy="100" r="96" fill="rgba(212,175,55,0.08)" />
      <circle cx="100" cy="100" r="90" fill="rgba(250,247,242,0.95)" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.4" />

      {/* Head */}
      <ellipse cx="100" cy="108" rx="62" ry="58" fill="#9A9A9A" />
      <ellipse cx="100" cy="108" rx="58" ry="54" fill="#ADADAD" />

      {/* Tiger stripes on head */}
      <path d="M 70 80 Q 75 72 80 75" stroke="#6B6B6B" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      <path d="M 65 90 Q 68 82 74 86" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M 130 80 Q 125 72 120 75" stroke="#6B6B6B" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      <path d="M 135 90 Q 132 82 126 86" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      {/* Forehead stripe */}
      <path d="M 96 68 Q 100 62 104 68" stroke="#6B6B6B" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <path d="M 93 76 Q 100 70 107 76" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round" opacity="0.4" />

      {/* Left ear */}
      <polygon points="58,88 44,46 78,72" fill="#9A9A9A" />
      <polygon points="60,84 50,55 74,70" fill="#C9A4A4" opacity="0.7" />

      {/* Right ear */}
      <polygon points="142,88 156,46 122,72" fill="#9A9A9A" />
      <polygon points="140,84 150,55 126,70" fill="#C9A4A4" opacity="0.7" />

      {/* Face lighter area */}
      <ellipse cx="100" cy="118" rx="42" ry="36" fill="#C8C8C8" opacity="0.5" />

      {/* Eyes */}
      {/* Left eye */}
      <ellipse cx="80" cy="100" rx="13" ry="14" fill="white" />
      <ellipse cx="80" cy="101" rx="9" ry="10" fill="#4A3520" />
      <ellipse cx="80" cy="101" rx="6" ry="7" fill="#1A0E00" />
      {/* Eye gold rim */}
      <ellipse cx="80" cy="101" rx="9" ry="10" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.8" />
      {/* Eye shine */}
      <ellipse cx="77" cy="97" rx="2.5" ry="2.5" fill="white" opacity="0.9" />
      <ellipse cx="83" cy="103" rx="1.2" ry="1.2" fill="white" opacity="0.6" />

      {/* Right eye */}
      <ellipse cx="120" cy="100" rx="13" ry="14" fill="white" />
      <ellipse cx="120" cy="101" rx="9" ry="10" fill="#4A3520" />
      <ellipse cx="120" cy="101" rx="6" ry="7" fill="#1A0E00" />
      <ellipse cx="120" cy="101" rx="9" ry="10" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.8" />
      <ellipse cx="117" cy="97" rx="2.5" ry="2.5" fill="white" opacity="0.9" />
      <ellipse cx="123" cy="103" rx="1.2" ry="1.2" fill="white" opacity="0.6" />

      {/* Eyebrows (thin, elegant) */}
      <path d="M 70 87 Q 80 83 90 86" stroke="#5A5A5A" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M 110 86 Q 120 83 130 87" stroke="#5A5A5A" strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* Nose */}
      <path d="M 96 116 L 100 112 L 104 116 Q 100 120 96 116 Z" fill="#D4808A" />

      {/* Mouth – gentle smile */}
      <path d="M 96 118 Q 100 124 104 118" stroke="#B06070" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M 91 118 Q 93 116 96 118" stroke="#B06070" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M 104 118 Q 107 116 109 118" stroke="#B06070" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Whiskers left */}
      <line x1="55" y1="114" x2="88" y2="118" stroke="#8A8A8A" strokeWidth="1" strokeOpacity="0.7" strokeLinecap="round" />
      <line x1="52" y1="120" x2="87" y2="122" stroke="#8A8A8A" strokeWidth="1" strokeOpacity="0.7" strokeLinecap="round" />
      <line x1="54" y1="126" x2="88" y2="126" stroke="#8A8A8A" strokeWidth="1" strokeOpacity="0.6" strokeLinecap="round" />

      {/* Whiskers right */}
      <line x1="145" y1="114" x2="112" y2="118" stroke="#8A8A8A" strokeWidth="1" strokeOpacity="0.7" strokeLinecap="round" />
      <line x1="148" y1="120" x2="113" y2="122" stroke="#8A8A8A" strokeWidth="1" strokeOpacity="0.7" strokeLinecap="round" />
      <line x1="146" y1="126" x2="112" y2="126" stroke="#8A8A8A" strokeWidth="1" strokeOpacity="0.6" strokeLinecap="round" />

      {/* Gold bow tie / collar detail */}
      <ellipse cx="100" cy="158" rx="18" ry="6" fill="#D4AF37" opacity="0.9" />
      <circle cx="100" cy="158" r="4" fill="#B8860B" />
      <path d="M 82 158 L 90 154 L 90 162 Z" fill="#D4AF37" />
      <path d="M 118 158 L 110 154 L 110 162 Z" fill="#D4AF37" />
    </svg>
  );
}
