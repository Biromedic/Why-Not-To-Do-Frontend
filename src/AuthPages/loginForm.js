import React, { useState } from 'react';
import axios from 'axios';
import './loginForm.css';
import logo from '../Assets/logo.png';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/user/login', {
        username,
        password
      });
      onLogin(response.data.token);
    } catch (error) {
      console.error('Login failed:', error.response.data);
      alert('Failed to login');
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <form onSubmit={handleSubmit} className="form-box">
        <div>
          <label>Username:</label>
          <input
            className='loginInput'
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button className='loginButton' type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginForm;
