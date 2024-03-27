import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Accueil from './acceuill';
import Login from './login';
import Aficher from './afficher';
import DemandeDocuments from './demandeDocuments';
import Salle from './salle';
import DemandeChaffeur from './demandeChaffeur';
import Acceuiladmin from './Admin/acceuilladmin';
import { Notification, Notification2 } from './Admin/notification';
import SalleAdmin from './Admin/demandesalleAdmin';
import Acceuilconnecter from './acceuillconnecter';
import Appp from './documantationExtern';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/accueilladmin" element={<Acceuiladmin />} />
          <Route path="/accueillconnecter" element={<Acceuilconnecter />} />

          <Route path="/login" element={<Login />} />
          <Route path="/Aficher" element={<Aficher />} />
          <Route path="/demandeDocuments" element={<DemandeDocuments />} />
          <Route path="/salle" element={<Salle />} />
          <Route path="/demandesalleAdmin" element={<SalleAdmin />} />

          <Route path="/demandeChaffeur" element={<DemandeChaffeur />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/notification2" element={<Notification2 />} />
          <Route path="/documantationExtern" element={<Appp />} />








        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
