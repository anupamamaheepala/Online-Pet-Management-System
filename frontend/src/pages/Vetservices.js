import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/vetservices.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ShowLoading from '../components/ShowLoading';

function Vetservices() {
  const images = ['vetback1.jpg', 'vetback2.jpg', 'vetback3.jpg', 'vetback4.jpg', 'vetback5.jpg'];
  const [currentImage, setCurrentImage] = useState(0);
  const [showDescription, setShowDescription] = useState('');

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((currentImage + images.length - 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, [currentImage]);

  const handleDotClick = (index) => {
    setCurrentImage(index);
  };

  const toggleDescription = (service) => {
    if (showDescription === service) {
      setShowDescription('');
    } else {
      setShowDescription(service);
    }
  };

  const services = [
    { title: 'Vaccinations', description: 'Regular vaccinations are essential to protect your pet from various diseases. Vaccinations typically include shots for rabies, distemper, parvovirus, and others.' },
    { title: 'Spaying and Neutering', description: 'Spaying and neutering procedures help control the pet population and prevent unwanted behaviors such as aggression and roaming.' },
    { title: 'General Checkups', description: 'Routine checkups are important for maintaining your pet\'s health. A veterinarian can identify any underlying health issues and provide necessary treatments.' },
    { title: 'Dental Care', description: 'Dental hygiene is crucial for pets to prevent dental diseases and maintain overall health. Services may include teeth cleaning, extractions, and treatment for gum disease.' },
    { title: 'Surgery', description: 'Veterinary surgeons perform various surgeries ranging from routine procedures like spaying/neutering to complex surgeries such as tumor removal or orthopedic surgery.' },
    { title: 'Emergency Care', description: 'In emergencies, quick access to veterinary care is vital. Emergency veterinary services provide immediate medical attention to pets in critical conditions.' },
  ];

  return (
    
    <>
    <ShowLoading />
      <Header />
      <div className="image-slider">
        <div className="upper-text">
          <p className="welcome-text">
            Welcome to Pet Zone Veterinary Clinic, where we provide compassionate care for your beloved pets. Your pet's health is our top priority!
          </p>
          <Link to="/Makeappointment" className="appointment-button">
            Make an appointment
          </Link>
        </div>
        <button className="arrow left" onClick={prevImage}>
          ◀
        </button>
        <img className="slider-image" src={`/images/${images[currentImage]}`} alt="Veterinary Service" />
        <button className="arrow right" onClick={nextImage}>
          ▶
        </button>
        <div className="dots-container">
          {images.map((_, index) => (
            <span key={index} className={index === currentImage ? 'dot active' : 'dot'} onClick={() => handleDotClick(index)}></span>
          ))}
        </div>
      </div>
      <div className="vetservices-container">
        <div className="service-list-container-vetservices">
          <h2>Available Veterinary Services</h2>
          <ul className="service-list-vetservices">
            {services.map((service) => (
              <li key={service.title} onClick={() => toggleDescription(service.title)}>
                <span className="toggle-icon">{showDescription === service.title ? '-' : '+'}</span>
                <h3>{service.title}</h3>
                {showDescription === service.title && <p>{service.description}</p>}
              </li>
            ))}
          </ul>
        </div>
        <div className="search-container-vetservices">
          <div className="search-box-vetservices">
            <input type="text" placeholder="Search For Veterinarians..." />
            <button className="search-button-vetservices">
              <i className="ri-search-line"></i>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Vetservices;