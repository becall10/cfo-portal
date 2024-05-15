// Attest.jsx

import React, { useState, useEffect } from 'react';

function Attest({ addSubmission }) {
    const [dataInterfaceDetails, setDataInterfaceDetails] = useState({
        dataSourceCode: '',
        processTrackId: '',
        description: '',
        batchDate: ''
    });
    const [comment, setComment] = useState('');
    const [noData, setNoData] = useState(false);
    const [forceComplete, setForceComplete] = useState(false);
    const [reprocess, setReprocess] = useState(false);
    const [attestation, setAttestation] = useState(false);

    // Function to generate random data for some fields
    const generateData = () => {
        const dataSourceCode = `DS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const processTrackId = `PT-${Math.floor(1000 + Math.random() * 9000)}`;
        const description = `Sample Description ${Math.floor(100 + Math.random() * 900)}`;
        const batchDate = new Date().toISOString().split('T')[0]; // Formats date to YYYY-MM-DD
        return { dataSourceCode, processTrackId, description, batchDate };
    };

    // Effect to auto-generate fields when component is triggered
    useEffect(() => {
        setDataInterfaceDetails(generateData());
    }, []); // Empty dependency array ensures this runs only once on mount

    const handleInputChange = (e) => {
        setDataInterfaceDetails({
            ...dataInterfaceDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newSubmission = {
            ...dataInterfaceDetails,
            comment,
            noData,
            forceComplete,
            reprocess,
            attestation
        };
        addSubmission(newSubmission);
        // Optionally reset form here if needed
    };

    return (
        <div>
            <h2>Submit Your Data</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Data Source Code:
                    <input type="text" name="dataSourceCode" value={dataInterfaceDetails.dataSourceCode} onChange={handleInputChange} />
                </label>
                <label>
                    Process Track ID:
                    <input type="text" name="processTrackId" value={dataInterfaceDetails.processTrackId} onChange={handleInputChange} />
                </label>
                <label>
                    Description:
                    <input type="text" name="description" value={dataInterfaceDetails.description} onChange={handleInputChange} />
                </label>
                <label>
                    Batch Date:
                    <input type="date" name="batchDate" value={dataInterfaceDetails.batchDate} onChange={handleInputChange} />
                </label>
                <label>
                    Comment:
                    <textarea name="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                </label>
                <label>
                    No Data:
                    <input type="checkbox" name="noData" checked={noData} onChange={(e) => setNoData(e.target.checked)} />
                </label>
                <label>
                    Force Complete:
                    <input type="checkbox" name="forceComplete" checked={forceComplete} onChange={(e) => setForceComplete(e.target.checked)} />
                </label>
                <label>
                    Reprocess:
                    <input type="checkbox" name="reprocess" checked={reprocess} onChange={(e) => setReprocess(e.target.checked)} />
                </label>
                <label>
                    Attestation:
                    <input type="checkbox" name="attestation" checked={attestation} onChange={(e) => setAttestation(e.target.checked)} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Attest;
