// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { useHistory, useParams } from 'react-router-dom';


// // // const EditCustomer = () => {
// // //     const { id } = useParams();
// // //     const history = useHistory();
// // //     const [customer, setCustomer] = useState({
// // //         username: '',
// // //         email: '',
// // //         contactNumber: '',
// // //         address: '',
// // //     });

// // //     useEffect(() => {
// // //         axios.get(`http://localhost:9000/customer/${id}`)
// // //             .then((res) => {
// // //                 setCustomer(res.data);
// // //             })
// // //             .catch((err) => {
// // //                 console.error(err);
// // //                 alert('Failed to fetch customer details');
// // //             });
// // //     }, [id]);

// // //     const handleChange = (e) => {
// // //         setCustomer({ ...customer, [e.target.name]: e.target.value });
// // //     };

// // //     const handleSubmit = async (e) => {
// // //         e.preventDefault();
// // //         try {
// // //             await axios.put(`http://localhost:9000/customer/${id}`, customer);
// // //             alert('Customer updated successfully');
// // //             history.push('/allcustomers');
// // //         } catch (error) {
// // //             console.error(error);
// // //             alert('Failed to update customer');
// // //         }
// // //     };

// // //     return (
// // //         <div>
// // //             <h2>Edit Customer Details</h2>
// // //             <form onSubmit={handleSubmit}>
// // //                 <div>
// // //                     <label>User Name:</label>
// // //                     <input type="text" name="username" value={customer.username} onChange={handleChange} required />
// // //                 </div>
// // //                 <div>
// // //                     <label>Email:</label>
// // //                     <input type="email" name="email" value={customer.email} onChange={handleChange} required />
// // //                 </div>
// // //                 <div>
// // //                     <label>Contact Number:</label>
// // //                     <input type="text" name="contactNumber" value={customer.contactNumber} onChange={handleChange} required />
// // //                 </div>
// // //                 <div>
// // //                     <label>Address:</label>
// // //                     <input type="text" name="address" value={customer.address} onChange={handleChange} required />
// // //                 </div>
// // //                 <button type="submit">Update</button>
// // //             </form>

// // //         </div>
// // //     );
// // // };

// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';

// // // const EditCustomer = ({ match }) => {
// // //   const [formData, setFormData] = useState({
// // //     username: '',
// // //     email: '',
// // //     contactNumber: '',
// // //     address: '',
// // //     password: '',
// // //     confirmPassword: ''
// // //   });

// // //   const { username, email, contactNumber, address, password, confirmPassword } = formData;

// // //   useEffect(() => {
// // //     axios.get(`http://localhost:9000/customer/${match.params.id}`)
// // //       .then(res => {
// // //         const { username, email, contactNumber, address } = res.data;
// // //         setFormData({ username, email, contactNumber, address });
// // //       })
// // //       .catch(error => {
// // //         console.error(error);
// // //       });
// // //   }, [match.params.id]);

// // //   const onChange = e => {
// // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // //   };

// // //   const onSubmit = async e => {
// // //     e.preventDefault();
// // //     try {
// // //       await axios.put(`http://localhost:9000/customer/${match.params.id}`, formData);
// // //       alert('Customer updated successfully');
// // //       window.location.href = '/all-customers'; // Redirect to all customers page after successful update
// // //     } catch (error) {
// // //       console.error(error);
// // //       alert('Failed to update customer');
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <h2>Edit Customer</h2>
// // //       <form onSubmit={onSubmit}>
// // //         {/* Your form inputs for editing customer details */}
// // //         <button type="submit">Update</button>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default EditCustomer;
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useParams, Link } from 'react-router-dom';

// // const EditCustomer = () => {
// //   const { id } = useParams();
// //   const [formData, setFormData] = useState({
// //     username: '',
// //     email: '',
// //     contactNumber: '',
// //     address: '',
// //     password: '',
// //     confirmPassword: ''
// //   });

// //   useEffect(() => {
// //     axios.get(`http://localhost:9000/customer/${id}`)
// //       .then(res => {
// //         const { username, email, contactNumber, address } = res.data;
// //         setFormData({ username, email, contactNumber, address });
// //       })
// //       .catch(error => {
// //         console.error(error);
// //       });
// //   }, [id]);

// //   const onChange = e => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const onSubmit = async e => {
// //     e.preventDefault();
// //     try {
// //       await axios.put(`http://localhost:9000/customer/${id}`, formData);
// //       alert('Customer updated successfully');
// //       // Redirect to all customers page after successful update
// //       navigate('/all-customers');
// //     } catch (error) {
// //       console.error(error);
// //       alert('Failed to update customer');
// //     }
// //   };

// //   const navigate = (path) => {
// //     // Perform navigation
// //     console.log(`Navigating to ${path}`);
// //     // You can use window.location or any other routing mechanism here
// //   };

// //   return (
// //     <div>
// //       <h2>Edit Customer</h2>
// //       <form onSubmit={onSubmit}>
// //         {/* Your form inputs for editing customer details */}
// //         <button type="submit">Update</button>
// //         <Link to="/all-customers">Cancel</Link>
// //       </form>
// //     </div>
// //   );
// // };

// // export default EditCustomer;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const EditCustomer = ({ match }) => {
// //   const [customer, setCustomer] = useState(null); // State to store customer data
// //   const [editedCustomer, setEditedCustomer] = useState(null); // State to store edited customer data

// //   useEffect(() => {
// //     // Fetch customer data by ID when the component mounts
// //     axios.get(`http://localhost:9000/customer/${match.params.id}`)
// //       .then(res => {
// //         setCustomer(res.data); // Set customer data to state
// //         setEditedCustomer(res.data); // Set edited customer data to state initially
// //       })
// //       .catch(error => {
// //         console.error(error);
// //       });
// //   }, [match.params.id]);

// //   // Handler to save changes to customer data
// //   const handleSave = async () => {
// //     try {
// //       await axios.put(`http://localhost:9000/customer/${match.params.id}`, editedCustomer);
// //       alert('Customer updated successfully');
// //     } catch (error) {
// //       console.error(error);
// //       alert('Failed to update customer');
// //     }
// //   };

// //   // Handler to handle changes in input fields
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setEditedCustomer({ ...editedCustomer, [name]: value });
// //   };

// //   if (!customer) {
// //     return <div>Loading...</div>; // Display loading message until customer data is fetched
// //   }

// //   return (
// //     <div>
// //       <h2>Edit Customer</h2>
// //       {/* Display input fields with current customer data for inline editing */}
// //       <div>
// //         <label>Username:</label>
// //         <input type="text" name="username" value={editedCustomer.username} onChange={handleChange} />
// //       </div>
// //       <div>
// //         <label>Email:</label>
// //         <input type="email" name="email" value={editedCustomer.email} onChange={handleChange} />
// //       </div>
// //       <div>
// //         <label>Contact Number:</label>
// //         <input type="text" name="contactNumber" value={editedCustomer.contactNumber} onChange={handleChange} />
// //       </div>
// //       <div>
// //         <label>Address:</label>
// //         <input type="text" name="address" value={editedCustomer.address} onChange={handleChange} />
// //       </div>
// //       <button onClick={handleSave}>Save</button> {/* Button to save changes */}
// //     </div>
// //   );
// // };

// // export default EditCustomer;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const EditCustomer = ({ match }) => {
//   const [customer, setFormData] = useState(null); // State to store customer data
//   const [editedCustomer, setEditedCustomer] = useState(null); // State to store edited customer data

// //   useEffect(() => {
// //     const id = match.params.id; // Extract ID from match params
// //     axios.get(`http://localhost:9000/customer/${id}`) // Use backticks for template literals
// //       .then(res => {
// //         setCustomer(res.data); // Set customer data to state
// //         setEditedCustomer(res.data); // Set edited customer data to state initially
// //       })
// //       .catch(error => {
// //         console.error(error);
// //       });
// //   }, [match.params.id]);
// // useEffect(() => {
// //     // Check if match and match.params are defined
// //     if (match && match.params && match.params.id) {
// //         axios.get(`http://localhost:9000/customer/${match.params.id}`)
// //             .then(res => {
// //                 const { username, email, contactNumber, address } = res.data;
// //                 setFormData({ username, email, contactNumber, address });
// //             })
// //             .catch(error => {
// //                 console.error(error);
// //             });
// //     }
// // }, [match]);
// useEffect(() => {
//     // Check if match and match.params are defined
//     if (match && match.params && match.params.id) {
//         axios.get(`http://localhost:9000/customer/${match.params.id}`)
//             .then(res => {
//                 const { username, email, contactNumber, address } = res.data;
//                 setFormData({ username, email, contactNumber, address });
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     }
// }, [match, setFormData]); // Add setFormData as a dependency



//   // Handler to save changes to customer data
//   const handleSave = async () => {
//     try {
//       await axios.put(`http://localhost:9000/customer/${match.params.id}`, editedCustomer);
//       alert('Customer updated successfully');
//     } catch (error) {
//       console.error(error);
//       alert('Failed to update customer');
//     }
//   };

//   // Handler to handle changes in input fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedCustomer({ ...editedCustomer, [name]: value });
//   };

//   if (!customer) {
//     return <div>Loading...</div>; // Display loading message until customer data is fetched
//   }

//   return (
//     <div>
//       <h2>Edit Customer</h2>
//       {/* Display input fields with current customer data for inline editing */}
//       <div>
//         <label>Username:</label>
//         <input type="text" name="username" value={editedCustomer.username} onChange={handleChange} />
//       </div>
//       <div>
//         <label>Email:</label>
//         <input type="email" name="email" value={editedCustomer.email} onChange={handleChange} />
//       </div>
//       <div>
//         <label>Contact Number:</label>
//         <input type="text" name="contactNumber" value={editedCustomer.contactNumber} onChange={handleChange} />
//       </div>
//       <div>
//         <label>Address:</label>
//         <input type="text" name="address" value={editedCustomer.address} onChange={handleChange} />
//       </div>
//       <button onClick={handleSave}>Save</button> {/* Button to save changes */}
//     </div>
//   );
// };

// export default EditCustomer;

