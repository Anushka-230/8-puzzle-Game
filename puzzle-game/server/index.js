require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/puzzle8game';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Leaderboard Schema
const leaderboardSchema = new mongoose.Schema({
  playerName: { type: String, required: true, trim: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  level: { type: Number, required: true },
  moves: { type: Number, required: true },
  time: { type: Number, required: true }, // in seconds
  completedAt: { type: Date, default: Date.now }
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

// Routes

// GET leaderboard - with optional filters
app.get('/api/leaderboard', async (req, res) => {
  try {
    const { difficulty, level, limit = 10 } = req.query;
    const filter = {};
    if (difficulty) filter.difficulty = difficulty;
    if (level) filter.level = parseInt(level);

    const entries = await Leaderboard.find(filter)
      .sort({ moves: 1, time: 1 })
      .limit(parseInt(limit));

    res.json({ success: true, data: entries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST new score
app.post('/api/leaderboard', async (req, res) => {
  try {
    const { playerName, difficulty, level, moves, time } = req.body;

    if (!playerName || !difficulty || level === undefined || moves === undefined || time === undefined) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const entry = new Leaderboard({ playerName, difficulty, level, moves, time });
    await entry.save();

    res.status(201).json({ success: true, data: entry });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET top scores per difficulty
app.get('/api/leaderboard/top', async (req, res) => {
  try {
    const difficulties = ['easy', 'medium', 'hard'];
    const result = {};

    for (const diff of difficulties) {
      result[diff] = await Leaderboard.find({ difficulty: diff })
        .sort({ moves: 1, time: 1 })
        .limit(5);
    }

    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE all scores (for testing)
app.delete('/api/leaderboard', async (req, res) => {
  try {
    await Leaderboard.deleteMany({});
    res.json({ success: true, message: 'Leaderboard cleared' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
