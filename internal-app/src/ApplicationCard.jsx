import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Report = () => {
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState(null); // 'original', 'new', 'compare', or null
  const [uploadComplete, setUploadComplete] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const requiredColumns = [
    'Snow Control',
    'Purpose',
    'Nature',
    'MS Control',
    'Name',
    'Description',
    'Control Owner',
    'Key',
    'Frequency',
    'Related Compliance Areas',
    'Created Date',
    'TOD Status',
    'TOD Completion Date',
    'TOD Result',
    'TOE Status',
    'TOE Completion Date',
    'TOE Result',
    'Matched',
    'Rollup',
    'Testing Partner',
    'BCM Partner',
    'Overall Status',
    'Comments',
    'Scheduled Testing Completion Date',
    'ICFR Control',
    'Issue Assigned',
    'Compensating Controls Mitigating Factors'
  ];

  const columnMappings = {
    SnowControl: 2,
    TODCompletionDate: 5,
    TOECompletionDate: 5,
    TODResult: 6,
    TOEResult: 7,
    ControlOwner: 9,
    Key: 11,
    RelatedComplianceAreas: 12
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setData(json);
      setUploadComplete(true);
      setViewMode(null);
      setEmailSent(false);
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleDownload = () => {
    const updatedData = data.slice(1).map(row => {
      const newRow = {};
      requiredColumns.forEach(col => {
        if (columnMappings[col.replace(/\s/g, '')] !== undefined) {
          newRow[col] = row[columnMappings[col.replace(/\s/g, '')]] || '';
        } else {
          newRow[col] = '';
        }
      });
      return newRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(updatedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'FilteredData');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'filtered_data.xlsx');
  };

  const handleSendEmail = () => {
    setEmailSent(true);
    setData([]);
    setUploadComplete(false);
    setViewMode(null);
  };

  const handleClose = () => {
    setData([]);
    setUploadComplete(false);
    setViewMode(null);
    setEmailSent(false);
  };

  const renderTable = (data, columns) => (
    <div style={{ overflowX: 'auto' }}>
      <table>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{row[colIndex]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderContent = () => {
    if (emailSent) {
      return <p>Email has been sent.</p>;
    } else if (viewMode === 'original') {
      return renderTable(data.slice(1), data[0]);
    } else if (viewMode === 'new') {
      const newData = data.slice(1).map(row => {
        const newRow = requiredColumns.map(col => {
          if (columnMappings[col.replace(/\s/g, '')] !== undefined) {
            return row[columnMappings[col.replace(/\s/g, '')]] || '';
          } else {
            return '';
          }
        });
        return newRow;
      });
      return renderTable(newData, requiredColumns);
    } else if (viewMode === 'compare') {
      const newData = data.slice(1).map(row => {
        const newRow = requiredColumns.map(col => {
          if (columnMappings[col.replace(/\s/g, '')] !== undefined) {
            return row[columnMappings[col.replace(/\s/g, '')]] || '';
          } else {
            return '';
          }
        });
        return newRow;
      });
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
          <div style={{ width: '48%', overflowX: 'auto' }}>
            <h2>Original File</h2>
            {renderTable(data.slice(1), data[0])}
          </div>
          <div style={{ width: '48%', overflowX: 'auto' }}>
            <h2>New File</h2>
            {renderTable(newData, requiredColumns)}
          </div>
        </div>
      );
    } else {
      return <p>The file upload is complete and the new file has been generated.</p>;
    }
  };

  return (
    <div>
      <h1>Upload Report</h1>
      <div {...getRootProps()} style={{ border: '2px dashed #007bff', padding: '20px', textAlign: 'center' }}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop an Excel file here, or click to select one</p>
      </div>
      {uploadComplete && (
        <div>
          <button onClick={handleClose} style={{ margin: '10px', padding: '5px 10px', cursor: 'pointer' }}>
            Close
          </button>
          <button onClick={() => setViewMode('original')} style={{ margin: '10px', padding: '5px 10px', cursor: 'pointer' }}>
            View Original File
          </button>
          <button onClick={() => setViewMode('new')} style={{ margin: '10px', padding: '5px 10px', cursor: 'pointer' }}>
            View New File
          </button>
          <button onClick={() => setViewMode('compare')} style={{ margin: '10px', padding: '5px 10px', cursor: 'pointer' }}>
            Compare Files
          </button>
          <button onClick={handleDownload} style={{ margin: '10px', padding: '5px 10px', cursor: 'pointer' }}>
            Download Generated Data
          </button>
          <button onClick={handleSendEmail} style={{ margin: '10px', padding: '5px 10px', cursor: 'pointer' }}>
            Send Email
          </button>
          {renderContent()}
        </div>
      )}
      {emailSent && <p>Email has been sent.</p>}
    </div>
  );
};

export default Report;
