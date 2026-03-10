import React, { useState } from 'react';
import { DIFFICULTY_CONFIG } from '../utils/puzzleUtils';

const DIFF_INFO = {
  easy: { emoji: '🌱', desc: 'Perfect for beginners. Few shuffles, simple paths.', color: '#4ade80' },
  medium: { emoji: '🔥', desc: 'A balanced challenge for intermediate solvers.', color: '#fbbf24' },
  hard: { emoji: '💀', desc: 'Only for experts. Deeply shuffled boards.', color: '#f87171' },
};

export default function HomeScreen({ onPlay, onLeaderboard }) {
  const [selectedDiff, setSelectedDiff] = useState(null);
  const [hoveredLevel, setHoveredLevel] = useState(null);

  return (
    <div className="home-screen">
      <div className="home-hero">
        <div className="puzzle-logo">
          <div className="logo-grid">
            {[1,2,3,4,5,6,7,8,''].map((n, i) => (
              <div key={i} className={`logo-tile ${n === '' ? 'logo-blank' : ''}`}>
                {n}
              </div>
            ))}
          </div>
        </div>
        <h1 className="home-title">8 Puzzle</h1>
        <p className="home-subtitle">The Classic Sliding Puzzle Challenge</p>
        <button className="btn-leaderboard-home" onClick={onLeaderboard}>
          🏆 Leaderboard
        </button>
      </div>

      <div className="difficulty-section">
        <h2 className="section-title">Choose Difficulty</h2>
        <div className="difficulty-grid">
          {Object.entries(DIFF_INFO).map(([diff, info]) => (
            <button
              key={diff}
              className={`diff-card ${selectedDiff === diff ? 'diff-card-active' : ''}`}
              style={{ '--diff-color': info.color }}
              onClick={() => setSelectedDiff(selectedDiff === diff ? null : diff)}
            >
              <span className="diff-emoji">{info.emoji}</span>
              <span className="diff-name">{diff.charAt(0).toUpperCase() + diff.slice(1)}</span>
              <span className="diff-desc">{info.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedDiff && (
        <div className="level-section">
          <h2 className="section-title">Select Level</h2>
          <div className="level-grid">
            {DIFFICULTY_CONFIG[selectedDiff].levels.map((level, idx) => (
              <button
                key={level.id}
                className="level-card"
                style={{ '--diff-color': DIFF_INFO[selectedDiff].color }}
                onMouseEnter={() => setHoveredLevel(idx)}
                onMouseLeave={() => setHoveredLevel(null)}
                onClick={() => onPlay(selectedDiff, idx)}
              >
                <div className="level-number">{level.id}</div>
                <div className="level-name">{level.name}</div>
                <div className="level-shuffles">{DIFFICULTY_CONFIG[selectedDiff].levels[idx].shuffles} shuffles</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="home-instructions">
        <h3>How to Play</h3>
        <div className="instructions-grid">
          <div className="instruction-item">🖱️ <strong>Click</strong> a tile adjacent to the blank space to move it</div>
          <div className="instruction-item">⌨️ <strong>Arrow Keys</strong> to slide tiles in any direction</div>
          <div className="instruction-item">🎯 Arrange tiles <strong>1–8</strong> in order from top-left to bottom-right</div>
          <div className="instruction-item">↺ <strong>Restart</strong> resets to the original board configuration</div>
        </div>
      </div>
    </div>
  );
}
