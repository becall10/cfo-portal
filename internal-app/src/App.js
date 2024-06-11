import React, { useState } from 'react';

const ClientUpdate = () => {
  const [udaCatalogId, setUdaCatalogId] = useState('');
  const [status, setStatus] = useState('');
  const [directReport, setDirectReport] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted with:', {
      udaCatalogId,
      status,
      directReport,
    });
  };

  return (
    <div>
      <h1>Client Update</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            UDA Catalog Id:
            <input
              type="text"
              value={udaCatalogId}
              onChange={(e) => setUdaCatalogId(e.target.value)}
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ClientUpdate;
