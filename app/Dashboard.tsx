// src/components/Dashboard.tsx
import { FC } from 'react';
import { Paper, Grid, Typography, List, ListItem, ListItemText, Box, Divider } from '@mui/material';

const Dashboard: FC = () => {
  const recentRecords = [
    'Record 1: Description of record 1',
    'Record 2: Description of record 2',
    'Record 3: Description of record 3',
  ];

  const stats = [
    { label: 'Total Records', value: 120 },
    { label: 'Pending Approvals', value: 15 },
    { label: 'Completed Tasks', value: 89 },
  ];

  return (
  <div className='container'>
    <Box>
      <Typography variant="h3" gutterBottom>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        {/* Statistics Cards */}
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper className="p-4">
              <Typography variant="h5">{stat.label}</Typography>
              <Typography variant="h4" color="primary">
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}

        {/* Recent Records */}
        <Grid item xs={12}>
          <Paper className="p-4">
            <Typography variant="h5" gutterBottom>
              Recent Records
            </Typography>
            <List>
              {recentRecords.map((record, index) => (
                <ListItem key={index}>
                  <ListItemText primary={record} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12}>
          <Paper className="p-4">
            <Typography variant="h5" gutterBottom>
              Quick Links
            </Typography>
            <Divider />
            <List>
              <ListItem button>
                <ListItemText primary="Administration Records" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Finance Records" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Estate Records" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
    </div>
  );
};

export default Dashboard;
