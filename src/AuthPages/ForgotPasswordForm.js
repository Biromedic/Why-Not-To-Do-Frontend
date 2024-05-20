import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginForm.css';

function ForgotPasswordForm({ onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
      navigate('/smtp-animation');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="form-box">
        <div>
          <label>Email:</label>
          <input
            className='loginInput'
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <button className='loginButton' type="submit">Send Reset Instructions</button>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
