import React, { useState } from 'react';
import axios from 'axios';
import './loginForm.css';

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
      console.log('Login response:', response);

      if (response && response.data && response.data.token) {
        onLogin(response.data.token);
      } else {
        throw new Error('Invalid login response');
      }
    } catch (error) {
      console.error('Login failed:', error.message || error);
      alert('Failed to login');
    }
  };

  return (
    <div className="login-container">
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
