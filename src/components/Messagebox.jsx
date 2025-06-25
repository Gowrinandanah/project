import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const MessageBox = ({ message }) => {
  return (
    <Paper elevation={2} sx={{ p: 2, my: 1 }}>
      <Typography variant="subtitle2" color="primary">
        {message?.sender || 'Anonymous'}:
      </Typography>
      <Typography variant="body1">{message?.content}</Typography>
    </Paper>
  );
};

export default MessageBox;
