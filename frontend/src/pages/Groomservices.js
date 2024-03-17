import React from 'react';
import { Link } from 'react-router-dom';
import '../css/groomeservices.css';
import Layout from  '../components/Layout';

function Groomservices() {
  return (

    <Layout>
            <div className="appointment-container">
            <Link to="/ScheduleAppointment">
                <button className="appointment-button">Make an Appointment</button>
            </Link>
        </div>
        <div class="slideshow"></div>
    </Layout>

  )
}

export default Groomservices;