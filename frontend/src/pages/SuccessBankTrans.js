import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SystemAdminHeader from '../components/SystemAdminHeader';
import Footer from '../components/Footer';
import '../css/banktransadmin.css';

const SuccessBanktrans = () => {
  const [approvedTransactions, setApprovedTransactions] = useState([]);

  const fetchApprovedTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:9000/banktrans/approved');
      setApprovedTransactions(response.data);
    } catch (error) {
      console.error('Error fetching approved bank transactions: ', error);
    }
  };

  useEffect(() => {
    fetchApprovedTransactions();
  }, []);

  return (
    <>
      <SystemAdminHeader />
      <div className="bank-transactions-container">
        <center><h1>Approved Bank Transactions</h1></center>
        <br />
        <ul>
          {approvedTransactions.slice(0).reverse().map((transaction) => (
            <li key={transaction._id} className="transaction-item">
              <div className="transaction-details">
                <strong>Payer Name:</strong> {transaction.payer.name}<br />
                <strong>Payer Email:</strong> {transaction.payer.email}<br />
                <strong>Purpose:</strong> {transaction.payer.purpose}<br />
                <strong>Amount:</strong> {transaction.payer.amount}<br />
                <strong>Bank Name:</strong> {transaction.bankName}<br />
                <strong>Branch Name:</strong> {transaction.branchName}<br />
                <strong>Status:</strong> {transaction.status}<br />
              </div>

              <img
                src={`http://localhost:9000/${transaction.depositSlip}`}
                alt="Deposit Slip"
                className="deposit-slip-img"
              />
              <hr />
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default SuccessBanktrans;
