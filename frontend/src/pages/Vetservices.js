import React from 'react';
import { Link } from 'react-router-dom';
import '../css/vetservices.css';
import Layout from '../components/Layout';
  

function Vetservices() {
  return (
   <Layout>
    <div className="appointment-container">
            <Link to="/ScheduleAppointment">
                <button className="appointment-button">Make an Appointment</button>
            </Link>
           
        </div>
        <hr></hr>

       

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
   </Layout>
  )
}

export default Vetservices;