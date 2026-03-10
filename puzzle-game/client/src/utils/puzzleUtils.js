// Puzzle sizes per difficulty
export const DIFFICULTY_CONFIG = {
  easy: {
    gridSize: 3,
    levels: [
      { id: 1, name: 'Level 1', shuffles: 10, board: [1, 2, 3, 4, 5, 6, 7, 0, 8] },
      { id: 2, name: 'Level 2', shuffles: 15, board: [1, 2, 3, 4, 5, 6, 0, 7, 8] },
      { id: 3, name: 'Level 3', shuffles: 20, board: [1, 2, 3, 4, 0, 6, 7, 5, 8] },
      { id: 4, name: 'Level 4', shuffles: 25, board: [1, 2, 3, 0, 5, 6, 4, 7, 8] },
      { id: 5, name: 'Level 5', shuffles: 30, board: [1, 0, 3, 4, 2, 6, 7, 5, 8] },
    ]
  },
  medium: {
    gridSize: 3,
    levels: [
      { id: 1, name: 'Level 1', shuffles: 40, board: [2, 1, 3, 4, 5, 6, 7, 8, 0] },
      { id: 2, name: 'Level 2', shuffles: 50, board: [1, 3, 6, 4, 2, 5, 7, 8, 0] },
      { id: 3, name: 'Level 3', shuffles: 60, board: [4, 1, 2, 7, 5, 3, 0, 6, 8] },
      { id: 4, name: 'Level 4', shuffles: 70, board: [2, 5, 3, 1, 0, 6, 4, 7, 8] },
      { id: 5, name: 'Level 5', shuffles: 80, board: [5, 1, 3, 2, 4, 6, 0, 7, 8] },
    ]
  },
  hard: {
    gridSize: 3,
    levels: [
      { id: 1, name: 'Level 1', shuffles: 100, board: [8, 1, 3, 4, 0, 2, 7, 6, 5] },
      { id: 2, name: 'Level 2', shuffles: 120, board: [6, 4, 7, 8, 5, 0, 3, 2, 1] },
      { id: 3, name: 'Level 3', shuffles: 150, board: [8, 6, 7, 2, 5, 4, 3, 0, 1] },
      { id: 4, name: 'Level 4', shuffles: 180, board: [6, 4, 1, 8, 7, 2, 5, 3, 0] },
      { id: 5, name: 'Level 5', shuffles: 200, board: [8, 6, 7, 2, 5, 4, 0, 3, 1] },
    ]
  }
};

export const GOAL_STATE = [1, 2, 3, 4, 5, 6, 7, 8, 0];

export function isSolved(board) {
  return board.every((val, idx) => val === GOAL_STATE[idx]);
}

export function countInversions(board) {
  const flat = board.filter(x => x !== 0);
  let inversions = 0;
  for (let i = 0; i < flat.length - 1; i++) {
    for (let j = i + 1; j < flat.length; j++) {
      if (flat[i] > flat[j]) inversions++;
    }
  }
  return inversions;
}

export function isSolvable(board) {
  const inversions = countInversions(board);
  return inversions % 2 === 0;
}

export function shuffleBoard(board, numMoves) {
  let current = [...board];
  let prevBlank = -1;

  for (let i = 0; i < numMoves; i++) {
    const blankIdx = current.indexOf(0);
    const neighbors = getValidMoves(blankIdx, 3).filter(n => n !== prevBlank);
    const chosen = neighbors[Math.floor(Math.random() * neighbors.length)];
    [current[blankIdx], current[chosen]] = [current[chosen], current[blankIdx]];
    prevBlank = blankIdx;
  }

  return current;
}

export function getValidMoves(blankIdx, gridSize) {
  const moves = [];
  const row = Math.floor(blankIdx / gridSize);
  const col = blankIdx % gridSize;

  if (row > 0) moves.push(blankIdx - gridSize); // up
  if (row < gridSize - 1) moves.push(blankIdx + gridSize); // down
  if (col > 0) moves.push(blankIdx - 1); // left
  if (col < gridSize - 1) moves.push(blankIdx + 1); // right

  return moves;
}

export function canMove(tileIdx, blankIdx, gridSize) {
  const tileRow = Math.floor(tileIdx / gridSize);
  const tileCol = tileIdx % gridSize;
  const blankRow = Math.floor(blankIdx / gridSize);
  const blankCol = blankIdx % gridSize;

  return (
    (Math.abs(tileRow - blankRow) === 1 && tileCol === blankCol) ||
    (Math.abs(tileCol - blankCol) === 1 && tileRow === blankRow)
  );
}

export function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function generateLevelBoard(difficulty, levelIndex) {
  const config = DIFFICULTY_CONFIG[difficulty];
  const level = config.levels[levelIndex];
  return shuffleBoard([...GOAL_STATE], level.shuffles);
}
