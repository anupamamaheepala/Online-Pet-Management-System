import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/StaffSalary.css';

function SalaryCalculator(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [basicSalary, setBasicSalary] = useState(0);
    const [otHours, setOtHours] = useState(0);
    const [otAmount, setOtAmount] = useState(0);
    const [bonusAmount, setBonusAmount] = useState(0);
    const [totalSalary, setTotalSalary] = useState(0);

    useEffect(() => {
        // Retrieve first name and last name from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const firstname = urlParams.get('firstname');
        const lastname = urlParams.get('lastname');

        setFirstName(firstname);
        setLastName(lastname);
    }, []);

    // Calculate total salary when any input changes
    useEffect(() => {
        const total = basicSalary + bonusAmount + otAmount;
        setTotalSalary(total);
    }, [basicSalary, bonusAmount, otAmount]);

    const handleBasicSalaryChange = (e) => {
        setBasicSalary(parseInt(e.target.value));
    };

    const handleOtHoursChange = (e) => {
        setOtHours(parseInt(e.target.value));
        // Assume OT rate is Rs.1500 per hour, adjust this as necessary
        setOtAmount(parseInt(e.target.value) * 1500);
    };

    const handleBonusAmountChange = (e) => {
        setBonusAmount(parseInt(e.target.value));
    };

    return (
        <>
            <Header />

            <div className="StaffSalary">
                <h2>Salary Calculation Form</h2>

                <form className='StaffSalary-form'>

                    <div className="StaffSalary-form-group">
                        <label className='StaffSalary-form-group label'>First Name:</label>
                        <input type="text" id='sfirstname' className='staffname' value={firstName} readOnly />
                    </div>

                    <div className="StaffSalary-form-group">
                        <label className='StaffSalary-form-group label'>Last Name:</label>
                        <input type="text" id='slastname' className='staffname' value={lastName} readOnly />
                    </div>

                    <div className="StaffSalary-form-group">
                        <label className='StaffSalary-form-group label'>Basic Salary:</label>
                        <input type="number" className='basicSalary' value={basicSalary} onChange={handleBasicSalaryChange} required />
                    </div>

                    <div className="StaffSalary-form-group">
                        <label className=''>OT Hours:</label>
                        <input type="number" className='otHours' value={otHours} onChange={handleOtHoursChange}  />
                    </div>

                    <div className="StaffSalary-form-group">
                        <label className='StaffSalary-form-group label'>OT Amount:</label>
                        <input type="number" className='otAmount' value={otAmount} readOnly />
                    </div>

                    <div className="StaffSalary-form-group">
                        <label className='StaffSalary-form-group label'>Bonus Amount:</label>
                        <input type="number" className='bonusAmount' value={bonusAmount} onChange={handleBonusAmountChange}  />
                    </div>

                    <div className="StaffSalary-form-group">
                        <label className=''>Total Salary:</label>
                        <input type="number" className='totalSalary' value={totalSalary} readOnly />
                    </div>

                   <center> <button type="submit" className='StaffCalculate'>Assign Salary</button></center>
                </form>
            </div>

            <br></br>

            <Footer />
        </>
    );
};

export default SalaryCalculator;
