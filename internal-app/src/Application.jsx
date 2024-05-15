// Attest.jsx

import React, { useState } from 'react';

function Attest({ addSubmission }) {
    const [dataSourceCode, setDataSourceCode] = useState('');
    const [processTrackId, setProcessTrackId] = useState('');
    const [description, setDescription] = useState('');
    const [batchDate, setBatchDate] = useState('');
    const [comment, setComment] = useState('');
    const [noData, setNoData] = useState(false);
    const [forceComplete, setForceComplete] = useState(false);
    const [reprocess, setReprocess] = useState(false);
    const [attestation, setAttestation] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newSubmission = {
            dataSourceCode,
            processTrackId,
            description,
            batchDate,
            comment,
            noData,
            forceComplete,
            reprocess,
            attestation
        };
        addSubmission(newSubmission);
        // Reset form after submission
        setDataSourceCode('');
        setProcessTrackId('');
        setDescription('');
        setBatchDate('');
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
                <div>
                    <label>
                        Data Source Code:
                        <input type="text" value={dataSourceCode} onChange={e => setDataSourceCode(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Process Track ID:
                        <input type="text" value={processTrackId} onChange={e => setProcessTrackId(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                        <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Batch Date:
                        <input type="date" value={batchDate} onChange={e => setBatchDate(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Comment:
                        <textarea value={comment} onChange={e => setComment(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        No Data:
                        <input type="checkbox" checked={noData} onChange={e => setNoData(e.target.checked)} />
                    </label>
                </div>
                <div>
                    <label>
                        Force Complete:
                        <input type="checkbox" checked={forceComplete} onChange={e => setForceComplete(e.target.checked)} />
                    </label>
                </div>
                <div>
                    <label>
                        Reprocess:
                        <input type="checkbox" checked={reprocess} onChange={e => setReprocess(e.target.checked)} />
                    </label>
                </div>
                <div>
                    <label>
                        Attestation:
                        <input type="checkbox" checked={attestation} onChange={e => setAttestation(e.target.checked)} />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Attest;
