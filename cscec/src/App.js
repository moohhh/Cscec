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
import Demandeconsomable from './demandeconsomable';
import Enregistrer from './Admin/enregistreremployes';
import Demandeconge from './demandeconge';
import Profile from './Register';
import Liste_employés from './Admin/liste_emloyés';
import ConsomableU from './ConsomableU';
import Consommable from './consommable';
import DemandeHeur from './DemandeH';
import Demande_envoyer from './demane_envoyer';
import Paiment from './paiment';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/accueilladmin" element={<Acceuiladmin />} />
          <Route path="/accueillconnecter" element={<Acceuilconnecter />} />
          <Route path='/ConsomableU' element={<ConsomableU />} />
          <Route path="/login" element={<Login />} />
          <Route path='/Consomable' element={<Consommable />} />
          <Route path='/demandeconge' element={<Demandeconge />} />
          <Route path="/Aficher" element={<Aficher />} />
          <Route path="/demandeDocuments" element={<DemandeDocuments />} />
          <Route path="/salle" element={<Salle />} />
          <Route path="/demandesalleAdmin" element={<SalleAdmin />} />
          <Route path='/DemandeH' element={<DemandeHeur />} />
          <Route path="/demandeChaffeur" element={<DemandeChaffeur />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/notification2" element={<Notification2 />} />
          <Route path="/documantationExtern" element={<Appp />} />
          <Route path="/demandeconsomable" element={<Demandeconsomable />} />
          <Route path="/demandeconge" element={<Demandeconge />} />
          <Route path="/enregistrer" element={<Enregistrer />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/liste_employés" element={<Liste_employés />} />
          <Route path="/demande_envoyer" element={<Demande_envoyer />} />
          <Route path="/paiment" element={<Paiment />} />














        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
