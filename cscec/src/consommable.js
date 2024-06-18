import React, { useState, useEffect } from "react";
import axios from "axios";
import './consommable.css';
import Navbar from "./component/navbarconnecter";
import Footer from "./component/footer";
export default function Consommable() {
  const [nom, setNom] = useState("");
  const [cons, setCons] = useState([]);
  const [quantite, setQuantite] = useState("");
  const [showItems, setShowItems] = useState(false);
  const info = () => {
    axios.post('http://localhost:8000/api/addConsomable', {

      nom: nom,
      quantite: quantite,


    })
      .then((response) => {
        console.log(response.data);
        alert("successful");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const changeQuantite = (id, newQuantite) => {
    axios.put(`http://localhost:8000/api/changequantite/${id}`, {
      quantite: newQuantite,
    })
      .then(() => {
        alert("changed");
        // You may want to update the state with the new quantity
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/removeConsomable/${id}`)
      .then(() => {
        alert('deleted');
        // You may want to update the state to remove the deleted item
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const afficher = () => {
    axios
      .get("http://localhost:8000/api/showConsomables")
      .then((response) => {
        setCons(response.data);
        setShowItems(true); // Set showItems to true to display the items
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (showItems) {
      // You may want to fetch the data here when showItems changes
    }
  }, [showItems]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div>
          <div>Consommable</div>
          <input
            type="text"
            id="nom"
            placeholder="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
          <input
            type="number"
            id="quantite"
            placeholder="quantite"
            value={quantite}
            onChange={(e) => setQuantite(parseInt(e.target.value))}
          />
          <button onClick={info}>Ajouter</button>
          <button onClick={afficher}>Afficher</button>
        </div>
        {showItems && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Quantite</th>
                <th></th>
                <th colSpan={2}>Btn</th>
              </tr>
            </thead>
            <tbody>
              {cons.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nom}</td>
                  <td>{item.quantite}</td>
                  <td>
                    <input
                      type="number"
                      value={item.newQuantite || ""}
                      onChange={(e) => {
                        const newQuantite = e.target.value;
                        setCons((prevCons) =>
                          prevCons.map((prevItem) =>
                            prevItem.id === item.id
                              ? { ...prevItem, newQuantite }
                              : prevItem
                          )
                        );
                      }}
                    />
                  </td>
                  <td>
                    <button onClick={() => changeQuantite(item.id, parseInt(item.newQuantite))}>
                      Modifier
                    </button>
                  </td>
                  <td>
                    <button className="delete-button" onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
};

