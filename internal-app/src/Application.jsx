  <Routes>
                    <Route path="/" element={<h1>Welcome to the Submission and Search Application</h1>} exact />
                    <Route path="/attest" element={<Attest addSubmission={addSubmission} />} />
                    <Route path="/search" element={<SearchComponent submissions={submissions} />} />
                    <Route path="/history" element={<History />} />
                </Routes>// App.js








import React, { useState } from 'react';
import Attest from './Attest';
import SearchComponent from './SearchComponent';

function App() {
    const [submissions, setSubmissions] = useState([]);

    const addSubmission = (submission) => {
        setSubmissions([...submissions, submission]);
    };

    return (
        <div className="App">
            <h1>Submission and Search Application</h1>
            <Attest addSubmission={addSubmission} />
            <SearchComponent submissions={submissions} />
        </div>
    );
}

export default App;
*********
    // Attest.jsx

import React, { useState } from 'react';

function Attest({ addSubmission }) {
    const [dataSourceCode, setDataSourceCode] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newSubmission = {
            dataSourceCode,
            comment,
            id: Math.random().toString(36).substr(2, 9)  // Generate a unique ID
        };
        addSubmission(newSubmission);
        setDataSourceCode('');
        setComment('');
    };

    return (
        <div>
            <h2>Submit Your Data</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Data Source Code:
                    <input
                        type="text"
                        value={dataSourceCode}
                        onChange={(e) => setDataSourceCode(e.target.value)}
                    />
                </label>
                <label>
                    Comment:
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Attest;
*****
    // SearchComponent.jsx

import React, { useState, useEffect } from 'react';

function SearchComponent({ submissions }) {
    const [filter, setFilter] = useState('');
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);

    useEffect(() => {
        const filtered = submissions.filter(submission =>
            submission.dataSourceCode.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredSubmissions(filtered);
    }, [filter, submissions]);

    const handleSearch = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            <h3>Search by Data Source Code</h3>
            <input
                type="text"
                value={filter}
                onChange={handleSearch}
                placeholder="Enter Data Source Code"
            />
            <ul>
                {filteredSubmissions.map(sub => (
                    <li key={sub.id}>
                        {sub.dataSourceCode} - {sub.comment}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchComponent;
