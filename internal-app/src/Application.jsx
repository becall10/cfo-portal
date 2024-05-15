// Attest.jsx

import React, { useState } from 'react';

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

    const handleInputChange = (e) => {
        setDataInterfaceDetails({
            ...dataInterfaceDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newSubmission = {
            dataInterfaceDetails,
            comment,
            noData,
            forceComplete,
            reprocess,
            attestation
        };
        addSubmission(newSubmission);
        // Reset form after submission
        setDataInterfaceDetails({
            dataSourceCode: '',
            processTrackId: '',
            description: '',
            batchDate: ''
        });
        setComment('');
        setNoData(false);
        setForceComplete(false);
        setReprocess(false);
        setAttestation(false);
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
                    <input type="text" name="batchDate" value={dataInterfaceDetails.batchDate} onChange={handleInputChange} />
                </label>
                <label>
                    Comment:
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                </label>
                <label>
                    No Data:
                    <input type="checkbox" checked={noData} onChange={(e) => setNoData(e.target.checked)} />
                </label>
                <label>
                    Force Complete:
                    <input type="checkbox" checked={forceComplete} onChange={(e) => setForceComplete(e.target.checked)} />
                </label>
                <label>
                    Reprocess:
                    <input type="checkbox" checked={reprocess} onChange={(e) => setReprocess(e.target.checked)} />
                </label>
                <label>
                    Attestation:
                    <input type="checkbox" checked={attestation} onChange={(e) => setAttestation(e.target.checked)} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Attest;
