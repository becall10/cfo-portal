// SearchComponent.jsx

import React, { useState } from 'react';
import './SearchComponent.css'; // Ensure the CSS is linked for styling

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
    const [errors, setErrors] = useState({});

    const validateInputs = () => {
        let isValid = true;
        let newErrors = {};

        // Example validation: Ensure dates are correctly formatted if not empty
        if (filters.batchDate && isNaN(Date.parse(filters.batchDate))) {
            isValid = false;
            newErrors.batchDate = 'Invalid date format.';
        }

        // Add other validation checks as needed

        setErrors(newErrors);
        return isValid;
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value
        }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' })); // Clear errors on change
    };

    const handleSearch = () => {
        if (!validateInputs()) {
            return; // Stop the search if inputs are invalid
        }

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
                {/* Form fields here, including error messages */}
                <input
                    type="text"
                    name="batchDate"
                    value={filters.batchDate}
                    onChange={handleInputChange}
                    placeholder="Batch Date (YYYY-MM-DD)"
                />
                {errors.batchDate && <div className="error">{errors.batchDate}</div>}
                {/* Other inputs and error messages */}
            </div>
            <button onClick={handleSearch}>Search</button>
            {filteredSubmissions.length > 0 ? (
                <table>{/* Table structure */}</table>
            ) : (
                <div>There is no data. Please try with new search criteria.</div>
            )}
        </div>
    );
}

export default SearchComponent;
