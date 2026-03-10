const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export async function submitScore({ playerName, difficulty, level, moves, time }) {
  try {
    const res = await fetch(`${API_BASE}/leaderboard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerName, difficulty, level, moves, time }),
    });
    return await res.json();
  } catch (err) {
    console.error('Submit score error:', err);
    return { success: false, message: 'Network error' };
  }
}

export async function fetchLeaderboard({ difficulty, level, limit = 10 } = {}) {
  try {
    const params = new URLSearchParams();
    if (difficulty) params.append('difficulty', difficulty);
    if (level) params.append('level', level);
    params.append('limit', limit);

    const res = await fetch(`${API_BASE}/leaderboard?${params}`);
    return await res.json();
  } catch (err) {
    console.error('Fetch leaderboard error:', err);
    return { success: false, data: [] };
  }
}

export async function fetchTopScores() {
  try {
    const res = await fetch(`${API_BASE}/leaderboard/top`);
    return await res.json();
  } catch (err) {
    console.error('Fetch top scores error:', err);
    return { success: false, data: {} };
  }
}
