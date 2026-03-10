import { useState, useEffect, useCallback, useRef } from 'react';
import { canMove, isSolved, DIFFICULTY_CONFIG, generateLevelBoard, formatTime } from '../utils/puzzleUtils';

export function usePuzzle(difficulty, levelIndex) {
  const config = DIFFICULTY_CONFIG[difficulty];
  const level = config.levels[levelIndex];
  const gridSize = config.gridSize;

  const [initialBoard] = useState(() => generateLevelBoard(difficulty, levelIndex));
  const [board, setBoard] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [solved, setSolved] = useState(false);
  const [selectedTile, setSelectedTile] = useState(null);
  const timerRef = useRef(null);

  // Initialize board
  useEffect(() => {
    setBoard([...initialBoard]);
    setMoves(0);
    setTime(0);
    setIsRunning(false);
    setSolved(false);
    setSelectedTile(null);
  }, [initialBoard]);

  // Timer
  useEffect(() => {
    if (isRunning && !solved) {
      timerRef.current = setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, solved]);

  const moveTile = useCallback((tileIdx) => {
    const blankIdx = board.indexOf(0);
    if (!canMove(tileIdx, blankIdx, gridSize)) return;

    const next = [...board];
    [next[blankIdx], next[tileIdx]] = [next[tileIdx], next[blankIdx]];

    setBoard(next);
    setMoves(m => m + 1);
    if (!isRunning) setIsRunning(true);

    if (isSolved(next)) {
      setSolved(true);
      setIsRunning(false);
    }
  }, [board, gridSize, isRunning]);

  const restart = useCallback(() => {
    setBoard([...initialBoard]);
    setMoves(0);
    setTime(0);
    setIsRunning(false);
    setSolved(false);
    setSelectedTile(null);
  }, [initialBoard]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (solved) return;

      const blankIdx = board.indexOf(0);
      if (blankIdx === -1) return;

      let targetIdx = -1;

      switch (e.key) {
        case 'ArrowUp':
          // Move tile below blank UP (blank moves down)
          if (blankIdx + gridSize < board.length) targetIdx = blankIdx + gridSize;
          break;
        case 'ArrowDown':
          // Move tile above blank DOWN (blank moves up)
          if (blankIdx - gridSize >= 0) targetIdx = blankIdx - gridSize;
          break;
        case 'ArrowLeft':
          // Move tile to the right of blank LEFT
          if (blankIdx % gridSize < gridSize - 1) targetIdx = blankIdx + 1;
          break;
        case 'ArrowRight':
          // Move tile to the left of blank RIGHT
          if (blankIdx % gridSize > 0) targetIdx = blankIdx - 1;
          break;
        case 'Enter':
        case ' ':
          if (selectedTile !== null) moveTile(selectedTile);
          e.preventDefault();
          return;
        default:
          return;
      }

      if (targetIdx !== -1) {
        e.preventDefault();
        moveTile(targetIdx);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [board, gridSize, solved, moveTile, selectedTile]);

  return {
    board,
    moves,
    time,
    formattedTime: formatTime(time),
    isRunning,
    solved,
    gridSize,
    level,
    selectedTile,
    setSelectedTile,
    moveTile,
    restart,
  };
}