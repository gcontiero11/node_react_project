import React, { useState } from 'react';
import './Partida.css';
import Grid from './Grid';

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

const Partida = () => {
  const [sudoku, setSudoku] = useState(sudokuInicial);
  const [selectedNumber, setSelectedNumber] = useState(null);

  const handleChange = (lineKey, colIndex, value) => {
    const newSudoku = { ...sudoku };
    newSudoku[lineKey][colIndex] = value;
    setSudoku(newSudoku);
  };

  const handleNumberSelect = (number) => {
    setSelectedNumber(number);
  };

  const handleCellClick = (lineKey, colIndex) => {
    if (selectedNumber !== null && sudoku[lineKey][colIndex] === -1) {
      handleChange(lineKey, colIndex, selectedNumber);
    }
  };

  const clearSelectedNumber = () => {
    setSelectedNumber(null);
  };

  const handleNewGame = () => {
    setSudoku(sudokuInicial);
  };

  return (
    <div className="partida-container">
      <h2>Sudoku</h2>
      <Grid sudoku={sudoku} onClickCell={handleCellClick} />
      <div className="number-buttons">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <button
            key={number}
            className={`number-button ${number === selectedNumber ? 'selected' : ''}`}
            onClick={() => handleNumberSelect(number)}
          >
            {number}
          </button>
        ))}
        <button key="clear" className="number-button" onClick={clearSelectedNumber}>
          Limpar
        </button>
      </div>
      <button className="clear-button" onClick={handleNewGame}>
        Novo Jogo
      </button>
    </div>
  );
};

export default Partida;