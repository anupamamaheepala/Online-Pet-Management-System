import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SystemAdminHeader from '../components/SystemAdminHeader';
import Footer from '../components/Footer';
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

  // Filter out approved transactions
  const filteredTransactions = bankTransactions.filter(transaction => transaction.status !== 'approved');

  return (
    <>
    <SystemAdminHeader/>
    <div className="bank-transactions-container">
      <center><h1>Bank Transactions</h1></center>
      <br/>
      <ul>
        {filteredTransactions.map((transaction) => (
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
            <br></br>
            <div className="transaction-actions">
              {transaction.status !== 'approved' && (
                <button onClick={() => handleApproval(transaction._id)}>Approve</button>
              )}
              {transaction.status !== 'disapproved' && (
                <button onClick={() => handleDisapproval(transaction._id)}>Disapprove</button>
              )}
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
    <Footer/>
    </>
  );
};

export default Banktransadmin;
