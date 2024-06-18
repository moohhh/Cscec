import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slider.css'; // Make sure the filename is correct

const SlidingImages = () => {
  const [donnees, setDonnees] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/afficherTableprojet')
      .then(response => {
        setDonnees(response.data);
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 3000,
  };

  const previousSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      axios.post('http://localhost:8000/api/supprimerprojet', { id })
        .then(response => {
          alert(response.data.message);
          window.location.reload();

        })
        .catch(error => {
          console.error('Error deleting project:', error);
          alert('An error occurred while deleting the project.');
        });
    }
  };

  return (
    <div className='divs'>
      <Slider ref={sliderRef} {...settings} className='slider'>
        {donnees.map((donnee) => (
          <div key={donnee.id}>
            <div className='prjdis'>
              <div className='slidertitle'>{donnee.titre}</div>
              <div className='sliderdescription'>
                <p>{donnee.description}</p>
              </div>

              {localStorage.getItem('grade') === 'superieur TC' && (
                <button className='supprimerslider' onClick={() => handleDelete(donnee.id)}>supprimer</button>
              )}

            </div>
            <div className='prjpic'>
              <img src={donnee.lien_photo} alt="Image" style={{ width: "60%", height: "65vh", float: 'right', borderRadius: "30px", }} />
            </div>
          </div>
        ))}
      </Slider>
      <div className="btn-container">
        <button onClick={previousSlide} className='prevbtn'>&lt;</button>
        <button onClick={nextSlide} className='nextbtn'>&gt;</button>
      </div>
    </div>
  );
};

export default SlidingImages;
