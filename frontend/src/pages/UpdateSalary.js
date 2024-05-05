import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link component
import '../css/StaffSalary.css';
import SystemAdminHeader from '../components/SystemAdminHeader';

function UpdateSalary(props) {
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
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('staffId');
        
        axios.get(`http://localhost:9000/salary/${id}`)
            .then(response => {
                    const { staffId, firstName, lastName, selectedMonth,basicSalary, otHours, otRate,bonusAmount, totalSalary } = response.data;
                    setStaffId(staffId);
                    setFirstName(firstName);
                    setLastName(lastName);
                    setSelectedMonth(selectedMonth);
                    setBasicSalary(basicSalary);
                    setOtHours(otHours);
                    setOtRate(otRate);
                    setBonusAmount(bonusAmount);
                    setTotalSalary(totalSalary);
                
            })
            .catch(error => {
                console.error('Error fetching salary details:', error);
            });
    }, []);

    const calculateOTAmount = () => {
        const otAmount = otHours * otRate;
        return otAmount;
    };

    const calculateTotalSalary = () => {
        const otAmount = calculateOTAmount();
        const total = basicSalary + otAmount + bonusAmount;
        setTotalSalary(total);
    };

    useEffect(() => {
        calculateTotalSalary();
    }, [basicSalary, otHours, otRate, bonusAmount]);

    const handleBasicSalaryChange = (e) => {
        const value = parseInt(e.target.value);
        setBasicSalary(value);
        calculateTotalSalary(); // Recalculate Total Salary when Basic Salary changes
    };

    const handleOTHoursChange = (e) => {
        const value = parseInt(e.target.value);
        setOtHours(value);
        calculateTotalSalary(); // Recalculate Total Salary when OT Hours changes
    };

    const handleOtRateChange = (e) => {
        const value = parseInt(e.target.value);
        setOtRate(value);
        calculateTotalSalary(); // Recalculate Total Salary when OT Rate changes
    };

    const handleBonusAmountChange = (e) => {
        const value = parseInt(e.target.value);
        setBonusAmount(value);
        calculateTotalSalary(); // Recalculate Total Salary when Bonus Amount changes
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:9000/salary/${staffId}/update`, {
                staffId,
                selectedMonth,
                basicSalary,
                otHours,
                otRate,
                otAmount: calculateOTAmount(), // Calculate OT Amount before submitting
                bonusAmount,
                totalSalary
            });
            console.log(res.data);
                alert('Salary updated successfully'); // Show success alert
                // Redirect to SalaryTable page
                 window.location.href = '/SalaryTable';
          } catch (err) {
                console.error(err);
                alert('Error updating salary'); // Show error alert
        }
        };
        

    return (
        <>
            <SystemAdminHeader />
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
                        <input type="number" className='basicSalary' value={basicSalary} onChange={handleBasicSalaryChange} readOnly/>  
                    </div>
                    <div className="StaffSalary-form-group">
                        <label className=''>OT Hours:</label>
                        <input type="number" className='otHours' value={otHours} onChange={handleOTHoursChange} />        
                     </div>
                    <div className="StaffSalary-form-group">
                        <label className='StaffSalary-form-group label'>OT Rate:</label>
                        <input type="number" className='otRate' value={otRate} onChange={handleOtRateChange} readOnly/>        
                     </div>
                    <div className="StaffSalary-form-group">
                        <label className='StaffSalary-form-group label'>OT Amount:</label>
                        <input type="number" className='otAmount' value={calculateOTAmount()} readOnly />
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

                    <div className='UpdateSalary-nav-row'>
                    <Link className="staffProfile-leave-btn" to={`/RegenerateSalary?staffId=${staffId}&firstName=${firstName}&lastName=${lastName}&basicSalary=${basicSalary}&otRate=${otRate}`}>
                     Regenerate Salary
                    </Link>
                    <Link to="/StaffList" className="edit-staff-link-button">
                    <button className="edit-staff-button">Back to All Staff List</button>
                    </Link>
                    </div>
                    </center>


                </form>
            </div>
            <br />
            <Footer />
        </>
    );
};

export default UpdateSalary;
