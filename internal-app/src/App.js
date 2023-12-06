import React, { useState, useEffect } from "react";

import ApplicationCard from "./ApplicationCard";
import SearchIcon from "./search.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Home from './Home';
import Application from './Application';
import Contact from './Contact';


const API_URL = "http://www.omdbapi.com?apikey=b88a1e25";

const App = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [applications, setapplications] = useState([]);

  useEffect(() => {
    searchapplications("Batman");
  }, []);

  const searchapplications = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setapplications(data.Search);
  };

  return (
    <div className="app">
      <h1>CFO PORTAL</h1>
      <Router>
      <div className='navBar'>
        <NavigationBar />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/apps" element={<Application />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for applications"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchapplications(searchTerm)}
        />
      </div>

      {applications?.length > 0 ? (
        <div className="container">
          {applications.map((application) => (
            <ApplicationCard application={application} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No applications found</h2>
        </div>
      )}
    </div>
  );
};

export default App;