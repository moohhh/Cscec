import React from 'react'
import './navbarconecter.css';
import { useNavigate } from 'react-router';
const Navbar = () => {
  const navigate = useNavigate();

  return (

    <>
    <div>
      <nav className='nav'>
        <img src={require('../images/cscec logo2.jpg')} alt="" className='logo' height={100} onClick={() => navigate('/')}/>
        <ul>
          <li><a href=""> ressource humaine</a>
          <ul className='rh'>
          <li><a href="">demande document</a></li>
          <li><a href="">congé</a></li>
            <li><a href="">heure sup</a></li>
          </ul>
          
          </li>
          <li> <a href="">moyens generaux</a>
          <ul className='rh'>
          <li><a href=""> demande de chaufeur</a></li>
          <li><a href="">consemable</a></li>
          <li><a href="">salle de réunion</a></li>
            <li><a href="">autre</a></li>

          </ul>
          </li>
          <li><a href="">finance</a>
          <ul className='rh'>
          <li><a href=""> Paiement</a></li>

          </ul>
          </li>
          <li><a href="">Documantation</a>
          <ul className='rh'>
          <li><button>Interne</button>
          <ul className='rh2'>
          <li><a href="">Reglement</a></li>
            <li><a href="">Procédure</a></li> </ul></li> 
          <li><a href="">Externe</a></li>
            

          </ul>
          </li>
          <li>    <button className='connecter2'onClick={() => navigate('/login')} >se connecter</button>
</li>
        </ul>
      </nav>
     
      </div>
     
      </>
  )
  
}

export default Navbar;