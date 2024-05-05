import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import '../css/Trainingdashboard.css';
import TrainingHeader from '../components/Training component/TrainingHeader';
import jsPDF from 'jspdf';

const TrainingDashboard = () => {
  const [trainings, setTrainings] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [pieChartInstance, setPieChartInstance] = useState(null);

  useEffect(() => {
    fetchTrainings();
  }, []);

  useEffect(() => {
    updateCounts(trainings);
    generateChartData(trainings);
    generatePieChartData(trainings);
  }, [trainings]);

  useEffect(() => {
    if (chartData) {
      destroyChart();
      createChart();
    }
    if (pieChartData) {
      destroyPieChart();
      createPieChart();
    }
  }, [chartData, pieChartData]);

  const fetchTrainings = async () => {
    try {
      const response = await axios.get('http://localhost:9000/training/all');
      const data = response.data;
      setTrainings(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateCounts = (trainings) => {
    const pending = trainings.filter((training) => training.status === 'pending').length;
    const approved = trainings.filter((training) => training.status === 'approved').length;
    const rejected = trainings.filter((training) => training.status === 'rejected').length;
    setPendingCount(pending);
    setApprovedCount(approved);
    setRejectedCount(rejected);
  };

  const generateChartData = (trainings) => {
    const labels = [];
    const approvedData = [];
    const rejectedData = [];
    const pendingData = [];

    const groupedByDate = trainings.reduce((acc, training) => {
      const date = new Date(training.submissionDateTime).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = { approved: 0, rejected: 0, pending: 0 };
      }
      acc[date][training.status]++;
      return acc;
    }, {});

    Object.entries(groupedByDate).forEach(([date, counts]) => {
      labels.push(date);
      approvedData.push(counts.approved);
      rejectedData.push(counts.rejected);
      pendingData.push(counts.pending);
    });

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Approved',
          data: approvedData,
          borderColor: 'green',
          backgroundColor: 'rgba(0, 128, 0, 0.1)',
          fill: false,
        },
        {
          label: 'Rejected',
          data: rejectedData,
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
          fill: false,
        },
        {
          label: 'Pending',
          data: pendingData,
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.1)',
          fill: false,
        },
      ],
    };

    setChartData(data);
  };

  const generatePieChartData = (trainings) => {
    const months = {};

    trainings.forEach((training) => {
      const month = new Date(training.submissionDateTime).getMonth();
      if (!months[month]) {
        months[month] = 0;
      }
      months[month]++;
    });

    const labels = Object.keys(months).map((month) => {
      return new Date(0, month).toLocaleString('default', { month: 'long' });
    });

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Applications per Month',
          data: Object.values(months),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    setPieChartData(data);
  };

  const destroyChart = () => {
    if (chartInstance) {
      chartInstance.destroy();
    }
  };

  const createChart = () => {
    const ctx = document.getElementById('trainingChart');
    const newChartInstance = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Frequency',
            },
          },
        },
      },
    });
    setChartInstance(newChartInstance);
  };

  const destroyPieChart = () => {
    if (pieChartInstance) {
      pieChartInstance.destroy();
    }
  };

  const createPieChart = () => {
    const ctx = document.getElementById('pieChart');
    const newPieChartInstance = new Chart(ctx, {
      type: 'pie',
      data: pieChartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          
        },
      },
    });
    setPieChartInstance(newPieChartInstance);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/training/delete/${id}`);
      fetchTrainings();
    } catch (error) {
      console.error('Error deleting training:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return 'black';
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const reportTitle = 'Approved Training Applicants';

    const logo = new Image();
    logo.src = '/images/logo.png';

    logo.onload = function () {
      const logoWidth = 40;
      const xPosition = 10;
      const yPosition = 10;

      doc.addImage(logo, 'PNG', xPosition, yPosition, logoWidth, logoWidth);

      const pageWidth = doc.internal.pageSize.getWidth();
      const titleWidth =
        (doc.getStringUnitWidth(reportTitle) * doc.internal.getFontSize()) /
        doc.internal.scaleFactor;
      const titleXPosition = (pageWidth - titleWidth) / 2;
      const titleYPosition = yPosition + logoWidth + 10;

      doc.setFontSize(18);
      doc.text(reportTitle, 70, yPosition + logoWidth - 15);

      const tableData = trainings
        .filter((training) => training.status === 'approved')
        .map((training) => [
          training.ownerName,
          training.dogName,
          training.instructorName,
          new Date(training.submissionDateTime).toLocaleDateString(),
        ]);

      doc.setFontSize(12);

      doc.autoTable({
        startY: titleYPosition + 10,
        head: [['Owner Name', 'Dog Name', 'Instructor Name', 'Date']],
        body: tableData,
        styles: {
          fontSize: 10,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: [0, 0, 0],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
        },
      });

      doc.save('approved Trainng details.pdf');
    };
  };

  const handleDownloadReport = () => {
    generatePDF();
  };

  const filteredTrainings = trainings.filter((training) => {
    const ownerNameMatch = training.ownerName && training.ownerName.toLowerCase().includes(searchQuery);
    const instructorMatch = training.instructor && training.instructor.toLowerCase().includes(searchQuery);
    const instructorIdMatch = training.instructorId && training.instructorId.toLowerCase().includes(searchQuery);
    const instructorNameMatch = training.instructorName && training.instructorName.toLowerCase().includes(searchQuery);
    return ownerNameMatch || instructorMatch || instructorIdMatch || instructorNameMatch;
  })

  return (
    <div>
      <TrainingHeader />
  
      <div className="dashboard-header">
        <div>Pending Applications: {pendingCount}</div>
        <div>Approved Applications: {approvedCount}</div>
        <div>Rejected Applications: {rejectedCount}</div>
        <div className="total-count">Total Applications: {trainings.length}</div>
      </div>
      <div className="button-row">
        <a href="PrivateTrainingPrograms">
          <button className="alo1-button">Add Dog Details for Private Training |</button>
        </a>
        <a href="StepForm">
          <button className="alo1-button">Manage Private Programs |</button>
        </a>
        <button className="alo1-button">Manage Group Programs</button>
        <button style={{ backgroundColor: 'black' }} className="report-button" onClick={handleDownloadReport}>
          Download Report
        </button>
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        className="alo222_search-input"
      />
      <div className="alo_table-container">
        <table className="alo1-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Owner's Name</th>
              <th>Dog's Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Instructor's ID</th>
              <th>Instructor's Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrainings.map((training, index) => (
              <tr key={training._id}>
                <td>{index + 1}</td>
                <td>{training.ownerName}</td>
                <td>{training.dogName}</td>
                <td>{new Date(training.submissionDateTime).toLocaleDateString()}</td>
                <td>{new Date(training.submissionDateTime).toLocaleTimeString()}</td>
                <td style={{ color: getStatusColor(training.status) }}>
                  {training.status === 'pending'
                    ? 'Pending'
                    : training.status === 'approved'
                    ? 'Approved'
                    : 'Rejected'}
                </td>
                <td>{training.instructorId || 'Not Assigned'}</td>
                <td>{training.instructorName || 'Not Assigned'}</td>
                <td>
                  <Link
                    to={{
                      pathname: `/training/${training._id}`,
                      state: { instructorName: selectedTrainer ? selectedTrainer.value : '' },
                    }}
                    className="alo_view-details-button"
                  >
                    <button className="alo1-button">View Details</button>
                  </Link>
                  &nbsp;
                  <button className="alo2-button" onClick={() => handleDelete(training._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="asw18-chart-container">
       < div className="alo1802name" >
        Training Frequency Over Time
        </div>
          <canvas id="trainingChart"></canvas>
          
          
        </div>
        <div className="a1802-piechart-container">
        < div className="alo1802name" >
        Training Applications by Month
        </div>
        <canvas id="pieChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default TrainingDashboard;

