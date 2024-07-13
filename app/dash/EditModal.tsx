import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { RecordData } from '../types'; // Adjust the import path as needed

interface EditModalProps {
  record: RecordData | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedRecord: RecordData) => void;
}

const EditModal: React.FC<EditModalProps> = ({ record, isOpen, onClose, onSave }) => {
  const [updatedRecord, setUpdatedRecord] = useState<RecordData>({} as RecordData);

  useEffect(() => {
    if (record) {
      setUpdatedRecord(record);
    }
  }, [record]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(updatedRecord);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '600px',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '8px',
        }}
      >
        <h2 className="text-xl font-bold mb-4">Edit Record</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <TextField
              fullWidth
              label="Year"
              name="year"
              value={updatedRecord.year || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Month"
              name="month"
              value={updatedRecord.month || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Date Received"
              name="date_received"
              value={updatedRecord.date_received || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Log Time"
              name="log_time"
              value={updatedRecord.log_time || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Serial No"
              name="serial_no"
              value={updatedRecord.serial_no || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="From Whom Received"
              name="from_whom_received"
              value={updatedRecord.from_whom_received || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Date of Letter"
              name="date_of_letter"
              value={updatedRecord.date_of_letter || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Letter Ref No"
              name="letter_ref_no"
              value={updatedRecord.letter_ref_no || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Received By"
              name="received_by"
              value={updatedRecord.received_by || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Type of Letter"
              name="type_of_letter"
              value={updatedRecord.type_of_letter || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Subject"
              name="subject"
              value={updatedRecord.subject || ''}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <Button onClick={onClose} variant="contained" color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default EditModal;
