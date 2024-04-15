import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link component
import '../css/StaffSalary.css';

function UpdateSalary(props) {
    const [staffId, setStaffId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [basicSalary, setBasicSalary] = useState(0);
    const [otHours, setOtHours] = useState(0);
    const [otAmount, setOtAmount] = useState(0);
    const [bonusAmount, setBonusAmount] = useState(0);
    const [totalSalary, setTotalSalary] = useState(0);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('staffId');
        
        axios.get(`http://localhost:9000/salary/${id}`)
            .then(response => {
                    const { staffId, firstName, lastName, basicSalary, otHours, otAmount, bonusAmount, totalSalary } = response.data;
                    setStaffId(staffId);
                    setFirstName(firstName);
                    setLastName(lastName);
                    setBasicSalary(basicSalary);
                    setOtHours(otHours);
                    setOtAmount(otAmount);
                    setBonusAmount(bonusAmount);
                    setTotalSalary(totalSalary);
                
            })
            .catch(error => {
                console.error('Error fetching salary details:', error);
            });
    }, []);
const otRate = 500; // Assuming a fixed OT rate of 500 per hour

const calculateOTAmount = () => {
        const otAmount = otHours * otRate;
        setOtAmount(otAmount);
    };
    

const calculateTotalSalary = () => {
    const total = basicSalary + otAmount + bonusAmount;
    setTotalSalary(total);
};

useEffect(() => {
    calculateOTAmount();
    calculateTotalSalary();
}, [basicSalary, otHours, otAmount, bonusAmount]);

const handleBasicSalaryChange = (e) => {
    const value = parseInt(e.target.value);
    setBasicSalary(value);
    calculateOTAmount(); // Recalculate OT Amount when Basic Salary changes
    calculateTotalSalary(); // Recalculate Total Salary when Basic Salary changes
};

const handleOTHoursChange = (e) => {
    const value = parseInt(e.target.value);
    setOtHours(value);
    calculateOTAmount(); // Recalculate OT Amount when OT Hours changes
    calculateTotalSalary(); // Recalculate Total Salary when OT Hours changes
};

const handleBonusAmountChange = (e) => {
    const value = parseInt(e.target.value);
    setBonusAmount(value);
    calculateTotalSalary(); // Recalculate Total Salary when Bonus Amount changes
};


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:9000/salary/update", {
                staffId,
                basicSalary,
                otHours,
                otAmount,
                bonusAmount,
                totalSalary
            });
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Header />
            <div className="StaffSalary">
                <h2>Update Salary</h2>
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
                        <label className='StaffSalary-form-group label'>Basic Salary:</label>
                        <input type="number" className='basicSalary' value={basicSalary} onChange={handleBasicSalaryChange} />  
                    </div>
                    <div className="StaffSalary-form-group">
                        <label className=''>OT Hours:</label>
                        <input type="number" className='otHours' value={otHours} onChange={handleOTHoursChange} />        
                     </div>
                    <div className="StaffSalary-form-group">
                        <label className='StaffSalary-form-group label'>OT Amount:</label>
                        <input type="number" className='otAmount' value={otAmount} readOnly />
                    </div>
                    <div className="StaffSalary-form-group">
                        <label className='StaffSalary-form-group label'>Bonus Amount:</label>
                        <input type="number" className='bonusAmount' value={bonusAmount} onChange={handleBonusAmountChange} />                    
                    </div>
                    <div className="StaffSalary-form-group">
                        <label className=''>Total Salary:</label>
                        <input type="number" className='totalSalary' value={totalSalary} readOnly />
                    </div>
                   <center> 
                    <button type="submit" className='UpdateStaffCalculate'>Update Salary</button>
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

export default UpdateSalary;
