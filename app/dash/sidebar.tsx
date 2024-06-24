import { FC, useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormIcon from '@mui/icons-material/InsertDriveFile';
import RecordsIcon from '@mui/icons-material/ViewList';

interface SidebarProps {
  onSelectView: (view: string) => void;
}

const Sidebar: FC<SidebarProps> = ({ onSelectView }) => {
  return (
    <Drawer
      variant="permanent"
      PaperProps={{ className: 'w-70' }} // Adjust the width here
    >
      <List>
        <ListItem button onClick={() => onSelectView('Dashboard')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="" />
        </ListItem>
        <ListItem button onClick={() => onSelectView('FormLayout')}>
          <ListItemIcon>
            <FormIcon />
          </ListItemIcon>
          <ListItemText primary="" />
        </ListItem>
        <ListItem button onClick={() => onSelectView('Records')}>
          <ListItemIcon>
            <RecordsIcon />
          </ListItemIcon>
          <ListItemText primary="" />
        </ListItem>
      </List>
    </Drawer>
  );
}


export default Sidebar;
