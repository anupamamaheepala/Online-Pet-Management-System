// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useHistory, useParams } from 'react-router-dom';


// const EditCustomer = () => {
//     const { id } = useParams();
//     const history = useHistory();
//     const [customer, setCustomer] = useState({
//         username: '',
//         email: '',
//         contactNumber: '',
//         address: '',
//     });

//     useEffect(() => {
//         axios.get(`http://localhost:9000/customer/${id}`)
//             .then((res) => {
//                 setCustomer(res.data);
//             })
//             .catch((err) => {
//                 console.error(err);
//                 alert('Failed to fetch customer details');
//             });
//     }, [id]);

//     const handleChange = (e) => {
//         setCustomer({ ...customer, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put(`http://localhost:9000/customer/${id}`, customer);
//             alert('Customer updated successfully');
//             history.push('/allcustomers');
//         } catch (error) {
//             console.error(error);
//             alert('Failed to update customer');
//         }
//     };

//     return (
//         <div>
//             <h2>Edit Customer Details</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>User Name:</label>
//                     <input type="text" name="username" value={customer.username} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label>Email:</label>
//                     <input type="email" name="email" value={customer.email} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label>Contact Number:</label>
//                     <input type="text" name="contactNumber" value={customer.contactNumber} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label>Address:</label>
//                     <input type="text" name="address" value={customer.address} onChange={handleChange} required />
//                 </div>
//                 <button type="submit">Update</button>
//             </form>

//         </div>
//     );
// };

// export default EditCustomer;
