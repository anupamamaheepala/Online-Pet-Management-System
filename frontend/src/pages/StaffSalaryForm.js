import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/StaffSalary.css';

function SalaryCalculator(props) {
    const [staffId, setStaffId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [basicSalary, setBasicSalary] = useState(0);
    const [otHours, setOtHours] = useState(0);
    const [otRate, setOtRate] = useState(0); 
    const [otAmount, setOtAmount] = useState(0);
    const [bonusAmount, setBonusAmount] = useState(0);
    const [totalSalary, setTotalSalary] = useState(0);
    const [isSalaryAssigned, setIsSalaryAssigned] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date());

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('staffId');
    
        axios.get(`http://localhost:9000/salary/${id}`)
            .then(response => {
                if (response.data && response.data.basicSalary !== undefined) {
                    // Salary is assigned
                    setIsSalaryAssigned(true);
                    const { staffId, firstName, lastName, selectedMonth,basicSalary, otHours, otRate,otAmount, bonusAmount, totalSalary } = response.data;
                    setStaffId(staffId);
                    setFirstName(firstName);
                    setLastName(lastName);
                    setSelectedMonth(selectedMonth);
                    setBasicSalary(basicSalary);
                    setOtHours(otHours);
                    setOtRate(otRate);
                    setOtAmount(otAmount);
                    setBonusAmount(bonusAmount);
                    setTotalSalary(totalSalary);
                } else {
                    // Salary is not assigned
                    setIsSalaryAssigned(false);
                    axios.get(`http://localhost:9000/staff/salary/${id}`)
                        .then(response => {
                            const { staffId, sfirstname, slastname } = response.data;
                            setStaffId(staffId);
                            setFirstName(sfirstname);
                            setLastName(slastname);
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
                selectedMonth,
                basicSalary,
                otHours,
                otRate,
                otAmount,
                bonusAmount,
                totalSalary
            });
            console.log(res.data);
    
            // Fetch updated staff details after submitting the form
            axios.get(`http://localhost:9000/staff/salary/${staffId}`)
                .then(response => {
                    console.log("Updated staff details:", response.data);
                    const { staffId, sfirstname, slastname } = response.data;
                    setFirstName(sfirstname);
                    setLastName(slastname);
                })
                .catch(error => {
                    console.error('Error fetching staff details:', error);
                });
            
            setSelectedMonth(0);
            setBasicSalary(0);
            setOtHours(0);
            setOtHours(0);
            setBonusAmount(0);
            setTotalSalary(0);
        } catch (err) {
            console.error(err);
        }
    };
    
    

    // Function to calculate OT Amount and Total Salary
    const calculateSalary = () => {
        // Calculate OT amount based on OT rate and hours
        const calculatedOtAmount = otHours * otRate;
        const calculatedTotalSalary = basicSalary + calculatedOtAmount + bonusAmount;
        setOtAmount(calculatedOtAmount);
        setTotalSalary(calculatedTotalSalary);
    };

    // useEffect to recalculate salary whenever inputs change
    useEffect(() => {
        calculateSalary();
    }, [basicSalary, otHours, bonusAmount, otRate]); // Include otRate in the dependency array

    useEffect(() => {
        calculateSalary();
    }, []);


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
                        <label className='StaffSalary-form-group label'>Select Month:</label>
                        <DatePicker
                            className='selectedMonth'
                            selected={selectedMonth}
                            onChange={date => setSelectedMonth(date)}
                            showMonthYearPicker
                            dateFormat="MM/yyyy"
                            readOnly={isSalaryAssigned}
                        />
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
                        <label className='StaffSalary-form-group label'>OT Rate:</label> {/* New input field for OT Rate */}
                        <input type="number" className='otRate' value={otRate} onChange={(e) => setOtRate(parseInt(e.target.value))} readOnly={isSalaryAssigned} />
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
                   <center> 
                       {isSalaryAssigned ? (
                           <Link className='StaffCalculate1' to={`/update-salary?staffId=${staffId}` }>Update Salary</Link>

                       ) : (
                           <button type="submit" className='StaffCalculate2' disabled={isSalaryAssigned}>Assign Salary</button>
                       )}
                   </center>
                </form>
            </div>
            <br />
            <Footer />
        </>
    );
};

export default SalaryCalculator;
