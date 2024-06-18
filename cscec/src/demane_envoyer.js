import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './demane_envoyer.css'; // Importer le fichier CSS pour les styles

const Demande_envoyer = () => {
    const [notifications, setNotifications] = useState([]);

    const [id, setId] = useState('');

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const employe_id = localStorage.getItem('id');
                const response = await axios.get(`http://localhost:8000/api/show?employe_id=${employe_id}`);
                setNotifications(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des notifications :', error);
            }
        };

        fetchNotifications();
    }, []);


    // Fonction pour formater la date
    const formatDate = (dateStr) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateStr).toLocaleDateString('fr-FR', options);
    };
    const modifierEmploye = async (id, nom, email, newPassword, newGrade) => {
        try {
            const response = await axios.post('http://localhost:8000/modifieremploye', {
                id,
                nom,
                email,
                newpassword: newPassword,
                grade: newGrade
            });
            alert('Employé modifié avec succès!');
            // Rafraîchir la liste des employés ou effectuer d'autres actions nécessaires après la modification
        } catch (error) {
            console.error('Erreur lors de la modification de l\'employé:', error.response);
            alert(error.response.data.message || 'Erreur lors de la modification de l\'employé.');
        }
    };

    const supprimerEmploye = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer?')) {
            try {
                const response = await axios.post('http://localhost:8000/api/annulerDemandebyid', { id });
                window.location.reload();
            } catch (error) {
                console.error('Erreur lors de la suppression de l\'employé:', error);
                alert(error.response.data.message || 'Erreur lors de la suppression de l\'employé.');
            }
        }
    };
    return (
        <div className="liste-container">
            <table className='liste'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Titre</th>
                        <th>Description</th>
                        <th>Créé le</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications.map(notification => (
                        <tr key={notification.id}>
                            <td>{notification.id}</td>
                            <td>{notification.title}</td>
                            <td>{notification.description}</td>
                            <td>{formatDate(notification.created_at)}</td>
                            <td><button onClick={() => modifierEmploye(notification.id)} className='modifier_employe'>Modifier</button></td>
                            <td><button onClick={() => supprimerEmploye(notification.id)} className='supprimer_employe'>Supprimer</button></td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Demande_envoyer;
