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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:9000/staff/${id}`);
            setStaff(staff.filter(item => item._id !== id));
            alert("Delete Staff?");
        } catch (error) {
            alert("Failed to delete staff");
        }
    };
    
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
                        <th>Actions</th>
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
                            <td>
                                    <button className="staffList-delete-btn" onClick={() => handleDelete(staff._id)}>Delete</button>
                                    <Link to={`/update/${staff._id}`}><button className="staffList-update-btn">Update</button></Link> {/* Assuming the update route is "/update/:id" */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <br></br><br></br>
         
            <Footer />
        </>
    );
}

export default StaffList;
