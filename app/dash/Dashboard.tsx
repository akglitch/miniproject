import { FC, useEffect, useState } from 'react';
import { Paper, Grid, Typography, List, ListItem, ListItemText, Box, Divider } from '@mui/material';
import axios from 'axios';
import { RecordData } from '../types'; 

const Dashboard: FC = () => {
  const [records, setRecords] = useState<RecordData[]>([]);
  const [loading, setLoading] = useState(true);

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

  const stats = [
    { label: 'Total Records', value: loading ? 'Loading...' : records.length },
    { label: 'Pending Approvals', value: 15 }, // Example static value
    { label: 'Completed Tasks', value: 89 },   // Example static value
  ];

  return (
    <div className='container mx-auto bg-gray-800 ml-72'> {/* Adjust ml-72 to match your sidebar width */}
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
                {loading ? (
                  <Typography>Loading...</Typography>
                ) : (
                  records.slice(0, 3).map((record, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`${record.serial_no}: ${record.subject}`} />
                    </ListItem>
                  ))
                )}
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
                  <ListItemText primary="Forms" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Incoming" />
                </ListItem>
                {/* Add more quick links as needed */}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;
