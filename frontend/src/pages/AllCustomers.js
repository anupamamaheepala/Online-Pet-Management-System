// // // import Header from '../components/Header';
// // // import Footer from '../components/Footer';
// // // import '../css/register.css';
// // // import { Link } from 'react-router-dom';
// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import jsPDF from 'jspdf';
// // // import 'jspdf-autotable';

// // // const AllCustomers = () => {
// // //     const [customers, setCustomers] = useState([]);
// // //     const [searchTerm, setSearchTerm] = useState('');

// // //     useEffect(() => {
// // //         axios.get("http://localhost:9000/customer/")
// // //             .then((res) => {
// // //                 console.log(res.data); // Log the data received from the API
// // //                 setCustomers(res.data); // Set the customer data to the state
// // //             })
// // //             .catch((err) => {
// // //                 alert(err.message);
// // //             });
// // //     }, []);

// // //     const handleDelete = async (id) => {
// // //         if (window.confirm("Are you sure you want to delete this customer?")) {
// // //             try {
// // //                 await axios.delete(`http://localhost:9000/customer/${id}`);
// // //                 setCustomers(customers.filter((customer) => customer._id !== id));
// // //                 alert('Customer deleted successfully');
// // //             } catch (error) {
// // //                 alert('Failed to delete customer');
// // //             }
// // //         } else {
// // //             alert('Deletion cancelled.');
// // //         }
// // //     };

// // //     const filteredCustomers = customers.filter((customer) => {
// // //         return (
// // //             customer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //             customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //             customer.contactNumbers.join(', ').includes(searchTerm) ||
// // //             customer.address.toLowerCase().includes(searchTerm.toLowerCase())
// // //         );
// // //     });

// // //     const generatePDFReport = () => {
// // //         // Create a new instance of jsPDF
// // //         const doc = new jsPDF();

// // //         // Path to your system logo
// // //         const logoURL = '/images/logo.png'; // Specify the URL or path to your logo image

// // //         // Add the logo to the PDF at the top left corner
// // //         doc.addImage(logoURL, 'PNG', 10, 10, 20, 20);

// // //         // Add your system name as a header
// // //         doc.text('PetZone', 40, 20); // Specify the x, y coordinates

// // //         // Add a title to the PDF below the header
// // //         doc.text('Customer Report', 20, 50);

// // //         // Add headers for the table
// // //         const headers = ['User Name', 'Email', 'Contact', 'Address'];

// // //         // Add rows to the table
// // //         const rows = filteredCustomers.map((customer) => [
// // //             customer.username,
// // //             customer.email,
// // //             customer.contactNumbers.join(', '),
// // //             customer.address,
// // //         ]);

// // //         // Add a table to the PDF
// // //         doc.autoTable({
// // //             startY: 60, // Start the table below the title
// // //             head: [headers],
// // //             body: rows,
// // //         });

// // //         // Save the PDF
// // //         doc.save('customer_report.pdf');
// // //     };

// // //     return (
// // //         <>
// // //             <Header />
// // //             <h1><center>All Customer Details</center></h1>

// // //             <div className='customer-SearchBar-container'>
// // //                 <input
// // //                     className='customer-SearchBar'
// // //                     type="text"
// // //                     placeholder="Search by Name, Email, Contact, or Address"
// // //                     value={searchTerm}
// // //                     onChange={(e) => setSearchTerm(e.target.value)}
// // //                 />
// // //                 <button onClick={generatePDFReport}>Download PDF Report</button>
// // //             </div>

// // //             <table className="customer_details_table">
// // //                 <thead>
// // //                     <tr>
// // //                         <th>User Name</th>
// // //                         <th>Email</th>
// // //                         <th>Contact</th>
// // //                         <th>Address</th>
// // //                         <th>Actions</th>
// // //                     </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                     {filteredCustomers.map((customer) => (
// // //                         <tr key={customer._id}>
// // //                             <td>{customer.username}</td>
// // //                             <td>{customer.email}</td>
// // //                             <td>
// // //                                 {/* Display each contact number on its own line */}
// // //                                 {customer.contactNumbers.map((contactNumber, index) => (
// // //                                     <div key={index}>
// // //                                         {contactNumber}
// // //                                     </div>
// // //                                 ))}
// // //                             </td>
// // //                             <td>{customer.address}</td>
// // //                             <td>
// // //                                 <Link className="btn btn-warning" to={`/edit-profile/${customer._id}`}>Edit</Link>
// // //                                 &nbsp;
// // //                                 <button className="btn btn-danger" onClick={() => handleDelete(customer._id)}>Delete</button>
// // //                             </td>
// // //                         </tr>
// // //                     ))}
// // //                 </tbody>
// // //             </table>

// // //             <br />

// // //             <Footer />
// // //         </>
// // //     );
// // // };

// // // export default AllCustomers;
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { Link } from 'react-router-dom';
// // import jsPDF from 'jspdf';
// // import 'jspdf-autotable';

// // const AllCustomers = () => {
// //     const [customers, setCustomers] = useState([]);
// //     const [searchTerm, setSearchTerm] = useState('');
// //     const [selectedColumns, setSelectedColumns] = useState({
// //         username: true,
// //         email: true,
// //         contact: true,
// //         address: true,
// //     });

// //     useEffect(() => {
// //         axios.get("http://localhost:9000/customer/")
// //             .then((res) => {
// //                 setCustomers(res.data);
// //             })
// //             .catch((err) => {
// //                 alert(err.message);
// //             });
// //     }, []);

// //     const handleDelete = async (id) => {
// //         if (window.confirm("Are you sure you want to delete this customer?")) {
// //             try {
// //                 await axios.delete(`http://localhost:9000/customer/${id}`);
// //                 setCustomers(customers.filter((customer) => customer._id !== id));
// //                 alert('Customer deleted successfully');
// //             } catch (error) {
// //                 alert('Failed to delete customer');
// //             }
// //         } else {
// //             alert('Deletion cancelled.');
// //         }
// //     };

// //     const filteredCustomers = customers.filter((customer) => {
// //         return (
// //             customer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //             customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //             customer.contactNumbers.join(', ').includes(searchTerm) ||
// //             customer.address.toLowerCase().includes(searchTerm.toLowerCase())
// //         );
// //     });

// //     const generatePDFReport = () => {
// //         const doc = new jsPDF();
// //         const headers = [];
// //         const rows = [];

// //         Object.keys(selectedColumns).forEach((key) => {
// //             if (selectedColumns[key]) {
// //                 headers.push(key.charAt(0).toUpperCase() + key.slice(1)); // Capitalize column names
// //             }
// //         });

// //         filteredCustomers.forEach((customer) => {
// //             const row = [];
// //             Object.keys(selectedColumns).forEach((key) => {
// //                 if (selectedColumns[key]) {
// //                     if (key === 'contact') {
// //                         row.push(customer.contactNumbers.join(', '));
// //                     } else {
// //                         row.push(customer[key]);
// //                     }
// //                 }
// //             });
// //             rows.push(row);
// //         });

// //         doc.autoTable({
// //             startY: 20,
// //             head: [headers],
// //             body: rows,
// //         });

// //         doc.save('customer_report.pdf');
// //     };

// //     const handleCheckboxChange = (e) => {
// //         setSelectedColumns({
// //             ...selectedColumns,
// //             [e.target.name]: e.target.checked,
// //         });
// //     };

// //     return (
// //         <>
// //             <h1><center>All Customer Details</center></h1>

// //             <div className='customer-SearchBar-container'>
// //                 <input
// //                     className='customer-SearchBar'
// //                     type="text"
// //                     placeholder="Search by Name, Email, Contact, or Address"
// //                     value={searchTerm}
// //                     onChange={(e) => setSearchTerm(e.target.value)}
// //                 />
// //                 <button onClick={generatePDFReport}>Download PDF Report</button>
// //                 <div>
// //                     <label>
// //                         <input
// //                             type="checkbox"
// //                             name="username"
// //                             checked={selectedColumns.username}
// //                             onChange={handleCheckboxChange}
// //                         />
// //                         Username
// //                     </label>
// //                     <label>
// //                         <input
// //                             type="checkbox"
// //                             name="email"
// //                             checked={selectedColumns.email}
// //                             onChange={handleCheckboxChange}
// //                         />
// //                         Email
// //                     </label>
// //                     <label>
// //                         <input
// //                             type="checkbox"
// //                             name="contact"
// //                             checked={selectedColumns.contact}
// //                             onChange={handleCheckboxChange}
// //                         />
// //                         Contact
// //                     </label>
// //                     <label>
// //                         <input
// //                             type="checkbox"
// //                             name="address"
// //                             checked={selectedColumns.address}
// //                             onChange={handleCheckboxChange}
// //                         />
// //                         Address
// //                     </label>
// //                 </div>
// //             </div>

// //             <table className="customer_details_table">
// //                 <thead>
// //                     <tr>
// //                         {Object.keys(selectedColumns).map((key) => (
// //                             selectedColumns[key] && <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
// //                         ))}
// //                         <th>Actions</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {filteredCustomers.map((customer) => (
// //                         <tr key={customer._id}>
// //                             {Object.keys(selectedColumns).map((key) => (
// //                                 selectedColumns[key] && (
// //                                     <td key={key}>
// //                                         {key === 'contact' ? customer.contactNumbers.join(', ') : customer[key]}
// //                                     </td>
// //                                 )
// //                             ))}
// //                             <td>
// //                                 <Link className="btn btn-warning" to={`/edit-profile/${customer._id}`}>Edit</Link>
// //                                 &nbsp;
// //                                 <button className="btn btn-danger" onClick={() => handleDelete(customer._id)}>Delete</button>
// //                             </td>
// //                         </tr>
// //                     ))}
// //                 </tbody>
// //             </table>
// //         </>
// //     );
// // };

// // export default AllCustomers;

//    // const generatePDFReport = () => {
//     //     const doc = new jsPDF();

//     //     // Path to your site logo
//     //     const logoURL = '/images/logo.png';

//     //     // Add the logo to the PDF
//     //     doc.addImage(logoURL, 'PNG', 20, 10, 30, 30); // Adjust position and size as needed

//     //     // Add a title to the PDF
//     //     doc.text('Customer Report', 80, 30);

//     //     // Add headers for the table
//     //     const headers = [];

//     //     Object.keys(selectedColumns).forEach((key) => {
//     //         if (selectedColumns[key]) {
//     //             headers.push(key.charAt(0).toUpperCase() + key.slice(1)); // Capitalize column names
//     //         }
//     //     });

//     //     // Add rows to the table
//     //     const rows = filteredCustomers.map((customer) => {
//     //         const row = [];
//     //         Object.keys(selectedColumns).forEach((key) => {
//     //             if (selectedColumns[key]) {
//     //                 if (key === 'contact') {
//     //                     row.push(customer.contactNumbers.join(', '));
//     //                 } else {
//     //                     row.push(customer[key]);
//     //                 }
//     //             }
//     //         });
//     //         return row;
//     //     });

//     //     // Add a table to the PDF
//     //     doc.autoTable({
//     //         startY: 50, // Adjust startY position as needed
//     //         head: [headers],
//     //         body: rows,
//     //     });

//     //     // Save the PDF
//     //     doc.save('customer_report.pdf');
//     // };


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import { Link } from 'react-router-dom';
// import 'jspdf-autotable';
// import AdminHeader from '../components/AdminHeader';
// import Footer from '../components/Footer';
// import '../css/allcustomers.css';

// const AllCustomers = () => {
//     const [customers, setCustomers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedColumns, setSelectedColumns] = useState({
//         username: true,
//         email: true,
//         contact: true,
//         address: true,
//     });

//     useEffect(() => {
//         axios.get("http://localhost:9000/customer/")
//             .then((res) => {
//                 setCustomers(res.data);
//             })
//             .catch((err) => {
//                 alert(err.message);
//             });
//     }, []);

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this customer?")) {
//             try {
//                 await axios.delete(`http://localhost:9000/customer/${id}`);
//                 setCustomers(customers.filter((customer) => customer._id !== id));
//                 alert('Customer deleted successfully');
//             } catch (error) {
//                 alert('Failed to delete customer');
//             }
//         } else {
//             alert('Deletion cancelled.');
//         }
//     };

//     const filteredCustomers = customers.filter((customer) => {
//         return (
//             customer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             customer.contactNumbers.join(', ').includes(searchTerm) ||
//             customer.address.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//     });

 
//       const generatePDFReport = () => {
//         const doc = new jsPDF();
    
//         // Path to your site logo
//         const logoURL = '/images/logo.png';
    
//         // Add the logo to the PDF
//         doc.addImage(logoURL, 'PNG', 20, 10, 30, 30); // Adjust position and size as needed
    
//         // Add a title to the PDF
//         doc.text('Customer Report', 80, 30);
    
//         // Add headers for the table
//         const headers = [];
    
//         Object.keys(selectedColumns).forEach((key) => {
//             if (selectedColumns[key]) {
//                 headers.push(key.charAt(0).toUpperCase() + key.slice(1)); // Capitalize column names
//             }
//         });
    
//         // Add rows to the table
//         const rows = filteredCustomers.map((customer) => {
//             const row = [];
//             Object.keys(selectedColumns).forEach((key) => {
//                 if (selectedColumns[key]) {
//                     if (key === 'contact') {
//                         row.push(customer.contactNumbers.join(', '));
//                     } else {
//                         row.push(customer[key]);
//                     }
//                 }
//             });
//             return row;
//         });
    
//         // Add a table to the PDF
//         doc.autoTable({
//             startY: 50, // Adjust startY position as needed
//             headStyles: {
//                 fillColor: [0, 0, 0], // Black color for the table head
//                 textColor: [255, 255, 255] // White text color for the table head
//             },
//             head: [headers],
//             body: rows,
//             columnStyles: {
//                 ...Object.fromEntries(headers.map((header, index) => [index, { lineWidth: 0.1, lineColor: [0, 0, 0] }]))
//             },
//         });
    
//         // Save the PDF
//         doc.save('customer_report.pdf');
//     };
    
    

//     const handleCheckboxChange = (e) => {
//         setSelectedColumns({
//             ...selectedColumns,
//             [e.target.name]: e.target.checked,
//         });
//     };

//     return (
//         <>
//         <AdminHeader/>
//             <h1><center>All Customer Details</center></h1>

//             <div className='customer-SearchBar-container'>
//                 <input
//                     className='customer-SearchBar'
//                     type="text"
//                     placeholder="Search by Name, Email, Contact, or Address"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <button className="acreportdownloadbtn" onClick={generatePDFReport}>Download PDF Report</button>
//                 <div>
//                     <label>
//                         <input
//                             type="checkbox"
//                             name="username"
//                             checked={selectedColumns.username}
//                             onChange={handleCheckboxChange}
//                         />
//                         Username
//                     </label>
//                     <label>
//                         <input
//                             type="checkbox"
//                             name="email"
//                             checked={selectedColumns.email}
//                             onChange={handleCheckboxChange}
//                         />
//                         Email
//                     </label>
//                     <label>
//                         <input
//                             type="checkbox"
//                             name="contact"
//                             checked={selectedColumns.contact}
//                             onChange={handleCheckboxChange}
//                         />
//                         Contact
//                     </label>
//                     <label>
//                         <input
//                             type="checkbox"
//                             name="address"
//                             checked={selectedColumns.address}
//                             onChange={handleCheckboxChange}
//                         />
//                         Address
//                     </label>
//                 </div>
//             </div>

//             <table className="customer_details_table">
//                 <thead>
//                     <tr>
//                         {Object.keys(selectedColumns).map((key) => (
//                             selectedColumns[key] && <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
//                         ))}
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredCustomers.map((customer) => (
//                         <tr key={customer._id}>
//                             {Object.keys(selectedColumns).map((key) => (
//                                 selectedColumns[key] && (
//                                     <td key={key}>
//                                         {key === 'contact' ? customer.contactNumbers.join(', ') : customer[key]}
//                                     </td>
//                                 )
//                             ))}
//                             <td>
//                                 <Link className="btn btn-warning" to={`/edit-profile/${customer._id}`}>Edit</Link>
//                                 &nbsp;
//                                 <button className="btn btn-danger" onClick={() => handleDelete(customer._id)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <Footer/>
//         </>
//     );
// };

// export default AllCustomers;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import { Link } from 'react-router-dom';
// import 'jspdf-autotable';
// import AdminHeader from '../components/AdminHeader';
// import Footer from '../components/Footer';
// import '../css/allcustomers.css';

// const AllCustomers = () => {
//     const [customers, setCustomers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedColumns, setSelectedColumns] = useState({
//         username: true,
//         email: true,
//         contact: true,
//         address: true,
//     });

//     useEffect(() => {
//         axios.get("http://localhost:9000/customer/")
//             .then((res) => {
//                 setCustomers(res.data);
//             })
//             .catch((err) => {
//                 alert(err.message);
//             });
//     }, []);

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this customer?")) {
//             try {
//                 await axios.delete(`http://localhost:9000/customer/${id}`);
//                 setCustomers(customers.filter((customer) => customer._id !== id));
//                 alert('Customer deleted successfully');
//             } catch (error) {
//                 alert('Failed to delete customer');
//             }
//         } else {
//             alert('Deletion cancelled.');
//         }
//     };

//     const filteredCustomers = customers.filter((customer) => {
//         return (
//             customer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             customer.contactNumbers.join(', ').includes(searchTerm) ||
//             customer.address.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//     });

 
//     const generatePDFReport = () => {
//         const doc = new jsPDF();
    
//         // Path to your site logo
//         const logoURL = '/images/logo.png';
    
//         // Add the logo to the PDF
//         doc.addImage(logoURL, 'PNG', 20, 10, 30, 30); // Adjust position and size as needed
    
//         // Add a title to the PDF
//         doc.text('Customer Report', 80, 30);
    
//         // Add headers for the table
//         const headers = [];
    
//         Object.keys(selectedColumns).forEach((key) => {
//             if (selectedColumns[key]) {
//                 headers.push(key.charAt(0).toUpperCase() + key.slice(1)); // Capitalize column names
//             }
//         });
    
//         // Add rows to the table
//         const rows = filteredCustomers.map((customer) => {
//             const row = [];
//             Object.keys(selectedColumns).forEach((key) => {
//                 if (selectedColumns[key]) {
//                     if (key === 'contact') {
//                         row.push(customer.contactNumbers.join(', '));
//                     } else {
//                         row.push(customer[key]);
//                     }
//                 }
//             });
//             return row;
//         });
    
//         // Add a table to the PDF
//         doc.autoTable({
//             startY: 50, // Adjust startY position as needed
//             headStyles: {
//                 fillColor: [0, 0, 0], // Black color for the table head
//                 textColor: [255, 255, 255] // White text color for the table head
//             },
//             head: [headers],
//             body: rows,
//             columnStyles: {
//                 ...Object.fromEntries(headers.map((header, index) => [index, { lineWidth: 0.1, lineColor: [0, 0, 0] }]))
//             },
//         });
    
//         // Save the PDF
//         doc.save('customer_report.pdf');
//     };
    
    

//     const handleCheckboxChange = (e) => {
//         setSelectedColumns({
//             ...selectedColumns,
//             [e.target.name]: e.target.checked,
//         });
//     };

//     return (
//         <>
//         <AdminHeader/>
//             <h1><center>All Customer Details</center></h1>

//             <div className='customer-SearchBar-container'>
//                 <input
//                     className='customer-SearchBar'
//                     type="text"
//                     placeholder="Search by Name, Email, Contact, or Address"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <button className="acreportdownloadbtn" onClick={generatePDFReport}>Download PDF Report</button>
//                 <div>
//                     <label>
//                         <input
//                             type="checkbox"
//                             name="username"
//                             checked={selectedColumns.username}
//                             onChange={handleCheckboxChange}
//                         />
//                         Username
//                     </label>
//                     <label>
//                         <input
//                             type="checkbox"
//                             name="email"
//                             checked={selectedColumns.email}
//                             onChange={handleCheckboxChange}
//                         />
//                         Email
//                     </label>
//                     <label>
//                         <input
//                             type="checkbox"
//                             name="contact"
//                             checked={selectedColumns.contact}
//                             onChange={handleCheckboxChange}
//                         />
//                         Contact
//                     </label>
//                     <label>
//                         <input
//                             type="checkbox"
//                             name="address"
//                             checked={selectedColumns.address}
//                             onChange={handleCheckboxChange}
//                         />
//                         Address
//                     </label>
//                 </div>
//             </div>

//             <table className="customer_details_table">
//                 <thead>
//                     <tr>
//                         <th>#</th> {/* Add separate column for index numbers */}
//                         {Object.keys(selectedColumns).map((key) => (
//                             selectedColumns[key] && <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
//                         ))}
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredCustomers.map((customer, index) => ( // Add index parameter
//                         <tr key={customer._id}>
//                             <td>{index + 1}</td> {/* Display index number in separate column */}
//                             {Object.keys(selectedColumns).map((key) => (
//                                 selectedColumns[key] && (
//                                     <td key={key}>
//                                         {key === 'contact' ? customer.contactNumbers.join(', ') : customer[key]}
//                                     </td>
//                                 )
//                             ))}
//                             <td>
//                                 <Link className="btn btn-warning" to={`/edit-profile/${customer._id}`}>Edit</Link>
//                                 &nbsp;
//                                 <button className="btn btn-danger" onClick={() => handleDelete(customer._id)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <Footer/>
//         </>
//     );
// };

// export default AllCustomers;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';
import 'jspdf-autotable';
import AdminHeader from '../components/AdminHeader';
import Footer from '../components/Footer';
import '../css/allcustomers.css';

const AllCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedColumns, setSelectedColumns] = useState({
        username: true,
        email: true,
        contact: true,
        address: true,
    });

    useEffect(() => {
        axios.get("http://localhost:9000/customer/")
            .then((res) => {
                setCustomers(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            try {
                await axios.delete(`http://localhost:9000/customer/${id}`);
                setCustomers(customers.filter((customer) => customer._id !== id));
                alert('Customer deleted successfully');
            } catch (error) {
                alert('Failed to delete customer');
            }
        } else {
            alert('Deletion cancelled.');
        }
    };

    const filteredCustomers = customers.filter((customer) => {
        return (
            customer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.contactNumbers.join(', ').includes(searchTerm) ||
            customer.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    // const generatePDFReport = () => {
    //     const doc = new jsPDF();
    
    //     // Path to your site logo
    //     const logoURL = '/images/logo.png';
    
    //     // Add the logo to the PDF
    //     doc.addImage(logoURL, 'PNG', 20, 10, 30, 30); // Adjust position and size as needed
    
    //     // Add a title to the PDF
    //     doc.text('Customer Report', 80, 30);
    
    //     // Add headers for the table
    //     const headers = ['#', ...Object.keys(selectedColumns).filter(key => selectedColumns[key]).map(key => key.charAt(0).toUpperCase() + key.slice(1))];
    
    //     // Add rows to the table
    //     const rows = filteredCustomers.map((customer, index) => {
    //         const row = [index + 1, ...Object.keys(selectedColumns).filter(key => selectedColumns[key]).map(key => key === 'contact' ? customer.contactNumbers.join(', ') : customer[key])];
    //         return row;
    //     });
    
    //     // Add a table to the PDF
    //     doc.autoTable({
    //         startY: 50, // Adjust startY position as needed
    //         headStyles: {
    //             fillColor: [0, 0, 0], // Black color for the table head
    //             textColor: [255, 255, 255] // White text color for the table head
    //         },
    //         head: [headers],
    //         body: rows,
    //         columnStyles: {
    //             0: { cellWidth: 10 } // Adjust width for the index number column
    //         },
    //     });
    
    //     // Save the PDF
    //     doc.save('customer_report.pdf');
    // };
    const generatePDFReport = () => {
        const doc = new jsPDF();
    
        // Path to your site logo
        const logoURL = '/images/logo.png';
    
        // Add the logo to the PDF
        doc.addImage(logoURL, 'PNG', 20, 10, 30, 30); // Adjust position and size as needed
    
        // Add a title to the PDF
        doc.text('Customer Report', 80, 30);
    
        // Add headers for the table
        const headers = ['#', ...Object.keys(selectedColumns).filter(key => selectedColumns[key]).map(key => key.charAt(0).toUpperCase() + key.slice(1))];
    
        // Add rows to the table
        const rows = filteredCustomers.map((customer, index) => {
            const row = [index + 1, ...Object.keys(selectedColumns).filter(key => selectedColumns[key]).map(key => key === 'contact' ? customer.contactNumbers.join(', ') : customer[key])];
            return row;
        });
    
        // Add a table to the PDF
        doc.autoTable({
            startY: 50, // Adjust startY position as needed
            headStyles: {
                fillColor: [0, 0, 0], // Black color for the table head
                textColor: [255, 255, 255] // White text color for the table head
            },
            head: [headers],
            body: rows,
            columnStyles: {
                0: { cellWidth: 10 }, // Adjust width for the index number column
                // Add styles for other columns
                ...Object.fromEntries(headers.map((header, index) => [index, { lineWidth: 0.1, lineColor: [0, 0, 0] }]))
            },
        });
    
        // Save the PDF
        doc.save('customer_report.pdf');
    };
    

    const handleCheckboxChange = (e) => {
        setSelectedColumns({
            ...selectedColumns,
            [e.target.name]: e.target.checked,
        });
    };

    return (
        <>
            <AdminHeader/>
            <h1><center>All Customer Details</center></h1>

            <div className='customer-SearchBar-container'>
                <input
                    className='customer-SearchBar'
                    type="text"
                    placeholder="Search by Name, Email, Contact, or Address"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="acreportdownloadbtn" onClick={generatePDFReport}>Download PDF Report</button>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="username"
                            checked={selectedColumns.username}
                            onChange={handleCheckboxChange}
                        />
                        Username
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="email"
                            checked={selectedColumns.email}
                            onChange={handleCheckboxChange}
                        />
                        Email
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="contact"
                            checked={selectedColumns.contact}
                            onChange={handleCheckboxChange}
                        />
                        Contact
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="address"
                            checked={selectedColumns.address}
                            onChange={handleCheckboxChange}
                        />
                        Address
                    </label>
                </div>
            </div>

            <table className="customer_details_table">
                <thead>
                    <tr>
                        <th>#</th> {/* Add separate column for index numbers */}
                        {Object.keys(selectedColumns).map((key) => (
                            selectedColumns[key] && <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map((customer, index) => ( // Add index parameter
                        <tr key={customer._id}>
                            <td>{index + 1}</td> {/* Display index number in separate column */}
                            {Object.keys(selectedColumns).map((key) => (
                                selectedColumns[key] && (
                                    <td key={key}>
                                        {key === 'contact' ? customer.contactNumbers.join(', ') : customer[key]}
                                    </td>
                                )
                            ))}
                            <td>
                                <Link className="btn btn-warning" to={`/edit-profile/${customer._id}`}>Edit</Link>
                                &nbsp;
                                <button className="btn btn-danger" onClick={() => handleDelete(customer._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Footer/>
        </>
    );
};

export default AllCustomers;
