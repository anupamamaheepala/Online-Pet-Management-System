import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/SalaryView.css';

const SalaryView = () => {
  const [salary, setSalary] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/salary/${id}`);
        setSalary(res.data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchSalary();
  }, [id]);

  return (
    <div className='SalaryViewContainer'>
    <div className='SalaryViewHeader'>
      <h2>Salary Details</h2>
      {salary ? (
        <div className='SalaryView'>
          <p>Staff ID: {salary.staffId}</p>
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
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>
  );
};

export default SalaryView;
