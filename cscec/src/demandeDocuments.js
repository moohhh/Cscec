import React from 'react'
import './demandeDocuments.css'
import Navbar from './component/navbarconnecter'
import Footer from './component/footer';
import axios from 'axios';
import { useState } from 'react';
export default function DemandeDocuments() {
  const [nomDoc, Setnom] = useState('')
  const [message, Setmessage] = useState('')
  const [id, Setid] = useState(localStorage.getItem('id'))
  const employe_id = localStorage.getItem('id');
  const adddocument = async (e) => {
    axios.get('http://localhost:8000/api/adddemande', {
      params: {
        user_id: id,
        nom: nomDoc,
        message: message
      }
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    const response2 = await axios.post('http://localhost:8000/api/demande', {
      employe_id: employe_id,
      title: 'Demande de document',
      description: 'Demande de document : ' + nomDoc,
    });

  }

  return (
    <>
      <Navbar />
      <div className='demandeDocContainer'>
        <h1 className='hh1'>Vous pouver demander les documents que vous avez besoin par ici </h1>
        <div>
          <label htmlFor="nomDoc">Nom du document:</label>
          <input type="text" id="nomDoc" name="nomDoc" required onChange={(e) => Setnom(e.target.value)} />
          <br />
          <label htmlFor="message">Message:</label>
          <textarea rows="10" cols="50" id="message" name="message" required onChange={(e) => Setmessage(e.target.value)}></textarea>
          <br />
          <button onClick={adddocument}>Envoyer</button>
        </div>
      </div>
    </>
  )
}