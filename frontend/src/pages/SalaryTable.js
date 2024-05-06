import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../css/salaryTable.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import SystemAdminHeader from '../components/SystemAdminHeader';

const SalaryTable = () => {
  const [salaries, setSalaries] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('staffId');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
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

  const handleGenerateReport = () => {
    const doc = new jsPDF();

    const logo = new Image();
    logo.src = '/images/logo.png';

    logo.onload = function () {
        const logoWidth = 30;
        const xPosition = 10;
        const yPosition = 10;

        doc.addImage(logo, 'PNG', xPosition, yPosition, logoWidth, logoWidth);

        // Modify staffId format
        const tableData = salaries.map(salary => [
            `${salary.staffId.split('_')[0]}_${salary.staffId.split('_')[1]}`, // Modified staffId format
            salary.firstName,
            salary.lastName,
            formatDate(salary.selectedMonth),
            salary.basicSalary,
            salary.otHours,
            salary.otRate,
            salary.otAmount,
            salary.bonusAmount,
            salary.totalSalary,
        ]);

        // Define column widths
        const columnWidths = {
            0: 30, // Staff ID column width
            1: 30, // First Name column width
            2: 30, // Last Name column width
            3: 30, // Month column width
            4: 30, // Basic Salary column width
            5: 20, // OT Hours column width
            6: 20, // OT Rate column width
            7: 30, // OT Amount column width
            8: 30, // Bonus Amount column width
            9: 30, // Total Salary column width
        };

        doc.setFontSize(18);
        doc.text('Salary Details', 90, yPosition + logoWidth - 10);
        doc.setFontSize(15);

        // Specify styles for the table content
        const tableStyles = {
            fontSize: 8, // Set the font size to a smaller value for the table content
        };

        doc.autoTable({
            startY: yPosition + logoWidth + 10,
            head: [['Staff ID', 'First Name', 'Last Name', 'Month', 'Basic Salary', 'OT Hours', 'OT Rate', 'OT Amount', 'Bonus Amount', 'Total Salary']],
            body: tableData,
            styles: {
                fontSize: 9,
                cellPadding: 3,
                lineWidth: 0.1,
                lineColor: [0, 0, 0],
            },
            headStyles: {
                fillColor: [0, 0, 0],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                halign: 'center',
                valign: 'middle',
            },
            columnStyles: columnWidths, // Set column widths
            tableWidth: 'auto', // Set table width to auto
            didDrawCell: (data) => {
                // Apply custom styles to table cells
                if (data.row.index % 2 === 0) {
                    data.cell.styles.fillColor = [240, 240, 240]; // Alternate row background color
                }
            },
            styles: tableStyles, // Apply custom styles to table content
        });
        doc.save('salary_report.pdf');
    };
};


  const formatDate = date => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const formatMonth = date => {
    // Convert the date string to a Date object
    const dateObj = new Date(date);
  
    // Extract the month and year from the date object
    const month = dateObj.toLocaleString('default', { month: 'short' }); 
    const year = dateObj.getFullYear();
  
    // Return the formatted string containing only month and year
    return `${month} ${year}`;
  };

   // Filtered salaries based on search criteria and value
   const filteredSalaries = salaries.filter(salary =>
    salary[searchCriteria].toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/salary/${id}/delete`);
      // Update the salaries state after deletion
      setSalaries(prevSalaries => prevSalaries.filter(salary => salary._id !== id));
    } catch (error) {
      console.error('Error deleting salary:', error);
    }
  };


  return (
    <>
      <SystemAdminHeader />

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
        <button onClick={handleGenerateReport} className='SalaryGenerateReport'>Generate Report</button>
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
              <th>Actions</th> 
            </tr>
          </thead>
          <tbody>
              {filteredSalaries.map(salary => (
                <tr key={salary._id}>
                 <td>{`${salary.staffId.split('_')[0]}_${salary.staffId.split('_')[1]}`}</td>
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
                    <Link className='SalaryUpdate' to={`/update-salary?staffId=${salary.staffId}`}>View Details</Link>
                    <button className='salarydelete' onClick={() => handleDelete(salary._id)}>Delete</button>
                  </td>
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
