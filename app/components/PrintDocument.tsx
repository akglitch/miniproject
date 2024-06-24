// src/components/PrintDocument.tsx
import React, { useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import ReactToPrint from 'react-to-print';
import DocumentToPrint from './DocumenttoPrint';

const PrintDocument: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const componentRef = useRef<DocumentToPrint>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFileUrl(fileUrl);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setFileUrl(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <input
        type="file"
        accept="application/pdf"
        style={{ display: 'none' }}
        id="file-input"
        onChange={handleFileChange}
      />
      <Button
        variant="contained"
        color="primary"
        className="bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={() => document.getElementById('file-input')?.click()}
      >
        Select Document
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>Document Preview</DialogTitle>
        <DialogContent>
          {fileUrl ? (
            <DocumentToPrint fileUrl={fileUrl} ref={componentRef} />
          ) : (
            <Typography>No document selected</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <ReactToPrint
            trigger={() => (
              <Button
                variant="contained"
                color="primary"
                className="bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Print Document
              </Button>
            )}
            content={() => componentRef.current}
          />
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PrintDocument;
