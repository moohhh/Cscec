import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function Notification({ updateButtonState }) {
    const [donnees, setDonnees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/show')
          .then(response => {
            setDonnees(response.data);
          })
          .catch(error => {
            console.error('An error occurred:', error);
          });
    }, []);

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
        <div>
            <div>
                {donnees.map((notification, index) => (
                    <div key={index}>
                        <p>ID: {notification.id}</p>
                        <p>Titre: {notification.data.titre} le: {notification.data.day} à: {notification.data.hour}h</p>
                        <button onClick={() => handleValidation(notification.data.day, notification.data.hour)}>Valider</button>
                        <button onClick={() => handleRefusal(notification.data.day, notification.data.hour)}>Refuser</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function Notification2({ updateButtonState }) {
    const [donnees, setDonnees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/show')
          .then(response => {
            setDonnees(response.data);
          })
          .catch(error => {
            console.error('An error occurred:', error);
          });
    }, []);

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
        <div>
            <div>
                {donnees.map((notification, index) => (
                    <div key={index}>
                        <button onClick={() => handleValidation(notification.data.day, notification.data.hour)}>Valider</button>
                        <button onClick={() => handleRefusal(notification.data.day, notification.data.hour)}>Refuser</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
