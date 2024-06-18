import React, { useEffect, useRef, useState } from 'react';
import './acceuilladmin.css';
import Slider from '../component/slider';
import Afficher from '../afficher';
import Navbarconnecter from '../component/navbarconnecter';
import Footer from '../component/footer';
import axios from 'axios'; // Import Axios at the top of your component file
const Acceuiladmin = () => {
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

  const [isFormVisible, setIsFormVisible] = useState(false);

  const [isFormVisible2, setIsFormVisible2] = useState(false);
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };
  const toggleFormVisibility2 = () => {
    setIsFormVisible2(!isFormVisible2);
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "lien_photo") {
      // Assuming you're handling a file input for project photos
      const file = files[0];
      setFormData(prevState => ({ ...prevState, [name]: file }));
    } else {
      // Handling all other inputs as text
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    // lien_photo: '', No need to initialize for file input
  });
  const handleSubmit = async event => {
    event.preventDefault();

    // Creating FormData to send to the backend
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      // Update the URL to your project addition endpoint
      const response = await axios.post('http://localhost:8000/api/ajouterprojet', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data.message);
      alert('Project added successfully!');
      window.location.reload();

      // Optionally, refresh your project list here or clear the form
    } catch (error) {
      console.error('There was an error!', error.response);
      alert(error.response.data.message || 'Failed to add project.');
    }
  };
  const handleSubmit2 = async event => {
    event.preventDefault();

    // Creating FormData to send to the backend
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      // Update the URL to your project addition endpoint
      const response = await axios.post('http://localhost:8000/api/ajouterevenement', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data.message);
      alert('evennement added successfully!');
      // Optionally, refresh your project list here or clear the form
      window.location.reload();


    } catch (error) {
      console.error('There was an error!', error.response);
      alert(error.response.data.message || 'Failed to add project.');
    }
  };



  return (
    <>
      <div>
        <Navbarconnecter />
        <div className='ppp'>
          <div className='presentation'>
            <img src={require('../images/presentation.png')} className='presentationpic' alt="" />
          </div>
          <p className='presp'>
            Votre partenaire de confiance en construction        </p>
          <div className='bio'>
            <div ref={ageref} className={`age ${showage ? 'slide-in' : ''}`}>
              <p className='num'>42</p>
              <p className='tex'>ans d'éxperience</p>
            </div>
            <div className='ta'>
              <div ref={taref} className={`ta ${showta ? 'slide-in' : ''}`}>
                <table className='tablebio'>
                  <tr className='trbio'>
                    <td colSpan={3} rowSpan={1} className='tdbio'>
                      <p className='num'>60+</p><p className='tex'>projets</p>
                    </td >
                    <td colSpan={3} rowSpan={1} className='tdbio'>
                      <p className='num'>10+</p><p className='tex'>payés</p>
                    </td>
                  </tr>
                  <tr className='trbio'>
                    <td colSpan={3} rowSpan={1} className='tdbio'>
                      <p className='num'>60+</p><p className='tex'>projets</p>
                    </td>
                    <td colSpan={3} rowSpan={1} className='tdbio'>
                      <p className='num'>10+</p><p className='tex'>payés</p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className='separateur'>__________________________________________________________________________________________________________________________________________________________________________________</div>

        <div className='projets'><h1 >Nouveaux Projets</h1><p className='prjp'>Découvrez nos nouveaux projets : explorez notre dernière collection de réalisations et découvrez comment nous donnons vie à des idées créatives. Parcourez notre galerie pour trouver l'inspiration pour votre prochain projet !</p></div>

        {localStorage.getItem('grade') === 'superieur TC' && (
          <button className='ajouter-btn' onClick={toggleFormVisibility}>Ajouter</button>)}

        {isFormVisible && (
          <div className="overlay" onClick={() => setIsFormVisible(false)}>
            <div className="input-grouppublication" onClick={(e) => e.stopPropagation()}>
              <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className="input-fieldspublication">
                  <div className="input-itempublication">
                    <label htmlFor="titre">Titre</label>
                    <input type="text" id="titre" name="titre" value={formData.titre} onChange={handleChange} />
                  </div>
                  <div className="input-itempublication">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
                  </div>
                  <div className="input-itempublication">
                    <label htmlFor="lien_photo">Photo du Projet</label>
                    <input type="file" id="lien_photo" name="lien_photo" onChange={handleChange} />
                  </div>
                  <button type="submit" className='add_button'>Ajouter Projet</button>
                </div>
              </form>

              <button type="button" className="close-btn" onClick={() => setIsFormVisible(false)}>X</button>
            </div>
          </div>
        )}        <div ref={sliderRef} className={`slider ${showSlider ? 'slide-in' : ''}`}>
          <Slider />
        </div>
        <h1>Nouveaux Evenements</h1><p className='prjp'>Ne manquez pas nos prochains événements ! Découvrez ce qui se passe dans notre communauté et rejoignez-nous pour des moments mémorables. Consultez notre calendrier pour rester informé et participer à nos activités !</p>
        {localStorage.getItem('grade') === 'superieur TC' && (
          <button className='ajouter-btn' onClick={toggleFormVisibility2}>Ajouter</button>
        )}

        {isFormVisible2 && (
          <div className="overlay" onClick={() => setIsFormVisible2(false)}>
            <div className="input-grouppublication" onClick={(e) => e.stopPropagation()}>
              <form onSubmit={handleSubmit2} encType='multipart/form-data'>
                <div className="input-fieldspublication">
                  <div className="input-itempublication">
                    <label htmlFor="titre">Titre</label>
                    <input type="text" id="titre" name="titre" value={formData.titre} onChange={handleChange} />
                  </div>
                  <div className="input-itempublication">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
                  </div>
                  <div className="input-itempublication">
                    <label htmlFor="lien_photo">Photo du Projet</label>
                    <input type="file" id="lien_photo" name="lien_photo" onChange={handleChange} />
                  </div>
                  <button type="submit" className='add_button'>Ajouter Evenements</button>
                </div>

              </form>
              <button type="button" className="close-btn" onClick={() => setIsFormVisible2(false)}>X</button>
            </div>
          </div>
        )}        <div ref={cardref} className={`card-container ${showcard ? 'slide-in' : ''}`}>
          <Afficher />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Acceuiladmin;
