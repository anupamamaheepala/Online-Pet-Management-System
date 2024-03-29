import React from 'react';
import Layout from '../components/Layout';

import '../css/signin.css';

function SignIn() {
  return (

  
    <Layout>
      <div> 


        <div>
          <br />
          <div className="signinform">
            <h2><center>Sign In To PetZone</center></h2>
            <form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />
              </div>
              <div className="form-group">
                <a href="#">Forgot Password?</a>
              </div>
              <div className="form-group" style={{ textAlign: 'center' }}>
                <button style={{ width: '150px' }} type="submit">Sign In</button>
              </div>
              <div className="form-group">
                <p>Don't have an account? <a href="#">Sign Up</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SignIn;