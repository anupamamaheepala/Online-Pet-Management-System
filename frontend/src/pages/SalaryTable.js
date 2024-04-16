import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

  const filteredSalaries = salaries.filter(salary => {
    if (searchCriteria === 'staffId') {
      return salary.staffId.toLowerCase().includes(searchValue.toLowerCase());
    } else if (searchCriteria === 'firstName') {
      return salary.firstName.toLowerCase().includes(searchValue.toLowerCase());
    } else if (searchCriteria === 'lastName') {
      return salary.lastName.toLowerCase().includes(searchValue.toLowerCase());
    }
  });

  return (
    <>
      <Header />

      <br></br>
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
              <th>Basic Salary</th>
              <th>OT Hours</th>
              <th>OT Rate</th>
              <th>OT Amount</th>
              <th>Bonus Amount</th>
              <th>Total Salary</th>
            </tr>
          </thead>
          <tbody>
            {filteredSalaries.map(salary => (
              <tr key={salary._id}>
                <td>{salary.staffId}</td>
                <td>{salary.firstName}</td>
                <td>{salary.lastName}</td>
                <td>{salary.basicSalary}</td>
                <td>{salary.otHours}</td>
                <td>{salary.otRate}</td>
                <td>{salary.otAmount}</td>
                <td>{salary.bonusAmount}</td>
                <td>{salary.totalSalary}</td>
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
