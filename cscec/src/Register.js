import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './component/navbarconnecter';

import './Register.css';

function Profile() {
    const navigate = useNavigate();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [newpassword, setNewPassword] = useState('');

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        role_id: '',
        role_name: '',
    });

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
    });



    const handleEditProfile = () => {
        setIsFormVisible(true);
    };


    const roleName = userData.role_id === 1 ? 'Admin' : 'User';
    const deconnecter = () => {
        localStorage.setItem('nom', '');
        localStorage.setItem('email', '');
        localStorage.setItem('mp_status', '');
        localStorage.setItem('grade', '');
        localStorage.setItem('id', '');

        navigate('/login');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique de soumission du formulaire ici
    };

    const handleChange = (e) => {
        setNewPassword(e.target.value);
    };
    const edit_password = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/modifiermotdepasse', {
                nom: localStorage.getItem('nom'),
                email: localStorage.getItem('email'),
                newpassword: newpassword,
            });

            alert(response.data.message);
        } catch (error) {
            console.error('An error occurred:', error.response);
            alert(error.response.data.message || 'Failed to change password.');
        }
    };
    return (
        <>
            <Navbar />

            <div className="profile">
                <div className="navbar">
                    <div><Link to="/demande_envoyer"> Demande envoyer</Link></div>
                    <div> Boite personelle</div>
                    {localStorage.getItem('grade') === 'Admin' && (

                        <div><Link to="/liste_employés"> Liste d'employés</Link> </div>)}
                </div>
                <div className="profile-content">
                    <h1 className='profileh1' >Welcome to Your Profile</h1>
                    <div className="profile-card">
                        <img src='https://cdn-icons-png.flaticon.com/512/149/149071.png' alt="User" className="user-image" />
                        <div className="profile-details">
                            <p><strong>Name:</strong> {localStorage.nom} </p>
                            <p><strong>Email:</strong> {localStorage.email}</p>
                            <p><strong>Role:</strong> {localStorage.grade} </p>
                        </div>
                        <button className="edit_password" onClick={handleEditProfile}>Edit Password</button>
                        <button className="deconnecter" onClick={deconnecter}>Déconnecter</button>
                    </div>
                    <div>
                        {isFormVisible && (
                            <div className="overlay" onClick={() => setIsFormVisible(false)}>
                                <div className="input-groupp" onClick={(e) => e.stopPropagation()}>
                                    <form className='form-passwordedit' onSubmit={handleSubmit} encType="multipart/form-data">
                                        <div className="input-fieldss">

                                            <div className="input-itemm">
                                                <label htmlFor="newPassword">Nouveau mot de passe</label>
                                                <input
                                                    type="password"
                                                    id="newPassword"
                                                    name="newPassword"
                                                    value={newpassword}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <button onClick={edit_password} className='edit_passwordbtn' type="submit">Modifier</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>

    );
}

export default Profile;
