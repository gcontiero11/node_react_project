import React, { useState, useEffect } from "react";
import "./Partida.css";
import Grid from "./Grid";
import api from "./axios/api";
import { useParams } from "react-router-dom";

const Partida = () => {
  let { idFase } = useParams();
  const [initialSudoku, setInitialSudoku] = useState([]);
  const [sudoku, setSudoku] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [invalidCells, setInvalidCells] = useState([]);

  useEffect(() => {
    const carregaGridInicial = async () => {
      const json = await api.get("http://localhost:8000/grid/" + idFase);
      const response = await json.data;
      setInitialSudoku(response);
      setSudoku(response);
      setIsLoading(false);
    };
    carregaGridInicial();
  }, [idFase]);

  const recarregaGridInicial = async () => {
    const json = await api.get("http://localhost:8000/grid/" + idFase);
    const response = await json.data;
    setInitialSudoku(response);
    setIsLoading(false);
  };

  const validateNumber = (lineKey, colIndex, value) => {
    const line = sudoku[lineKey];
    const column = Object.keys(sudoku).map(key => sudoku[key][colIndex]);
    const startRow = Math.floor(lineKey.slice(-1) / 3) * 3;
    const startCol = Math.floor(colIndex / 3) * 3;
    const block = [];

    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        block.push(sudoku[`line${i}`][j]);
      }
    }

    if (
      line.includes(value) ||
      column.includes(value) ||
      block.includes(value)
    ) {
      return false;
    }
    return true;
  };

  const handleChange = (lineKey, colIndex, value) => {
    const newSudoku = { ...sudoku };
    newSudoku[lineKey][colIndex] = value;
    setSudoku(newSudoku);

    if (value === -1) {
      setInvalidCells(invalidCells.filter(
        cell => !(cell.lineKey === lineKey && cell.colIndex === colIndex)
      ));
    } else if (!validateNumber(lineKey, colIndex, value)) {
      setInvalidCells([...invalidCells, { lineKey, colIndex }]);
    } else {
      setInvalidCells(invalidCells.filter(
        cell => !(cell.lineKey === lineKey && cell.colIndex === colIndex)
      ));
    }
  };

  const handleCellClick = (lineKey, colIndex) => {
    if (initialSudoku[lineKey][colIndex] === -1) {
      setSelectedCell({ lineKey, colIndex });
    }
  };

  const handleNumberSelect = (number) => {
    if (selectedCell) {
      const { lineKey, colIndex } = selectedCell;
      handleChange(lineKey, colIndex, number);
      recarregaGridInicial();
    }
  };

  const clearSelectedNumber = () => {
    setSelectedCell(null);
  };

  const handleDeleteNumber = () => {
    if (selectedCell) {
      const { lineKey, colIndex } = selectedCell;
      handleChange(lineKey, colIndex, -1);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  } else {
    return (
      <div className="partida-container">
        <h2>Sudoku</h2>
        <Grid
          sudoku={sudoku}
          sudokuInicial={initialSudoku}
          onClickCell={handleCellClick}
          selectedCell={selectedCell}
          invalidCells={invalidCells}
        />
        <div className="number-buttons">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <button
              key={number}
              className={`number-button ${selectedCell ? "" : "disabled"}`}
              onClick={() => handleNumberSelect(number)}
              disabled={!selectedCell}
            >
              {number}
            </button>
          ))}
          <button
            key="clear"
            className="number-button"
            onClick={clearSelectedNumber}
          >
            Limpar
          </button>
          <button
            key="delete"
            className="number-button"
            onClick={handleDeleteNumber}
          >
            Apagar
          </button>
        </div>
      </div>
    );
  }
};

export default Partida;