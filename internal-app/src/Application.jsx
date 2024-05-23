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
*****************

