
import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

const UserCard = ({ user, onApprove, onBan }) => {
  return (
    <Card sx={{ width: 200, height: 200, m: 1, 
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'  }}>
      <CardContent>
        <Typography variant="h6">{user.name}</Typography>
        <Typography>Email: {user.email}</Typography>
        <Typography>Groups Created: {user.groupCount}</Typography>
        <Typography>Last Active: {user.lastActive}</Typography>
      </CardContent>

      <CardActions>
        {/*<Button
          variant="contained"
          color="success"
          onClick={() => onApprove(user._id)}
        >
          Approve
        </Button>*/}
        <Button
          variant="outlined"
          color="error"
          onClick={() => onBan(user._id)}
        >
          Suspend
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;
