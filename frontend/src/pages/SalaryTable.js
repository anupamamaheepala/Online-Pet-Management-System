import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link component
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/salaryTable.css';

const SalaryTable = () => {
  const [salaries, setSalaries] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('staffId');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    // Fetch all salary details from backend API when component mounts
    const fetchSalaries = async () => {
      try {
        const response = await axios.get('http://localhost:9000/salary'); 
        setSalaries(response.data);
      } catch (error) {
        console.error('Error fetching salary details:', error);
      }
    };

    fetchSalaries();
  }, []);

  const handleSearchChange = event => {
    setSearchValue(event.target.value);
  };

  const handleCriteriaChange = event => {
    setSearchCriteria(event.target.value);
  };

  const formatDate = date => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const formatMonth = date => {
    // Convert the date string to a Date object
    const dateObj = new Date(date);
  
    // Extract the month and year from the date object
    const month = dateObj.toLocaleString('default', { month: 'short' }); // Get the short month name
    const year = dateObj.getFullYear();
  
    // Return the formatted string containing only month and year
    return `${month} ${year}`;
  };
  

  return (
    <>
      <Header />

      <br />
      <div className='SalaryTable1'>
        <center><h2>Salary Details</h2></center>
        <br />
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search..." 
            className='SalaryTablesearch'
            value={searchValue} 
            onChange={handleSearchChange} 
          />
          <select value={searchCriteria} onChange={handleCriteriaChange} className='SalaryTableselect'>
            <option value="staffId">Staff ID</option>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
          </select>
        </div>
        <br />
        <table className='SalaryTable2'>
          <thead>
            <tr>
              <th>Staff ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Month</th>
              <th>Basic Salary</th>
              <th>OT Hours</th>
              <th>OT Rate</th>
              <th>OT Amount</th>
              <th>Bonus Amount</th>
              <th>Total Salary</th>
              <th>Created Date</th>
              <th>Update Details</th> 
            </tr>
          </thead>
          <tbody>
            {salaries.map(salary => (
              <tr key={salary._id}>
                <td>{salary.staffId}</td>
                <td>{salary.firstName}</td>
                <td>{salary.lastName}</td>
                <td>{formatMonth(salary.selectedMonth)}</td>
                <td>{salary.basicSalary}</td>
                <td>{salary.otHours}</td>
                <td>{salary.otRate}</td>
                <td>{salary.otAmount}</td>
                <td>{salary.bonusAmount}</td>
                <td>{salary.totalSalary}</td>
                <td>{formatDate(salary.createdAt)}</td>
                <td>
                  <Link className='SalaryUpdate' to={`/update-salary?staffId=${salary.staffId}`}>Update</Link>
                </td> {/* Link to update page */}
              </tr>
            ))}
          </tbody>
        </table>
        <br />
      </div>
      <Footer />
    </>
  );
};

export default SalaryTable;
