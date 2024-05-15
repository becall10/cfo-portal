/* SearchComponent.css */

table {
    width: 100%; /* Full-width table */
    border-collapse: collapse; /* Collapses the border */
    margin-top: 20px; /* Space above the table */
}

th, td {
    border: 1px solid #ccc; /* Grey border for readability */
    padding: 8px; /* Padding inside cells */
    text-align: left; /* Align text to the left */
}

thead {
    background-color: #f2f2f2; /* Light grey background for the header */
}

tr:nth-child(even) {
    background-color: #f9f9f9; /* Zebra striping for rows */
}


**************
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
                <input type="text" name="dataSourceCode" value={filters.dataSourceCode} onChange={handleInputChange} placeholder="Data Source Code" />
                <input type="text" name="processTrackId" value={filters.processTrackId} onChange={handleInputChange} placeholder="Process Track ID" />
                <input type="text" name="description" value={filters.description} onChange={handleInputChange} placeholder="Description" />
                <input type="date" name="batchDate" value={filters.batchDate} onChange={handleInputChange} />
                <input type="text" name="comment" value={filters.comment} onChange={handleInputChange} placeholder="Comment" />
                <input type="checkbox" name="noData" checked={filters.noData} onChange={handleInputChange} /> No Data
                <input type="checkbox" name="forceComplete" checked={filters.forceComplete} onChange={handleInputChange} /> Force Complete
                <input type="checkbox" name="reprocess" checked={filters.reprocess} onChange={handleInputChange} /> Reprocess
                <input type="checkbox" name="attestation" checked={filters.attestation} onChange={handleInputChange} /> Attestation
                <button onClick={handleSearch}>Search</button>
            </div>
            {filteredSubmissions.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Data Source Code</th>
                            <th>Process Track ID</th>
                            <th>Description</th>
                            <th>Batch Date</th>
                            <th>Comment</th>
                            <th>No Data</th>
                            <th>Force Complete</th>
                            <th>Reprocess</th>
                            <th>Attestation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubmissions.map((sub, index) => (
                            <tr key={index}>
                                <td>{sub.dataSourceCode}</td>
                                <td>{sub.processTrackId}</td>
                                <td>{sub.description}</td>
                                <td>{sub.batchDate}</td>
                                <td>{sub.comment}</td>
                                <td>{sub.noData ? 'Yes' : 'No'}</td>
                                <td>{sub.forceComplete ? 'Yes' : 'No'}</td>
                                <td>{sub.reprocess ? 'Yes' : 'No'}</td>
                                <td>{sub.attestation ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default SearchComponent;

