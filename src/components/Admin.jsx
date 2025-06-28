import React, { useEffect, useState } from 'react';
import {
  Paper, Typography, Button, List, ListItem, ListItemText,
  Box, Divider, TextField, Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchAllGroups, approveGroup, deleteGroup } from '../api/GroupApi';
import { fetchAllUsers, suspendUser} from '../api/UserApi';
import UserCard from './Usercard';

const Admin = () => {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || role !== 'admin') {
      navigate('/login');
      return;
    }

    const loadGroupsAndUsers = async () => {
      try {
        const groupData = await fetchAllGroups();
        setGroups(groupData.filter(g => g.status === 'pending'));

        const userData = await fetchAllUsers();
        setUsers(userData);
      } catch (err) {
        console.error('Error loading data', err);
      }
    };

    loadGroupsAndUsers();
  }, [navigate]);

  const handleApprove = async (id) => {
    await approveGroup(id);
    setGroups(groups.filter(g => g._id !== id));
  };

  const handleDelete = async (id) => {
    await deleteGroup(id);
    setGroups(groups.filter(g => g._id !== id));
  };

  const handleUserSuspend = async (id) => {
  await suspendUser(id);
  setUsers(users.filter(user => user._id !== id));
};


  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Admin Dashboard
      </Typography>

      {/* GROUP APPROVAL SECTION */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          🗂️ Pending Groups for Approval
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {groups.map(group => (
            <ListItem key={group._id} divider>
              <ListItemText
                primary={group.title}
                secondary={`${group.subject} — ${group.description}`}
              />
              <Button onClick={() => handleApprove(group._id)} color="success">
                Approve
              </Button>
              <Button onClick={() => handleDelete(group._id)} color="error">
                Delete
              </Button>
            </ListItem>
          ))}
          {groups.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
              No pending groups.
            </Typography>
          )}
        </List>
      </Paper>

      {/* USER MANAGEMENT SECTION */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          👥 Registered Users
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {/*  Search Input */}
        <TextField
          label="Search by name"
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mb: 3 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filtered User List in 2-Column Layout */}
        <Grid container spacing={2}>
          {users.filter(user =>
            user.name.toLowerCase().includes(search.toLowerCase())
          ).map(user => (
            <Grid item xs={12} sm={6} key={user._id}>
              <UserCard user={user} onDelete={handleUserSuspend} />
            </Grid>
          ))}
        </Grid>

        {/* No Match */}
        {users.length > 0 && users.filter(user =>
          user.name.toLowerCase().includes(search.toLowerCase())
        ).length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            No users match the search.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Admin;
