import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      // Make a POST request to the login endpoint with email and password data
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: email,
        password: password,
      });
  
      // Log the response data to the console
      console.log(response.data);
      navigate('/');
      // Handle further actions with the token if needed
      // (You might want to store the token in state or local storage for authentication purposes)
  
    } catch (error) {
      // Log any errors that occur during the login process
      console.error('Error during login:', error.message);
  
      // Handle error display
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred during login.');
      }
  
      // Clear input fields and error after a failed login attempt
      setEmail('');
      setPassword('');
    }
  };
  
  return (
    <>
      <div className='img'>
          <img src={require('./images/back2.gif')} alt="" className='back' />
        </div>
      <div className="fields">
        <label>Email</label>
        <br />
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter email"
          className="emailin"
        />
        <br />
        <label>Mot de passe</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
          className="mp"
        />
        <br />
        {error && <div className="error-message">{error}</div>}
        <br />
        <button className="oublier">Mot de passe oublié?</button>
        <br />
        <button className="connecter" onClick={handleLogin}>
          Se connecter
        </button>
      </div>
    </>
  );
};

export default Login;
