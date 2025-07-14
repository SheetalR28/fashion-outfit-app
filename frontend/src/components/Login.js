import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    await axios.post('http://localhost:5000/login', { username, password: 'dummy' });
    navigate('/dashboard');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Login</h2>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
