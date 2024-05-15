import React, { useState } from 'react';

function Form({ addEntry }) {
    const [dataSourceCode, setDataSourceCode] = useState('');
    const [processTrackId, setProcessTrackId] = useState('');
    const [description, setDescription] = useState('');
    const [batchDate, setBatchDate] = useState('');
    const [comment, setComment] = useState('');
    const [attest, setAttest] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page
        addEntry({
            dataSourceCode,
            processTrackId: Number(processTrackId), // Convert to number
            Description: description,
            "Batch Date": batchDate,
            Comment: comment,
            Attest: attest
        });
        // Reset form fields
        setDataSourceCode('');
        setProcessTrackId('');
        setDescription('');
        setBatchDate('');
        setComment('');
        setAttest(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={dataSourceCode}
                onChange={(e) => setDataSourceCode(e.target.value)}
                placeholder="Data Source Code"
            />
            <input 
                type="number"
                value={processTrackId}
                onChange={(e) => setProcessTrackId(e.target.value)}
                placeholder="Process Track ID"
            />
            <input 
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            <input 
                type="date"
                value={batchDate}
                onChange={(e) => setBatchDate(e.target.value)}
                placeholder="Batch Date"
            />
            <input 
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comment"
            />
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
***********

    import React, { useState } from 'react';
import Form from './Form'; // Make sure the path is correct based on your project structure

function DataStorageApp() {
    const [entries, setEntries] = useState([]);

    const addEntry = (newEntry) => {
        setEntries([...entries, newEntry]);
    };

    return (
        <div>
            <Form addEntry={addEntry} />
            <ul>
                {entries.map((entry, index) => (
                    <li key={index}>{JSON.stringify(entry)}</li>
                ))}
            </ul>
        </div>
    );
}

export default DataStorageApp;
