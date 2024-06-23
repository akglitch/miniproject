// src/components/Header.tsx
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { FC } from 'react';

const Header: FC = () => {
  return (
    <AppBar position="static" className="bg-blue-600">
      <Toolbar>
        <Typography variant="h6" className="flex-grow">
          Record Management System
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
