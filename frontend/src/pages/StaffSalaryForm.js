import Layout from '../components/Layout';
import React from 'react';
import '../css/StaffSalary.css';

function SalaryCalculator(){
    return(
        <Layout>

        <div className="wrap">
      <div className="StaffRegister">
        <h2>Salary Calculation Form</h2>
        <form>
          <div className="input_box">
            <label>Staff Name:</label>
            <input type="text" required/>
          </div>

          <div className="input_box">
            <label>Staff ID:</label>
            <input
              type="text"  required  />
          </div>

          <div className="input_box">
            <label>Basic Salary:</label>
            <input type="number" required />
          </div>

          <div className="input_box">
            <label>OT Hours:</label>
            <input type="number" required />
          </div>

          <div className="input_box">
            <label>OT Amount:</label>
            <input
              type="number" required />
          </div>

          <div className="input_box">
            <label>Bonus Amount:</label>
            <input
              type="number" required />
          </div>


          <button type="submit">Calculate</button>
        </form>
        <div>
          <h3>Total Salary:</h3>
        </div>


      </div>
    </div>
    </Layout>
  );
};

export default SalaryCalculator;
