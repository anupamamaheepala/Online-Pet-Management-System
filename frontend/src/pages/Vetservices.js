import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/vetservices.css';
import Header from '../components/Header';
import Footer from '../components/Footer'; 

function Vetservices() {
  const images = ['vetback1.jpg', 'vetback2.jpg', 'vetback3.jpg', 'vetback4.jpg', 'vetback5.jpg'];
  const [currentImage, setCurrentImage] = useState(0);

  const handleLeftClick = () => {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  };

  const handleRightClick = () => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  };

  return (
    <>
      <Header /> 
      <div className="image-slider">
        <button className="arrow left" onClick={handleLeftClick}>◀</button>
        <img className="slider-image" src={`/images/${images[currentImage]}`} alt="Veterinary Service" />
        <button className="arrow right" onClick={handleRightClick}>▶</button>
      </div>
      {/* ... rest of your code ... */}
      <Footer /> 
    </>
  );
}

export default Vetservices;
