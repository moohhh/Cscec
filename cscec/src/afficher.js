// src/Page.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './component/card.css'; // Assurez-vous que le chemin vers votre fichier CSS est correct

function Afficher() { // Renommé Aficher en Afficher
  const [donnees, setDonnees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/afficherTable')
      .then(response => {
        setDonnees(response.data);
      })
      .catch(error => {
        console.error('Une erreur s\'est produite:', error);
      });
  }, []);

  return (
    <div>
      <h1>Nauvauté</h1>
      <div className="card-container">
        {donnees.map(donnee => (
          <div className='first' key={donnee.id}>
            <div className='card'>
              <div className='cardpic'>{donnee.img}
              </div>
              <div className='cardtitle'>{donnee.titre}</div>
              <div className='carddescription'>
                <p>{donnee.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Afficher;
