// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

// Register the components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const Dashboard = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get('/api/data');
    setData((prevData) => [...prevData, response.data]);
  };

  useEffect(() => {
    fetchData(); // Fetch data initially

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: data.map((item) => item.timestamp),
    datasets: [
      {
        label: 'Source System Balance',
        data: data.map((item) => item.SourceSystemBalance),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        label: 'OFSAA Raw Balance',
        data: data.map((item) => item.OfsaaRawBalance),
        borderColor: 'rgba(255,99,132,1)',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'second',
        },
      },
    },
  };

  return (
    <div>
      <h2>Real-time Dashboard</h2>
      <Line data={chartData} options={options} />
      <h3>Balance Differences</h3>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Source System Balance</th>
            <th>OFSAA Raw Balance</th>
            <th>Difference</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.timestamp}</td>
              <td>{item.SourceSystemBalance}</td>
              <td>{item.OfsaaRawBalance}</td>
              <td>{item.OfsaaRawBalance - item.SourceSystemBalance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
*********************************
  /* src/index.css */
body {
  font-family: Arial, sans-serif;
}

.App {
  text-align: center;
  padding: 20px;
}

nav {
  background-color: #333;
  padding: 10px;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-around;
}

nav ul li {
  display: inline;
}

nav ul li a {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
}

nav ul li a:hover {
  background-color: #555;
  border-radius: 5px;
}

h2 {
  margin-bottom: 20px;
}

h3 {
  margin-top: 20px;
}

table {
  margin: 20px auto;
  border-collapse: collapse;
  width: 80%;
}

table, th, td {
  border: 1px solid black;
}

th, td {
  padding: 8px;
  text-align: center;
}
************************

