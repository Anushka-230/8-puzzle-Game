import React, { useState } from 'react';
import { usePuzzle } from '../hooks/usePuzzle';
import PuzzleBoard from './PuzzleBoard';
import GameStats from './GameStats';
import VictoryModal from './VictoryModal';
import { DIFFICULTY_CONFIG } from '../utils/puzzleUtils';

const DIFF_INFO = {
  easy: { emoji: '🌱', color: '#4ade80' },
  medium: { emoji: '🔥', color: '#fbbf24' },
  hard: { emoji: '💀', color: '#f87171' },
};

export default function GamePage({ difficulty, levelIndex, onBack, onNextLevel, onLeaderboard }) {
  const [showVictory, setShowVictory] = useState(false);
  const config = DIFFICULTY_CONFIG[difficulty];
  const hasNextLevel = levelIndex < config.levels.length - 1;

  const {
    board,
    moves,
    time,
    formattedTime,
    isRunning,
    solved,
    gridSize,
    level,
    selectedTile,
    setSelectedTile,
    moveTile,
    restart,
  } = usePuzzle(difficulty, levelIndex);

  // Show victory modal when solved
  React.useEffect(() => {
    if (solved) {
      const timer = setTimeout(() => setShowVictory(true), 400);
      return () => clearTimeout(timer);
    }
  }, [solved]);

  const handleRestart = () => {
    setShowVictory(false);
    restart();
  };

  const handleNextLevel = () => {
    setShowVictory(false);
    onNextLevel(difficulty, levelIndex + 1);
  };

  return (
    <div className="game-page">
      <div className="game-header">
        <button className="btn-back" onClick={onBack}>← Menu</button>
        <div className="game-title-group">
          <span className="diff-badge-game" style={{ color: DIFF_INFO[difficulty].color }}>
            {DIFF_INFO[difficulty].emoji} {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
          <span className="level-badge">Level {level.id}</span>
        </div>
        <button className="btn-leaderboard-sm" onClick={onLeaderboard}>🏆</button>
      </div>

      <div className="game-content">
        <GameStats
          moves={moves}
          time={time}
          isRunning={isRunning}
          onRestart={handleRestart}
          difficulty={difficulty}
          level={level}
        />

        <div className={`board-wrapper ${solved ? 'board-solved' : ''}`}>
          <PuzzleBoard
            board={board}
            gridSize={gridSize}
            onTileClick={moveTile}
            selectedTile={selectedTile}
            onSelectTile={setSelectedTile}
            solved={solved}
          />
        </div>

        <div className="keyboard-hint">
          Use <kbd>↑</kbd><kbd>↓</kbd><kbd>←</kbd><kbd>→</kbd> arrow keys or click tiles to move
        </div>
      </div>

      {showVictory && (
        <VictoryModal
          moves={moves}
          time={time}
          difficulty={difficulty}
          levelId={level.id}
          onNextLevel={handleNextLevel}
          onRestart={handleRestart}
          onLeaderboard={onLeaderboard}
          hasNextLevel={hasNextLevel}
        />
      )}
    </div>
  );
}
