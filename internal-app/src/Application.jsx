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
  TimeScale
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

  // Function to fetch data (simulating real-time updates)
  const fetchData = async () => {
    const response = await axios.get('/api/data'); // Ensure the URL matches the namespace
    setData(response.data);
  };

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Set interval to fetch data every 5 seconds
    const interval = setInterval(fetchData, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: data.map((item) => item.timestamp),
    datasets: [
      {
        label: 'Real-time Data',
        data: data.map((item) => item.value),
        borderColor: 'rgba(75,192,192,1)',
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
    </div>
  );
};

export default Dashboard;
