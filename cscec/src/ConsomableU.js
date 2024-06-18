import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbarconnecter from "./component/navbarconnecter";
import Footer from "./component/footer";
import './ConsomableU.css';
import { Navigate, useNavigate } from "react-router-dom";

export default function ConsomableU() {
  const [cons, setCons] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [idItem, setIdItem] = useState(null);
  const [showbtn, setshowbtn] = useState(false);
  const [nom, setNom] = useState("");
  const [quantite, setQuantite] = useState("");
  const [old, setOld] = useState("");
  const navigate = useNavigate();

  const afficher = () => {
    if (inputValue === "") {
      axios
        .get("http://localhost:8000/api/showConsomables")
        .then((response) => {
          setCons(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      axios
        .get(`http://localhost:8000/api/showbyname/${inputValue}`)
        .then((response) => {
          setCons(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {
    afficher();
  }, [inputValue]);
  const ajouterdemande = () => {
    axios.get('http://localhost:8000/api/adddemandec', {
      params: {
        nom: nom,
        quantite: quantite,
        user_id: 1,
        status: 0
      }
    }).then(() => {
      alert('demande ajouter')
    }).catch((error) => {
      console.error("Error:", error);
    })

  }
  const rechercher = (event) => {
    event.preventDefault();
    setInputValue(event.target.nom.value);
  };
  const id = localStorage.getItem("id");

  return (
    <>
      <Navbarconnecter />
      {localStorage.getItem('grade') === 'superieur TC' && (
        <button onClick={() => navigate('/Consomable')}>Ajouter Consomable</button>
      )}
      <div className="main-container">
        <h1 className="heading">Consomable disponible</h1>

        <form onSubmit={rechercher}>
          <input type="text" name="nom" placeholder="Rechercher un consomable" />
          <button type="submit">Rechercher</button>
        </form>
        <ul className="item-list">
          {cons.map(item => (
            <li key={item.id} className="item">
              <div>
                <p className="item-info">ID: {item.id}</p>
                <p className="item-info">Nom: {item.nom}</p>
                <p className="item-info">Quantite: {item.quantite}</p>
              </div>

              {showInput && idItem === item.id && (
                <input
                  type="number"
                  value={quantite}
                  onChange={(e) => setQuantite(e.target.value)}
                />
              )}
              {!showbtn && (
                <button className="right" onClick={() => { setShowInput(!showInput); setIdItem(item.id); setshowbtn(!showbtn) }}>
                  Faire une demande
                </button>
              )}
              {showbtn && idItem === item.id && (
                <div>
                  <button className="submit" onClick={() => { setNom(item.nom); ajouterdemande() }}>{nom}Valider</button>
                  <button className="cancel" onClick={() => { setShowInput(!showInput); setIdItem(null); setshowbtn(!showbtn) }}>Annuler</button>
                </div>
              )}
            </li>
          ))}

        </ul>
      </div>
      <Footer />
    </>
  );
};


