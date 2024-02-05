import React from 'react'
import './navbar.css';
import { useNavigate } from 'react-router';
const Navbar = () => {
  const navigate = useNavigate();

  return (

    <>
    <div>
      <nav className='nav'>
        <img src={require('../images/cscec logo2.jpg')} alt="" className='logo' height={100} />
        <ul>
          <li><a href=""> ressource humaine</a>
          <ul className='rh'>
          <li><a href="">demande document</a></li>
          <li><a href="">congé</a></li>
            <li><a href="">heure sup</a></li>
          </ul>
          
          </li>
          <li> <a href="">moyens generaux</a></li>
          <li><a href="">finance</a></li>
          <li><a href="">Documantation</a></li>
          <li>    <button className='connecter2'onClick={() => navigate('/login')} >se connecter</button>
</li>
        </ul>
      </nav>
     
      </div>
     
      </>
  )
  
}

export default Navbar;
