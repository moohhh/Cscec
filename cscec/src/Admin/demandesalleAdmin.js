import React, { useState, useEffect } from 'react';
import Navbar from '../component/navbarconnecter';
import './demandesalleAdmin.css';
import axios from 'axios';

export default function DemandeSalleAdmin() {
  const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi'];
  const heures = Array.from({ length: 10 }, (_, i) => 8 + i);
  const [selectedSalle, setSelectedSalle] = useState('Salle A');
  
  const initialButtonState = (salle) => {
    const savedState = localStorage.getItem(`buttonState${salle}`);
    return savedState ? JSON.parse(savedState) : jours.map(() => Array(heures.length).fill(false));
  };

  const [buttonStateSalleA, setButtonStateSalleA] = useState(initialButtonState('SalleA'));
  const [buttonStateSalleB, setButtonStateSalleB] = useState(initialButtonState('SalleB'));
  const [buttonStateSalleC, setButtonStateSalleC] = useState(initialButtonState('SalleC'));
  const [buttonStateSalleD, setButtonStateSalleD] = useState(initialButtonState('SalleD'));

  useEffect(() => {
    localStorage.setItem('buttonStateSalleA', JSON.stringify(buttonStateSalleA));
    localStorage.setItem('buttonStateSalleB', JSON.stringify(buttonStateSalleB));
    localStorage.setItem('buttonStateSalleC', JSON.stringify(buttonStateSalleC));
    localStorage.setItem('buttonStateSalleD', JSON.stringify(buttonStateSalleD));

  }, [buttonStateSalleA, buttonStateSalleB, buttonStateSalleC, buttonStateSalleD]);
 

  const handleSalleChange = (e) => {
    setSelectedSalle(e.target.value);
  };

  const handleButtonClick = async (indexJour, indexHeure, salle) => {
    // Example data - you might want to replace these with actual dynamic values
    const employe_id = localStorage.getItem('id'); // Récupérer l'ID de l'employé du stockage local
    const title = `Reservation de la salle ${salle}`;
    const description = `Reservation de la salle  ${salle} le  ${jours[indexJour]} à ${heures[indexHeure]}H:00`;

    try {
        await axios.post('http://localhost:8000/api/demande', {
            employe_id,
            title,
            description
        });

        // Here you can handle the state update to reflect the change on the UI,
        // like showing the reservation as pending or confirmed based on the response.
        alert('Reservation request sent successfully!');
    } catch (error) {
        console.error("Error sending reservation request:", error.response.data.message);
        alert('Failed to send reservation request.');
    }

    let newState;
    switch(salle) {
      case 'Salle A':
        newState = buttonStateSalleA.map((row, i) =>
          i === indexJour ? row.map((col, j) => (j === indexHeure ? !col : col)) : row
        );
        setButtonStateSalleA(newState);
        break;
      case 'Salle B':
        newState = buttonStateSalleB.map((row, i) =>
          i === indexJour ? row.map((col, j) => (j === indexHeure ? !col : col)) : row
        );
        setButtonStateSalleB(newState);
        break;
      case 'Salle C':
        newState = buttonStateSalleC.map((row, i) =>
          i === indexJour ? row.map((col, j) => (j === indexHeure ? !col : col)) : row
        );
        setButtonStateSalleC(newState);
        break;
      case 'Salle D':
        newState = buttonStateSalleD.map((row, i) =>
          i === indexJour ? row.map((col, j) => (j === indexHeure ? !col : col)) : row
        );
        setButtonStateSalleD(newState);
        break;
      default:
        break;
    }
  };

  const renderTable = () => {
    switch (selectedSalle) {
      case 'Salle A':
        return (
          <table className='tt'>
            <thead>
              <tr>
                <th className='tdt'>Jour / Heure</th>
                {heures.map((heure, index) => (
                  <th key={index} className='tdt'>{heure}H:00</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jours.map((jour, indexJour) => (
                <tr key={indexJour}>
                  <td className='tdt'>{jour}</td>
                  {heures.map((heure, indexHeure) => (
                    <td key={indexHeure} className=''>
                     <button 
                      onClick={() => handleButtonClick(indexJour, indexHeure, 'Salle A')}
                      className={buttonStateSalleA[indexJour][indexHeure] ? 'orangeBackground ' : 'btnt'}
                    >
                      {buttonStateSalleA[indexJour][indexHeure] ? 'En Attente' : 'Reserver'}
                    </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
        case 'Salle B':
            return (
              <table className='tt'>
                <thead>
                  <tr>
                    <th className='tdt'>Jour / Heure</th>
                    {heures.map((heure, index) => (
                      <th key={index} className='tdt'>{heure}H:00</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {jours.map((jour, indexJour) => (
                    <tr key={indexJour}>
                      <td className='tdt'>{jour}</td>
                      {heures.map((heure, indexHeure) => (
                        <td key={indexHeure} className=''>
                          <button 
                            onClick={() => handleButtonClick(indexJour, indexHeure, 'Salle B')}
                            className={buttonStateSalleB[indexJour][indexHeure] ? 'orangeBackground btnt' : 'btnt'}
                          >
                            {buttonStateSalleB[indexJour][indexHeure] ? 'En Attente' : 'Reserver'} 
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          case 'Salle C':
            return (
              <table className='tt'>
     <thead>
                  <tr>
                    <th className='tdt'>Jour / Heure</th>
                    {heures.map((heure, index) => (
                      <th key={index} className='tdt'>{heure}H:00</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {jours.map((jour, indexJour) => (
                    <tr key={indexJour}>
                      <td className='tdt'>{jour}</td>
                      {heures.map((heure, indexHeure) => (
                        <td key={indexHeure} className=''>
                          <button 
                            onClick={() => handleButtonClick(indexJour, indexHeure, 'Salle C')}
                            className={buttonStateSalleC[indexJour][indexHeure] ? 'orangeBackground ' : 'btnt'}
                          >
                            {buttonStateSalleC[indexJour][indexHeure] ? 'En Attente' : 'Reserver'} 
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>          </table>
            );
          case 'Salle D':
            return (
              <table className='tt'>
     <thead>
                  <tr>
                    <th className='tdt'>Jour / Heure</th>
                    {heures.map((heure, index) => (
                      <th key={index} className='tdt'>{heure}H:00</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {jours.map((jour, indexJour) => (
                    <tr key={indexJour}>
                      <td className='tdt'>{jour}</td>
                      {heures.map((heure, indexHeure) => (
                        <td key={indexHeure} className=''>
                          <button 
                            onClick={() => handleButtonClick(indexJour, indexHeure, 'Salle D')}
                            className={buttonStateSalleD[indexJour][indexHeure] ? 'orangeBackground btnt' : 'btnt'}
                          >
                            {buttonStateSalleD[indexJour][indexHeure] ? 'En Attente' : 'Reserver'} 
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>          </table>
            );
          default:
            return null;
        }
      };
      
  
  return (
    <div>
      <Navbar />
      <h1 className='hh1'>Reserver une salle par ici</h1>
      <select name="salle" id="" value={selectedSalle} onChange={handleSalleChange}className='select'>
          <option value="Salle A">Salle A</option>
          <option value="Salle B">Salle B</option>
          <option value="Salle C">Salle C</option>
          <option value="Salle D">Salle D</option>
        </select>
      <div className='containert'>
       
        {/* Appeler la fonction pour afficher le tableau correspondant */}
        {renderTable()}
      </div>
    </div>
  );
}
