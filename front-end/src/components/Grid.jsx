import React from 'react';
import './Grid.css';

const sudokuInicial = {
  line0: [8, 5, 7, -1, -1, -1, 9, 3, -1],
  line1: [7, -1, -1, 1, -1, -1, -1, 8, -1],
  line2: [1, 6, 4, 9, 8, 3, -1, -1, -1],
  line3: [3, -1, 1, -1, 2, 7, -1, -1, -1],
  line4: [-1, -1, 6, -1, -1, 5, 4, -1, -1],
  line5: [-1, -1, 8, -1, -1, 9, 7, 1, 6],
  line6: [4, -1, 9, -1, -1, -1, -1, -1, -1],
  line7: [-1, -1, -1, 5, 6, 4, 3, 9, 7],
  line8: [6, 5, 7, 3, 9, 1, -1, 4, -1],
};

const Grid = ({ sudoku, onClickCell }) => {
  return (
    <div className="grid">
      {Object.keys(sudoku).map((lineKey, index) => (
        <div key={index} className="row">
          {sudoku[lineKey].map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`cell ${sudokuInicial[lineKey][cellIndex] !== -1 ? 'immutable' : ''}`}
              onClick={() => sudokuInicial[lineKey][cellIndex] === -1 && onClickCell(lineKey, cellIndex)}
            >
              {cell === -1 ? ' ' : cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;