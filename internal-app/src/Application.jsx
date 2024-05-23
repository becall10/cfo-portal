// src/mockServer.js
import { createServer } from 'miragejs';

const generateData = () => {
  const now = new Date();
  let data = [];
  for (let i = 0; i < 12; i++) {
    data.push({
      timestamp: new Date(now.getTime() + i * 5000).toISOString(),
      SourceSystemBalance: Math.floor(Math.random() * 1000),
      OfsaaRawBalance: Math.floor(Math.random() * 1000) + 1000,
    });
  }
  return data;
};

let data = generateData();

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/data', () => {
      return data.shift();
    });
  },
});
**********************

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
    </div>
  );
};

export default Dashboard;
**************************

