import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { Navigate, useNavigate } from 'react-router-dom';

  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nom, setNom] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleNomChange = (e) => {
      setNom(e.target.value);
    };
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/login', {
          nom: nom,
          email: email,
          password: password,
        });
        console.log(response.data);
        if (email=== "moh@gmail.com") {
            navigate('/accueilladmin');
        } else {
            navigate('/');
        }
        
      } catch (error) {
        console.error('Error during login:', error.message);
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('An error occurred during login.');
        }
        setEmail('');
        setPassword('');
        setNom('');
      }
    };
    
    return (
      <div className="containerleft">
        <div className="image">
          <img src={require('./images/per.jpg')} alt='' className="img"/>  
        </div>
        <div className="fields">
          <h1>Welcome to CSCEC team</h1>
          <h3>Remplit les cases avec vos informations</h3>
          <input 
            type="text" 
            placeholder="Nom" 
            className="nom" 
            value={nom}
            onChange={handleNomChange}
          />
          <input 
            type="email" 
            placeholder="Email" 
            className="email" 
            value={email} 
            onChange={handleEmailChange} 
          />
          <input 
            type="password" 
            placeholder="Mot de pass" 
            className="password" 
            value={password} 
            onChange={handlePasswordChange} 
          />
           {error && <p className="error">{error}</p>} {/* Afficher le message d'erreur s'il y en a un */}
          <button className="oublier">J'ai oublié mon mot de passe!</button>
          <button className="connectbtn" onClick={handleLogin}>Se connecter</button>
        </div>
      </div>
    );
  };
  
export default Login;
