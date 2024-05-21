// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const Dashboard = () => {
  const [data, setData] = useState([]);
  
  // Function to fetch data (simulating real-time updates)
  const fetchData = async () => {
    const response = await axios.get('https://api.example.com/data');
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

  return (
    <div>
      <h2>Real-time Dashboard</h2>
      <Line data={chartData} />
    </div>
  );
};

export default Dashboard;
************************************
  // src/mockServer.js
import { Server } from 'miragejs';

new Server({
  routes() {
    this.namespace = 'api';

    this.get('/data', () => {
      return [
        { timestamp: '2023-01-01T00:00:00Z', value: 10 },
        { timestamp: '2023-01-01T00:00:05Z', value: 20 },
        { timestamp: '2023-01-01T00:00:10Z', value: 30 },
        // Add more mock data points as needed
      ];
    });
  },
});
*******************************************
  // src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './mockServer'; // Import mock server

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*****************
// src/App.js
import React from 'react';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
};

export default App;
*****************
  /* src/index.css */
body {
  font-family: Arial, sans-serif;
}

.App {
  text-align: center;
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
}
******************
  // src/components/Dashboard.js (continued)
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
*******************************


