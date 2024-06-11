import React, { useState } from 'react';

const SearchComponent = () => {
  const [category, setCategory] = useState('');
  const [directReport, setDirectReport] = useState('');
  const [manager, setManager] = useState('');
  const [employee, setEmployee] = useState('');
  const [id, setId] = useState('');
  const [nameDescription, setNameDescription] = useState('');
  const [status, setStatus] = useState('');
  const [typeOfFile, setTypeOfFile] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle search logic here
    console.log('Search initiated with:', {
      category,
      directReport,
      manager,
      employee,
      id,
      nameDescription,
      status,
      typeOfFile,
    });

    // Display a message after 3 seconds
    setTimeout(() => {
      setMessage('The search has been completed.');
    }, 3000);
  };

  const clearMessage = () => {
    setMessage('');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Search Component</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onFocus={clearMessage}
              style={styles.input}
            >
              <option value="" disabled>Select a category</option>
              <option value="BARR Burndown Report">BARR Burndown Report</option>
              <option value="BCM Controls CFO">BCM Controls CFO</option>
              <option value="IM SUMMARY">IM SUMMARY</option>
              <option value="P&P Review">P&P Review</option>
              <option value="RCSA Gaps">RCSA Gaps</option>
              <option value="UDA Certs">UDA Certs</option>
            </select>
          </label>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Direct Report:
            <select
              value={directReport}
              onChange={(e) => setDirectReport(e.target.value)}
              onFocus={clearMessage}
              style={styles.input}
            >
              <option value="" disabled>Select a direct report</option>
              <option value="Falls, Shannon">Falls, Shannon</option>
              <option value="Polk, Christina">Polk, Christina</option>
              <option value="Weber, Brad">Weber, Brad</option>
              <option value="Garcia, Manuel">Garcia, Manuel</option>
              <option value="Rubio, Lizette G">Rubio, Lizette G</option>
              <option value="Monska, Doug P">Monska, Doug P</option>
              <option value="Palmer, Kemile">Palmer, Kemile</option>
              <option value="Woodward, Brian J">Woodward, Brian J</option>
              <option value="Patranella, Chris M">Patranella, Chris M</option>
              <option value="Repper, Michael">Repper, Michael</option>
            </select>
          </label>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Manager:
            <input
              type="text"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
              onFocus={clearMessage}
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Employee:
            <input
              type="text"
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
              onFocus={clearMessage}
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            ID:
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              onFocus={clearMessage}
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Name/Description:
            <input
              type="text"
              value={nameDescription}
              onChange={(e) => setNameDescription(e.target.value)}
              onFocus={clearMessage}
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Status:
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              onFocus={clearMessage}
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Type of File:
            <select
              value={typeOfFile}
              onChange={(e) => setTypeOfFile(e.target.value)}
              onFocus={clearMessage}
              style={styles.input}
            >
              <option value="" disabled>Select a file type</option>
              <option value="Original file">Original file</option>
              <option value="Generated File">Generated File</option>
            </select>
          </label>
        </div>
        <button type="submit" style={styles.button}>Submit</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#dff0d8',
    color: '#3c763d',
    borderRadius: '4px',
  },
};

export default SearchComponent;
