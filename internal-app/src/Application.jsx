
// SearchComponent.jsx

import React, { useState } from 'react';

function SearchComponent({ submissions }) {
    const [filter, setFilter] = useState('');
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const handleSearch = () => {
        const filtered = submissions.filter(submission =>
            submission.dataSourceCode.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredSubmissions(filtered);
        setShowResults(true);  // Update to show results only after search is clicked
    };

    const handleChange = (event) => {
        setFilter(event.target.value);
        setShowResults(false);  // Reset results visibility when changing filter
    };

    return (
        <div>
            <h3>Search by Data Source Code</h3>
            <input
                type="text"
                value={filter}
                onChange={handleChange}
                placeholder="Enter Data Source Code"
            />
            <button onClick={handleSearch}>Search</button>
            {showResults && (
                <ul>
                    {filteredSubmissions.length > 0 ? (
                        filteredSubmissions.map(sub => (
                            <li key={sub.id}>
                                {sub.dataSourceCode} - {sub.comment}
                            </li>
                        ))
                    ) : (
                        <li>No results found.</li>
                    )}
                </ul>
            )}
        </div>
    );
}

export default SearchComponent;
