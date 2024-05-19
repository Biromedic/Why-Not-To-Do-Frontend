import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './loginForm.css';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/user/register', {
        username,
        password,
        email,
        name,
        surname
      });
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message || error);
      alert('Failed to register');
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
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Surname:</label>
          <input
            type="text"
            value={surname}
            onChange={e => setSurname(e.target.value)}
            required
          />
        </div>
        <button className='loginButton' type="submit">Register</button>
      </form>
      <button className="switchButton" onClick={() => navigate('/login')}>Back to Login</button>
    </div>
  );
}

export default RegisterForm;
