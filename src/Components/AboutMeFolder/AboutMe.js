import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AboutMe.css';
import NavbarTop from '../NavbarFolder/Navbar';

function AboutMe() {
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  //const [newUsername, setNewUsername] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/user/me');
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user details:', error.message || error);
    }
  };

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/user/change-password', { oldPassword, newPassword, confirmPassword });
      if (response.status === 200) {
        setMessage('Password changed successfully!');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setMessage('Failed to reset password');
      }
    } catch (error) {
      console.error('Failed to reset password:', error.message || error);
      setMessage('Failed to reset password');
    }
  };

  /*const handleUsernameChange = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/user/change-username', { newUsername });
      setMessage('Username successfully changed');
      setTimeout(() => {
        navigate('/');
      }, 2000);  // 2 seconds delay before redirecting to the main page
    } catch (error) {
      console.error('Failed to change username:', error.message || error);
      setMessage('Failed to change username');
    }
  };
*/
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <NavbarTop />
      <div className="about-me">
        <h1>About Me</h1>
        <div className="user-details">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Surname:</strong> {user.surname}</p>
        </div>
        {/* <div className="username-change">
          <h2>Change Username</h2>
          <input 
            type="text" 
            placeholder="New Username" 
            value={newUsername} 
            onChange={(e) => setNewUsername(e.target.value)} 
          />
          <button onClick={handleUsernameChange}>Change Username</button>
        </div> */}
        <div className="password-reset">
          <h2>Reset Password</h2>
          <input 
            type="password" 
            placeholder="Old Password" 
            value={oldPassword} 
            onChange={(e) => setOldPassword(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="New Password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Confirm New Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
          <button onClick={handlePasswordReset}>Reset Password</button>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
