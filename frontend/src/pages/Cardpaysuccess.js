// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../css/cardpaysuccess.css';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// const Cardpaysuccess = () => {
//   const [payerDetails, setPayerDetails] = useState(null);
//   const [cardDetails, setCardDetails] = useState(null);
//   const [currentDateTime, setCurrentDateTime] = useState(new Date());

//   useEffect(() => {
//     const searchParams = new URLSearchParams(window.location.search);
//     const payerId = searchParams.get('id');

//     const fetchPayerDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:9000/cardpay/payerdetails/${payerId}`);
//         setPayerDetails(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     const fetchCardDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:9000/cardpay/cardpayments/${payerId}`);
//         setCardDetails(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchPayerDetails();
//     fetchCardDetails();

//     // Update currentDateTime every second
//     const intervalId = setInterval(() => {
//       setCurrentDateTime(new Date());
//     }, 1000);

//     // Cleanup interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   const generatePdfReport = () => {
//     if (!payerDetails || !cardDetails) return;
  
//     html2canvas(document.querySelector('.cps-container'), {
//       scale: 2, // Increase scale for higher resolution
//       logging: false, // Disable logging for cleaner console output
//       width: 600, // Set canvas width to accommodate larger content
//       height: 1000, // Set canvas height to accommodate larger content
//       windowWidth: document.querySelector('.cps-container').scrollWidth, // Set window width for accurate rendering
//       windowHeight: document.querySelector('.cps-container').scrollHeight, // Set window height for accurate rendering
//       useCORS: true, // Enable cross-origin resource sharing
//       allowTaint: true, // Allow taint on the canvas
//       backgroundColor: null, // Set background color to transparent
//        // Scale canvas to improve quality
//     }).then(canvas => {
//       const pdf = new jsPDF();
//       const imgData = canvas.toDataURL('image/png');

//       const pdfWidth = pdf.internal.pageSize.width;
//       const pdfHeight = pdf.internal.pageSize.height;
//       const imgWidth = 150; // Set the width of the image in the PDF
//       const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

//       const x = (pdfWidth - imgWidth) / 2; // Calculate horizontal position
//       const y = (pdfHeight - imgHeight) / 2; // Calculate vertical position

//       pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
//       pdf.save('payment_acknowledgement.pdf');
//     });
//   };
  
//   const navigateHome = () => {
//     window.location.href = '/'; // Navigate to the home page
//   };

//   if (!payerDetails || !cardDetails) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <Header />
//       <div className="cps-container">
//         <h2>
//           Payment Successful
//           <svg xmlns="http://www.w3.org/2000/svg" className="check-mark" viewBox="0 0 24 24" fill="green" width="48" height="48">
//             <path d="M0 0h24v24H0V0z" fill="none" />
//             <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
//           </svg>
//         </h2>
//         <h5>Congratulations! Your payment was successful.</h5>
//         <h3>Payment Acknowledgement</h3>
//         <p><b>Name:</b> {payerDetails.name}</p>
//         <p><b>Email:</b> {payerDetails.email}</p>
//         <p><b>Phone Number:</b> {payerDetails.phonenumber}</p>
//         <p><b>Address:</b> {payerDetails.address}</p>
//         <p><b>Purpose:</b> {payerDetails.purpose}</p>
//         <p><b>Amount:</b> {payerDetails.amount}</p>
//         <p><b>Name on Card:</b> {cardDetails.nameOnCard}</p>
//         <p><b>Card Number:</b> {cardDetails.cardNumber}</p>
//         <p><b>Date:</b> {currentDateTime.toLocaleDateString()}</p>
//         <p><b>Time:</b> {currentDateTime.toLocaleTimeString()}</p>
//       </div>
//       <center>
//       <div className="cps-button-container">
//         <button onClick={generatePdfReport} className="cps-download-pdf-btn">Download Report</button>
//         <button onClick={navigateHome} className="cps-home-btn">Back to Page</button>
//       </div>
//       </center>
//       <Footer />
//     </>
//   );
// };

// export default Cardpaysuccess;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/cardpaysuccess.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Cardpaysuccess = () => {
  const [payerDetails, setPayerDetails] = useState(null);
  const [cardDetails, setCardDetails] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const payerId = searchParams.get('id');

    const fetchPayerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/cardpay/payerdetails/${payerId}`);
        setPayerDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCardDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/cardpay/cardpayments/${payerId}`);
        setCardDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPayerDetails();
    fetchCardDetails();

    // Update currentDateTime every second
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const generatePdfReport = () => {
    if (!payerDetails || !cardDetails) return;
  
    html2canvas(document.querySelector('.cps-container'), {
      scale: 2, // Increase scale for higher resolution
      logging: false, // Disable logging for cleaner console output
      width: 600, // Set canvas width to accommodate larger content
      height: 1000, // Set canvas height to accommodate larger content
      windowWidth: document.querySelector('.cps-container').scrollWidth, // Set window width for accurate rendering
      windowHeight: document.querySelector('.cps-container').scrollHeight, // Set window height for accurate rendering
      useCORS: true, // Enable cross-origin resource sharing
      allowTaint: true, // Allow taint on the canvas
      backgroundColor: null, // Set background color to transparent
       // Scale canvas to improve quality
    }).then(canvas => {
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');

      const pdfWidth = pdf.internal.pageSize.width;
      const pdfHeight = pdf.internal.pageSize.height;
      const imgWidth = 150; // Set the width of the image in the PDF
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

      const x = (pdfWidth - imgWidth) / 2; // Calculate horizontal position
      const y = (pdfHeight - imgHeight) / 2; // Calculate vertical position

      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      pdf.save('payment_acknowledgement.pdf');
    });
  };
  
  const navigateHome = () => {
    // Determine where to navigate based on the purpose
    switch (payerDetails.purpose) {
      case "Buy products":
        window.location.href = '/OrderForm';
        break;
      case "Veterinary appointment":
        window.location.href = '/MyAppointments';
        break;
      case "Grooming appointment":
        window.location.href = '/MyAppointments';
        break;
      case "Pet training appointment":
        window.location.href = '/TrainingPrograms#'; // Add appropriate anchor if needed
        break;
      case "Advertisement":
        window.location.href = '/Advertisement';
        break;
      default:
        window.location.href = '/'; // Navigate to home page by default
    }
  };

  if (!payerDetails || !cardDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="cps-container">
        <h2>
          Payment Successful
          <svg xmlns="http://www.w3.org/2000/svg" className="check-mark" viewBox="0 0 24 24" fill="green" width="48" height="48">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
          </svg>
        </h2>
        <h5>Congratulations! Your payment was successful.</h5>
        <h3>Payment Acknowledgement</h3>
        <p><b>Name:</b> {payerDetails.name}</p>
        <p><b>Email:</b> {payerDetails.email}</p>
        <p><b>Phone Number:</b> {payerDetails.phonenumber}</p>
        <p><b>Address:</b> {payerDetails.address}</p>
        <p><b>Purpose:</b> {payerDetails.purpose}</p>
        <p><b>Amount:</b> {payerDetails.amount}</p>
        <p><b>Name on Card:</b> {cardDetails.nameOnCard}</p>
        <p><b>Card Number:</b> {cardDetails.cardNumber}</p>
        <p><b>Date:</b> {currentDateTime.toLocaleDateString()}</p>
        <p><b>Time:</b> {currentDateTime.toLocaleTimeString()}</p>
      </div>
      <center>
        <div className="cps-button-container">
          <button onClick={generatePdfReport} className="cps-download-pdf-btn">Download Report</button>
          <button onClick={navigateHome} className="cps-home-btn">Back to Page</button>
        </div>
      </center>
      <Footer />
    </>
  );
};

export default Cardpaysuccess;
