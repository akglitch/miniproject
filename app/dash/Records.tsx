import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RecordData } from '../types'; // Adjust the import path as needed
import { TextField, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';

interface RecordsProps {
  onEdit: (record: RecordData) => void;
}

const Records: React.FC<RecordsProps> = ({ onEdit }) => {
  const [records, setRecords] = useState<RecordData[]>([]);
  const [loading, setLoading] = useState(true);
  const [yearFilter, setYearFilter] = useState<string>('All');
  const [monthFilter, setMonthFilter] = useState<string>('All');
  const [sortField, setSortField] = useState<keyof RecordData>('date_received');
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchResult, setSearchResult] = useState<RecordData[]>([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/records');
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const handleDelete = async (id: number | undefined) => {
    if (id) {
      try {
        await axios.delete(`http://localhost:3001/api/records/${id}`);
        setRecords(records.filter(record => record.id !== id));
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    }
  };

  const handlePrint = (record: RecordData) => {
    const printContent = `
      <div>
        <h1>Record Details</h1>
        <p><strong>Year:</strong> ${record.year}</p>
        <p><strong>Month:</strong> ${record.month}</p>
        <p><strong>Date Received:</strong> ${record.date_received}</p>
        <p><strong>Log Time:</strong> ${record.log_time}</p>
        <p><strong>Serial No:</strong> ${record.serial_no}</p>
        <p><strong>From Whom Received:</strong> ${record.from_whom_received}</p>
        <p><strong>Date of Letter:</strong> ${record.date_of_letter}</p>
        <p><strong>Institutional Ref No:</strong> ${record.institutional_ref_no}</p>
        <p><strong>Received By:</strong> ${record.received_by}</p>
        <p><strong>Mode of Received:</strong> ${record.mode_of_received}</p>
        <p><strong>Type of Letter:</strong> ${record.type_of_letter}</p>
        <p><strong>File Directory:</strong> ${record.file_directory}</p>
        <p><strong>Subject:</strong> ${record.subject}</p>
        <p><strong>Department:</strong> ${record.department}</p>
      </div>
    `;

    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(printContent);
      newWindow.document.close();
      newWindow.print();
    } else {
      alert('Unable to open print window. Please check your browser settings.');
    }
  };

  const handleSearch = () => {
    const result = records.filter(record => record.serial_no === searchInput);
    setSearchResult(result);
  };

  const filteredRecords = records.filter(record => {
    if (yearFilter !== 'All' && record.year !== yearFilter) return false;
    if (monthFilter !== 'All' && record.month !== monthFilter) return false;
    return true;
  });

  const displayedRecords = searchResult.length > 0 ? searchResult : filteredRecords;

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-2xl font-bold mb-4">Records</h1>
      <div className="flex justify-between mb-4">
        <TextField
          label="Search by Serial No"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
        <FormControl variant="outlined" className="mr-4">
          <InputLabel id="year-filter-label">Year</InputLabel>
          <Select
            labelId="year-filter-label"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value as string)}
            label="Year"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="2021">2021</MenuItem>
            <MenuItem value="2022">2022</MenuItem>
            <MenuItem value="2023">2023</MenuItem>
            <MenuItem value="2024">2024</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel id="month-filter-label">Month</InputLabel>
          <Select
            labelId="month-filter-label"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value as string)}
            label="Month"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="January">January</MenuItem>
            <MenuItem value="February">February</MenuItem>
            <MenuItem value="March">March</MenuItem>
            <MenuItem value="April">April</MenuItem>
            <MenuItem value="May">May</MenuItem>
            <MenuItem value="June">June</MenuItem>
            <MenuItem value="July">July</MenuItem>
            <MenuItem value="August">August</MenuItem>
            <MenuItem value="September">September</MenuItem>
            <MenuItem value="October">October</MenuItem>
            <MenuItem value="November">November</MenuItem>
            <MenuItem value="December">December</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel id="sort-field-label">Sort By</InputLabel>
          <Select
            labelId="sort-field-label"
            value={sortField}
            onChange={(e) => setSortField(e.target.value as keyof RecordData)}
            label="Sort By"
          >
            <MenuItem value="date_received">Date Received</MenuItem>
            <MenuItem value="log_time">Log Time</MenuItem>
            <MenuItem value="serial_no">Serial No</MenuItem>
            <MenuItem value="year">Year</MenuItem>
            <MenuItem value="month">Month</MenuItem>
          </Select>
        </FormControl>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="bg-white border border-gray-200 min-w-full  min-h-screen">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Received</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Log Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From Whom Received</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Letter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institutional Ref No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Received By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mode of Received</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type of Letter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Directory</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedRecords.map((record, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{record.year}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{record.month}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{record.date_received}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{record.log_time}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{record.serial_no}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{record.from_whom_received}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{record.date_of_letter}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{record.institutional_ref_no}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{record.received_by}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{record.mode_of_received}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{record.type_of_letter}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{record.file_directory}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{record.subject}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{record.department}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    <button onClick={() => onEdit(record)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Edit</button>
                    <button onClick={() => handleDelete(record.id)} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Delete</button>
                    <button onClick={() => handlePrint(record)} className="bg-green-500 text-white px-4 py-2 rounded">Print</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Records;
