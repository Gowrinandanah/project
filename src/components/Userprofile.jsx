import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const UserProfilePage = () => {
  const [user, setUser] = useState({});
  const [groups, setGroups] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    /*const token = localStorage.getItem('token');

    axios.get('http://localhost:5000/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setUser(res.data.user);
        setGroups(res.data.groups);
        setMessages(res.data.messages);
      })
      .catch(err => {
        console.error('Failed to load profile data', err);
      });*/

     setUser({
      name: 'John Doe',
      email: 'john@example.com',
    });

    setGroups([
      { id: 1, title: 'React Learners' },
      { id: 2, title: 'AI Club' },
    ]);

    setMessages([
      { id: 1, content: 'Excited to be part of this group!' },
      { id: 2, content: 'Can someone help with useEffect?' },
    ]); 
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
