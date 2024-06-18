import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './component/card.css'; // Make sure the path to your CSS file is correct

// Define Card component separately
function Card({ donnee }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this evenement?')) {
      axios.post('http://localhost:8000/api/supprimerevenment', { id })
        .then(response => {
          alert(response.data.message);
          window.location.reload();

        })
        .catch(error => {
          console.error('Error deleting evenement:', error);
          alert('An error occurred while deleting the project.');
        });
    }
  };
  return (
    <div
      className={`card ${isFlipped ? 'flipped' : ''}`}
      onClick={handleCardFlip}
    >
      <div className="card-inner">
        <div className="card-front">
          <div className="cardpic" style={{ backgroundImage: `url(${donnee.lien_photo})` }} >
            <div className="cardtitle"><p className='tit'>{donnee.titre}</p> <br /><p className='datepost'>{formatDate(donnee.created_at)}</p> </div>
            <p className='flip'>Afficher plus</p>
          </div>

        </div>
        <div className="card-back">
          <div className='cardpicb'><img src={donnee.lien_photo} alt="" />
          </div>
          <div className="cardtitleb">{donnee.titre}</div>
          <div className="carddescription">
            <p>{donnee.description}</p>
          </div>
          <div>{localStorage.getItem('grade') === 'superieur TC' && (
            <button className="supprimerevenment" onClick={() => handleDelete(donnee.id)}>suprimer</button>
          )}</div>
        </div>
      </div>
    </div>
  );
}

function Afficher() {
  const [donnees, setDonnees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/afficherTableevenemet')
      .then(response => {
        setDonnees(response.data);
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
  }, []);

  return (
    <div className="card-container">
      {donnees.map(donnee => (
        <Card key={donnee.id} donnee={donnee} />
      ))}
    </div>
  );
}

export default Afficher;
