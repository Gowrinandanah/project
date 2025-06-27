import React from 'react';
import { ListItem, ListItemText, ListItemIcon } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

const MaterialItem = ({ material }) => {
  return (
    <ListItem>
      <ListItemIcon>
        <DescriptionIcon />
      </ListItemIcon>
      <ListItemText primary={material.title || material.name} />
    </ListItem>
  );
};

export default MaterialItem;
