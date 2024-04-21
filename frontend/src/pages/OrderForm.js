// import React, { useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import '../css/orderform.css'; // Include relevant CSS

// const OrderForm = () => {
//   // Function to calculate the initial delivery date (5 working days from today)
//   const calculateInitialDeliveryDate = () => {
//     const today = new Date();
//     const weekdaysToAdd = 5;

//     let count = 0;
//     while (count < weekdaysToAdd) {
//       today.setDate(today.getDate() + 1);
//       const dayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday
//       if (dayOfWeek !== 0 && dayOfWeek !== 6) {
//         count++;
//       }
//     }
//     return today.toISOString().split('T')[0]; // Return as yyyy-mm-dd
//   };

//   // Set initial form state
//   const [formData, setFormData] = useState({
//     orderName: '',
//     orderContactNo: '',
//     orderAddress: '',
//     deliveryDate: calculateInitialDeliveryDate(), // Default delivery date
//   });

//   const { orderName, orderContactNo, orderAddress, deliveryDate } = formData;

//   // Validate 10-digit contact number
//   const validateContactNo = (number) => {
//     const phonePattern = /^[0-9]{10}$/;
//     return phonePattern.test(number);
//   };

//   // Update form data when an input changes
//   const onChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const onSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form behavior

//     if (!validateContactNo(orderContactNo)) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Invalid Phone Number',
//         text: 'Please enter a valid 10-digit numeric phone number.',
//       });
//       return;
//     }

//     try {
//       // Submit the order form data to the backend
//       await axios.post('http://localhost:9000/orders/add', formData);
//       Swal.fire({
//         icon: 'success',
//         title: 'Order Placed',
//         text: 'Your order has been placed successfully!',
//       });

//       // Reset form to default values, recalculating delivery date
//       setFormData({
//         orderName: '',
//         orderContactNo: '',
//         orderAddress: '',
//         deliveryDate: calculateInitialDeliveryDate(),
//       });
//     } catch (err) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Request Error',
//         text: `Error placing the order: ${err.message}`,
//       });
//     }
//   };

//   return (
//     <>
//       <Header /> {/* Page header */}
//       <form className="order-form" onSubmit={onSubmit}> {/* Attach the submit handler */}
//         <h2>Place Your Order</h2>
//         <div className="form-group"> {/* Group for order name */}
//           <label htmlFor="orderName">Name:</label>
//           <input type="text" id="orderName" name="orderName" value={orderName} onChange={onChange} />
//         </div>
//         <div className="form-group"> {/* Group for contact number */}
//           <label htmlFor="orderContactNo">Contact No:</label>
//           <input type="tel" id="orderContactNo" name="orderContactNo" maxLength={10} value={orderContactNo} onChange={onChange} />
//         </div>
//         <div className="form-group"> {/* Group for order address */}
//           <label htmlFor="orderAddress">Address:</label>
//           <textarea id="orderAddress" name="orderAddress" value={orderAddress} onChange={onChange} />
//         </div>
//         <div className="form-group"> {/* Group for delivery date */}
//           <label htmlFor="deliveryDate">Preferred Delivery Date:</label>
//           <input type="date" id="deliveryDate" name="deliveryDate" value={deliveryDate} readOnly />
//         </div>
//         <button type="submit" className="submit-button">Place Order</button> {/* Submit button */}
//       </form>
//       <div className="important-note"> {/* Note regarding delivery */}
//         <p>** Important: We deliver within 5 working days. Deliveries do not occur on Saturdays or Sundays. **</p>
//       </div>
//       <Footer /> {/* Page footer */}
//     </>
//   );
// };

// export default OrderForm;

import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/orderform.css'; // Include relevant CSS

const OrderForm = () => {
  // Function to get the current date
  const getCurrentDate = () => {
    const today = new Date(); // Get current date
    return today.toISOString().split('T')[0]; // Format to 'yyyy-mm-dd'
  };

  // Set initial form state, with current date for 'deliveryDate'
  const [formData, setFormData] = useState({
    orderName: '',
    orderContactNo: '',
    orderAddress: '',
    deliveryDate: getCurrentDate(), // Set to the current date
  });

  const { orderName, orderContactNo, orderAddress, deliveryDate } = formData;

  // Validate 10-digit contact number
  const validateContactNo = (number) => {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(number);
  };

  // Update form data when an input changes
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    if (!validateContactNo(orderContactNo)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Phone Number',
        text: 'Please enter a valid 10-digit numeric phone number.',
      });
      return;
    }

    try {
      // Submit the order form data to the backend
      await axios.post('http://localhost:9000/orders/add', formData);
      Swal.fire({
        icon: 'success',
        title: 'Order Placed',
        text: 'Your order has been placed successfully!',
      });

      // Reset form to default values, using current date for 'deliveryDate'
      setFormData({
        orderName: '',
        orderContactNo: '',
        orderAddress: '',
        deliveryDate: getCurrentDate(), // Reset to the current date
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Request Error',
        text: `Error placing the order: ${err.message}`,
      });
    }
  };

  return (
    <>
      <Header /> {/* Page header */}
      <form className="order-form" onSubmit={onSubmit}> {/* Attach the submit handler */}
        <h2>Place Your Order</h2>
        <div className="form-group"> {/* Group for order name */}
          <label htmlFor="orderName">Name:</label>
          <input type="text" id="orderName" name="orderName" value={orderName} onChange={onChange} />
        </div>
        <div className="form-group"> {/* Group for contact number */}
          <label htmlFor="orderContactNo">Contact No:</label>
          <input type="tel" id="orderContactNo" name="orderContactNo" maxLength={10} value={orderContactNo} onChange={onChange} />
        </div>
        <div className="form-group"> {/* Group for order address */}
          <label htmlFor="orderAddress">Address:</label>
          <textarea id="orderAddress" name="orderAddress" value={orderAddress} onChange={onChange} />
        </div>
        <div class="form-group"> {/* Group for preferred delivery date */}
          <label htmlFor="deliveryDate">Ordering Date:</label>
          <input type="date" id="deliveryDate" name="deliveryDate" value={deliveryDate} readOnly /> {/* Show current date */}
        </div>
        <button type="submit" className="submit-button">Place Order</button> {/* Submit button */}
      </form>
      <div className="important-note"> {/* Note regarding delivery */}
        <p>** Important: We deliver within 5 working days. Deliveries do not occur on Saturdays or Sundays. **</p>
      </div>
      <Footer /> {/* Page footer */}
    </>
  );
};

export default OrderForm;
