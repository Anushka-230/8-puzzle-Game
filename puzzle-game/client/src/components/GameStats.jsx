import React from 'react';
import { formatTime } from '../utils/puzzleUtils';

export default function GameStats({ moves, time, isRunning, onRestart, difficulty, level }) {
  return (
    <div className="game-stats">
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon">⏱</div>
          <div className="stat-value">{formatTime(time)}</div>
          <div className="stat-label">Time</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔢</div>
          <div className="stat-value">{moves}</div>
          <div className="stat-label">Moves</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">{isRunning ? '▶' : moves === 0 ? '⏸' : '⏸'}</div>
          <div className="stat-value">{isRunning ? 'Running' : moves === 0 ? 'Ready' : 'Paused'}</div>
          <div className="stat-label">Status</div>
        </div>
      </div>
      <button className="btn-restart" onClick={onRestart}>
        ↺ Restart Level
      </button>
    </div>
  );
}
