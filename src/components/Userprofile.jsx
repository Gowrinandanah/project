import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { getUserProfile } from '../api/UserApi';

const UserProfilePage = () => {
  const [user, setUser] = useState({});
  const [groups, setGroups] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found. Redirect to login maybe.');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await getUserProfile(token);
        setUser(res.data.user);
        setGroups(res.data.groups);
        setMessages(res.data.messages);
      } catch (err) {
        console.error('Failed to load profile data', err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Name: {user.name}</Typography>
        <Typography variant="h6">Email: {user.email}</Typography>
      </Paper>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h5">My Study Groups</Typography>
        <List>
          {groups.map((group) => (
            <ListItem key={group._id}>
              <ListItemText primary={group.title} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h5">My Messages</Typography>
        <List>
          {messages.map((msg) => (
            <ListItem key={msg._id}>
              <ListItemText primary={msg.content} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default UserProfilePage;
