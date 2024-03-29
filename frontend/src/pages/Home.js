import React, { useState, useEffect } from 'react';
import Homepage from '../css/Homepage.css'; // Import your CSS file for styling
import Header from '../components/Header';
import Footer from '../components/Footer'; // Import the Footer component
import Layout from '../components/Layout';

const Home = () => {
  // State variable to track the current slide index
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array of image URLs and corresponding texts for the slides
  const slides = [
    {
      image: '/images/h1.jpg', // Example image URL
      text: 'Welcome to the Pet Zone',
    },
    {
      image: '/images/h2.jpg', // Example image URL
      text: 'Slide 2 Text',
    },
    {
      image: '/images/h4.jpeg',  // Example image URL
      text: 'Slide 3 Text',
    },
  ];

  // Event handlers for next and previous buttons
  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  const counterStyle = {
    backgroundImage: 'url("/images/tp1.jpg")',
    backgroundColor:'',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginBottom:'30px'
  };

  const containerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.)', // Adjust opacity as needed
  };

  return (
    <div>
      <Header />
      <div className="homepage-container">
        <div className="slide-container">
          <div
            className="slide"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            <div className="slide-text">{slides[currentSlide].text}</div>
          </div>
        </div>
        <div className="button-container" style={{position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)'}}>

        <div className="button-container">
          <button className="btn btn-outline-info" onClick={goToPrevSlide}>
            <i className="bi bi-arrow-left"></i>
          </button>
          <button className="btn btn-outline-info" onClick={goToNextSlide}>
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>

        </div>
      </div>

      <section className="about top" style={{marginTop:'40px'}}>
        <div className="container flex">
          <div className="left">
            <div className="heading">
              <h1>WELCOME</h1>
              <h2>Pet Zone</h2>
            </div>
            <p>
              Pet Zone Hospital is a multifaceted platform dedicated to providing holistic pet care solutions, encompassing veterinary services, professional grooming, expert training programs, efficient inventory management, lost and found advertisement postings, streamlined staff management tools, easy registration processes, and convenient payment methods. Our integrated approach ensures that pets receive comprehensive care while offering pet owners a seamless experience, from accessing essential services to managing their pets' well-being and administrative needs
            </p>
            <button className="primary-btn" style={{width: '110px'}}>ABOUT US</button>
          </div>
          <div className="right">
            <img style={{ height: "300px",paddingRight:'10px'}} src="/images/tp1.jpg" alt="Info Image" />
          </div>
        </div>
      </section>

      <h1> Our services</h1>
      <h3>info about pet zone hospital</h3>


      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '400px' }}>
        <div className="row">
          <div className="image-column">
            <img src="/images/tp2.jpg" alt="Image" style={{ height: "300px",paddingRight:'200px' }} />
          </div>
          <div className="text-column">
            <h2>Training Programs</h2>
            <p>Description</p>
          </div>
        </div>
      </div>

      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '400px' }}>
        <div className="row">
          <div className="text-column">
            <h2>Training Programs</h2>
            <p>Description</p>
          </div>
          <div className="image-column">
            <img src="/images/tp2.jpg" alt="Image" style={{ height: "300px" }} />
          </div>
        </div>
      </div>

      <section className="counter top" style={counterStyle}>
        <div className="container grid" style={containerStyle}>
          <div className="box" style={{paddingBottom:'50px'}}>
            <h1>2500</h1>
            <hr />
            <span>Customer</span>
          </div>
          <div className="box">
            <h1>1250</h1>
            <hr />
            <span>Happy Customer</span>
          </div>
          <div className="box">
            <h1>150</h1>
            <hr />
            <span>Expert Veterinary</span>
          </div>
          <div className="box">
            <h1>3550</h1>
            <hr />
            <span>Expert Trainers</span>
          </div>
        </div>
      </section>
      <Footer /> {/* Add the Footer component */}
    </div>
  );
};

export default Home;
