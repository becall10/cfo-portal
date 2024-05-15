import React from 'react';
import { useForm } from 'react-hook-form';

function Form({ addEntry }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        addEntry({
            ...data,
            processTrackId: Number(data.processTrackId), // Convert processTrackId to number
            Attest: data.Attest || false // Ensure boolean value
        });
        reset(); // Reset the form fields after submission
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input 
                {...register("dataSourceCode", { required: true })}
                placeholder="Data Source Code"
            />
            {errors.dataSourceCode && <p>Data Source Code is required.</p>}

            <input 
                type="number"
                {...register("processTrackId", { required: true })}
                placeholder="Process Track ID"
            />
            {errors.processTrackId && <p>Process Track ID is required.</p>}

            <input 
                {...register("Description", { required: true })}
                placeholder="Description"
            />
            {errors.Description && <p>Description is required.</p>}

            <input 
                type="date"
                {...register("Batch Date", { required: true })}
                placeholder="Batch Date"
            />
            {errors["Batch Date"] && <p>Batch Date is required.</p>}

            <input 
                {...register("Comment", { required: true })}
                placeholder="Comment"
            />
            {errors.Comment && <p>Comment is required.</p>}

            <label>
                Attest:
                <input 
                    type="checkbox"
                    {...register("Attest")}
                />
            </label>

            <button type="submit">Add Entry</button>
        </form>
    );
}

export default Form;
-----------------------
    import React, { useState } from 'react';
import Form from './Form'; // Adjust the path as necessary

function DataStorageApp() {
    const [entries, setEntries] = useState([]);

    const addEntry = (newEntry) => {
        setEntries(prevEntries => [...prevEntries, newEntry]);
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

