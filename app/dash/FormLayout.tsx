import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import RefreshIcon from '@mui/icons-material/Refresh';
import { RecordData } from '../types'; // Ensure this path is correct

const FormLayout: React.FC = () => {
  const [formData, setFormData] = useState<RecordData>({
    _id: '',
    year: '',
    month: '',
    date_received: '',
    log_time: '',
    serial_no: '',
    from_whom_received: '',
    date_of_letter: '',
    letter_ref_no: '',
    received_by: '',
    type_of_letter: '',
    subject: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/records', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('Record saved successfully!');
    } catch (error) {
      console.error('Error saving record:', error);
      alert('Error saving record');
    }
  };

  const handleReset = () => {
    setFormData({
      _id: '',
      year: '',
      month: '',
      date_received: '',
      log_time: '',
      serial_no: '',
      from_whom_received: '',
      date_of_letter: '',
      letter_ref_no: '',
      received_by: '',
      type_of_letter: '',
      subject: '',
    });
  };

  return (
    <div className="container ml-72 mx-auto px-4 py-6 bg-gray-800 text-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Document Details</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Year</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-2">Month</label>
          <input
            type="text"
            name="month"
            value={formData.month}
            onChange={handleInputChange}
            className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-2">Date Received</label>
          <input
            type="text"
            name="date_received"
            value={formData.date_received}
            onChange={handleInputChange}
            className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-2">Log Time</label>
          <input
            type="text"
            name="log_time"
            value={formData.log_time}
            onChange={handleInputChange}
            className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-2">Serial No</label>
          <input
            type="text"
            name="serial_no"
            value={formData.serial_no}
            onChange={handleInputChange}
            className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-2">From Whom Received</label>
          <input
            type="text"
            name="from_whom_received"
            value={formData.from_whom_received}
            onChange={handleInputChange}
            className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-2">Date of Letter</label>
          <input
            type="text"
            name="date_of_letter"
            value={formData.date_of_letter}
            onChange={handleInputChange}
            className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-2">Letter Ref No</label>
          <input
            type="text"
            name="letter_ref_no"
            value={formData.letter_ref_no}
            onChange={handleInputChange}
            className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-2">Received By</label>
          <input
            type="text"
            name="received_by"
            value={formData.received_by}
            onChange={handleInputChange}
            className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-2">Type of Letter</label>
          <input
            type="text"
            name="type_of_letter"
            value={formData.type_of_letter}
            onChange={handleInputChange}
            className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md px-3 py-2"
          />
        </div>
        <div className="col-span-2">
          <label className="block mb-2">Subject</label>
          <TextField
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            className="bg-gray-700 text-gray-100 border border-gray-600 rounded-md px-3 py-2"
          />
        </div>
        <div className="col-span-2 flex justify-between">
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Save Record
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<RefreshIcon />}
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Reset Form
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormLayout;
