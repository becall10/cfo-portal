import React, { useState } from 'react';

function Form({ addEntry }) {
    const [dataSourceCode, setDataSourceCode] = useState('');
    const [processTrackId, setProcessTrackId] = useState('');
    const [description, setDescription] = useState('');
    const [batchDate, setBatchDate] = useState('');
    const [comment, setComment] = useState('');
    const [attest, setAttest] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;  // Stop the form submission if validation fails
        }

        const newEntry = {
            dataSourceCode,
            processTrackId: Number(processTrackId),
            Description: description,
            "Batch Date": batchDate,
            Comment: comment,
            Attest: attest
        };

        if (typeof addEntry === "function") {
            addEntry(newEntry);
            resetForm();
        } else {
            console.error('addEntry is not a function', { addEntry });
        }
    };

    const resetForm = () => {
        setDataSourceCode('');
        setProcessTrackId('');
        setDescription('');
        setBatchDate('');
        setComment('');
        setAttest(false);
    };

    const validateForm = () => {
        let isValid = true;
        let newErrors = {};

        if (!dataSourceCode) {
            isValid = false;
            newErrors['dataSourceCode'] = 'Data Source Code is required.';
        }
        if (!processTrackId) {
            isValid = false;
            newErrors['processTrackId'] = 'Process Track ID is required.';
        }
        if (!description) {
            isValid = false;
            newErrors['description'] = 'Description is required.';
        }
        if (!batchDate) {
            isValid = false;
            newErrors['batchDate'] = 'Batch Date is required.';
        }
        if (!comment) {
            isValid = false;
            newErrors['comment'] = 'Comment is required.';
        }

        setErrors(newErrors);
        return isValid;
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={dataSourceCode}
                onChange={(e) => setDataSourceCode(e.target.value)}
                placeholder="Data Source Code"
            />
            {errors.dataSourceCode && <p>{errors.dataSourceCode}</p>}

            <input 
                type="number"
                value={processTrackId}
                onChange={(e) => setProcessTrackId(e.target.value)}
                placeholder="Process Track ID"
            />
            {errors.processTrackId && <p>{errors.processTrackId}</p>}

            <input 
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            {errors.description && <p>{errors.description}</p>}

            <input 
                type="date"
                value={batchDate}
                onChange={(e) => setBatchDate(e.target.value)}
                placeholder="Batch Date"
            />
            {errors.batchDate && <p>{errors.batchDate}</p>}

            <input 
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comment"
            />
            {errors.comment && <p>{errors.comment}</p>}

            <label>
                Attest:
                <input 
                    type="checkbox"
                    checked={attest}
                    onChange={(e) => setAttest(e.target.checked)}
                />
            </label>

            <button type="submit">Add Entry</button>
        </form>
    );
}

export default Form;
