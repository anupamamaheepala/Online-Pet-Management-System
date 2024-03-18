import React from 'react';
import '../css/signin.css';

function SignIn() {
  return (
    <div className="container" style={{ marginTop: '100px', width: '600px', maxWidth: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: 'rgba(46, 119, 107, 0.397)'}}>

      <h2><center>Sign In To PetZone</center></h2>
      <br></br>
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
        <div className="form-group">
         <center> <button style={{width:'150px'}} type="submit">Sign In</button></center>
        </div>
        <div className="form-group">
          <p>Don't have an account? <a href="#">Sign Up</a></p>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
