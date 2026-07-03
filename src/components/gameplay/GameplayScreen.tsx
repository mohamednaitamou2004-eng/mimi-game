// ============================================================
// MIMI – Main Gameplay Screen
// ============================================================

import { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import GameBoard from './GameBoard';
import GameHUD from './GameHUD';
import PauseMenu from './PauseMenu';
import VictoryScreen from '../VictoryScreen';
import DefeatScreen from '../DefeatScreen';
import MatchParticles from './MatchParticles';
import GameBackground from './GameBackground';

export default function GameplayScreen() {
  const session = useGameStore(s => s.session);
  const selectTile = useGameStore(s => s.selectTile);
  const useHint = useGameStore(s => s.useHint);
  const useShuffle = useGameStore(s => s.useShuffle);
  const useUndo = useGameStore(s => s.useUndo);
  const pauseGame = useGameStore(s => s.pauseGame);
  const tickTimer = useGameStore(s => s.tickTimer);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ w: 375, h: 500 });
  const [matchEffect, setMatchEffect] = useState<{ x: number; y: number } | null>(null);

  const timerRef = useRef<number>(0);
  const lastTickRef = useRef<number>(Date.now());

  // Timer tick
  useEffect(() => {
    if (!session || session.state === 'paused' || session.state === 'victory' || session.state === 'defeat') return;

    const tick = () => {
      const now = Date.now();
      const dt = (now - lastTickRef.current) / 1000;
      lastTickRef.current = now;
      tickTimer(dt);
      timerRef.current = requestAnimationFrame(tick);
    };

    lastTickRef.current = Date.now();
    timerRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(timerRef.current);
  }, [session?.state, tickTimer]);

  // Measure container
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ w: rect.width, h: rect.height });
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  if (!session) return null;

  const elapsed = session.elapsedTime;

  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{
        background: 'linear-gradient(160deg, #FAF7F2 0%, #F0E6D3 60%, #E8D5B7 100%)',
      }}
    >
      {/* HUD */}
      <div style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        <GameHUD
          session={session}
          elapsed={elapsed}
          onPause={pauseGame}
          onHint={useHint}
          onShuffle={useShuffle}
          onUndo={useUndo}
        />
      </div>

      {/* Board area */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <GameBackground mode={session.mode} />
        <GameBoard
          tiles={session.tiles}
          onTileClick={selectTile}
          containerWidth={containerSize.w}
          containerHeight={containerSize.h}
        />

        {/* Match particles */}
        {matchEffect && (
          <MatchParticles
            x={matchEffect.x}
            y={matchEffect.y}
            onDone={() => setMatchEffect(null)}
          />
        )}
      </div>

      {/* Mode badge */}
      {session.mode !== 'classic' && (
        <div
          style={{
            position: 'absolute',
            top: 120,
            right: 12,
            padding: '4px 10px',
            borderRadius: 8,
            background: session.mode === 'relax'
              ? 'rgba(168,216,234,0.9)'
              : session.mode === 'timed'
              ? 'rgba(224,123,57,0.9)'
              : 'rgba(212,175,55,0.9)',
            fontSize: 10,
            fontWeight: 600,
            color: 'white',
            fontFamily: 'Montserrat, sans-serif',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          {session.mode === 'relax' ? '🌸 RELAX' :
           session.mode === 'timed' ? '⏱ CHRONO' :
           session.mode === 'daily' ? '🌟 DÉFI' : ''}
        </div>
      )}

      {/* Pause overlay */}
      {session.state === 'paused' && <PauseMenu />}

      {/* Victory / Defeat overlays */}
      {session.state === 'victory' && <VictoryScreen />}
      {session.state === 'defeat' && <DefeatScreen />}
    </div>
  );
}
