import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/staffList.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StaffList = () => {
    const [staff, setStaff] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9000/staff/all") // Corrected endpoint
            .then((res) => {
                console.log(res.data); // Log the data received from the API
                setStaff(res.data); // Set the staff data to the state
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:9000/staff/${id}`);
            setStaff(prevStaff => prevStaff.filter(staffMember => staffMember._id !== id)); // Update state after successful deletion
            alert("Are you sure you want to delete?");
        } catch (error) {
            console.error("Error deleting staff:", error);
            alert("Failed to delete staff");
        }
    };
    
   /* const handleUpdate = (id) => {
        // Redirect to the update page for the selected staff member
        window.location.href = `/update/${id}`;
    }; */
    
    return (
        <>
            <Header />
            <h1><center>Staff List</center></h1>

            <div className='staffListcontainer1'>

                <table className="staffList-table">
                    <thead>
                        <tr>
                            <th>ID</th>
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
                        {staff.map((staffMember, index) => ( // Changed variable name to avoid confusion
                            <tr key={staffMember._id}>
                                <td>{index + 1}</td>
                                <td>{staffMember.sfirstname}</td>
                                <td>{staffMember.slastname}</td>
                                <td>{staffMember.snic}</td>
                                <td>{staffMember.semail}</td>
                                <td>{staffMember.scontactNumber}</td>
                                <td>{staffMember.saddress}</td>
                                <td>{staffMember.designation}</td>
                                <td>
                                    <button className="staffList-delete-btn" onClick={() => handleDelete(staffMember._id)}>Delete</button>
                                    <button className="staffList-update-btn">Update</button>
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
