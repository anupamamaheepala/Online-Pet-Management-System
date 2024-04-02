import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/staffList.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StaffList = () => {
    const [staff, setStaff] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9000/staff/")
            .then((res) => {
                console.log(res.data); // Log the data received from the API
                setStaff(res.data); // Set the ads data to the state
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);
    
    return (
        <>
            <Header />
            <h1><center>Staff List</center></h1>

             <div className='staffListcontainer1'>

              <table className="staffList-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>NIC No</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Address</th>
                        <th>Designation</th>
                    </tr>
                </thead>
                <tbody>
                    {staff.map((staff) => (
                        <tr key={staff._id}>
                            <td>{staff.sfirstname}</td>
                            <td>{staff.slastname}</td>
                            <td>{staff.snic}</td>
                            <td>{staff.semail}</td>
                            <td>{staff.scontactNumber}</td>
                            <td>{staff.saddress}</td>
                            <td>{staff.designation}</td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <br></br>
         
            <Footer />
        </>
    );
}

export default StaffList;
