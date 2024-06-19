import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Fases.css';

const Fases = ({ fases }) => {
  const navigate = useNavigate();

  const handleFaseClick = (nomeFase, desbloqueada) => {
    if (desbloqueada) {
      navigate(`/partida/${nomeFase}`);
    }
  };

  return (
    <div className="fases-container">
      {fases.map((fase, index) => (
        <div
          key={index}
          className={`fase ${fase.desbloqueada ? 'desbloqueada' : 'bloqueada'}`}
          onClick={() => handleFaseClick(fase.nome, fase.desbloqueada)}
        >
          {fase.nome}
        </div>
      ))}
    </div>
  );
};

export default Fases;