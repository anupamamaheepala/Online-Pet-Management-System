// // // Cardpayreport.js

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const Cardpayreport = () => {
// //   const [cardPayments, setCardPayments] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await axios.get("http://localhost:9000/cardpayreport");
// //         setCardPayments(response.data);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error('Error fetching card payment report:', error);
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   return (
// //     <div>
// //       <h2>Card Payment Report</h2>
// //       {loading ? (
// //         <p>Loading...</p>
// //       ) : (
// //         <div className="card-container">
// //           {cardPayments.map((payment, index) => (
// //             <div className="card" key={index}>
// //               <h3>Name: {payment.name}</h3>
// //               <p>Email: {payment.email}</p>
// //               <p>Phone Number: {payment.phonenumber}</p>
// //               <p>Address: {payment.address}</p>
// //               <p>Purpose: {payment.purpose}</p>
// //               <p>Amount: {payment.amount}</p>
// //               <p>Card Number: {payment.cardNumber}</p>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //     </div>
// //   );
// // };

// // export default Cardpayreport;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Header from '../components/Header';
// import Footer from '../components/Footer';

// const Cardpayreport = () => {
//   const [cardPaymentData, setCardPaymentData] = useState(null);

//   useEffect(() => {
//     const fetchCardPaymentData = async () => {
//       try {
//         const searchParams = new URLSearchParams(window.location.search);
//         const id = searchParams.get('id');
//         if (!id) {
//           console.error('No ID parameter found in URL');
//           return;
//         }

//         const response = await axios.get(`http://localhost:9000/cardpayments/${id}`);
//         setCardPaymentData(response.data);
//       } catch (error) {
//         console.error('Error fetching card payment data:', error);
//       }
//     };

//     fetchCardPaymentData();
//   }, []);

//   return (
//     <>
//       <Header />
//       <div className="card-payment-report">
//         <h2>Card Payment Report</h2>
//         {cardPaymentData ? (
//           <div>
//             <p>Payer Name: {cardPaymentData.payerName}</p>
//             <p>Payer Email: {cardPaymentData.payerEmail}</p>
//             <p>Payer Phone Number: {cardPaymentData.payerPhoneNumber}</p>
//             <p>Payer Address: {cardPaymentData.payerAddress}</p>
//             <p>Purpose: {cardPaymentData.purpose}</p>
//             <p>Amount: {cardPaymentData.amount}</p>
//             <p>Card Number: {cardPaymentData.cardNumber}</p>
//           </div>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Cardpayreport;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Cardpayreport = () => {
  const [cardPaymentData, setCardPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCardPaymentData = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get('id');
        if (!id) {
          setError('No ID parameter found in URL');
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:9000/cardpay/cardpayments/${id}`);
        setCardPaymentData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching card payment data:', error);
        setError('Error fetching card payment data');
        setLoading(false);
      }
    };

    fetchCardPaymentData();
  }, []);

  return (
    <>
      <Header />
      <div className="card-payment-report">
        <h2>Card Payment Report</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            <p>Payer Name: {cardPaymentData.payerName}</p>
            <p>Payer Email: {cardPaymentData.payerEmail}</p>
            <p>Payer Phone Number: {cardPaymentData.payerPhoneNumber}</p>
            <p>Payer Address: {cardPaymentData.payerAddress}</p>
            <p>Purpose: {cardPaymentData.purpose}</p>
            <p>Amount: {cardPaymentData.amount}</p>
            <p>Card Number: {cardPaymentData.cardNumber}</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cardpayreport;