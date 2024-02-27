import React, { useState, useEffect } from 'react';
import Navbar from '../component/navbar';
import './demandesalleAdmin.css';
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
            if (!isButtonClicked || isButtonClicked === 'Reserver') {
                // Envoyer une demande de réservation
                await axios.post('http://localhost:8000/api/demande', {
                    titre: "Reservation de salle",
                    day: day,
                    hour: hour
                });
                console.log('Notification envoyée avec succès !');

                // Mettre à jour l'état du bouton à "En attente"
                const updatedButtonStates = {
                    ...buttonStates,
                    [buttonId]: 'En attente'
                };
                setButtonStates(updatedButtonStates);
                saveButtonStatesToLocalStorage(updatedButtonStates);
            } else {
                // Annuler la demande de réservation
                await axios.post('http://localhost:8000/api/annulerDemande', {
                    day: day,
                    hour: hour // ID de la notification à annuler
                });
                console.log('Notification annulée avec succès !');

                // Mettre à jour l'état du bouton à "Reserver"
                const updatedButtonStates = {
                    ...buttonStates,
                    [buttonId]: 'Reserver'
                };
                setButtonStates(updatedButtonStates);
                saveButtonStatesToLocalStorage(updatedButtonStates);
            }
        } catch (error) {
            console.error('Error handling button click:', error);
        }
    };

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
