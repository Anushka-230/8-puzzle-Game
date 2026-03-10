import React, { useState, useEffect } from 'react';
import { fetchLeaderboard } from '../utils/api';
import { formatTime, DIFFICULTY_CONFIG } from '../utils/puzzleUtils';

export default function LeaderboardPage({ onBack }) {
  const [difficulty, setDifficulty] = useState('easy');
  const [level, setLevel] = useState('');
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const levels = DIFFICULTY_CONFIG[difficulty].levels;

  useEffect(() => {
    loadScores();
  }, [difficulty, level]);

  async function loadScores() {
    setLoading(true);
    setError('');
    const result = await fetchLeaderboard({ difficulty, level: level || undefined, limit: 20 });
    setLoading(false);
    if (result.success) {
      setEntries(result.data);
    } else {
      setError('Could not load leaderboard. Make sure the server is running.');
    }
  }

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="leaderboard-page">
      <div className="lb-header">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <h1 className="lb-title">🏆 Leaderboard</h1>
      </div>

      <div className="lb-filters">
        <div className="filter-group">
          {['easy', 'medium', 'hard'].map(d => (
            <button
              key={d}
              className={`filter-btn diff-btn ${difficulty === d ? 'active' : ''} diff-${d}`}
              onClick={() => { setDifficulty(d); setLevel(''); }}
            >
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>
        <div className="filter-group">
          <button
            className={`filter-btn ${level === '' ? 'active' : ''}`}
            onClick={() => setLevel('')}
          >All Levels</button>
          {levels.map(l => (
            <button
              key={l.id}
              className={`filter-btn ${level === String(l.id) ? 'active' : ''}`}
              onClick={() => setLevel(String(l.id))}
            >
              Lvl {l.id}
            </button>
          ))}
        </div>
      </div>

      <div className="lb-table-wrapper">
        {loading ? (
          <div className="lb-loading">Loading...</div>
        ) : error ? (
          <div className="lb-error">{error}</div>
        ) : entries.length === 0 ? (
          <div className="lb-empty">No scores yet. Be the first!</div>
        ) : (
          <table className="lb-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Player</th>
                <th>Level</th>
                <th>Moves</th>
                <th>Time</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, idx) => (
                <tr key={entry._id} className={idx < 3 ? 'top-row' : ''}>
                  <td className="rank-cell">{medals[idx] || idx + 1}</td>
                  <td className="name-cell">{entry.playerName}</td>
                  <td>
                    <span className={`diff-badge diff-${entry.difficulty}`}>
                      {entry.difficulty} L{entry.level}
                    </span>
                  </td>
                  <td className="moves-cell">{entry.moves}</td>
                  <td className="time-cell">{formatTime(entry.time)}</td>
                  <td className="date-cell">
                    {new Date(entry.completedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
