import React, { useState } from 'react';
import axios from 'axios';
import './paiment.css';

export default function PaiementForm() {
    const [montant, setMontant] = useState('');
    const [userId, setUserId] = useState('');
    const [statu, setStatu] = useState(false);
    const [pdfFile, setPdfFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();



        try {
            axios.get('http://localhost:8000/api/addpaiement', {

                montant: montant,
                user_id: userId,
                statu: statu,
                pdfFile: pdfFile
            }

            )

            alert('Paiement added successfully!');
            setMontant('');
            setUserId('');
            setStatu(false);
            setPdfFile(null);
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
            }
        }
    };

    return (
        <div className="container">
            <h2>Add Paiement</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="montant">Montant:</label>
                <input
                    type="number"
                    id="montant"
                    name="montant"
                    value={montant}
                    onChange={(e) => setMontant(e.target.value)}
                    required
                />

                <label htmlFor="Pdf_file">Upload PDF:</label>
                <input
                    type="file"
                    id="Pdf_file"
                    name="Pdf_file"
                    accept="application/pdf"
                    onChange={(e) => setPdfFile(e.target.files[0])}
                    required
                />
                <button type="submit">Add Paiement</button>
            </form>
        </div>
    );
}