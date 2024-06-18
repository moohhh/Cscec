// Documents.js
import { useEffect, useState } from 'react';
import React from "react";
import './Documents.css';
import axios from 'axios';
export default function Documents(){
    
       
        const [documents, setDocuments] = useState([]);

        useEffect(() => {
          axios.get('/api/demandes')
            .then(response => {
              setDocuments(response.data);
            })
            .catch(error => {
              console.error(error);
            });
        }, []);
        const acceptDoc = (id) => {
          axios.put(`/api/demandes/${id}`, {
    status: 'validated'
  })
    .then(response => {
      console.log(response.data);
      fetchDocuments();
    })
    .catch(error => {
      console.error(error);
    });
}

const refuseDoc = (id) => {
  axios.put(`/api/demandes/${id}`, {
    status: 'refused'
  })
    .then(response => {
      console.log(response.data);
      fetchDocuments();
    })
    .catch(error => {
      console.error(error);
    });
}

const fetchDocuments = () => {
  axios.get('/api/demandes')
    .then(response => {
      setDocuments(response.data);
    })
   .catch(error => {
      console.error(error);
    });
}
         return (
           <div className="do">
             <h1>Documents</h1>
             <div className="doc">
               {documents.map((document) => (
                 <div key={document.id} className="document">
                   <div className="container">
                     <h2>{document.nom}</h2>
                     <p>{document.contenu}</p>
                     {document.nom}
                     <div className="button-container">
                       
                        
                      
                       <button onClick={() => acceptDoc(document.id)} className="accept-button">Accept</button>
                       <button onClick={() => refuseDoc(document.id)} className="refuse-button">Refuse</button>
                        {document.contenu}
                       <button className="accept-button">Accept</button>
                       <button className="refuse-button">Refuse</button>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         );
       }
       
              


    


