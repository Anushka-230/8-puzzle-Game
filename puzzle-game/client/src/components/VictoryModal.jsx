import React, { useState } from 'react';
import { formatTime } from '../utils/puzzleUtils';
import { submitScore } from '../utils/api';

export default function VictoryModal({ moves, time, difficulty, levelId, onNextLevel, onRestart, onLeaderboard, hasNextLevel }) {
  const [playerName, setPlayerName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!playerName.trim()) {
      setError('Please enter your name');
      return;
    }
    setSubmitting(true);
    const result = await submitScore({
      playerName: playerName.trim(),
      difficulty,
      level: levelId,
      moves,
      time,
    });
    setSubmitting(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError('Failed to submit. Server might be offline.');
    }
  };

  const diffColor = { easy: '#4ade80', medium: '#fbbf24', hard: '#f87171' };

  return (
    <div className="modal-overlay">
      <div className="modal-box victory-modal">
        <div className="victory-confetti">🎉</div>
        <h2 className="victory-title">Puzzle Solved!</h2>

        <div className="victory-stats">
          <div className="v-stat">
            <span className="v-stat-val">{moves}</span>
            <span className="v-stat-lbl">Moves</span>
          </div>
          <div className="v-stat">
            <span className="v-stat-val">{formatTime(time)}</span>
            <span className="v-stat-lbl">Time</span>
          </div>
          <div className="v-stat">
            <span className="v-stat-val" style={{ color: diffColor[difficulty], textTransform: 'capitalize' }}>{difficulty}</span>
            <span className="v-stat-lbl">Difficulty</span>
          </div>
        </div>

        {!submitted ? (
          <div className="score-submit">
            <p>Submit your score to the leaderboard!</p>
            <div className="name-input-row">
              <input
                type="text"
                placeholder="Your name..."
                value={playerName}
                onChange={e => { setPlayerName(e.target.value); setError(''); }}
                maxLength={20}
                className="name-input"
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              />
              <button className="btn-submit" onClick={handleSubmit} disabled={submitting}>
                {submitting ? '...' : 'Submit'}
              </button>
            </div>
            {error && <p className="error-msg">{error}</p>}
          </div>
        ) : (
          <div className="submitted-msg">✅ Score submitted!</div>
        )}

        <div className="modal-actions">
          {hasNextLevel && (
            <button className="btn-primary" onClick={onNextLevel}>Next Level →</button>
          )}
          <button className="btn-secondary" onClick={onRestart}>↺ Replay</button>
          <button className="btn-secondary" onClick={onLeaderboard}>🏆 Leaderboard</button>
        </div>
      </div>
    </div>
  );
}
