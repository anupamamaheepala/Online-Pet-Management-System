import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'; // Import Link component and useLocation hook
import '../css/StaffSalary.css';

function RegenerateSalary(props) {
    const location = useLocation(); // Use useLocation hook to access location object
    const [staffId, setStaffId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [basicSalary, setBasicSalary] = useState(0);
    const [otHours, setOtHours] = useState(0);
    const [otRate, setOtRate] = useState(0);
    const [bonusAmount, setBonusAmount] = useState(0);
    const [totalSalary, setTotalSalary] = useState(0);


    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setStaffId(params.get('staffId'));
        setFirstName(params.get('firstName'));
        setLastName(params.get('lastName'));
        setBasicSalary(parseFloat(params.get('basicSalary'))); 
        setOtRate(parseFloat(params.get('otRate'))); 
    
        // Simulate data fetching for other salary details
        // For demonstration purposes, setting default values here
        
        setOtHours(0);
        setBonusAmount(0);
        calculateTotalSalary(); // Calculate total salary based on fetched and default values
    }, [location.search]);

    useEffect(() => {
        calculateTotalSalary();
    }, [otHours, bonusAmount, basicSalary]);


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        
        try {
            // Calculate OT amount
            const otAmount = calculateOTAmount();
            
            // Prepare the data to be submitted
            const formData = {
                staffId,
                firstName,
                lastName,
                selectedMonth,
                basicSalary,
                otHours,
                otRate,
                otAmount, // Include otAmount in the form data
                bonusAmount,
                totalSalary
                // Add any other necessary fields here
            };
    
            // Send a POST request to the server with the form data
            const response = await axios.post('http://localhost:9000/salary/add', formData);
    
            // Handle the response
            console.log(response.data); // Log the response data or handle it as needed
    
            // Optionally, you can redirect the user to another page after successful submission
            // history.push('/success'); // Import useHistory hook to use history.push
    
        } catch (error) {
            // Handle errors
            console.error('Error submitting form:', error);
            // Optionally, you can show an error message to the user
        }
    };
    

    const calculateOTAmount = () => {
        const otAmount = otHours * otRate;
        return otAmount;
    };

    const calculateTotalSalary = () => {
        const otAmount = calculateOTAmount();
        const total = basicSalary + otAmount + parseFloat(bonusAmount);
        setTotalSalary(total);
    };
    
    

    return (
        <>
            <Header />
            <div className="StaffSalary">
                <h2>Regenerate Salary</h2>
                <form onSubmit={handleSubmit} className='StaffSalary-form'>
                    <div className="StaffSalary-form-group">
                        <label className='StaffSalary-form-group label'>Staff ID:</label>
                        <input type="text" id='staffId' className='staffId' value={staffId} readOnly />
                    </div>
                    <div className="StaffSalary-form-group">
                        <label className='StaffSalary-form-group label'>First Name:</label>
                        <input type="text" id='sfirstname' className='staffname' value={firstName} readOnly />
                    </div>
                    <div className="StaffSalary-form-group">
                        <label className='StaffSalary-form-group label'>Last Name:</label>
                        <input type="text" id='slastname' className='staffname' value={lastName} readOnly />
                    </div>
                    <div className="StaffSalary-form-group">
                        <label className='StaffSalary-form-group label'>Select Month:</label>
                        <DatePicker
                            className='selectedMonth'
                            selected={selectedMonth}
                            onChange={date => setSelectedMonth(date)}
                            showMonthYearPicker
                            dateFormat="MM/yyyy"
                            
                        />
                    </div>
                    <div className="StaffSalary-form-group">
                        <label className='StaffSalary-form-group label'>Basic Salary:</label>
                        <input type="number" className='basicSalary' value={basicSalary} readOnly />
                    </div>
                    <div className="StaffSalary-form-group">
                        <label className=''>OT Hours:</label>
                        <input type="number" className='otHours' value={otHours} onChange={e => setOtHours(e.target.value)} />
                    </div>
                    <div className="StaffSalary-form-group">
                        <label className='StaffSalary-form-group label'>OT Rate:</label>
                        <input type="number" className='otRate' value={otRate} readOnly />
                    </div>
                    <div className="StaffSalary-form-group">
                        <label className='StaffSalary-form-group label'>OT Amount:</label>
                        <input type="number" className='otAmount' value={calculateOTAmount()} readOnly />
                    </div>
                    <div className="StaffSalary-form-group">
                        <label className='StaffSalary-form-group label'>Bonus Amount:</label>
                        <input type="number" className='bonusAmount' value={bonusAmount} onChange={e => setBonusAmount(e.target.value)} />
                    </div>
                    <div className="StaffSalary-form-group">
                        <label className=''>Total Salary:</label>
                        <input type="number" className='totalSalary' value={totalSalary} readOnly />
                    </div>
                    <center>
                        <button type="submit" className='UpdateStaffCalculate'>Assign Salary</button>
                        <Link to="/StaffList" className="edit-staff-link-button">
                            <button className="edit-staff-button">Back to All Staff List</button>
                        </Link>
                    </center>
                </form>
            </div>
            <br />
            <Footer />
        </>
    );
};

export default RegenerateSalary;
