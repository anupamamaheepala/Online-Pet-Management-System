import React from 'react';
import { Link } from 'react-router-dom';
import '../css/groomeservices.css';
import Header from '../components/Header'; // Import the Header component
import Footer from '../components/Footer'; // Import the Footer component

function Groomservices() {
  return (
    <>
      <Header /> {/* Rendering the Header component */}
      <div className="appointment-container">
        <Link to="/ScheduleAppointment">
          <button className="appointment-button">Make an Appointment</button>
        </Link>
      </div>
      <hr />

      <div className="groom-services-container">
        <h1>Available Pet Grooming Services</h1>
        <ul className="service-list">
          <li>
            <h3>Bathing and Shampooing</h3>
            <p>
              Regular bathing helps keep your pet's skin and coat clean and healthy. 
              Professional grooming services provide specialized shampoos and conditioners 
              tailored to your pet's needs.
            </p>
          </li>
          <li>
            <h3>Haircut and Styling</h3>
            <p>
              Professional groomers are skilled in various haircut styles for different breeds 
              of pets. From a simple trim to intricate styling, groomers can transform your pet's 
              appearance according to your preferences.
            </p>
          </li>
          <li>
            <h3>Nail Trimming</h3>
            <p>
              Trimming your pet's nails is essential for maintaining their paw health and 
              preventing overgrowth or breakage. Grooming salons offer safe and efficient 
              nail trimming services for pets.
            </p>
          </li>
          <li>
            <h3>Ear Cleaning</h3>
            <p>
              Cleaning your pet's ears helps prevent ear infections and discomfort. 
              Professional groomers use specialized solutions and techniques to clean 
              your pet's ears safely and effectively.
            </p>
          </li>
          <li>
            <h3>Teeth Brushing</h3>
            <p>
              Dental hygiene is crucial for pets' overall health. Grooming services may include 
              teeth brushing to remove plaque and tartar buildup and maintain your pet's oral health.
            </p>
          </li>
          <li>
            <h3>Gland Expression</h3>
            <p>
              Gland expression is necessary for some pets, especially dogs, to prevent 
              discomfort and health issues. Professional groomers can perform this procedure 
              safely and hygienically.
            </p>
          </li>
        </ul>
      </div>
      <Footer /> {/* Adding the Footer component */}
    </>
  );
}

export default Groomservices;
