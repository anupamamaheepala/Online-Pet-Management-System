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

        // Simulate data fetching for other salary details
        // For demonstration purposes, setting default values here
        setBasicSalary(1000);
        setOtHours(10);
        setOtRate(20);
        setBonusAmount(200);
        calculateTotalSalary(); // Calculate total salary based on fetched and default values
    }, [location.search]);

    const calculateOTAmount = () => {
        const otAmount = otHours * otRate;
        return otAmount;
    };

    const calculateTotalSalary = () => {
        const otAmount = calculateOTAmount();
        const total = basicSalary + otAmount + bonusAmount;
        setTotalSalary(total);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Placeholder for regeneration logic
        console.log('Salary regenerated successfully');
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
                            readOnly
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
                        <label className='StaffSalary-form-group label'>Bonus Amount:</label>
                        <input type="number" className='bonusAmount' value={bonusAmount} onChange={e => setBonusAmount(e.target.value)} />
                    </div>
                    <div className="StaffSalary-form-group">
                        <label className=''>Total Salary:</label>
                        <input type="number" className='totalSalary' value={totalSalary} readOnly />
                    </div>
                    <center>
                        <button type="submit" className='UpdateStaffCalculate'>Regenerate Salary</button>
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
