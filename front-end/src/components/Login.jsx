import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import api from './axios/api';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('http://localhost:8000/user/login', { name, password });
      console.log('Login realizado com sucesso:', response.data);
      navigate('/');
    } catch (err) {
      setError('Falha no login. Verifique suas credenciais.');
      console.error('Erro ao fazer login:', err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Logar</button>
      </form>
    </div>
  );
};

export default Login;