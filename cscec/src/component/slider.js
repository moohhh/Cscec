import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slider.css' // Correct if the actual filename is 'slider.Css'
const settings = {
  dots : true ,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay:true,
  autoplayspeed:1,
  

};

const images = [require('../images/back2.gif'),
require('../images/cscec logo2.jpg'),
require('../images/back1.gif'),



]

const SlidingImages = () => (
  <>
  <div className='divs'>
  <Slider {...settings} className='slider'>
      {images.map((image, index) => (
        <div key={index} >
          <img src={process.env.PUBLIC_URL + image} alt={`Slide ${index}` }  style={{ width: "100%", height: "65vh" }}
/>
        </div>
      ))}
    </Slider>
  </div>
    

  </>
);

export default SlidingImages;
