import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Report = () => {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [removedData, setRemovedData] = useState([]);
  const [addedData, setAddedData] = useState([]);
  const [nonKeyCount, setNonKeyCount] = useState(0);
  const [viewMode, setViewMode] = useState(null); // 'original', 'new', 'compare', 'master', 'nonKey', 'removed', 'added', or null
  const [uploadComplete, setUploadComplete] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [masterFileUploaded, setMasterFileUploaded] = useState(false);

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

  const dateColumns = ['As of Date', 'Actual Start Date', 'Actual End Date', 'Create Date'];

  const excelDateToJSDate = (serial) => {
    const utc_days = Math.floor(serial - 25569);
    const date_info = new Date(utc_days * 86400 * 1000);
    date_info.setUTCHours(0, 0, 0, 0); // Set to UTC midnight to avoid timezone issues
    return date_info;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getUTCDate()).padStart(2, '0');
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const year = String(d.getUTCFullYear()).substring(2);
    return `${month}/${day}/${year}`;
  };

  const processDateColumns = (json, header) => {
    dateColumns.forEach(dateColumn => {
      const dateIndex = header.indexOf(dateColumn);
      if (dateIndex !== -1) {
        json.forEach(row => {
          if (row[dateIndex] != null) {
            if (typeof row[dateIndex] === 'number') {
              row[dateIndex] = formatDate(excelDateToJSDate(row[dateIndex]));
            } else if (typeof row[dateIndex] === 'string') {
              const dateParts = row[dateIndex].split('/');
              if (dateParts.length === 3 && dateParts[2].length === 4) {
                row[dateIndex] = `${dateParts[0].padStart(2, '0')}/${dateParts[1].padStart(2, '0')}/${dateParts[2].substring(2)}`;
              }
            }
          }
        });
      }
    });
  };

  const onDrop = useCallback((acceptedFiles, isMaster = false) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const header = json[0];
      processDateColumns(json, header);

      console.log('New file data:', json); // Debugging step

      if (isMaster) {
        setMasterData(json);
        setMasterFileUploaded(true);
        setViewMode('master');
      } else {
        setData(json);

        // Transform data for new view
        const transformedData = json.slice(1).map(row => {
          const newRow = requiredColumns.map(col => {
            if (columnMappings[col.replace(/\s/g, '')] !== undefined) {
              return row[columnMappings[col.replace(/\s/g, '')]] || '';
            } else {
              return '';
            }
          });
          return newRow;
        });
        setNewData([requiredColumns, ...transformedData]);
        setUploadComplete(true);
        setViewMode(null);
        setEmailSent(false);
      }
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles)
  });

  const { getRootProps: getMasterRootProps, getInputProps: getMasterInputProps } = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, true)
  });

  useEffect(() => {
    console.log('Data state updated:', data); // Debugging step
    console.log('NewData state updated:', newData); // Debugging step
    console.log('MasterData state updated:', masterData); // Debugging step
  }, [data, newData, masterData]);

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(newData.slice(1));
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
    setNewData([]);
    setUploadComplete(false);
    setViewMode(null);
    setEmailSent(false);
  };

  const compareFiles = () => {
    if (data.length === 0 || masterData.length === 0) {
      return;
    }

    const header = data[0];
    const masterHeader = masterData[0];
    const comparisons = [];

    const maxLength = Math.max(data.length, masterData.length);

    for (let i = 1; i < maxLength; i++) {
      const row = data[i] || [];
      const masterRow = masterData[i] || [];
      const comparisonRow = header.map((col, index) => {
        const cellValue = row[index] || '';
        const masterCellValue = masterRow[index] || '';
        return cellValue === masterCellValue ? cellValue : `${cellValue} (master: ${masterCellValue})`;
      });
      comparisons.push(comparisonRow);
    }

    setComparisonData([header, ...comparisons]);
    setViewMode('compare');
  };

  const checkNonKeyValues = () => {
    if (data.length === 0) {
      return;
    }

    const keyIndex = data[0].indexOf('Key');
    if (keyIndex === -1) {
      return;
    }

    const nonKeyCount = data.slice(1).reduce((count, row) => {
      if (row[keyIndex] === 'Non-key') {
        return count + 1;
      }
      return count;
    }, 0);

    setNonKeyCount(nonKeyCount);
    setViewMode('nonKey');
  };

  const checkRemovedRows = () => {
    if (data.length === 0 || masterData.length === 0) {
      return;
    }

    const header = data[0];
    const masterKeyIndex = masterData[0].indexOf('Key');
    const dataKeyIndex = data[0].indexOf('Key');

    if (masterKeyIndex === -1 || dataKeyIndex === -1) {
      return;
    }

    const masterKeys = new Set(masterData.slice(1).map(row => row[masterKeyIndex]));
    const removedRows = data.slice(1).filter(row => !masterKeys.has(row[dataKeyIndex]));

    setRemovedData([header, ...removedRows]);
    setViewMode('removed');
  };

  const checkAddedRows = () => {
    if (data.length === 0 || masterData.length === 0) {
      return;
    }

    const header = data[0];
    const masterKeyIndex = masterData[0].indexOf('Key');
    const dataKeyIndex = data[0].indexOf('Key');

    if (masterKeyIndex === -1 || dataKeyIndex === -1) {
      return;
    }

    const dataKeys = new Set(data.slice(1).map(row => row[dataKeyIndex]));
    const addedRows = masterData.slice(1).filter(row => !dataKeys.has(row[masterKeyIndex]));

    setAddedData([header, ...addedRows]);
    setViewMode('added');
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
    console.log('View mode:', viewMode); // Debugging step
    console.log('Current data:', data); // Debugging step
    console.log('Current newData:', newData); // Debugging step
    console.log('Current masterData:', masterData); // Debugging step
    console.log('Current comparisonData:', comparisonData); // Debugging step
    console.log('Current removedData:', removedData); // Debugging step
    console.log('Current addedData:', addedData); // Debugging step

    const totalRecords = data.length - 1; // Subtract header row
    const totalMasterRecords = masterData.length - 1; // Subtract header row

    if (emailSent) {
      return <p>Email has been sent.</p>;
    } else if (viewMode === 'original') {
      return (
        <div>
          <p>The total number of records are: {totalRecords}</p>
          {renderTable(data.slice(1), data[0])}
        </div>
      );
    } else if (viewMode === 'new') {
      return renderTable(newData.slice(1), newData[0]);
    } else if (viewMode === 'compare') {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
          <div style={{ width: '48%', overflowX: 'auto' }}>
            <h2>Original File</h2>
            <p>The total number of records are: {totalRecords}</p>
            {renderTable(data.slice(1), data[0])}
          </div>
          <div style={{ width: '48%', overflowX: 'auto' }}>
            <h2>New File</h2>
            {renderTable(newData.slice(1), newData[0])}
          </div>
        </div>
      );
    } else if (viewMode === 'master') {
      return (
        <div>
          <p>The total number of records in the master file are: {totalMasterRecords}</p>
          {renderTable(masterData.slice(1), masterData[0])}
        </div>
      );
    } else if (viewMode === 'nonKey') {
      return <p>The total number of non keys are: {nonKeyCount}</p>;
    } else if (viewMode === 'removed') {
      return (
        <div>
          <p>The total number of removed rows are: {removedData.length - 1}</p>
          {renderTable(removedData.slice(1), removedData[0])}
        </div>
      );
    } else if (viewMode === 'added') {
      return (
        <div>
          <p>The total number of added rows are: {addedData.length - 1}</p>
          {renderTable(addedData.slice(1), addedData[0])}
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
      <div {...getMasterRootProps()} style={{ border: '2px dashed #28a745', padding: '20px', textAlign: 'center', marginTop: '20px' }}>
        <input {...getMasterInputProps()} />
        <p>Drag 'n' drop a Master file here, or click to select one</p>
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
          <button onClick={compareFiles} style={{ margin: '10px', padding: '5px 10px', cursor: 'pointer' }}>
            Compare Files
          </button>
          <button onClick={handleDownload} style={{ margin: '10px', padding: '5px 10px', cursor: 'pointer' }}>
            Download Generated Data
          </button>
          <button onClick={handleSendEmail} style={{ margin: '10px', padding: '5px 10px', cursor: 'pointer' }}>
            Send Email
          </button>
          <button onClick={checkNonKeyValues} style={{ margin: '10px', padding: '5px 10px', cursor: 'pointer' }}>
            Check Non-key Values
          </button>
          <button onClick={checkRemovedRows} style={{ margin: '10px', padding: '5px 10px', cursor: 'pointer' }}>
            Check Removed Rows
          </button>
          <button onClick={checkAddedRows} style={{ margin: '10px', padding: '5px 10px', cursor: 'pointer' }}>
            Check Added Rows
          </button>
          {renderContent()}
        </div>
      )}
      {masterFileUploaded && (
        <div>
          <button onClick={() => setViewMode('master')} style={{ margin: '10px', padding: '5px 10px', cursor: 'pointer' }}>
            View Master File
          </button>
        </div>
      )}
      {emailSent && <p>Email has been sent.</p>}
    </div>
  );
};

export default Report;
