import React, { useState } from 'react';
import './Cadastro.css';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (senha !== confirmacaoSenha) {
      alert('As senhas não coincidem');
      return;
    }
    // Lógica de cadastro aqui
    console.log('Cadastro realizado com sucesso:', { nome, senha });
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmação de Senha"
          value={confirmacaoSenha}
          onChange={(e) => setConfirmacaoSenha(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;