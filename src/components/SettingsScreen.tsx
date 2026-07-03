// ============================================================
// MIMI – Settings Screen
// ============================================================

import { useGameStore } from '../store/gameStore';
import { GameSettings } from '../types/game';

export default function SettingsScreen() {
  const setScreen = useGameStore(s => s.setScreen);
  const settings = useGameStore(s => s.saveData.settings);
  const updateSettings = useGameStore(s => s.updateSettings);

  const toggle = (key: keyof GameSettings) => {
    updateSettings({ [key]: !settings[key] } as Partial<GameSettings>);
  };

  const languages = [
    { code: 'fr', flag: '🇫🇷', label: 'Français' },
    { code: 'en', flag: '🇬🇧', label: 'English' },
    { code: 'ar', flag: '🇲🇦', label: 'العربية' },
    { code: 'es', flag: '🇪🇸', label: 'Español' },
  ];

  const textSizes = [
    { value: 'small', label: 'Petit' },
    { value: 'normal', label: 'Normal' },
    { value: 'large', label: 'Grand' },
  ];

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
            width: 38, height: 38, borderRadius: 10,
            border: '1px solid rgba(212,175,55,0.2)',
            background: 'rgba(212,175,55,0.08)',
            fontSize: 20, cursor: 'pointer', color: '#4A4A4A',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          ‹
        </button>
        <h2 style={{ margin: 0, fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 600, color: '#4A4A4A' }}>
          Paramètres
        </h2>
      </div>

      {/* Settings list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 32px' }}>

        {/* Audio */}
        <SettingsSection title="🎵 Audio">
          <SliderRow
            label="Musique"
            value={settings.musicVolume}
            onChange={v => updateSettings({ musicVolume: v })}
          />
          <SliderRow
            label="Effets sonores"
            value={settings.sfxVolume}
            onChange={v => updateSettings({ sfxVolume: v })}
          />
          <ToggleRow
            label="Vibrations"
            value={settings.vibration}
            onChange={() => toggle('vibration')}
          />
        </SettingsSection>

        {/* Language */}
        <SettingsSection title="🌍 Langue">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '4px 0' }}>
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => updateSettings({ language: lang.code as GameSettings['language'] })}
                style={{
                  padding: '10px',
                  borderRadius: 12,
                  border: settings.language === lang.code
                    ? '1.5px solid #D4AF37'
                    : '1px solid rgba(212,175,55,0.2)',
                  background: settings.language === lang.code
                    ? 'rgba(212,175,55,0.12)'
                    : 'rgba(250,247,242,0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 20 }}>{lang.flag}</span>
                <span style={{ fontSize: 13, fontFamily: 'Montserrat, sans-serif', fontWeight: settings.language === lang.code ? 600 : 400, color: '#4A4A4A' }}>
                  {lang.label}
                </span>
              </button>
            ))}
          </div>
        </SettingsSection>

        {/* Accessibility */}
        <SettingsSection title="♿ Accessibilité">
          <div style={{ padding: '4px 0 8px' }}>
            <p style={{ margin: '0 0 8px', fontSize: 12, color: '#6B6B6B', fontFamily: 'Montserrat, sans-serif' }}>
              Taille du texte
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {textSizes.map(size => (
                <button
                  key={size.value}
                  onClick={() => updateSettings({ textSize: size.value as GameSettings['textSize'] })}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: 10,
                    border: settings.textSize === size.value
                      ? '1.5px solid #D4AF37'
                      : '1px solid rgba(212,175,55,0.2)',
                    background: settings.textSize === size.value
                      ? 'rgba(212,175,55,0.12)'
                      : 'transparent',
                    fontSize: size.value === 'small' ? 11 : size.value === 'large' ? 15 : 13,
                    color: '#4A4A4A',
                    fontFamily: 'Montserrat, sans-serif',
                    cursor: 'pointer',
                  }}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
          <ToggleRow label="Contraste élevé" value={settings.highContrast} onChange={() => toggle('highContrast')} />
          <ToggleRow label="Réduire les animations" value={settings.reduceMotion} onChange={() => toggle('reduceMotion')} />
        </SettingsSection>

        {/* Legal */}
        <SettingsSection title="⚖️ Légal">
          {[
            { label: 'Politique de confidentialité', icon: '🔒' },
            { label: 'Conditions d\'utilisation', icon: '📋' },
            { label: 'Gérer les publicités (RGPD)', icon: '🛡️' },
            { label: 'Contacter le support', icon: '💬' },
          ].map(item => (
            <button
              key={item.label}
              style={{
                width: '100%',
                padding: '12px 0',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(212,175,55,0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span style={{ flex: 1, textAlign: 'left', fontFamily: 'Montserrat, sans-serif', fontSize: 13, color: '#4A4A4A' }}>
                {item.label}
              </span>
              <span style={{ color: '#B8860B', fontSize: 16 }}>›</span>
            </button>
          ))}
        </SettingsSection>

        {/* App info */}
        <div style={{ textAlign: 'center', padding: '16px 0', opacity: 0.6 }}>
          <p style={{ margin: 0, fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: '#6B6B6B' }}>
            MIMI Mahjong Solitaire • Version 1.0.0
          </p>
          <p style={{ margin: '2px 0 0', fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: '#9A9A9A' }}>
            © 2025 MIMI Studio. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Settings Section
function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        marginBottom: 16,
        borderRadius: 16,
        background: 'rgba(250,247,242,0.9)',
        border: '1px solid rgba(212,175,55,0.12)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '10px 16px',
          background: 'rgba(212,175,55,0.06)',
          borderBottom: '1px solid rgba(212,175,55,0.1)',
        }}
      >
        <p style={{ margin: 0, fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 600, color: '#B8860B', letterSpacing: '0.05em' }}>
          {title}
        </p>
      </div>
      <div style={{ padding: '8px 16px 4px' }}>
        {children}
      </div>
    </div>
  );
}

// ── Toggle Row
function ToggleRow({ label, value, onChange }: { label: string; value: boolean; onChange: () => void }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 0',
        borderBottom: '1px solid rgba(212,175,55,0.08)',
      }}
    >
      <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, color: '#4A4A4A' }}>{label}</span>
      <div
        onClick={onChange}
        style={{
          width: 46,
          height: 26,
          borderRadius: 13,
          background: value ? 'linear-gradient(135deg, #D4AF37, #B8860B)' : 'rgba(200,200,200,0.5)',
          position: 'relative',
          cursor: 'pointer',
          transition: 'background 0.3s ease',
          border: 'none',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 3, left: value ? 23 : 3,
            width: 20, height: 20,
            borderRadius: '50%',
            background: 'white',
            boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
            transition: 'left 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}

// ── Slider Row
function SliderRow({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div style={{ padding: '10px 0', borderBottom: '1px solid rgba(212,175,55,0.08)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, color: '#4A4A4A' }}>{label}</span>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: '#B8860B', fontWeight: 600 }}>
          {Math.round(value * 100)}%
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{
          width: '100%',
          height: 4,
          borderRadius: 2,
          accentColor: '#D4AF37',
          cursor: 'pointer',
        }}
      />
    </div>
  );
}
