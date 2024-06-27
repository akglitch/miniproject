'use client';
import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Grid,
  Button,
  Paper,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import RefreshIcon from '@mui/icons-material/Refresh';

const departments = [
  'Central Administration',
  'HumanResourceMGT',
  'Financial Management',
  'Budget /Rating',
  'Audit Management',
  'Works',
  'Physical Planning',
  'Housing',
  'Roads',
  'Trade, Industry, Tourism',
  'Agriculture',
  'Statistics',
  'Birth And Death',
  'Education, Youth',
  'Social Welfare',
  'Disaster Prevention',
  'Waste Management',
  'Natural Resources Conservation',
  'Legal',
  'Transport',
  'Health Administration',
];

interface FormData {
  year: string;
  month: string;
  date_received: string;
  log_time: string;
  serial_no: string;
  from_whom_received: string;
  date_of_letter: string;
  institutional_ref_no: string;
  received_by: string;
  mode_of_received: string;
  type_of_letter: string;
  file_directory: string;
  subject: string;
  department: string;
}

const FormLayout: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    year: '',
    month: '',
    date_received: '',
    log_time: '',
    serial_no: '',
    from_whom_received: '',
    date_of_letter: '',
    institutional_ref_no: '',
    received_by: '',
    mode_of_received: '',
    type_of_letter: '',
    file_directory: '',
    subject: '',
    department: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name as string]: value,
    }));
  };

  const handleDepartmentChange = (event: SelectChangeEvent<string>) => {
    setFormData(prevData => ({
      ...prevData,
      department: event.target.value as string,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3001/api/records', formData);
      alert('Record saved successfully!');
    } catch (error) {
      console.error('Error saving record:', error);
      alert('Error saving record');
    }
  };

  const handleReset = () => {
    setFormData({
      year: '',
      month: '',
      date_received: '',
      log_time: '',
      serial_no: '',
      from_whom_received: '',
      date_of_letter: '',
      institutional_ref_no: '',
      received_by: '',
      mode_of_received: '',
      type_of_letter: '',
      file_directory: '',
      subject: '',
      department: '',
    });
  };

  return (
    <Paper className="p-4 mx-auto" style={{ maxWidth: 1300 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">Document Details</Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            name="year"
            label="Year"
            value={formData.year}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="month"
            label="Month"
            value={formData.month}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="date_received"
            label="Date Received"
            value={formData.date_received}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="log_time"
            label="Log Time"
            value={formData.log_time}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="serial_no"
            label="Serial No"
            value={formData.serial_no}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="from_whom_received"
            label="From Whom Received"
            value={formData.from_whom_received}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="date_of_letter"
            label="Date of Letter"
            value={formData.date_of_letter}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="institutional_ref_no"
            label="Institutional Ref No"
            value={formData.institutional_ref_no}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="received_by"
            label="Received By"
            value={formData.received_by}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="mode_of_received"
            label="Mode of Received"
            value={formData.mode_of_received}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="type_of_letter"
            label="Type of Letter"
            value={formData.type_of_letter}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="file_directory"
            label="File Directory"
            value={formData.file_directory}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="subject"
            label="Subject"
            value={formData.subject}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              value={formData.department}
              onChange={handleDepartmentChange}
              label="Department"
            >
              {departments.map(department => (
                <MenuItem key={department} value={department}>
                  {department}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSubmit}
            fullWidth
          >
            Save Record
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<RefreshIcon />}
            onClick={handleReset}
            fullWidth
          >
            Reset Form
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FormLayout;
