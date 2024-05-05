import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/SalaryView.css';
import Footer from '../components/Footer';
import VetHeader from '../components/Vet components/VetHeader';
import GroomeHeader from '../components/Groome components/GroomerHeader';

const SalaryView = () => {
  const [salaries, setSalaries] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/salary/modified-salary/${id}`);
        setSalaries(res.data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchSalaries();
  }, [id]);

  return (
    <>
      <VetHeader />

      <div className='SalaryViewContainer'>
        <div className='SalaryViewHeader'>
          <h2>Salary Details</h2>
          {salaries.length > 0 ? (
            salaries.map((salary, index) => (
              <div key={index} className='SalaryView'>
                <p>Staff ID: {salary.staffId.split('_')[0]}_{salary.staffId.split('_')[1]}</p>
                <p>First Name: {salary.firstName}</p>
                <p>Last Name: {salary.lastName}</p>
                <p>Month: {new Date(salary.selectedMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                <p>Basic Salary: {salary.basicSalary}</p>
                <p>OT Hours: {salary.otHours}</p>
                <p>OT Rate: {salary.otRate}</p>
                <p>OT Amount: {salary.otAmount}</p>
                <p>Bonus Amount: {salary.bonusAmount}</p>
                <p>Total Salary: {salary.totalSalary}</p>
              </div>
            ))
          ) : (
            <p>No salary details found</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SalaryView;
