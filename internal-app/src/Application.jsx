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
    const [searchPerformed, setSearchPerformed] = useState(false);  // Tracks if a search has been executed

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSearch = () => {
        setSearchPerformed(true);  // Update to indicate that a search has been performed
        const results = submissions.filter(submission => {
            return Object.keys(filters).every(key => {
                if (typeof filters[key] === 'boolean') {
                    return filters[key] === submission[key];
                }
                return submission[key].toLowerCase().includes(filters[key].toLowerCase());
            });
        });
        setFilteredSubmissions(results);
    };

    return (
        <div>
            <h3>Advanced Search</h3>
            <div>
                {/* Form inputs as previously defined */}
                <button onClick={handleSearch}>Search</button>
            </div>
            {searchPerformed ? (
                filteredSubmissions.length > 0 ? (
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
                ) : (
                    <div>There are no results matching your criteria. Please adjust your search and try again.</div>
                )
            ) : null}
        </div>
    );
}

export default SearchComponent;
