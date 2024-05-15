import React, { useState } from 'react';

function Form({ addEntry }) {
    // State for each form input
    const [dataSourceCode, setDataSourceCode] = useState('');
    const [processTrackId, setProcessTrackId] = useState('');
    const [description, setDescription] = useState('');
    const [batchDate, setBatchDate] = useState('');
    const [comment, setComment] = useState('');
    const [attest, setAttest] = useState(false);

    // State for storing any form validation errors
    const [errors, setErrors] = useState({});

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission action

        // Validate form inputs
        if (!validateForm()) {
            return; // Stop the submission if the validation fails
        }

        // Prepare data for the parent component
        const newEntry = {
            dataSourceCode,
            processTrackId: Number(processTrackId),
            Description: description,
            "Batch Date": batchDate,
            Comment: comment,
            Attest: attest
        };

        // Use the addEntry function from props
        addEntry(newEntry);

        // Reset form fields
        setDataSourceCode('');
        setProcessTrackId('');
        setDescription('');
        setBatchDate('');
        setComment('');
        setAttest(false);
    };

    // Validate the form inputs and update the errors state
    const validateForm = () => {
        let isValid = true;
        let errors = {};

        if (!dataSourceCode) {
            isValid = false;
            errors['dataSourceCode'] = 'Data Source Code is required.';
        }
        if (!processTrackId) {
            isValid = false;
            errors['processTrackId'] = 'Process Track ID is required.';
        }
        if (!description) {
            isValid = false;
            errors['description'] = 'Description is required.';
        }
        if (!batchDate) {
            isValid = false;
            errors['batchDate'] = 'Batch Date is required.';
        }
        if (!comment) {
            isValid = false;
            errors['comment'] = 'Comment is required.';
        }

        setErrors(errors);
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
