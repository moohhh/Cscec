import React, { useState, useEffect } from 'react';
import Navbar from './component/navbar';
import './salle.css';
import axios from 'axios';

export default function SalleAdmin() {
    const [buttonStates, setButtonStates] = useState({});


    useEffect(() => {
        const storedButtonStates = localStorage.getItem('buttonStates');
        if (storedButtonStates) {
            setButtonStates(JSON.parse(storedButtonStates));
        }
    }, []);

    const saveButtonStatesToLocalStorage = (updatedButtonStates) => {
        localStorage.setItem('buttonStates', JSON.stringify(updatedButtonStates));
    };

    const handleButtonClick = async (day, hour) => {
        const buttonId = `${day.toLowerCase()}-${hour}`;
        const isButtonClicked = buttonStates[buttonId];

        try {
            if (!isButtonClicked || isButtonClicked === RESERVE) {
                // Send reservation request
                await axios.post('http://localhost:8000/api/demande', {
                    titre: "Reservation de salle",
                    day: day,
                    hour: hour
                });
                console.log('Notification envoyée avec succès !');
                updateButtonState(buttonId, WAITING);
            } else if (isButtonClicked === WAITING) {
                // Cancel reservation request
                await axios.post('http://localhost:8000/api/annulerDemande', {
                    day: day,
                    hour: hour // ID of the notification to cancel
                });
                console.log('Notification annulée avec succès !');
                updateButtonState(buttonId, RESERVE);
            }
        } catch (error) {
            console.error('Erreur lors du traitement du clic sur le bouton :', error.response ? error.response.data : error.message);
        }
    };

    const updateButtonState = (buttonId, state) => {
        const updatedButtonStates = {
            ...buttonStates,
            [buttonId]: state
        };
        setButtonStates(updatedButtonStates);
        saveButtonStatesToLocalStorage(updatedButtonStates);
    };

    // Constantes pour les états des boutons
    const RESERVE = 'Reserver';
    const WAITING = 'En attente';

    return (
        <div>
            <Navbar />
            <h1 className='hh1'>Reserver une salle par ici</h1>
            <div className='containert'>
                <table className='tt'>
                    <thead>
                        <tr>
                            <th></th>
                            {[...Array(10)].map((_, hourIndex) => (
                                <th key={hourIndex} className='tdt'>{hourIndex + 8}H:00</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi'].map((day, dayIndex) => (
                            <tr key={dayIndex}>
                                <td className='tdt'>{day}</td>
                                {[...Array(10)].map((_, hourIndex) => (
                                    <td key={hourIndex} className='tdt'>
                                        <button
                                            onClick={() => handleButtonClick(day.toLowerCase(), hourIndex + 8)}
                                            className="btnt"
                                            style={{ backgroundColor: buttonStates[`${day.toLowerCase()}-${hourIndex + 8}`] === 'En attente' ? 'orange' : null }}
                                        >
                                            {buttonStates[`${day.toLowerCase()}-${hourIndex + 8}`] === 'En attente' ? 'En attente' : 'Reserver'}
                                        </button>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}