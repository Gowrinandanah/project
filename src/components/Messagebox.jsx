import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const MessageBox = ({ message }) => {
  const sender = message.sender || message.user || 'Anonymous';
  const content = message.content || message.text || '';

  return (
    <Paper elevation={2} sx={{ p: 2, my: 1 }}>
      <Typography variant="subtitle2" color="primary">
        {sender}:
      </Typography>
      <Typography variant="body1">{content}</Typography>
    </Paper>
  );
};

export default MessageBox;
