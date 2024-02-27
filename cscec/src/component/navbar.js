import React, { useState, useEffect } from 'react';
import './navbar.css';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const [donnees, setDonnees] = useState([]);
  const [buttonStates, setButtonStates] = useState({});


  useEffect(() => {
    axios.get('http://localhost:8000/api/show')
      .then(response => {
        setDonnees(response.data);
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
      
}, []);
const formatTime = (timestamp) => {
  const createdAtDate = new Date(timestamp);
  const hours = createdAtDate.getHours().toString().padStart(2, '0');
  const minutes = createdAtDate.getMinutes().toString().padStart(2, '0');
  const seconds = createdAtDate.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

const updateButtonState = (day, hour, status) => {
  const buttonId = `${day.toLowerCase()}-${hour}`;
  const updatedButtonStates = {
      ...buttonStates,
      [buttonId]: status === 'validated' ? 'green' : status === 'refused' ? 'red' : 'orange'
  };
  setButtonStates(updatedButtonStates);
};

const handleValidation = (day, hour) => {
    axios.post('http://localhost:8000/api/validation', {
        day: day,
        hour: hour,
        action: 'valider' // Indiquer que la demande est validée
    })
    .then(response => {
        console.log('Validation successful!');
        updateButtonState(day, hour, 'validated');
    })
    .catch(error => {
        console.error('Error validating:', error);
    });
};

const handleRefusal = (day, hour) => {
    axios.post('http://localhost:8000/api/validation', {
        day: day,
        hour: hour,
        action: 'refuser' // Indiquer que la demande est refusée
    })
    .then(response => {
        console.log('Refusal successful!');
        updateButtonState(day, hour, 'refused');
    })
    .catch(error => {
        console.error('Error refusing:', error);
    });
};


  return (

    <>
    <div>
      <nav className='nav'>
        <img src={require('../images/cscec logo2.jpg')} alt="" className='logo' height={100}onClick={() => navigate('/')} />
        <ul>
          <li><a href=""> ressource humaine</a>
          <ul className='rh'>
          <li><a href="./demandeDocuments">demande document</a></li>
          <li><a href="">congé</a></li>
            <li><a href="">heure sup</a></li>
          </ul>
          
          </li>
          <li> <a href="">moyens generaux</a>
          <ul className='rh'>
          <li><a href=""> demande de chaufeur</a></li>
          <li><a href="">consemable</a></li>
            <li><a href="./demandesalleAdmin">salle de réunion</a></li>
            <li><a href="">autre</a></li>

          </ul>
          </li>
          <li><a href="">finance</a>
          <ul className='rh'>
          <li><a href=""> Paiement</a></li>

          </ul>
          </li>
          <li><a href="">Documantation</a>
          <ul className='rh'>
          <li><button>Interne</button>
          <ul className='rh2'>
          <li><a href="">Reglement</a></li>
            <li><a href="">Procédure</a></li> </ul></li> 
          <li><a href="">Externe</a></li>
            

          </ul>
          </li>
          <li>
    <button className='connecter2' onClick={() => navigate('')}>notification</button>
    <ul className='notif'>
      <p className='notifp'>NOTIFICATIONS</p>
        {donnees.map((notification, index) => (
            <div key={index} className='notifcontent'>
            <p className='notifid'>ID: {notification.id}</p>
            <p>Titre: {notification.data.titre} le: {notification.data.day} à: {notification.data.hour}h</p>
            <p className='notiftime'>{formatTime(notification.created_at)}</p>
           
        </div>
        ))}
    </ul>
</li>



          <li>    <button className='connecter2'onClick={() => navigate('/login')} >se connecter</button>
</li>
        </ul>
      </nav>
     
      </div>
     
      </>
  )
  
}

export default Navbar;
