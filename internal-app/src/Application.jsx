// SearchComponent.jsx

import React, { useState } from 'react';

function SearchComponent({ submissions }) {
    const [filters, setFilters] = useState({
        dataSourceCode: '',
        processTrackId: '',
        description: '',
        comment: '',
        noData: false,
        forceComplete: false,
        reprocess: false,
        attestation: false,
        startDate: '',
        endDate: ''
    });

    const [filteredSubmissions, setFilteredSubmissions] = useState([]);
    const [errorMessage, setErrorMessage] = useState(''); // State for storing the error message

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value
        }));
        setErrorMessage(''); // Clear error message on any input change
    };

    const handleSearch = () => {
        // Check if all text and date fields are empty and no checkboxes are true
        if (
            !filters.dataSourceCode &&
            !filters.processTrackId &&
            !filters.description &&
            !filters.comment &&
            !filters.startDate &&
            !filters.endDate &&
            !filters.noData &&
            !filters.forceComplete &&
            !filters.reprocess &&
            !filters.attestation
        ) {
            setErrorMessage("Please select at least one field.");
            return;
        }

        // Filter submissions based on the criteria
        const results = submissions.filter(submission => {
            const submissionDate = submission.batchDate ? new Date(submission.batchDate) : null;
            const startDate = filters.startDate ? new Date(filters.startDate) : null;
            const endDate = filters.endDate ? new Date(filters.endDate) : new Date();

            return (
                (!startDate || !submissionDate || submissionDate >= startDate) &&
                (!endDate || !submissionDate || submissionDate <= endDate) &&
                Object.keys(filters).every(key => {
                    if (['startDate', 'endDate'].includes(key)) {
                        return true; // Skip date range keys in the normal filtering logic
                    }
                    if (typeof filters[key] === 'boolean') {
                        if (filters[key]) return submission[key] === filters[key];
                        return true; // If the checkbox is false, do not filter out items based on this field.
                    }
                    if (submission[key]) {
                        return submission[key].toLowerCase().includes(filters[key].toLowerCase());
                    }
                    return true;
                })
            );
        });

        setFilteredSubmissions(results);
        if (results.length === 0) {
            setErrorMessage('No results found for the selected criteria.');
        } else {
            setErrorMessage(''); // Clear any error messages if results are found
        }
    };

    return (
        <div>
            <h3>Advanced Search</h3>
            <div>
                <input type="text" name="dataSourceCode" value={filters.dataSourceCode} onChange={handleInputChange} placeholder="Data Source Code" />
                <input type="text" name="processTrackId" value={filters.processTrackId} onChange={handleInputChange} placeholder="Process Track ID" />
                <input type="text" name="description" value={filters.description} onChange={handleInputChange} placeholder="Description" />
                <input type="text" name="comment" value={filters.comment} onChange={handleInputChange} placeholder="Comment" />
                <input type="checkbox" name="noData" checked={filters.noData} onChange={handleInputChange} /> No Data
                <input type="checkbox" name="forceComplete" checked={filters.forceComplete} onChange={handleInputChange} /> Force Complete
                <input type="checkbox" name="reprocess" checked={filters.reprocess} onChange={handleInputChange} /> Reprocess
                <input type="checkbox" name="attestation" checked={filters.attestation} onChange={handleInputChange} /> Attestation
                <input type="date" name="startDate" value={filters.startDate} onChange={handleInputChange} placeholder="Start Date" />
                <input type="date" name="endDate" value={filters.endDate} onChange={handleInputChange} placeholder="End Date" />
                <button onClick={handleSearch}>Search</button>
                {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
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
