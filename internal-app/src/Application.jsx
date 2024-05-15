// SearchComponent.jsx

import React, { useState } from 'react';
import './app.css'; // Ensure the CSS is linked for styling

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
    const [searchPerformed, setSearchPerformed] = useState(false); // Track if a search has been performed

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSearch = () => {
        const results = submissions.filter(submission => {
            return Object.keys(filters).every(key => {
                if (typeof filters[key] === 'boolean') {
                    return filters[key] === submission[key];
                }
                return submission[key].toLowerCase().includes(filters[key].toLowerCase());
            });
        });
        setFilteredSubmissions(results);
        setSearchPerformed(true); // Update state to indicate that a search has been performed
    };

    return (
        <div>
            <h3>Advanced Search</h3>
            <div>
                {/* Input fields and labels as previously defined */}
            </div>
            <button onClick={handleSearch}>Search</button>
            {searchPerformed && filteredSubmissions.length === 0 ? (
                <div className="search-feedback">
                    There are no results matching your criteria. Please adjust your search and try again.
                </div>
            ) : (
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
