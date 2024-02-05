import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Accueil from './acceuill';
import Login from './login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
