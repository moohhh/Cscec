import React, { useEffect, useRef, useState } from 'react';
import './acceuill.css';
import Slider from './component/slider';
import Afficher from './afficher';
import Navbar from './component/navbar';
import Footer from './component/footer';

const Acceuil = () => {
  const [showSlider, setShowSlider] = useState(false);
  const [showcard, setShowcard] = useState(false);
  const [showage, setShowAge] = useState(false);
  const [showta, setShowTa] = useState(false); // State for the .ta animation
  const sliderRef = useRef(null);
  const cardref = useRef(null);
  const ageref = useRef(null);
  const taref = useRef(null); // Ref for the .ta element

  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        const sliderTop = sliderRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
  
        if (sliderTop < windowHeight && !showSlider) {
          setShowSlider(true);
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };
  
    const handleScrollc = () => {
      if (cardref.current) {
        const cardTop = cardref.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
  
        if (cardTop < windowHeight && !showcard) {
          setShowcard(true);
          window.removeEventListener('scroll', handleScrollc);
        }
      }
    };
  
    const handleScrollAge = () => {
      if (ageref.current) {
        const ageTop = ageref.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
  
        if (ageTop < windowHeight && !showage) {
          setShowAge(true);
          window.removeEventListener('scroll', handleScrollAge);
        }
      }
    };
  
    const handleScrollTa = () => {
      if (taref.current) {
        const taTop = ageref.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
  
        if (taTop < windowHeight && !showta) {
          setShowTa(true);
          window.removeEventListener('scroll', handleScrollTa);
        }
      }
    };
  
  
    const timeout = setTimeout(() => {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('scroll', handleScrollc);
      window.addEventListener('scroll', handleScrollAge);
      window.addEventListener('scroll', handleScrollTa); // Adding event listener for .ta element
      handleScroll();
      handleScrollc();
      handleScrollAge();
      handleScrollTa(); // Calling handleScrollTa immediately after adding the event listener
    }, 10);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollc);
      window.removeEventListener('scroll', handleScrollAge);
      window.removeEventListener('scroll', handleScrollTa); // Removing event listener for .ta element
      clearTimeout(timeout);
    };
  }, []);
  
  return (
    <>
      <div>
        <Navbar />
        <div className='ppp'>
          <div className='presentation'>
            <img src={require('./images/presentation.png')} className='presentationpic' alt="" />
          </div>
          <div className='bio'>
            <div ref={ageref} className={`age ${showage ? 'slide-in' : ''}`}>
              <p className='num'>42</p>
              <p className='tex'>ans d'éxperience</p>
            </div>
            <div className='ta'>
  <div ref={taref} className={`ta ${showta ? 'slide-in' : ''}`}>
                <table>
                  <tr>
                    <td colSpan={3} rowSpan={1}>
                      <p className='num'>60+</p><p className='tex'>projets</p>
                    </td>
                    <td colSpan={3} rowSpan={1}>
                      <p className='num'>10+</p><p className='tex'>payés</p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3} rowSpan={1}>
                      <p className='num'>60+</p><p className='tex'>projets</p>
                    </td>
                    <td colSpan={3} rowSpan={1}>
                      <p className='num'>10+</p><p className='tex'>payés</p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className='separateur'>__________________________________________________________________________________________________________________________________________________________________________________</div>
        <div className='projets'><h1>Nouveaux Projets</h1></div>
        <div ref={sliderRef} className={`slider ${showSlider ? 'slide-in' : ''}`}>
          <Slider />
        </div>
        <h1>Nouveaux Evenement</h1>
        <div ref={cardref} className={`card-container ${showcard ? 'slide-in' : ''}`}>
          <Afficher />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Acceuil;
