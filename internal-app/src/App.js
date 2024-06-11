import React, { useState } from 'react';

const SearchComponent = () => {
  const [category, setCategory] = useState('');
  const [directReport, setDirectReport] = useState('');
  const [manager, setManager] = useState('');
  const [employee, setEmployee] = useState('');
  const [id, setId] = useState('');
  const [nameDescription, setNameDescription] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category || !id) {
      setError('Category and ID are mandatory fields.');
      return;
    }

    // Handle search logic here
    console.log('Search initiated with:', {
      category,
      directReport,
      manager,
      employee,
      id,
      nameDescription,
      status,
    });

    // Display a message after 3 seconds
    setTimeout(() => {
      setMessage('The search has been completed.');
      setError('');
    }, 3000);
  };

  const clearMessage = () => {
    setMessage('');
    setError('');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Search Component</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Category (mandatory):
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onFocus={clearMessage}
              style={styles.input}
              required
            />
          </label>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Direct Report:
            <input
              type="text"
              value={directReport}
              onChange={(e) => setDirectReport(e.target.value)}
              onFocus={clearMessage}
              style={styles.input}
            />
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
            ID (mandatory):
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              onFocus={clearMessage}
              style={styles.input}
              required
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
        <button type="submit" style={styles.button}>Submit</button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
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
  error: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '4px',
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
