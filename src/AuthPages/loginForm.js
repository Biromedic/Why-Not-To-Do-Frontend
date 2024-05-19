import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './loginForm.css';
import logo from '../Assets/logo.png';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/user/login', {
        username,
        password
      });
      if (response.data && response.data.token) {
        onLogin(response.data.token);
      } else {
        console.error('Login response does not contain a token');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message || error);
      alert('Failed to login');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="form-box">
        <img src={logo} alt="Logo" className="logo" />
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
      <div className="form-switch">
        <span className="switchLink" onClick={() => navigate('/register')}>Register</span>
        <span className="switchLink" onClick={() => navigate('/forgot-password')}>Forgot Password</span>
      </div>
    </div>
  );
}

export default LoginForm;
