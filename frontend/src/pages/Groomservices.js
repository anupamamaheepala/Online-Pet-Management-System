import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ShowLoading from '../components/ShowLoading';
import '../css/groomeservices.css';

function Groomservices() {
  const images = ['groome1.jpg', 'groome2.jpg', 'groome3.jpg', 'groome4.jpg', 'groome5.jpg'];
  const [currentImage, setCurrentImage] = useState(0);
  const [showDescription, setShowDescription] = useState('');
  const [services, setServices] = useState([]);

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

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:9000/services/services');
      const groomeServices = response.data.filter(service => service.type === 'Groome Service');
      setServices(groomeServices);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleDotClick = (index) => {
    setCurrentImage(index);
  };

  const toggleDescription = (service) => {
    setShowDescription(showDescription === service ? '' : service);
  };

  return (
    <>
      <ShowLoading />
      <Header />
      <div className="image-slider">
        <div className="upper-text">
          <p className="welcome-text">
            Welcome to Pet Zone Grooming Salon, where pampering your furry friend is our passion. Let's make your pet look and feel their best!
          </p>
          <Link to="/Makeappointment" className="appointment-button">
            Make an appointment
          </Link>
        </div>
        <button className="arrow left" onClick={prevImage}>
          ◀
        </button>
        <img className="slider-image" src={`/images/${images[currentImage]}`} alt="Grooming Service" />
        <button className="arrow right" onClick={nextImage}>
          ▶
        </button>
        <div className="dots-container">
          {images.map((_, index) => (
            <span key={index} className={index === currentImage ? 'dot active' : 'dot'} onClick={() => handleDotClick(index)}></span>
          ))}
        </div>
      </div>
      <div className="groom-services-container">
        <div className="service-list-container">
          <h2>Available Grooming Services</h2>
          <ul className="service-list">
            {services.map((service) => (
              <li key={service.title} onClick={() => toggleDescription(service.title)}>
                <span className="toggle-icon">{showDescription === service.title ? '-' : '+'}</span>
                <h3>{service.title}</h3>
                {showDescription === service.title && <p>{service.description}</p>}
              </li>
            ))}
          </ul>
        </div>
        <div className="square-placeholder">
          <h1>Available Groomers</h1>
         
        </div> 
      </div>
      <Footer />
    </>
  );
}

export default Groomservices;
