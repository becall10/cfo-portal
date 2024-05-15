// Attest.jsx

import React, { useState } from 'react';

function Attest() {
    const [dataSourceCode, setDataSourceCode] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle the submission logic here
        console.log('Data Source Code:', dataSourceCode);
        console.log('Comment:', comment);
        // Optionally clear form or handle next steps
    };

    return (
        <div>
            <h2>Attest Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="dataSourceCode">Data Source Code:</label>
                    <input
                        type="text"
                        id="dataSourceCode"
                        value={dataSourceCode}
                        onChange={(e) => setDataSourceCode(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="comment">Comment:</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Attest;
