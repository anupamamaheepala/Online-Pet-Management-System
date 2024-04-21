import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ShowLoading from '../components/ShowLoading';
import '../css/vetservices.css';

function Vetservices() {
  const images = ['vetback1.jpg', 'vetback2.jpg', 'vetback3.jpg', 'vetback4.jpg', 'vetback5.jpg'];
  const [currentImage, setCurrentImage] = useState(0);
  const [showDescription, setShowDescription] = useState('');
  const [services, setServices] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [filteredStaffs, setFilteredStaffs] = useState([]);

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
    fetchStaffs();
  }, []); // Fetch services and staffs when component mounts

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:9000/services/services');
      const vetServices = response.data.filter(service => service.type === "Veterinary Service");
      setServices(vetServices);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchStaffs = async () => {
    try {
      const response = await axios.get('http://localhost:9000/staffs');
      const veterinarians = response.data.filter(staff => staff.designation === "Veterinarian");
      setStaffs(veterinarians);
      setFilteredStaffs(veterinarians);
    } catch (error) {
      console.error('Error fetching staffs:', error);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = staffs.filter(staff =>
      `${staff.sfirstname} ${staff.slastname}`.toLowerCase().includes(searchTerm)
    );
    setFilteredStaffs(filtered);
  };

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/services/services/${id}`);
      fetchServices(); // Refresh the list of services after deletion
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

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
              <li key={service._id} onClick={() => toggleDescription(service.title)}>
                <span className="toggle-icon">{showDescription === service.title ? '-' : '+'}</span>
                <h3>{service.title}</h3>
                {showDescription === service.title && <p>{service.description}</p>}
              </li>
            ))}
          </ul>
        </div>
        <div className="search-container-vetservices">
          <div className="search-box-vetservices">
            <input
              type="text"
              placeholder="Search For Veterinarians..."
              onChange={handleSearch}
            />
            <button className="search-button-vetservices">
              <i className="ri-search-line"></i>
            </button>
          </div>
          <div className="search-results-container">
            {filteredStaffs.map((staff) => (
              <div key={staff._id} className="staff-card">
                <h3>{`${staff.sfirstname} ${staff.slastname}`}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Vetservices;