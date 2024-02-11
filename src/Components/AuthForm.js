import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = () => {
    const registrationSuccessMessage = document.getElementById('registrationSuccessMessage');
    const registrationFailedMessage = document.getElementById('registrationFailedMessage');
    const loginSuccessMessage = document.getElementById('loginSuccessMessage');
    const loginFailedMessage = document.getElementById('loginFailedMessage');

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    username: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/user/register', formData);
      if (response.data) {
      registrationSuccessMessage.textContent = 'Registration successful!';
      }
    } catch (error) {
      registrationFailedMessage.textContent = 'Registration Failed!';
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/user/login', formData);
      if (response.data) {
      loginSuccessMessage.textContent = 'Login successful!';
      }
    } catch (error) {
        loginFailedMessage.textContent = 'Login Failed!';
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="mt-4 mb-4">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
              <input type="text" className="form-control" id="name" name="name" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="Surname" className="form-label">Surname:</label>
              <input type="text" className="form-control" id="surname" name="surname" onChange={handleChange} required />
            </div>
            <div className="mb-3">
            <label htmlFor="Username" className="form-label">Username:</label>
            <input type="text" className="form-control" id="username" name="username" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input type="email" className="form-control" id="email" name="email" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input type="password" className="form-control" id="password" name="password" onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-secondary">Register</button>
            <p id="registrationSuccessMessage" class="text-success"></p>
            <p id="registrationFailedMessage" class="text-failed"></p>
          </form>

          <h2 className="mt-4 mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input type="email" className="form-control" id="email" name="email" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input type="password" className="form-control" id="password" name="password" onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <p id="loginSuccessMessage" class="text-success"></p>
            <p id="loginFailedMessage" class="text-failed"></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
