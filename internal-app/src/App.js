import React, { useState, useEffect } from "react";

import ApplicationCard from "./ApplicationCard";
import SearchIcon from "./search.svg";
import "./App.css";

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
      <h1>My Applications</h1>

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