import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/cardpayadmin.css'; // Import CSS file
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import jspdf-autotable for table generation
import AdminHeader from '../components/AdminHeader';
import Footer from '../components/Footer';

const CardPayAdmin = () => {
  const [cardPayments, setCardPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchCardPayments = async () => {
      try {
        const response = await axios.get("http://localhost:9000/cardpay/cardpayments");
        setCardPayments(response.data);
        setSearchResults(response.data); // Initially, set search results to all card payments
      } catch (error) {
        console.error('Error fetching card payments:', error);
      }
    };

    fetchCardPayments();
  }, []);

  // Function to handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterResults(event.target.value);
  };

  // Function to filter card payments based on search term
  const filterResults = (term) => {
    const filteredResults = cardPayments.filter(payment =>
      payment.payerName.toLowerCase().includes(term.toLowerCase()) ||
      payment.payerEmail.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  // Function to generate and download PDF report
  const generatePDFReport = () => {
    const doc = new jsPDF();

    // Add site logo
    const logo = new Image();
    logo.src = '/images/logo.png';

    // Wait for the image to load before adding it to the PDF
    logo.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = logo.width;
      canvas.height = logo.height;
      ctx.drawImage(logo, 0, 0);
      
      // Convert the canvas to a data URL
      const dataUrl = canvas.toDataURL('image/png');
      
      // Add the logo to the PDF
      doc.addImage(dataUrl, 'PNG', 20, 10, 30, 30); // Adjust position and size as needed

      // Add title and table
      doc.text("Card Payments Report", 70, 30);
      doc.autoTable({
        html: '#card-pay-admin-table',
        startY: 50,
        styles: {
          fontSize: 10,
          cellPadding: 3,
          lineWidth: 0.1,
          lineColor: [0, 0, 0]
        },
        headStyles: {
          fillColor: [0, 0, 0],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          lineColor: [255, 255, 255]
          
        },
      }); // Adjust startY position as needed

      // Save the PDF
      doc.save('card_payments_report.pdf');
    };
  };

  return (
    <>
    <AdminHeader/>
    <div className="card-pay-admin-container">
      <h1 className="card-pay-admin-title">All Card Payments</h1>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={handleSearchChange}
        className="cardsearch-bar"
      />
      <table id="card-pay-admin-table" className="card-pay-admin-table">
        <thead>
          <tr>
            <th className="card-pay-admin-table-header">Payer Name</th>
            <th className="card-pay-admin-table-header">Payer Email</th>
            <th className="card-pay-admin-table-header">Payer Phone Number</th> {/* Add new header */}
            <th className="card-pay-admin-table-header">Purpose</th> {/* Add new header */}
            <th className="card-pay-admin-table-header">Amount</th> {/* Add new header */}
            <th className="card-pay-admin-table-header">Card Number</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((payment, index) => (
            <tr key={index} className="card-pay-admin-table-row">
              <td className="card-pay-admin-table-data">{payment.payerName}</td>
              <td className="card-pay-admin-table-data">{payment.payerEmail}</td>
              <td className="card-pay-admin-table-data">{payment.payerPhoneNumber}</td> {/* Add new data */}
              <td className="card-pay-admin-table-data">{payment.purpose}</td> {/* Add new data */}
              <td className="card-pay-admin-table-data">{payment.amount}</td> {/* Add new data */}
              <td className="card-pay-admin-table-data">{payment.cardNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="cardpdfdownload" onClick={generatePDFReport}>Download Financial Report</button>
    </div>
    <Footer/>
    </>
  );
};

export default CardPayAdmin;
