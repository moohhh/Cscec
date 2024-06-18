import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './component/navbarconnecter';
import './DemandeH.css';

function DemandeHeur() {
    const [date, setDate] = useState('');
    const [hours, setHours] = useState('');
    const [description, setDescription] = useState('');

    const employe_id = localStorage.getItem('id');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/addDemandeHeur', {
                date: date,
                hours: hours,
                description: description,
                user_id: employe_id
            });
            console.log(response.data);
        } catch (error) {
            console.error('Une erreur s\'est produite !', error);
        }
        const response2 = await axios.post('http://localhost:8000/api/demande', {
            employe_id: employe_id,
            title: 'Demande de heur supp',
            description: 'Demande de heur supp le ' + date + ' nombre d\'heures ' + hours,
        });
    };


    return (
        <>
            <Navbar />
            <div className="imageconge">
                <img src={require('./images/hsjpeg.jpeg')} alt='' className="img" />
            </div>
            <div className="reservation-form-heur">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="hours">Nombre d'heures</label>
                        <input
                            type="number"
                            id="hours"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <button type="submit" className="enregistre-button">
                        Envoyer la demande
                    </button>
                </form>
            </div>
        </>
    );
}
export default DemandeHeur;