import React, { useState, useEffect } from 'react';
import Homepage from '../css/Homepage.css'; // Import your CSS file for styling
import Header from '../components/Header';
import Footer from '../components/Footer'; // Import the Footer component
import ShowLoading from '../components/ShowLoading';

const Home = () => {
  // State variable to track the current slide index
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array of image URLs and corresponding texts for the slides
  const slides = [
    {
      image: '/images/h1.jpg', // Example image URL
      text: <span style={{ fontFamily: 'Times New Roman', fontSize: '94px' }}>Welcome To The Pet Zone</span>,
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
  const counterStyle2 = {
    backgroundImage: 'url("/images/tp1.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginBottom:'30px'
  };

  const containerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.)', // Adjust opacity as needed
  };

  return (
    <div>
      <ShowLoading />
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

      <section className="about top" style={{marginTop:'40px',paddingLeft:'10px'}}>
        <div className="home-container flex">
          <div className="left">
            <div className="heading">
              <h1>WELCOME</h1>
              <h2>Pet Zone</h2>
            </div>
            <p style={{textAlign: 'justify'}}>
              Pet Zone Hospital is a multifaceted platform dedicated to providing holistic pet care solutions, encompassing veterinary services, professional grooming, expert training programs, 
              efficient inventory management, lost and found advertisement postings, streamlined staff management tools, easy registration processes, and convenient payment methods. Our integrated approach ensures that pets receive comprehensive care while offering pet owners a seamless experience, from accessing essential services to managing their pets' well-being and administrative needs...
            </p>
            <button className="home_about-button" style={{width: '130px'}}>About Us</button>
          </div>
          <div className="right">
            <img style={{ height: "300px",paddingRight:'10px',paddingLeft:'30px'}} src="/images/tp1.jpg" alt="Info Image" />
          </div>
        </div>
      </section>
<div >
      <h3><b>Our Services</b> </h3>
      <hr style={{ width: '100%', border: '1px solid #000' }} />
      </div>

      <div className="home-container" style={{ paddingLeft: '0px',display: 'flex', width: '100%', height: '400px' }}>
        <div className="row">
        <div className="image-column" style={{paddingRight: '100px'}}>

            <img src="/images/tp2.jpg" alt="Image" style={{ height: "300px",paddingRight:'100px' ,paddingLeft:'0px'}} />
          </div>
          <div className="text-column">
            <h2>Training Programs</h2>
            <p style={{textAlign: 'justify'}}>Join us on a journey of companionship and understanding as we help you unlock the secrets to effective communication with your beloved pet. Our holistic approach to training not only teaches obedience but fosters mutual respect and trust, laying the foundation for a lifelong friendship. With personalized attention and proven techniques, we cater to the unique needs of every pet and owner duo. Embrace the joy of watching your furry friend thrive as they showcase their newfound skills and confidence. Let's embark on this adventure together and witness the transformation as we unleash your pet's full potential!</p>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingLeft: '0px',display: 'flex', width: '100%', height: '400px'  }}>
        <div className="row">
          <div className="text-column">
            <h2>Vet & Groom Services</h2>
            <p style={{textAlign: 'justify'}}>where we provide top-tier veterinary care and grooming services for your beloved pets. Our dedicated team of professionals is committed to ensuring the health, happiness, and well-being of your furry companions. From routine check-ups and vaccinations to specialized treatments and surgeries, we offer comprehensive veterinary care tailored to meet your pet's individual needs.

In addition to veterinary services, we also provide expert grooming services to keep your pet looking and feeling their best. From baths and haircuts to nail trims and ear cleaning, our experienced groomers will pamper your pet with gentle care and attention to detail.
</p>
          </div>
          <div className="image-column">
            <img src="/images/groom.jpeg" alt="Image" style={{ height: "300px" }} />
          </div>
        </div>
      </div>

      <section className="counter top" style={counterStyle2}>
        <div className="home-container grid" style={containerStyle}>
          <div className="box" style={{paddingBottom:'50px'}}>
            <h1>2500</h1>
            <hr />
            <span>Customer</span>
          </div>
          <div className="box">
            <h1>2250</h1>
            <hr />
            <span>Happy Customer</span>
          </div>
          <div className="box">
            <h1>30</h1>
            <hr />
            <span>Expert Veterinary</span>
          </div>
          <div className="box">
            <h1>50</h1>
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
