import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { RecordData } from '../types'; // Adjust the import path as needed
import { Button } from '@mui/material';
import EditModal from './EditModal'; // Adjust the import path as needed

interface RecordsProps {
  onEdit: (record: RecordData) => void;
}

const Incoming: React.FC<RecordsProps> = ({ onEdit }) => {
  const [records, setRecords] = useState<RecordData[]>([]);
  const [loading, setLoading] = useState(true);
  const [yearFilter, setYearFilter] = useState<string>('All');
  const [monthFilter, setMonthFilter] = useState<string>('All');
  const [sortField, setSortField] = useState<keyof RecordData>('date_received');
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchResult, setSearchResult] = useState<RecordData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RecordData | null>(null);
  const [visibleButtons, setVisibleButtons] = useState<{ [key: string]: boolean }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/records');
        setRecords(response.data); // Assuming response.data is an array of RecordData objects
      } catch (error) {
        console.error('Error fetching records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setVisibleButtons({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleDelete = async (id: number | undefined) => {
    if (id) {
      try {
        await axios.delete(`http://localhost:5000/api/records/${id}`);
        setRecords(records.filter(record => record._id !== id));
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    }
  };

  const handlePrint = (record: RecordData) => {
    const printContent = (
      <div>
        <h1 className="text-2xl font-bold mb-4">Record Details</h1>
        <p><strong>Year:</strong> {record.year}</p>
        <p><strong>Month:</strong> {record.month}</p>
        <p><strong>Date Received:</strong> {record.date_received}</p>
        <p><strong>Log Time:</strong> {record.log_time}</p>
        <p><strong>Serial No:</strong> {record.serial_no}</p>
        <p><strong>From Whom Received:</strong> {record.from_whom_received}</p>
        <p><strong>Date of Letter:</strong> {record.date_of_letter}</p>
        <p><strong>Institutional Ref No:</strong> {record.letter_ref_no}</p>
        <p><strong>Type of Letter:</strong> {record.type_of_letter}</p>
        <p><strong>Subject:</strong> {record.subject}</p>
        <p><strong>Department:</strong> {record.received_by}</p>
      </div>
    );

    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write();
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

  const handleEdit = (record: RecordData) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const handleSave = (updatedRecord: RecordData) => {
    // Save the updated record (this is just a placeholder implementation)
    const updatedRecords = records.map(record =>
      record._id === updatedRecord._id ? updatedRecord : record
    );
    setRecords(updatedRecords);
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const filteredRecords = records.filter(record => {
    if (yearFilter !== 'All' && record.year !== yearFilter) return false;
    if (monthFilter !== 'All' && record.month !== monthFilter) return false;
    return true;
  });

  const displayedRecords = searchResult.length > 0 ? searchResult : filteredRecords;

  const sortRecords = (field: keyof RecordData) => {
    const sortedRecords = [...records].sort((a, b) => {
      if (field === 'date_received') {
        return new Date(a.date_received).getTime() - new Date(b.date_received).getTime();
      } else if (field === 'log_time') {
        return new Date(a.log_time).getTime() - new Date(b.log_time).getTime();
      } else if (field === 'serial_no') {
        return a.serial_no.localeCompare(b.serial_no);
      } else if (field === 'year') {
        return parseInt(a.year) - parseInt(b.year);
      } else if (field === 'month') {
        return a.month.localeCompare(b.month);
      }
      return 0;
    });
    setRecords(sortedRecords);
  };

  const toggleDropdown = (recordId: string) => {
    setVisibleButtons(prevState => ({
      ...prevState,
      [recordId]: !prevState[recordId]
    }));
  };

  return (
    <section className="bg-gray-50 ml-72 dark:bg-gray-900 p-3  mt-10 sm:p-5 pt-24">
      <div className="mx-auto px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input type="text" id="simple-search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required />
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path clipRule="evenodd" fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                </svg>
                Add record
              </button>
              <div className="flex items-center space-x-3 w-full md:w-auto">
                <div className="relative w-full">
                  <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} className="block w-full p-2 border border-gray-300 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                    <option value="All">All Years</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                  </select>
                </div>
                <div className="relative w-full">
                  <select value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} className="block w-full p-2 border border-gray-300 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                    <option value="All">All Months</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
                <button type="button" className="flex items-center justify-center text-gray-500 bg-gray-50 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-700 focus:outline-none">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5 10a5 5 0 1010 0A5 5 0 005 10zm1-5a6 6 0 1112 0A6 6 0 016 5z" clipRule="evenodd" />
                  </svg>
                  Filters
                </button>
              </div>
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">Year</th>
                  <th scope="col" className="px-4 py-3">Month</th>
                  <th scope="col" className="px-4 py-3">Date Received</th>
                  <th scope="col" className="px-4 py-3">Log Time</th>
                  <th scope="col" className="px-4 py-3">Serial No</th>
                  <th scope="col" className="px-4 py-3">From Whom Received</th>
                  <th scope="col" className="px-4 py-3">Date of Letter</th>
                  <th scope="col" className="px-4 py-3">Institutional Ref No</th>
                  <th scope="col" className="px-4 py-3">Received By</th>
                  <th scope="col" className="px-4 py-3">Type of Letter</th>
                  <th scope="col" className="px-4 py-3">Subject</th>
                  <th scope="col" className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedRecords.map(record => (
                  <tr key={record._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="px-4 py-3">{record.year}</td>
                    <td className="px-4 py-3">{record.month}</td>
                    <td className="px-4 py-3">{record.date_received}</td>
                    <td className="px-4 py-3">{record.log_time}</td>
                    <td className="px-4 py-3">{record.serial_no}</td>
                    <td className="px-4 py-3">{record.from_whom_received}</td>
                    <td className="px-4 py-3">{record.date_of_letter}</td>
                    <td className="px-4 py-3">{record.letter_ref_no}</td>
                    <td className="px-4 py-3">{record.received_by}</td>
                    <td className="px-4 py-3">{record.type_of_letter}</td>
                    <td className="px-4 py-3">{record.subject}</td>
                    <td className="px-4 py-3">
                      <div className="relative" ref={dropdownRef}>
                        <button onClick={() => toggleDropdown(record._id?.toString() || '')} className="text-blue-500 hover:text-blue-700">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
                          </svg>
                        </button>
                        {visibleButtons[record._id?.toString() || ''] && (
                          <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
                            <button onClick={() => handleEdit(record)} className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">Edit</button>
                            <button onClick={() => handleDelete(record._id)} className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">Delete</button>
                            <button onClick={() => handlePrint(record)} className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">Print</button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center space-x-2">
              <button onClick={() => sortRecords('date_received')} className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                Sort by Date Received
              </button>
              <button onClick={() => sortRecords('log_time')} className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                Sort by Log Time
              </button>
              <button onClick={() => sortRecords('serial_no')} className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                Sort by Serial No
              </button>
            </div>
            <button onClick={handleSearch} className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
              Search
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && selectedRecord && (
        <EditModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          record={selectedRecord}
          onSave={handleSave}
        />
      )}
    </section>
  );
};

export default Incoming;
