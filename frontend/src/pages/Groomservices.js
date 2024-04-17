import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/groomeservices.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ShowLoading from '../components/ShowLoading';

function Groomservices() {
  const images = ['groome1.jpg', 'groome2.jpg', 'groome3.jpg', 'groome4.jpg', 'groome5.jpg']; 
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
    setShowDescription(showDescription === service ? '' : service);
  };

  const services = [
    { title: 'Bathing and Brushing', description: 'Regular bathing and brushing help keep your pet\'s coat clean and healthy, reducing shedding and preventing matting.' },
    { title: 'Trimming and Styling', description: 'Professional grooming includes trimming your pet\'s fur to maintain a neat appearance and styling to your preferences.' },
    { title: 'Nail Clipping', description: 'Trimming your pet\'s nails is essential to prevent overgrowth, which can lead to discomfort and difficulty walking.' },
    { title: 'Ear Cleaning', description: 'Regular cleaning of your pet\'s ears helps prevent infections and keeps their ears healthy and free from wax buildup.' },
    { title: 'Teeth Brushing', description: 'Dental hygiene is important for pets, and brushing their teeth helps prevent dental diseases and bad breath.' },
    { title: 'Special Treatments', description: 'Some pets may require special treatments such as flea baths, skin conditioning, or medicated baths for specific skin conditions.' },
  ];

  return (
    <>
      <ShowLoading />
      <Header /> 
      <div className="image-slider">
        <div className="upper-text">
          <p className="welcome-text">
            Welcome to Pet Zone Grooming Salon, where pampering your furry friend is our passion. Let's make your pet look and feel their best!
          </p>
          <Link to="/Makeappointment" className="appointment-button">Make an appointment</Link>
        </div>
        <button className="arrow left" onClick={prevImage}>◀</button>
        <img className="slider-image" src={`/images/${images[currentImage]}`} alt="Grooming Service" />
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
      </div>
      <Footer /> 
    </>
  );
}

export default Groomservices;
