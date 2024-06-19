import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Fases from './components/Fases';
import Partida from './components/Partida'; // Importe a Partida de Sudoku aqui
import Cadastro from './components/Cadastro';
import Login from './components/Login';

function App() {
  const fases = [
    { nome: 'Fase 1',numero: 1, desbloqueada: true },
    { nome: 'Fase 2',numero: 2, desbloqueada: true },
    { nome: 'Fase 3',numero: 3, desbloqueada: true },
    { nome: 'Fase 4',numero: 4, desbloqueada: false },
    { nome: 'Fase 5',numero: 5, desbloqueada: false },
    { nome: 'Fase 6',numero: 6, desbloqueada: false },
    { nome: 'Fase 7',numero: 7, desbloqueada: false },
    { nome: 'Fase 8',numero: 8, desbloqueada: false },
    { nome: 'Fase 9',numero: 9, desbloqueada: false },
    { nome: 'Fase 10',numero: 10, desbloqueada: false },
  ];

  return (
    <div>
      <NavBar fases={fases} />
      <Routes>
        <Route path="/" element={
          <div>
            <h1>Caminho das Fases</h1>
            <Fases fases={fases} />
          </div>
        } />
        <Route path="/partida/:nomeFase/:idFase" element={<Partida />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;