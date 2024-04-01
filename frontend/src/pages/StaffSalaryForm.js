import Header from '../components/Header';
import Footer from '../components/Footer';
import React from 'react';
import '../css/StaffSalary.css';

function SalaryCalculator(){
    return(
      <>
      <Header />
       

      <div className="StaffSalary">
        <h2>Salary Calculation Form</h2>

        <form className='StaffSalary-form'>

          <div className="StaffSalary-form-group">
            <label className='StaffSalary-form-group label'>Staff Name:</label>
            <input type="text" className='staffname' required/>
          </div>

          <div className="StaffSalary-form-group">
            <label className='StaffSalary-form-group label'>Staff ID:</label>
            <input
              type="text" className='staffid'  required  />
          </div>

          <div className="StaffSalary-form-group">
            <label className='StaffSalary-form-group label'>Basic Salary:</label>
            <input type="number" className='basicSalary' required />
          </div>

          <div className="StaffSalary-form-group">
            <label className=''>OT Hours:</label>
            <input type="number" className='otHours'required />
          </div>

          <div className="StaffSalary-form-group">
            <label className='StaffSalary-form-group label'>OT Amount:</label>
            <input
              type="number" className='otAmount' required />
          </div>

          <div className="StaffSalary-form-group">
            <label className='StaffSalary-form-group label'>Bonus Amount:</label>
            <input
              type="number"  className='bonusAmount' required />
          </div>


          <button type="submit" className='StaffCalculate'>Calculate</button>
        </form>
        <div>
          <h3>Total Salary:</h3>
        </div>


      </div>

      <br></br>
    
    <Footer />
    </>
  );
};

export default SalaryCalculator;
