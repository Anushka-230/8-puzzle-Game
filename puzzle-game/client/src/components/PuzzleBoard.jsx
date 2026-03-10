import React from 'react';

export default function PuzzleBoard({ board, gridSize, onTileClick, selectedTile, onSelectTile, solved }) {
  const blankIdx = board.indexOf(0);

  return (
    <div
      className="puzzle-board"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gap: '6px',
        width: '100%',
        maxWidth: gridSize === 3 ? '360px' : '480px',
        margin: '0 auto',
      }}
    >
      {board.map((value, idx) => {
        const isBlank = value === 0;
        const isSelected = selectedTile === idx;
        const isAdjacent = !isBlank && Math.abs(idx - blankIdx) === 1 &&
          Math.floor(idx / gridSize) === Math.floor(blankIdx / gridSize) ||
          Math.abs(idx - blankIdx) === gridSize;

        return (
          <div
            key={idx}
            className={`tile ${isBlank ? 'tile-blank' : 'tile-filled'} ${isSelected ? 'tile-selected' : ''} ${isAdjacent && !isBlank ? 'tile-adjacent' : ''} ${solved && !isBlank ? 'tile-solved' : ''}`}
            onClick={() => {
              if (!isBlank) {
                onSelectTile(idx);
                onTileClick(idx);
              }
            }}
            tabIndex={isBlank ? -1 : 0}
            onFocus={() => !isBlank && onSelectTile(idx)}
            aria-label={isBlank ? 'Empty space' : `Tile ${value}`}
          >
            {!isBlank && (
              <span className="tile-number">{value}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
