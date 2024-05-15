// Attest.jsx
import React, { useState } from 'react';

function Attest() {
    const [dataSourceCode, setDataSourceCode] = useState('');
    const [comment, setComment] = useState('');
    const [submissions, setSubmissions] = useState([]);
    const [filter, setFilter] = useState('');
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newSubmission = {
            dataSourceCode,
            comment,
            id: submissions.length + 1  // Simple ID based on array length
        };
        setSubmissions([...submissions, newSubmission]);
        setDataSourceCode('');
        setComment('');
    };

    const handleSearch = (event) => {
        const searchQuery = event.target.value;
        setFilter(searchQuery);
        if (searchQuery) {
            const filtered = submissions.filter(submission =>
                submission.dataSourceCode.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredSubmissions(filtered);
        } else {
            setFilteredSubmissions([]);
        }
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
            <div>
                <h3>Search Submissions by Data Source Code:</h3>
                <input
                    type="text"
                    value={filter}
                    onChange={handleSearch}
                    placeholder="Filter by Data Source Code"
                />
                <ul>
                    {filteredSubmissions.map(sub => (
                        <li key={sub.id}>{sub.dataSourceCode} - {sub.comment}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Attest;
