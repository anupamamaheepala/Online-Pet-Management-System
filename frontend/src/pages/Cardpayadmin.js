// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';

// // // const CardPayAdmin = () => {
// // //     const [cardPayments, setCardPayments] = useState([]);

// // //     useEffect(() => {
// // //         const fetchCardPayments = async () => {
// // //             try {
// // //                 const response = await axios.get('http://localhost:9000/cardpayments');
// // //                 setCardPayments(response.data);
// // //             } catch (error) {
// // //                 console.error('Error fetching card payments:', error);
// // //             }
// // //         };

// // //         fetchCardPayments();
// // //     }, []);

// // //     return (
// // //         <div>
// // //             <h1>Card Payments Admin</h1>
// // //             <table>
// // //                 <thead>
// // //                     <tr>
// // //                         <th>Payer Name</th>
// // //                         <th>Payer Email</th>
// // //                         <th>Card Number</th>
// // //                         <th>CVV</th>
// // //                         <th>Expiration Date</th>
// // //                     </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                     {cardPayments.map((payment, index) => (
// // //                         <tr key={index}>
// // //                             <td>{payment.payer.name}</td>
// // //                             <td>{payment.payer.email}</td>
// // //                             <td>{payment.cardNumber}</td>
// // //                             <td>{payment.cvv}</td>
// // //                             <td>{payment.expireDate}</td>
// // //                         </tr>
// // //                     ))}
// // //                 </tbody>
// // //             </table>
// // //         </div>
// // //     );
// // // };

// // // export default CardPayAdmin;
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const CardPayAdmin = () => {
// //     const [cardPayments, setCardPayments] = useState([]);

// //     useEffect(() => {
// //         const fetchCardPayments = async () => {
// //             try {
// //                 const response = await axios.get('http://localhost:9000/cardpayments');
// //                 setCardPayments(response.data);
// //             } catch (error) {
// //                 console.error('Error fetching card payments:', error);
// //             }
// //         };

// //         fetchCardPayments();
// //     }, []);

// //     return (
// //         <div>
// //             <h1>Card Payments Admin</h1>
// //             <table>
// //                 <thead>
// //                     <tr>
// //                         <th>Payer Name</th>
// //                         <th>Payer Email</th>
// //                         <th>Card Number</th>
// //                         <th>CVV</th>
// //                         <th>Expiration Date</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {cardPayments.map((payment, index) => (
// //                         <tr key={index}>
// //                             <td>{payment.payer.name}</td>
// //                             <td>{payment.payer.email}</td>
// //                             <td>{payment.cardNumber}</td>
// //                             <td>{payment.cvv}</td>
// //                             <td>{payment.expireDate}</td>
// //                         </tr>
// //                     ))}
// //                 </tbody>
// //             </table>
// //         </div>
// //     );
// // };

// // export default CardPayAdmin;
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const CardPayAdmin = () => {
// //     const [cardPayments, setCardPayments] = useState([]);

// //     useEffect(() => {
// //         const fetchCardPayments = async () => {
// //             try {
// //                 const response = await axios.get('http://localhost:9000/cardpayments');
// //                 setCardPayments(response.data);
// //             } catch (error) {
// //                 console.error('Error fetching card payments:', error);
// //             }
// //         };

// //         fetchCardPayments();
// //     }, []);

// //     return (
// //         <div>
// //             <h1>Card Payments Admin</h1>
// //             <table>
// //                 <thead>
// //                     <tr>
// //                         <th>Payer Name</th>
// //                         <th>Payer Email</th>
// //                         <th>Card Number</th>
// //                         <th>CVV</th>
// //                         <th>Expiration Date</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {cardPayments.map((payment, index) => (
// //                         <tr key={index}>
// //                             <td>{payment.payer.name}</td>
// //                             <td>{payment.payer.email}</td>
// //                             <td>{payment.cardNumber}</td>
// //                             <td>{payment.cvv}</td>
// //                             <td>{payment.expireDate}</td>
// //                         </tr>
// //                     ))}
// //                 </tbody>
// //             </table>
// //         </div>
// //     );
// // };

// // export default CardPayAdmin;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const CardPayAdmin = () => {
//   const [cardPayments, setCardPayments] = useState([]);

//   useEffect(() => {
//     const fetchCardPayments = async () => {
//       try {
//         const response = await axios.get("http://localhost:9000/cardpayments");
//         setCardPayments(response.data);
//       } catch (error) {
//         console.error('Error fetching card payments:', error);
//       }
//     };

//     fetchCardPayments();
//   }, []);

//   return (
//     <div>
//       <h1>Card Payments Admin</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Payer Name</th>
//             <th>Payer Email</th>
//             <th>Card Number</th>
//             <th>CVV</th>
//             <th>Expiration Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cardPayments.map((payment, index) => (
//             <tr key={index}>
//               <td>{payment.payerName}</td>
//               <td>{payment.payerEmail}</td>
//               <td>{payment.cardNumber}</td>
//               <td>{payment.cvv}</td>
//               <td>{payment.expireDate}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CardPayAdmin;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const CardPayAdmin = () => {
//   const [cardPayments, setCardPayments] = useState([]);

//   useEffect(() => {
//     const fetchCardPayments = async () => {
//       try {
//         const response = await axios.get("http://localhost:9000/cardpay/cardpayments");
//         setCardPayments(response.data);
//       } catch (error) {
//         console.error('Error fetching card payments:', error);
//       }
//     };

//     fetchCardPayments();
//   }, []);

//   return (
//     <div>
//       <h1>Card Payments Admin</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Payer Name</th>
//             <th>Payer Email</th>
//             <th>Card Number</th>
//             <th>CVV</th>
//             <th>Expiration Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cardPayments.map((payment, index) => (
//             <tr key={index}>
//               <td>{payment.payerName}</td>
//               <td>{payment.payerEmail}</td>
//               <td>{payment.cardNumber}</td>
//               <td>{payment.cvv}</td>
//               <td>{payment.expireDate}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CardPayAdmin;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/cardpayadmin.css'; // Import CSS file

const CardPayAdmin = () => {
  const [cardPayments, setCardPayments] = useState([]);

  useEffect(() => {
    const fetchCardPayments = async () => {
      try {
        const response = await axios.get("http://localhost:9000/cardpay/cardpayments");
        setCardPayments(response.data);
      } catch (error) {
        console.error('Error fetching card payments:', error);
      }
    };

    fetchCardPayments();
  }, []);

  return (
    <div className="card-pay-admin-container"> {/* Added container class */}
      <h1 className="card-pay-admin-title">All Card Payments</h1> {/* Added title class */}
      <table className="card-pay-admin-table"> {/* Added table class */}
        <thead>
          <tr>
            <th className="card-pay-admin-table-header">Payer Name</th> {/* Added header class */}
            <th className="card-pay-admin-table-header">Payer Email</th> {/* Added header class */}
            <th className="card-pay-admin-table-header">Card Number</th> {/* Added header class */}
            <th className="card-pay-admin-table-header">CVV</th> {/* Added header class */}
            <th className="card-pay-admin-table-header">Expiration Date</th> {/* Added header class */}
          </tr>
        </thead>
        <tbody>
          {cardPayments.map((payment, index) => (
            <tr key={index} className="card-pay-admin-table-row"> {/* Added row class */}
              <td className="card-pay-admin-table-data">{payment.payerName}</td> {/* Added data class */}
              <td className="card-pay-admin-table-data">{payment.payerEmail}</td> {/* Added data class */}
              <td className="card-pay-admin-table-data">{payment.cardNumber}</td> {/* Added data class */}
              <td className="card-pay-admin-table-data">{payment.cvv}</td> {/* Added data class */}
              <td className="card-pay-admin-table-data">{payment.expireDate}</td> {/* Added data class */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CardPayAdmin;
