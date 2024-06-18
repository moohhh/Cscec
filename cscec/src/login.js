import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const [mp_status, setMp_status] = useState(0);
  const [grade, setGrade] = useState('');
  const [id, setId] = useState('');
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

  const info = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/getInfo', {
        nom: localStorage.getItem('nom'),
        email: localStorage.getItem('email'),
      });
      localStorage.setItem('id', response.data.id);
    } catch (error) {
      console.error('Error getting additional info:', error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const loginResponse = await axios.post('http://localhost:8000/api/login', {
        nom: nom,
        email: email,
        password: password,
      });
      {

        // Stocker les informations de connexion dans le stockage local
        localStorage.setItem('nom', loginResponse.data.employé.nom);
        localStorage.setItem('email', loginResponse.data.employé.email);
        localStorage.setItem('mp_status', loginResponse.data.employé.mp_status);
        localStorage.setItem('grade', loginResponse.data.employé.grade);
        localStorage.setItem('id', loginResponse.data.employé.id);


        // Vérification du mp_status pour demander le changement de mot de passe


        // Appel de la fonction getInfo pour récupérer les autres informations
        const infoResponse = await axios.post('http://localhost:8000/api/getInfo', {
          nom: loginResponse.data.employé.nom,
          email: loginResponse.data.employé.email,
        });

        if (loginResponse.data.employé.mp_status === '1') {
          alert('C\'est votre première connexion. Veuillez changer votre mot de passe.');

        }
        // Redirection en fonction du grade de l'utilisateur
        if (loginResponse.data.employé.grade === "admin") {
          navigate('/accueilladmin');
        } else {
          navigate('/accueillconnecter');
        }
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
        <img src={require('./images/per.jpg')} alt='' className="img" />
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
        {error && <p className="error">{error}</p>}
        <button className="oublier">J'ai oublié mon mot de passe!</button>
        <button className="connectbtn" onClick={handleLogin}>Se connecter</button>
      </div>
    </div>
  );
};

export default Login;
