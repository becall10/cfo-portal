import React, { useState } from 'react';

const ClientUpdate = () => {
  const [category, setCategory] = useState('');
  const [directReport, setDirectReport] = useState('');
  const [manager, setManager] = useState('');
  const [employee, setEmployee] = useState('');
  const [id, setId] = useState('');
  const [nameDescription, setNameDescription] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted with:', {
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
      setMessage('The update has been validated and the report has been updated.');
    }, 3000);
  };

  return (
    <div>
      <h1>Client Update</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Category:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Direct Report:
            <input
              type="text"
              value={directReport}
              onChange={(e) => setDirectReport(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Manager:
            <input
              type="text"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Employee:
            <input
              type="text"
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            ID:
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Name/Description:
            <input
              type="text"
              value={nameDescription}
              onChange={(e) => setNameDescription(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Status:
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ClientUpdate;
