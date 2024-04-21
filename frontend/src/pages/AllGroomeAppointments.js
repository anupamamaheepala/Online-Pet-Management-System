import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Footer from '../components/Footer';
import GroomeHeader from '../components/Groome components/GroomerHeader';

const GroomeAppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:9000/appointment/appointments', {
          params: {
            isAccept: true,
            isPaid: true,
            selectService: 'Groome Service',
          },
        });
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, []);

  const generatePdf = () => {
    const doc = new jsPDF();
    const tableData = appointments.map((appointment) => [
      appointment.ownerName,
      appointment.ownerEmail,
      appointment.ownerContact,
      appointment.petType,
      new Date(appointment.selectDate).toLocaleDateString(),
      appointment.selectTime,
      appointment.selectProfession,
    ]);

    doc.setFontSize(18);
    doc.text('Covered_Groome_Appointments', 20, 20);
    doc.setFontSize(12);
    doc.autoTable({
      startY: 25,
      head: [['Owner Name', 'Owner Email', 'Owner Contact', 'Pet Type', 'Date', 'Time', 'Professional']],
      body: tableData,
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [128, 128, 128],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
    });
    doc.save('approved-groome-appointments.pdf');
  };

  // Function to filter appointments based on owner name
  const filteredAppointments = appointments.filter(appointment =>
    appointment.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      
      <GroomeHeader />
      <div style={styles.container}>
        <h2 style={styles.heading}>Grooming Appointments</h2>
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search by owner name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        {filteredAppointments.length > 0 ? (
          <>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Owner Name</th>
                  <th style={styles.tableHeader}>Owner Email</th>
                  <th style={styles.tableHeader}>Owner Contact</th>
                  <th style={styles.tableHeader}>Pet Type</th>
                  <th style={styles.tableHeader}>Date</th>
                  <th style={styles.tableHeader}>Time</th>
                  <th style={styles.tableHeader}>Professional</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment._id} style={styles.tableRow}>
                    <td style={styles.tableData}>{appointment.ownerName}</td>
                    <td style={styles.tableData}>{appointment.ownerEmail}</td>
                    <td style={styles.tableData}>{appointment.ownerContact}</td>
                    <td style={styles.tableData}>{appointment.petType}</td>
                    <td style={styles.tableData}>{new Date(appointment.selectDate).toLocaleDateString()}</td>
                    <td style={styles.tableData}>{appointment.selectTime}</td>
                    <td style={styles.tableData}>{appointment.selectProfession}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button style={styles.generateButton} onClick={generatePdf}>
              Generate Report
            </button>
          </>
        ) : (
          <p style={styles.message}>No appointments found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    padding: '8px',
    textAlign: 'left',
    border: '1px solid #ddd',
  },
  tableRow: {
    backgroundColor: '#fff',
  },
  tableData: {
    padding: '8px',
    textAlign: 'left',
    border: '1px solid #ddd',
  },
  message: {
    fontStyle: 'italic',
    color: '#888',
  },
  generateButton: {
    marginTop: '20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default GroomeAppointmentList;
