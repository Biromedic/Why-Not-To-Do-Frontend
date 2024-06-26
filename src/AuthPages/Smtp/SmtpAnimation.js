import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SmtpAnimation.css';
import dvdLogo from '../../Assets/dvd-logo.png.png'; 

function SmtpAnimation() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 600000);

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className="animation-container">
      <h1>Working on SMTP...</h1>
      <div className="dvd-animation">
        <img src={dvdLogo} alt="DVD Logo" />
      </div>
    </div>
  );
}
export default SmtpAnimation;