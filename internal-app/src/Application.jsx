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
            id: Math.random().toString(36).substr(2, 9)  // Create a unique ID
        };
        addSubmission(newSubmission);  // Adding the submission to a shared state or context
        setDataSourceCode('');
        setComment('');
    };

    return (
        <div>
            <h2>Attest Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="dataSourceCode">Data Source Code:</label>
                    <input
                        type="text"
                        id="dataSourceCode"
                        value={dataSourceCode}
                        onChange={(e) => setDataSourceCode(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="comment">Comment:</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Attest;
***********
    // SearchComponent.jsx

import React, { useState, useEffect } from 'react';

function SearchComponent({ submissions }) {
    const [filter, setFilter] = useState('');
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);

    useEffect(() => {
        // This effect runs whenever the filter value or the submissions array changes.
        const filtered = submissions.filter(submission =>
            submission.dataSourceCode.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredSubmissions(filtered);
    }, [filter, submissions]); // Dependencies on filter and submissions.

    const handleSearch = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                value={filter}
                onChange={handleSearch}
                placeholder="Filter by Data Source Code"
            />
            {filteredSubmissions.length > 0 ? (
                <ul>
                    {filteredSubmissions.map(sub => (
                        <li key={sub.id}>{sub.dataSourceCode} - {sub.comment}</li>
                    ))}
                </ul>
            ) : (
                <div>No results found.</div>
            )}
        </div>
    );
}

export default SearchComponent;
**************
    // App.js

import React, { useState } from 'react';
import Attest from './Attest';
import SearchComponent from './SearchComponent';

function App() {
    const [submissions, setSubmissions] = useState([]);

    const addSubmission = (submission) => {
        setSubmissions([...submissions, submission]);
    };

    return (
        <div>
            <Attest addSubmission={addSubmission} />
            <SearchComponent submissions={submissions} />
        </div>
    );
}

export default App;
