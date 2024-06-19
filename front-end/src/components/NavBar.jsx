import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ fases }) => {
  const navigate = useNavigate();

  const handleNavigateToFases = () => {
    navigate('/');
  };

  const handleNavigateToNextPhase = () => {
    const ultimaFaseDesbloqueada = fases.slice().reverse().find(fase => fase.desbloqueada);
    if (ultimaFaseDesbloqueada) {
      navigate(`/partida/${ultimaFaseDesbloqueada.nome}/${ultimaFaseDesbloqueada.numero}`);
    }
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  const handleNavigateToCadastro = () => {
    navigate('/cadastro');
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <button className="navbar-button" onClick={handleNavigateToFases}>Fases</button>
        <button className="navbar-button special" onClick={handleNavigateToNextPhase}>Jogar Próxima Fase</button>
      </div>
      <div className="navbar-right">
        <button className="navbar-button" onClick={handleNavigateToCadastro}>Cadastrar</button>
        <button className="navbar-button" onClick={handleNavigateToLogin}>Logar</button>
      </div>
    </div>
  );
};

export default NavBar;