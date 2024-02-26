import React, { useState } from 'react';
import './LoginPage.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); 

    try {
      const response = await axios.post('http://localhost:8080/api/user/login', formData);
      
      if (response.data) {
        setMessage('Login successful!');
        await sleep(3000)
        navigate('/home');
      }
    } catch (error) {
      setMessage('Login Failed! ' + (error.response?.data?.message || 'An unexpected error occurred'));
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
      <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <div className="mb-3">

          <input type="password" className="form-control" id="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Log In</button>
        {message && <div className="message">{message}</div>}
      </form>
      <div className="links">
        <a href="/register">Create an account</a>
        <a href="/forgot-password">Forgot password?</a>
      </div>
    </div>
  );
}

export default LoginPage;
