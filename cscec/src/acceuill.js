import React from 'react'
import  './acceuill.css'
import Slider from './component/slider';
import Afficher from './afficher';
import Navbar from './component/navbar';


const Acceuil = () => {
   
  return (
    
    <div>
      <Navbar/>
      <Slider/>
      <Afficher/>
    </div>
       
      
  )
  
}

export default Acceuil