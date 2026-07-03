// ============================================================
// MIMI – Main App Component (Screen Router + First Launch Logic)
// ============================================================

import { useEffect, useState } from 'react';
import { useGameStore } from './store/gameStore';
import SplashScreen from './components/SplashScreen';
import MainMenu from './components/MainMenu';
import LevelSelect from './components/LevelSelect';
import GameplayScreen from './components/gameplay/GameplayScreen';
import CollectionScreen from './components/CollectionScreen';
import ShopScreen from './components/ShopScreen';
import SettingsScreen from './components/SettingsScreen';
import TutorialOverlay from './components/TutorialOverlay';

export default function App() {
  const currentScreen = useGameStore(s => s.currentScreen);
  const session = useGameStore(s => s.session);
  const saveData = useGameStore(s => s.saveData);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialShown, setTutorialShown] = useState(false);

  // Show tutorial on first play
  useEffect(() => {
    if (
      currentScreen === 'menu' &&
      !tutorialShown &&
      saveData.totalLevelsCompleted === 0
    ) {
      const timer = setTimeout(() => setShowTutorial(true), 500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen, tutorialShown, saveData.totalLevelsCompleted]);

  // Prevent browser back navigation
  useEffect(() => {
    const handlePop = (e: PopStateEvent) => {
      e.preventDefault();
      window.history.pushState(null, '', window.location.href);
    };
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const effectiveScreen = currentScreen;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        background: '#2A2A2A',
      }}
    >
      {/* Mobile-constrained container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 480,
          height: '100%',
          overflow: 'hidden',
          background: '#FAF7F2',
          boxShadow: '0 0 80px rgba(0,0,0,0.4)',
        }}
      >
        {/* Screen */}
        <div
          key={effectiveScreen}
          style={{
            position: 'absolute',
            inset: 0,
            animation: 'fadeIn 0.25s ease',
          }}
        >
          {effectiveScreen === 'splash' && <SplashScreen />}
          {effectiveScreen === 'menu' && <MainMenu />}
          {effectiveScreen === 'levelSelect' && <LevelSelect />}
          {effectiveScreen === 'gameplay' && session && <GameplayScreen />}
          {effectiveScreen === 'collection' && <CollectionScreen />}
          {effectiveScreen === 'shop' && <ShopScreen />}
          {effectiveScreen === 'settings' && <SettingsScreen />}
        </div>

        {/* Tutorial overlay (above everything on menu) */}
        {showTutorial && effectiveScreen === 'menu' && (
          <TutorialOverlay
            onClose={() => {
              setShowTutorial(false);
              setTutorialShown(true);
            }}
          />
        )}
      </div>
    </div>
  );
}
