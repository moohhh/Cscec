import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const Enregistrer = () => {
    // Define state variables to store form data
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [grade, setGrade] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    // Function to handle form submission
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
            alert('Employee added successfully!');
            // Optionally, refresh your employee list here or clear the form
        } catch (error) {
            console.error('There was an error!', error.response);
            alert(error.response.data.message || 'Failed to add employee.');
        }
    };
    const deconnecter = () => {
        localStorage.setItem('nom', '');
        localStorage.setItem('email', '');
        localStorage.setItem('mp_status', '');
        localStorage.setItem('grade', '');
        localStorage.setItem('id', '');

        navigate('/login');
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" required />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                    <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="Grade" required />
                    <button type="submit">Ajouter</button>
                </form>
                {message && <p>{message}</p>}
            </div>
            <div>
                <button onClick={deconnecter}>deconnecter</button>
            </div>
        </>
    );
};

export default Enregistrer;
