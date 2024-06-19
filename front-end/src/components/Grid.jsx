import React from "react";
import "./Grid.css";

const Grid = ({ sudoku, sudokuInicial, onClickCell, selectedCell, invalidCells }) => {
  return (
    <div className="grid">
      {Object.keys(sudoku).map((lineKey, index) => (
        <div key={index} className="row">
          {sudoku[lineKey].map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`cell 
                ${sudokuInicial[lineKey][cellIndex] !== -1 ? "immutable" : ""}
                ${
                  selectedCell &&
                  selectedCell.lineKey === lineKey &&
                  selectedCell.colIndex === cellIndex
                    ? "selected"
                    : ""
                }
                ${
                  invalidCells.some(
                    invalidCell =>
                      invalidCell.lineKey === lineKey &&
                      invalidCell.colIndex === cellIndex
                  )
                    ? "invalid"
                    : ""
                }
              `}
              onClick={() =>
                sudokuInicial[lineKey][cellIndex] === -1 &&
                onClickCell(lineKey, cellIndex)
              }
            >
              {cell === -1 ? " " : cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;