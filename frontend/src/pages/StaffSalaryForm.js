import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import '../css/StaffSalary.css';

function SalaryCalculator(props) {
    const [staffId, setStaffId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [basicSalary, setBasicSalary] = useState(0);
    const [otHours, setOtHours] = useState(0);
    const [otAmount, setOtAmount] = useState(0);
    const [bonusAmount, setBonusAmount] = useState(0);
    const [totalSalary, setTotalSalary] = useState(0);
    const [isSalaryAssigned, setIsSalaryAssigned] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('staffId');
    
        axios.get(`http://localhost:9000/salary/${id}`)
            .then(response => {
                if (response.data) {
                    // Salary is assigned
                    setIsSalaryAssigned(true);
                    const { staffId, firstName, lastName, basicSalary, otHours, otAmount, bonusAmount, totalSalary } = response.data;
                    setStaffId(staffId);
                    setFirstName(firstName);
                    setLastName(lastName);
                    setBasicSalary(basicSalary);
                    setOtHours(otHours);
                    setOtAmount(otAmount);
                    setBonusAmount(bonusAmount);
                    setTotalSalary(totalSalary);
                } else {
                    // Salary is not assigned
                    setIsSalaryAssigned(false);
                    // Fetch staff details
                    axios.get(`http://localhost:9000/staff/${id}`)
                        .then(response => {
                            const { staffId, sfirstname, slastname } = response.data;
                            setStaffId(staffId);
                            setFirstName(sfirstname);
                            setLastName(slastname);
                            // Set default values for salary-related fields
                            setBasicSalary(0);
                            setOtHours(0);
                            setOtAmount(0);
                            setBonusAmount(0);
                            setTotalSalary(0);
                        })
                        .catch(error => {
                            console.error('Error fetching staff details:', error);
                        });
                }
            })
            .catch(error => {
                console.error('Error fetching salary:', error);
            });
    }, []);
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:9000/salary/add", {
                staffId,
                firstName,
                lastName,
                basicSalary,
                otHours,
                otAmount,
                bonusAmount,
                totalSalary
            });
            console.log(res.data);
            setBasicSalary(0);
            setOtHours(0);
            setBonusAmount(0);
            setTotalSalary(0);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Header />
            <div className="StaffSalary">
                <h2>Salary Calculation Form</h2>
                {isSalaryAssigned ? (
                    <p>Salary is already assigned</p>
                ) : (
                    <p>Salary is not assigned</p>
                )}
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
                        <input type="number" className='basicSalary' value={basicSalary} onChange={(e) => setBasicSalary(parseInt(e.target.value))} readOnly={isSalaryAssigned} />
                    </div>
                    <div className="StaffSalary-form-group">
                        <label className=''>OT Hours:</label>
                        <input type="number" className='otHours' value={otHours} onChange={(e) => setOtHours(parseInt(e.target.value))} readOnly={isSalaryAssigned} />
                    </div>
                    <div className="StaffSalary-form-group">
                        <label className='StaffSalary-form-group label'>OT Amount:</label>
                        <input type="number" className='otAmount' value={otAmount} readOnly />
                    </div>
                    <div className="StaffSalary-form-group">
                        <label className='StaffSalary-form-group label'>Bonus Amount:</label>
                        <input type="number" className='bonusAmount' value={bonusAmount} onChange={(e) => setBonusAmount(parseInt(e.target.value))} readOnly={isSalaryAssigned} />
                    </div>
                    <div className="StaffSalary-form-group">
                        <label className=''>Total Salary:</label>
                        <input type="number" className='totalSalary' value={totalSalary} readOnly />
                    </div>
                   <center> <button type="submit" className='StaffCalculate' disabled={isSalaryAssigned}>Assign Salary</button></center>
                </form>
            </div>
            <br></br>
            <Footer />
        </>
    );
};

export default SalaryCalculator;
