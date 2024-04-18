import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VetAppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:9000/appointment/appointments', {
          params: {
            isAccept: true,
            isPaid: true,
            selectService: 'Veterinary Service',
          },
        });
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Veterinary Appointments</h2>
      {appointments.length > 0 ? (
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
            {appointments.map((appointment) => (
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
      ) : (
        <p style={styles.message}>No appointments found.</p>
      )}
    </div>
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
};

export default VetAppointmentList;
