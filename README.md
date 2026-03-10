🧩 8 Puzzle Game
A full-stack 8-puzzle sliding game with React frontend, Node/Express backend, and MongoDB leaderboard.

Features
3 Difficulty Levels: Easy 🌱, Medium 🔥, Hard 💀
5 Levels per Difficulty (15 levels total)
Keyboard Navigation: Arrow keys move tiles intuitively
Click to Move: Click any adjacent tile to slide it
Timer & Move Counter: Track your solving stats in real-time
Restart: Resets to the original shuffled board configuration
Victory Modal: Submit score to leaderboard with player name
Leaderboard: Persistent MongoDB leaderboard with filtering by difficulty/level
Retro Arcade UI: Dark theme with neon accents
Tech Stack
Layer	Technology
Frontend	React 18, CSS3 (no UI library)
Backend	Node.js, Express 4
Database	MongoDB via Mongoose
Dev	concurrently, nodemon
Quick Start
Option 1: Docker Compose (Recommended)
docker-compose up --build
Frontend: http://localhost:3000
Backend API: http://localhost:5000
MongoDB: localhost:27017
Option 2: Manual Setup
Prerequisites
Node.js 18+
MongoDB running locally on port 27017
1. Install dependencies
# Root level
npm install

# Server
cd server && npm install

# Client
cd client && npm install
2. Configure environment
# server/.env
PORT=5000
MONGO_URI=mongodb://localhost:27017/puzzle8game
3. Start MongoDB
mongod
4. Run both server and client
# From root directory
npm run dev
Or separately:

# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm start
API Endpoints
Method	Endpoint	Description
GET	/api/leaderboard	Fetch scores (filter: difficulty, level)
POST	/api/leaderboard	Submit a new score
GET	/api/leaderboard/top	Top 5 scores per difficulty
DELETE	/api/leaderboard	Clear all scores (testing)
POST /api/leaderboard body
{
  "playerName": "Alice",
  "difficulty": "hard",
  "level": 3,
  "moves": 42,
  "time": 87
}
How to Play
Choose a Difficulty (Easy / Medium / Hard)
Select a Level (1–5)
Click a tile adjacent to the blank space, or use Arrow Keys to slide tiles
Arrange tiles 1 through 8 in order from top-left to bottom-right
Hit Restart to reset to the original board configuration at any time
On solving, submit your name to the Leaderboard 🏆
Project Structure
8puzzle-game/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── HomeScreen.jsx      # Difficulty + level selection
│   │   │   ├── GamePage.jsx        # Main game view
│   │   │   ├── PuzzleBoard.jsx     # Interactive tile grid
│   │   │   ├── GameStats.jsx       # Timer, moves, restart
│   │   │   ├── VictoryModal.jsx    # Win screen + score submit
│   │   │   └── LeaderboardPage.jsx # Leaderboard view
│   │   ├── hooks/
│   │   │   └── usePuzzle.js        # Core game logic + keyboard
│   │   └── utils/
│   │       ├── puzzleUtils.js      # Board manipulation utils
│   │       └── api.js              # API calls
│   └── package.json
├── server/                 # Express backend
│   ├── index.js            # Server + API routes + Mongoose model
│   ├── .env
│   └── package.json
├── docker-compose.yml
└── package.json            # Root scripts with concurrently
