import React, { useState, useEffect } from 'react';
import './demandeconge.css';
import axios from 'axios';
import Navbar from './component/navbarconnecter';

function Demandeconge() {
    const [date, setDate] = useState('');
    const [date2, setDate2] = useState('');
    const [nbr, setNbr] = useState('');
    const [typeconge, setType] = useState('Aller simple');

    const employe_id = localStorage.getItem('id');

    useEffect(() => {
        if (date && date2) {
            const startDate = new Date(date);
            const endDate = new Date(date2);
            const differenceInTime = endDate.getTime() - startDate.getTime();
            const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24)) + 1;
            setNbr(differenceInDays.toString());
        }
    }, [date, date2]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/addDemandeConge', {
                date_debut: date,
                date_fin: date2,
                nombre_jours: nbr,
                user_id: employe_id, // Use employe_id retrieved from localStorage
                type_conge: typeconge
            });

            console.log(response.data);
            alert("Successful");
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to create demande.");
        }
        const response2 = await axios.post('http://localhost:8000/api/demande', {
            employe_id: employe_id,
            title: 'Demande de conge',
            description: 'Demande de Chauffeur le ' + date + ' jusqua ' + date2,
        });
    };

    return (
        <>
            <Navbar />
            <div className="imageconge">
                <img src={require('./images/vacance.jpg')} alt='' className="img" />
            </div>
            <div className="reservation-form-conge">
                <div className="input-group">
                    <div className="input-labels">
                        <label htmlFor="date">Date de début</label>
                        <label htmlFor="date2">Date de fin</label>
                    </div>
                    <div className="input-fields">
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <input
                            type="date"
                            id="date2"
                            value={date2}
                            onChange={(e) => setDate2(e.target.value)}
                        />
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="nombre de jour">Nombre de jours</label>
                    <input
                        type="text"
                        id="nombre de jour"
                        placeholder="Nombre de jours"
                        value={nbr}
                        readOnly

                    />
                </div>

                <div className="input-group">
                    <label htmlFor="type de conge">Type de congé</label>
                    <select
                        id="type de conge"
                        value={typeconge}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="Congé simple">Congé simple</option>
                        <option value="Congé maladie">Congé maladie</option>
                        <option value="Autre">Autre</option>
                    </select>
                </div>
                <button type="button" className="reserve-button" onClick={handleSubmit}>
                    Réserver maintenant
                </button>

            </div>
        </>
    );
}

export default Demandeconge;