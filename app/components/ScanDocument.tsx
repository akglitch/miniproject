import React, { useState } from 'react';
import { Container, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

const ScanDocument: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    document.getElementById('scan-input')?.click();
  };

  const handleClose = () => {
    setOpen(false);
    setFile(null);
    setPreview(null);
  };

  const handleScan = () => {
    // Mock scan function: In a real-world scenario, this would interact with a scanner.
    console.log('Scanning document...');
    // Simulate a scanned document preview
    setTimeout(() => {
      setPreview('https://via.placeholder.com/400x300.png?text=Scanned+Document');
    }, 2000);
  };

  return (
    <Container className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        className="bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Scan Document
      </Button>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        id="scan-input"
        onChange={handleFileChange}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Document Preview</DialogTitle>
        <DialogContent>
          {preview ? (
            <img src={preview} alt="Preview" className="w-full" />
          ) : (
            <Typography>No document scanned</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleScan} color="primary">
            Scan
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ScanDocument;
