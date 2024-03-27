import React, { useState } from 'react';
import './demandeChaffeur.css';
import Navbar from './component/navbarconnecter';
import axios from 'axios';

function DemandeChauffeur() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [numero, setNumero] = useState('');
  const [tripType, setTripType] = useState('Aller simple');
  
  // Assume 'employeId' is available and valid, replace with actual logic to retrieve it
  const employe_id = localStorage.getItem('id'); // Récupérer l'ID de l'employé du stockage local
  
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();    
    try {
      const response = await axios.post('http://localhost:8000/api/demandechaffeur', {
        employé_id: employe_id,
        date,
        heure: time,
        destination, // Corrected key based on the expected API format
        depart: departure,
        telephone: numero,
        type: tripType
      });
      
      console.log(response.data.message);
      alert('Demande created successfully!');
    } catch (error) {
      console.error('There was an error!', error.response);
      alert(error.response.data.message || 'Failed to create demande.');
    }
  };
  return (
    <><Navbar />
      <div className="image">
        <img src={require('./images/chaffeur.jpg')} alt='' className="img" />
      </div>
    <div className="reservation-form">
      <form onSubmit={handleSubmit}>
      <div className="input-group">
  <div className="input-labels">
    <label htmlFor="date">Date</label>
    <label htmlFor="time">Heure</label>
  </div>
  <div className="input-fields">
    <input
      type="date"
      id="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />
    <input
      type="time"
      id="time"
      value={time}
      onChange={(e) => setTime(e.target.value)}
    />
  </div>
</div>


        <div className="input-group">
          <label htmlFor="departure">Lieu de départ</label>
          <input
            type="text"
            id="departure"
            placeholder="Indiquez un lieu"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="destination">Lieu de destination</label>
          <input
            type="text"
            id="destination"
            placeholder="Indiquez un lieu"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            />
            
            </div>
            <div className="input-group">
          <label htmlFor="numero">Votre numero</label>
          <input
            type="tel"
            id="numero"
            placeholder="Indiquez votre numero"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}

            />
            
            </div>
            <div className="input-group">
      <label htmlFor="tripType">Type de trajet</label>
      <select
        id="tripType"
        value={tripType}
        onChange={(e) => setTripType(e.target.value)}
      >
        <option value="Aller simple">Aller simple</option>
        <option value="Aller retour">Aller retour</option>
        <option value="Autre">Autre</option>
        {/* Add additional trip types as needed */}
      </select>
    </div>
    <button type="submit" className="enregistre-button" onClick={handleSubmit}>
Enregistrer la demande    </button>
    <button type="submit" className="reserve-button"onClick={handleSubmit}>
      
      Réserver maintenant
    </button>
  </form>
</div>
</>
  );
};

export default DemandeChauffeur;