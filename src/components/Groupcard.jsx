import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const GroupCard = ({ group }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/group/${group._id}`); // navigates to GroupDetailsPage
  };

  return (
    <Card sx={{ minWidth: 275, margin: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {group.title}
        </Typography>
        <Typography sx={{ mb: 1 }} color="text.secondary">
          Subject: {group.subject}
        </Typography>
        <Typography variant="body2">
          {group.description?.slice(0, 100)}...
        </Typography>
      </CardContent>

      <CardActions>
        <Button component={Link} to={`/group/${group._id}`} variant="outlined">
            View Details
        </Button>

      </CardActions>
    </Card>
  );
};

export default GroupCard;
