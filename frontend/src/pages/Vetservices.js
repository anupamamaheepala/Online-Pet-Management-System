import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/vetservices.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Vetservices() {
  const images = ['vetback1.jpg', 'vetback2.jpg', 'vetback3.jpg', 'vetback4.jpg', 'vetback5.jpg'];
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((currentImage + images.length - 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [currentImage]);

  const handleDotClick = (index) => {
    setCurrentImage(index);
  };

  return (
    <>
      <Header /> 
      <div className="image-slider">
        <div className="upper-text">
          <p className="welcome-text">
            Welcome to Pet Zone Hospital Veterinary Services! Where every paw is treated with love, care, and expertise. Let's keep your pet healthy!
          </p>
          <Link to="/ScheduleAppointment" className="appointment-button">Make an appointment</Link>
        </div>
        <button className="arrow left" onClick={prevImage}>◀</button>
        <img className="slider-image" src={`/images/${images[currentImage]}`} alt="Veterinary Service" />
        <button className="arrow right" onClick={nextImage}>▶</button>
        <div className="dots-container">
          {images.map((_, index) => (
            <span
              key={index}
              className={index === currentImage ? "dot active" : "dot"}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>
      <div className="vet-services-container">
        <h1>Available Veterinary Services</h1>
        <ul className="service-list">
          <li>
            <h3>Vaccinations</h3>
            <p>
              Regular vaccinations are essential to protect your pet from various diseases. 
              Vaccinations typically include shots for rabies, distemper, parvovirus, and others.
            </p>
          </li>
          <li>
            <h3>Spaying and Neutering</h3>
            <p>
              Spaying and neutering procedures help control the pet population and prevent 
              unwanted behaviors such as aggression and roaming.
            </p>
          </li>
          <li>
            <h3>General Checkups</h3>
            <p>
              Routine checkups are important for maintaining your pet's health. 
              A veterinarian can identify any underlying health issues and provide necessary treatments.
            </p>
          </li>
          <li>
            <h3>Dental Care</h3>
            <p>
              Dental hygiene is crucial for pets to prevent dental diseases and maintain overall health. 
              Services may include teeth cleaning, extractions, and treatment for gum disease.
            </p>
          </li>
          <li>
            <h3>Surgery</h3>
            <p>
              Veterinary surgeons perform various surgeries ranging from routine procedures 
              like spaying/neutering to complex surgeries such as tumor removal or orthopedic surgery.
            </p>
          </li>
          <li>
            <h3>Emergency Care</h3>
            <p>
              In emergencies, quick access to veterinary care is vital. 
              Emergency veterinary services provide immediate medical attention to pets in critical conditions.
            </p>
          </li>
        </ul>
      </div>
      <Footer /> 
    </>
  );
}

export default Vetservices;
