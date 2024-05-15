    // Check if addEntry is a function before calling it
        if (typeof addEntry === "function") {
            addEntry(newEntry);
            // Reset form fields
            setDataSourceCode('');
            setProcessTrackId('');
            setDescription('');
            setBatchDate('');
            setComment('');
            setAttest(false);
        } else {
            console.error('addEntry is not a function', { addEntry });
        }
    };
