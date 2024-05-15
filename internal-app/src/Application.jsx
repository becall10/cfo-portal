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

        const results = submissions.filter(submission => {
            const submissionDate = submission.batchDate ? new Date(submission.batchDate) : null;
            const startDate = filters.startDate ? new Date(filters.startDate) : null;
            const endDate = filters.endDate ? new Date(filters.endDate) : new Date();
            return (
                (!startDate || !submissionDate || submissionDate >= startDate) &&
                (!endDate || !submissionDate || submissionDate <= endDate) &&
                Object.keys(filters).every(key => {
                    if (['startDate', 'endDate'].includes(key)) {
                        return true;
                    }
                    if (typeof filters[key] === 'boolean') {
                        return filters[key] === submission[key];
                    }
                    return submission[key].toLowerCase().includes(filters[key].toLowerCase());
                })
            );
        });

        setFilteredSubmissions(results);
        if (results.length === 0) {
            setErrorMessage('No results found for the selected criteria.');
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
                    {/* Table headers and data rows */}
                </table>
            )}
        </div>
    );
}

export default SearchComponent;
