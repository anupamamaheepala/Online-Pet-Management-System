// SignIn.js

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/signin.css';
import { Link } from 'react-router-dom';


function SignIn() {
  return (
    <>
    <Header />
      <div> 
        <div>
          <br />
          <div className="signin-signinform">
            <h2><center>Sign In To PetZone</center></h2>
            <div className="signin-content">

            <form>
              <div className="signin-form-group">
                <label className="signin-label" htmlFor="email">Email</label>
                <input className="signin-input" type="email" id="email" name="email" />
              </div>
              <div className="signin-form-group">
                <label className="signin-label" htmlFor="password">Password</label>
                <input className="signin-input" type="password" id="password" name="password" />
              </div>
              <div className="signin-form-group">
                <a href="#">Forgot Password?</a>
              </div>
              <div className="signin-form-group" style={{ textAlign: 'center' }}>
                <button className="signin-button" style={{ width: '150px' }} type="submit">Sign In</button>
              </div>
              <div className="signin-form-group">
                <p className="signin-p">Don't have an account? <a href="#">Sign Up</a></p>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
      <br></br>
    <Footer />
    </>
  );
}

export default SignIn;
