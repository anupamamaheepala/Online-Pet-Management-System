import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/grouptraining.css'; // Import your CSS file

const GroupTrainingPrograms = () => {
  return (
    <div>
      <Header />
      <div className="aloka1972-background-container">
        <img src="/images/grouptraining.jpg" alt="Group Training Header Image" className="img-fluid mb-4" style={{width:'80%'}} />
        <div className="aloka1972-content-container">
          <h2 style={{ fontSize:'65px'}}>Group Training Programs</h2>
          <p style={{color:'red', fontSize:'60px'}}>Coming Soon!</p>
          <p style={{ fontSize:'20px'}} >Get ready with your pet to have training with other pets. Group programming hasn't started yet, but we'll inform you when it does.</p>
        </div>
      </div>
      <div className="aloka1972-card-container">
        <div className="aloka1972-card" style={{marginBottom:'130px'}}>
          <img src="/images/group2.jpeg" alt="Cats Training" className="img-fluid" style={{height:'170px'}}/>
          <div className="aloka1972-card-content">
            <h3>Cats Training</h3>
            <p>Our cat training program focuses on basic obedience, agility, and socialization. We help your cat become more comfortable with grooming, handling, and other essential skills for a happy and well-behaved feline companion.</p>
          </div>
        </div>
        <div className="aloka1972-card">
          <img src="/images/group1.jpeg" alt="Dogs Training" className="img-fluid" />
          <div className="aloka1972-card-content">
            <h3>Dogs Training</h3>
            <p>Our dog training program offers a variety of classes tailored to your dog's needs, including obedience training, leash manners, and behavior modification. Whether you have a puppy or an adult dog, our experienced trainers will help build a strong bond and positive relationship between you and your canine companion.</p>
          </div>
        </div>
        <div className="aloka1972-card">
          <img src="/images/group3.jpeg" alt="Birds Training" className="img-fluid" />
          <div className="aloka1972-card-content">
            <h3>Birds Training</h3>
            <p>Our bird training program provides enrichment activities, flight training, and socialization opportunities for your feathered friend. Whether you have a parrot, cockatiel, or other bird species, our expert trainers will help enhance your bird's cognitive abilities and strengthen the bond between you and your avian companion.</p>
          </div>
        </div>
      </div>
      <div className="aloka1972-feedback-button-container">
        <button className="aloka1972-feedback-button" style={{ marginBottom:'30px'}}>Give Us Your Feedback</button>
      </div>
      <Footer />
    </div>
  );
};

export default GroupTrainingPrograms;
