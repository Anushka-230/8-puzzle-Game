import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import GamePage from './components/GamePage';
import LeaderboardPage from './components/LeaderboardPage';
import './App.css';

export default function App() {
  const [screen, setScreen] = useState('home'); // 'home' | 'game' | 'leaderboard'
  const [gameConfig, setGameConfig] = useState({ difficulty: 'easy', levelIndex: 0 });

  const handlePlay = (difficulty, levelIndex) => {
    setGameConfig({ difficulty, levelIndex });
    setScreen('game');
  };

  const handleNextLevel = (difficulty, levelIndex) => {
    setGameConfig({ difficulty, levelIndex });
    setScreen('game');
  };

  return (
    <div className="app-root">
      <div className="app-bg" />
      {screen === 'home' && (
        <HomeScreen
          onPlay={handlePlay}
          onLeaderboard={() => setScreen('leaderboard')}
        />
      )}
      {screen === 'game' && (
        <GamePage
          key={`${gameConfig.difficulty}-${gameConfig.levelIndex}`}
          difficulty={gameConfig.difficulty}
          levelIndex={gameConfig.levelIndex}
          onBack={() => setScreen('home')}
          onNextLevel={handleNextLevel}
          onLeaderboard={() => setScreen('leaderboard')}
        />
      )}
      {screen === 'leaderboard' && (
        <LeaderboardPage
          onBack={() => setScreen('home')}
        />
      )}
    </div>
  );
}
