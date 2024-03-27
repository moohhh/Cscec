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
    axios.get('http://localhost:8000/api/afficherTable')
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

  return (
    <div className='divs'>
      <Slider ref={sliderRef} {...settings} className='slider'>
        {donnees.map((donnee, index) => (
          <div key={index}>
            <div className='prjdis'>
              <div className='slidertitle'>{donnee.titre}</div>
              <div className='sliderdescription'>
                <p>{donnee.description}</p>
              </div>
            </div>
            <div className='prjpic'>
              <img src={donnee.image_path} alt="Image" style={{ width: "60%", height: "65vh", float: 'right', borderRadius: "30px", }}/>
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
