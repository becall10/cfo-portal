// SearchComponent.jsx

import React, { useState } from 'react';

function SearchComponent({ submissions }) {
    const [filters, setFilters] = useState({
        dataSourceCode: '',
        processTrackId: '',
        description: '',
        batchDate: '',
        comment: '',
        noData: false,
        forceComplete: false,
        reprocess: false,
        attestation: false
    });

    const [filteredSubmissions, setFilteredSubmissions] = useState([]);

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSearch = () => {
        setFilteredSubmissions(submissions.filter(submission => {
            return Object.keys(filters).every(key => {
                if (typeof filters[key] === 'boolean') {
                    return filters[key] === submission[key];
                }
                return submission[key].toLowerCase().includes(filters[key].toLowerCase());
            });
        }));
    };

    return (
        <div>
            <h3>Advanced Search</h3>
            <div>
                <label>
                    Data Source Code:
                    <input
                        type="text"
                        name="dataSourceCode"
                        value={filters.dataSourceCode}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Process Track ID:
                    <input
                        type="text"
                        name="processTrackId"
                        value={filters.processTrackId}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={filters.description}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Batch Date:
                    <input
                        type="date"
                        name="batchDate"
                        value={filters.batchDate}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Comment:
                    <input
                        type="text"
                        name="comment"
                        value={filters.comment}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    No Data:
                    <input
                        type="checkbox"
                        name="noData"
                        checked={filters.noData}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Force Complete:
                    <input
                        type="checkbox"
                        name="forceComplete"
                        checked={filters.forceComplete}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Reprocess:
                    <input
                        type="checkbox"
                        name="reprocess"
                        checked={filters.reprocess}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Attestation:
                    <input
                        type="checkbox"
                        name="attestation"
                        checked={filters.attestation}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <button onClick={handleSearch}>Search</button>
            <ul>
                {filteredSubmissions.map(sub => (
                    <li key={sub.id}>
                        {sub.dataSourceCode}, {sub.processTrackId}, {sub.description}, {sub.batchDate}, {sub.comment}, 
                        {sub.noData ? 'No Data' : ''}, {sub.forceComplete ? 'Force Complete' : ''}, 
                        {sub.reprocess ? 'Reprocess' : ''}, {sub.attestation ? 'Attestation' : ''}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchComponent;
