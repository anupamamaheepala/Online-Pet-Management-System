import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/staffList.css';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const StaffList = () => {
    const [staff, setStaff] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('sfirstname'); // Default search criteria

    useEffect(() => {
        axios.get("http://localhost:9000/staff/all")
            .then((res) => {
                setStaff(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this Staff Member?")) {
            try {
                await axios.delete(`http://localhost:9000/staff/${id}`);
                setStaff(prevStaff => prevStaff.filter(staffMember => staffMember._id !== id));
                alert("Staff member deleted successfully.");
            } catch (error) {
                console.error("Error deleting staff:", error);
                alert("Failed to delete staff");
            }
        } else {
            alert('Deletion cancelled.');
        }
    };

    const handleSearchCriteriaChange = event => {
        setSearchCriteria(event.target.value);
    };

    const filteredStaff = staff.filter((staffMember) => {
        return (
            staffMember[searchCriteria].toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const generatePdf = () => {
        const doc = new jsPDF();
        const logo = new Image();
        logo.src = '/images/logo.png';
    
        logo.onload = function () {
            const logoWidth = 30;
            const xPosition = 10;
            const yPosition = 10;
    
            doc.addImage(logo, 'PNG', xPosition, yPosition, logoWidth, logoWidth);
    
            const tableData = filteredStaff.map((staffMember) => [
                staffMember.staffId,
                staffMember.sfirstname,
                staffMember.slastname,
                staffMember.snic,
                staffMember.semail,
                staffMember.scontactNumber,
                staffMember.saddress,
                staffMember.designation
            ]);
    
            // Calculate the position for the header text
            const headerTextX = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth('Staff List') * doc.internal.getFontSize() / 2);
            const headerTextY = yPosition + logoWidth - 15;
    
            doc.setFontSize(18);
            doc.text('Staff List', headerTextX, headerTextY); // Adjusted positioning for the header text
            doc.setFontSize(15);
            doc.autoTable({
                startY: yPosition + logoWidth + 10,
                head: [['Staff ID', 'First Name', 'Last Name', 'NIC No', 'Email', 'Contact Number', 'Address', 'Designation']],
                body: tableData,
                styles: {
                    fontSize: 7.5,
                    cellPadding: 3,
                    lineWidth: 0.1,
                    lineColor: [0, 0, 0]
                },
                headStyles: {
                    fillColor: [0, 0, 0],
                    textColor: [255, 255, 255],
                    fontStyle: 'bold',
                    halign: 'center',
                    valign: 'middle'
                },
                tableWidth: 190,
            });
            doc.save('staff_list.pdf');
        };
    };
    
    
    return (
        <>
            <Header />
            <h1><center>Staff List</center></h1>
            <div className='staffListcontainer1'>
                <div className='staffList-SearchBar-container'>
                    <input
                        className='staffList-SearchBar'
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select value={searchCriteria} onChange={handleSearchCriteriaChange} className='staffList-select'>
                        <option value="staffId">Staff ID</option>
                        <option value="sfirstname">First Name</option>
                        <option value="slastname">Last Name</option>
                        <option value="snic">NIC No</option>
                        <option value="semail">Email</option>
                        <option value="scontactNumber">Contact Number</option>
                        <option value="saddress">Address</option>
                        <option value="designation">Designation</option>
                    </select>
                </div>

                <button className='staffdetailsReport' onClick={generatePdf}>Generate Report</button>
                <br></br> <br></br>

                <table id="staffList-table" className="staffList-table">
                    <thead>
                        <tr>
                            <th>Staff ID </th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>NIC No</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th>Address</th>
                            <th>Designation</th>
                            <th>Qualifications</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStaff.map((staffMember, index) => (
                            <tr key={staffMember._id}>
                                <td>{staffMember.staffId}</td>
                                <td>{staffMember.sfirstname}</td>
                                <td>{staffMember.slastname}</td>
                                <td>{staffMember.snic}</td>
                                <td>{staffMember.semail}</td>
                                <td>{staffMember.scontactNumber}</td>
                                <td>{staffMember.saddress}</td>
                                <td>{staffMember.designation}</td>
                                <td>{staffMember.qualifications}</td>
                                <td>
                                    <center>
                                    <Link className="staffList-update-btn" to={`/update/${staffMember._id}`}>Update</Link>
                                    <button className="staffList-delete-btn" onClick={() => handleDelete(staffMember._id)}>Delete</button> {/* Delete button */}
                                    <Link className="staffList-salary-btn" to={`/salary/${staffMember._id}?firstname=${staffMember.sfirstname}&lastname=${staffMember.slastname}&staffId=${staffMember.staffId}`}>Salary</Link>
                                    </center>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br /><br />
            <Footer />
        </>
    );
}

export default StaffList;
