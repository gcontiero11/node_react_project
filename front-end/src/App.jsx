import { useState } from 'react'
import { createSudokuBoard } from './script/creator'
import { isValidSudokuGrid } from './script/validationTests';

function App() {
  let mat = createSudokuBoard();
  console.log(mat); 
  console.log(isValidSudokuGrid(mat))
  return (
    <>
    </>
  )
}

export default App
