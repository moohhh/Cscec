import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './liste_employés.css'; // Importer le fichier CSS pour les styles

const Liste_employés = () => {
    // Define state variables to store form data
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [grade, setGrade] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [newGrade, setNewGrade] = useState('');
    const [id, setId] = useState('');
    const [employees, setEmployees] = useState([]);

    // Function to handle form submission
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            // Send form data to the backend
            const response = await axios.post('http://localhost:8000/api/enregistrer', {
                nom,
                email,
                password,
                grade,
                mp_status: '0'
            });
            console.log(response.data.message);
            alert('Employé ajouté avec succès!');
            window.location.reload();
            // Optionally, refresh your employee list here or clear the form
        } catch (error) {
            console.error('There was an error!', error.response);
            alert(error.response.data.message || 'Failed to add employee.');
        }
    };

    useEffect(() => {
        axios.post('http://localhost:8000/api/afficherlisteemployés')
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
            });
    }, []);

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
                const response = await axios.post('http://localhost:8000/api/suprimeremployé', { id });
                window.location.reload();
            } catch (error) {
                console.error('Erreur lors de la suppression de l\'employé:', error);
                alert(error.response.data.message || 'Erreur lors de la suppression de l\'employé.');
            }
        }
    };

    // Fonction pour formater la date
    const formatDate = (dateStr) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateStr).toLocaleDateString('fr-FR', options);
    };

    return (
        <div className="container">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nom">Nom:</label>
                        <input type="text" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" required />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                    </div>
                    <div>
                        <label htmlFor="grade">Grade:</label>
                        <select id="grade" value={grade} onChange={(e) => setGrade(e.target.value)} required>
                            <option value="">Sélectionnez un grade</option>
                            <option value=" superieur RH"> superieur RH</option>
                            <option value="superieur MG">superieur MG</option>
                            <option value="superieur TC">superieur TC</option>

                            <option value="superieur Finance">superieur Finance</option>
                            <option value="Admin">Admin</option>
                            <option value="Employé">Employé</option>
                        </select>
                    </div>

                    <button type="submit">Ajouter</button>
                </form>
            </div>
            <div className="liste-container">
                <table className='liste'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Grade</th>
                            <th>Créé le</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.nom}</td>
                                <td>{employee.email}</td>
                                <td><input className='gradein' type="text" value={employee.grade} readOnly /></td>
                                <td>{formatDate(employee.created_at)}</td>
                                <td><button onClick={() => modifierEmploye(employee.id, employee.nom, employee.email, newPassword, newGrade)} className='modifier_employe'>Modifier</button></td>
                                <td><button onClick={() => supprimerEmploye(employee.id)} className='supprimer_employe'>Supprimer</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Liste_employés;
