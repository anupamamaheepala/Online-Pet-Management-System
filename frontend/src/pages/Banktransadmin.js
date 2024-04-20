// // // // import React, { useEffect, useState } from 'react';
// // // // import axios from 'axios';

// // // // const Banktransadmin = () => {
// // // //   const [bankTransactions, setBankTransactions] = useState([]);

// // // //   useEffect(() => {
// // // //     const fetchBankTransactions = async () => {
// // // //       try {
// // // //         const response = await axios.get('http://localhost:9000/banktrans/all');
// // // //         setBankTransactions(response.data);
// // // //       } catch (error) {
// // // //         console.error('Error fetching bank transactions: ', error);
// // // //       }
// // // //     };

// // // //     fetchBankTransactions();
// // // //   }, []);

// // // //   return (
// // // //     <div>
// // // //       <h2>Bank Transactions</h2>
// // // //       <ul>
// // // //         {bankTransactions.map((transaction) => (
// // // //           <li key={transaction._id}>
// // // //             <strong>Bank Name:</strong> {transaction.bankName}<br />
// // // //             <strong>Branch Name:</strong> {transaction.branchName}<br />
// // // //             <strong>Deposit Slip:</strong> {transaction.depositSlip}<br />
// // // //             <strong>Payer Name:</strong> {transaction.payer.name}<br />
// // // //             <strong>Payer Email:</strong> {transaction.payer.email}<br />
// // // //             <strong>Purpose:</strong> {transaction.payer.purpose}<br />
// // // //             <strong>Amount:</strong> {transaction.payer.amount}<br />
// // // //             <hr />
// // // //           </li>
// // // //         ))}
// // // //       </ul>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Banktransadmin;
// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';

// // // const Banktransadmin = () => {
// // //   const [bankTransactions, setBankTransactions] = useState([]);

// // //   useEffect(() => {
// // //     const fetchBankTransactions = async () => {
// // //       try {
// // //         const response = await axios.get('http://localhost:9000/banktrans/all');
// // //         setBankTransactions(response.data);
// // //       } catch (error) {
// // //         console.error('Error fetching bank transactions: ', error);
// // //       }
// // //     };

// // //     fetchBankTransactions();
// // //   }, []);

// // //   return (
// // //     <div>
// // //       <h2>Bank Transactions</h2>
// // //       <ul>
// // //         {bankTransactions.map((transaction) => (
// // //           <li key={transaction._id}>
// // //             <strong>Bank Name:</strong> {transaction.bankName}<br />
// // //             <strong>Branch Name:</strong> {transaction.branchName}<br />
// // //             <strong>Payer Name:</strong> {transaction.payer.name}<br />
// // //             <strong>Payer Email:</strong> {transaction.payer.email}<br />
// // //             <strong>Purpose:</strong> {transaction.payer.purpose}<br />
// // //             <strong>Amount:</strong> {transaction.payer.amount}<br />
// // //             <strong>Deposit Slip:</strong> <br />
// // //             <img src={`http://localhost:9000/${transaction.depositSlip}`} alt="Deposit Slip" style={{ maxWidth: '100%' }} /><br />
// // //             <hr />
// // //           </li>
// // //         ))}
// // //       </ul>
// // //     </div>
// // //   );
// // // };

// // // export default Banktransadmin;
// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';

// // // const Banktransadmin = () => {
// // //   const [bankTransactions, setBankTransactions] = useState([]);

// // //   useEffect(() => {
// // //     const fetchBankTransactions = async () => {
// // //       try {
// // //         const response = await axios.get('http://localhost:9000/banktrans/all');
// // //         setBankTransactions(response.data);
// // //       } catch (error) {
// // //         console.error('Error fetching bank transactions: ', error);
// // //       }
// // //     };

// // //     fetchBankTransactions();
// // //   }, []);

// // //   return (
// // //     <div>
// // //       <h2>Bank Transactions</h2>
// // //       <ul>
// // //         {bankTransactions.map((transaction) => (
// // //           <li key={transaction._id}>
// // //             <strong>Bank Name:</strong> {transaction.bankName}<br />
// // //             <strong>Branch Name:</strong> {transaction.branchName}<br />
// // //             <strong>Payer Name:</strong> {transaction.payer.name}<br />
// // //             <strong>Payer Email:</strong> {transaction.payer.email}<br />
// // //             <strong>Purpose:</strong> {transaction.payer.purpose}<br />
// // //             <strong>Amount:</strong> {transaction.payer.amount}<br />
// // //             <strong>Deposit Slip:</strong> <br />
// // //             <img src={`http://localhost:9000/${transaction.depositSlip}`} alt="Deposit Slip" style={{ maxWidth: '100%' }} /><br />
// // //             <hr />
// // //           </li>
// // //         ))}
// // //       </ul>
// // //     </div>
// // //   );
// // // };

// // // export default Banktransadmin;
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const Banktransadmin = () => {
// //   const [bankTransactions, setBankTransactions] = useState([]);

// //   useEffect(() => {
// //     const fetchBankTransactions = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:9000/banktrans/all');
// //         setBankTransactions(response.data);
// //       } catch (error) {
// //         console.error('Error fetching bank transactions: ', error);
// //       }
// //     };

// //     fetchBankTransactions();
// //   }, []);

// //   const handleApproval = async (transactionId) => {
// //     try {
// //       // Send a request to your backend to mark the transaction as approved
// //       await axios.put(`http://localhost:9000/banktrans/approve/${transactionId}`);
// //       // After successful approval, fetch updated bank transactions
// //       fetchBankTransactions();
// //     } catch (error) {
// //       console.error('Error approving transaction: ', error);
// //     }
// //   };

// //   const handleDisapproval = async (transactionId) => {
// //     try {
// //       // Send a request to your backend to mark the transaction as disapproved
// //       await axios.put(`http://localhost:9000/banktrans/disapprove/${transactionId}`);
// //       // After successful disapproval, fetch updated bank transactions
// //       fetchBankTransactions();
// //     } catch (error) {
// //       console.error('Error disapproving transaction: ', error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Bank Transactions</h2>
// //       <ul>
// //         {bankTransactions.map((transaction) => (
// //           <li key={transaction._id}>
// //             <strong>Bank Name:</strong> {transaction.bankName}<br />
// //             <strong>Branch Name:</strong> {transaction.branchName}<br />
// //             <strong>Payer Name:</strong> {transaction.payer.name}<br />
// //             <strong>Payer Email:</strong> {transaction.payer.email}<br />
// //             <strong>Purpose:</strong> {transaction.payer.purpose}<br />
// //             <strong>Amount:</strong> {transaction.payer.amount}<br />
// //             <strong>Deposit Slip:</strong> <br />
// //             <img src={`http://localhost:9000/${transaction.depositSlip}`} alt="Deposit Slip" style={{ maxWidth: '100%' }} /><br />
// //             <button onClick={() => handleApproval(transaction._id)}>Approve</button>
// //             <button onClick={() => handleDisapproval(transaction._id)}>Disapprove</button>
// //             <hr />
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default Banktransadmin;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../css/banktransadmin.css';

// const Banktransadmin = () => {
//   const [bankTransactions, setBankTransactions] = useState([]);

//   const fetchBankTransactions = async () => {
//     try {
//       const response = await axios.get('http://localhost:9000/banktrans/all');
//       setBankTransactions(response.data);
//     } catch (error) {
//       console.error('Error fetching bank transactions: ', error);
//     }
//   };

//   useEffect(() => {
//     fetchBankTransactions();
//   }, []);

//   const handleApproval = async (transactionId) => {
//     try {
//       await axios.put(`http://localhost:9000/banktrans/approve/${transactionId}`);
//       fetchBankTransactions();
//     } catch (error) {
//       console.error('Error approving transaction: ', error);
//     }
//   };

//   const handleDisapproval = async (transactionId) => {
//     try {
//       await axios.put(`http://localhost:9000/banktrans/disapprove/${transactionId}`);
//       fetchBankTransactions();
//     } catch (error) {
//       console.error('Error disapproving transaction: ', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Bank Transactions</h2>
//       <ul>
//         {bankTransactions.map((transaction) => (
//           <li key={transaction._id}>
//             <strong>Bank Name:</strong> {transaction.bankName}<br />
//             <strong>Branch Name:</strong> {transaction.branchName}<br />
//             <strong>Payer Name:</strong> {transaction.payer.name}<br />
//             <strong>Payer Email:</strong> {transaction.payer.email}<br />
//             <strong>Purpose:</strong> {transaction.payer.purpose}<br />
//             <strong>Amount:</strong> {transaction.payer.amount}<br />
//             <strong>Deposit Slip:</strong> <br />
//             <img src={`http://localhost:9000/${transaction.depositSlip}`} alt="Deposit Slip" style={{ maxWidth: '100%' }} /><br />
//             <button onClick={() => handleApproval(transaction._id)}>Approve</button>
//             <button onClick={() => handleDisapproval(transaction._id)}>Disapprove</button>
//             <hr />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Banktransadmin;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/banktransadmin.css';

const Banktransadmin = () => {
  const [bankTransactions, setBankTransactions] = useState([]);

  const fetchBankTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:9000/banktrans/all');
      setBankTransactions(response.data);
    } catch (error) {
      console.error('Error fetching bank transactions: ', error);
    }
  };

  useEffect(() => {
    fetchBankTransactions();
  }, []);

  const handleApproval = async (transactionId) => {
    try {
      await axios.put(`http://localhost:9000/banktrans/approve/${transactionId}`);
      fetchBankTransactions();
    } catch (error) {
      console.error('Error approving transaction: ', error);
    }
  };

  const handleDisapproval = async (transactionId) => {
    try {
      await axios.put(`http://localhost:9000/banktrans/disapprove/${transactionId}`);
      fetchBankTransactions();
    } catch (error) {
      console.error('Error disapproving transaction: ', error);
    }
  };

  return (
    <div className="bank-transactions-container">
      <center><h1>Bank Transactions</h1></center>
      <br/>
      <ul>
        {bankTransactions.map((transaction) => (
          <li key={transaction._id} className="transaction-item">
            <div className="transaction-details">
              <strong>Payer Name:</strong> {transaction.payer.name}<br />
              <strong>Payer Email:</strong> {transaction.payer.email}<br />
              <strong>Purpose:</strong> {transaction.payer.purpose}<br />
              <strong>Amount:</strong> {transaction.payer.amount}<br />
              <strong>Bank Name:</strong> {transaction.bankName}<br />
              <strong>Branch Name:</strong> {transaction.branchName}<br />
            </div>
            
            <img
              src={`http://localhost:9000/${transaction.depositSlip}`}
              alt="Deposit Slip"
              className="deposit-slip-img"
            />
            <br></br>
            <div className="transaction-actions">
              <button onClick={() => handleApproval(transaction._id)}>Approve</button>
              <button onClick={() => handleDisapproval(transaction._id)}>Disapprove</button>
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Banktransadmin;
