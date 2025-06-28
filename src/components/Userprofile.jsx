import React, { useEffect, useState } from 'react';
import {Box,Typography,Paper,List,ListItem,ListItemText,IconButton,Avatar,Tooltip,TextField,Button} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { getUserProfile, updateProfilePic, updateUserInfo } from '../api/UserApi';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const [user, setUser] = useState({});
  const [groups, setGroups] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [editing, setEditing] = useState(false); // for name/email edit
  const [formData, setFormData] = useState({ name: '', email: '' });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      //console.error('No token found. Redirecting to login.');
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await getUserProfile(token);
        setUser(res.data.user);
        setGroups(res.data.groups);
        setMessages(res.data.messages);
        setPreviewUrl(res.data.user?.profilePicture || '');
        setFormData({
          name: res.data.user.name || '',
          email: res.data.user.email || ''
        });
      } catch (err) {
        console.error('Failed to load profile data', err);
      }
    };

    fetchProfile();
  }, []);

  //  PROFILE PICTURE UPLOAD
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result;
        const token = localStorage.getItem('token');
        await updateProfilePic(base64, token);
        alert('Profile picture updated successfully!');
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed!');
    }
  };

  //  FORM HANDLERS
  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      await updateUserInfo(formData, token);
      setUser(prev => ({ ...prev, ...formData }));
      setEditing(false);
      alert('Profile updated!');
    } catch (err) {
      console.error('Failed to update user info:', err);
      alert('Update failed!');
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>My Profile</Typography>

      {/* Profile Info */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box display="flex" alignItems="center" gap={3}>
          {/* Avatar + Upload */}
          <Box position="relative">
            <Avatar alt="Profile" src={previewUrl} sx={{ width: 80, height: 80 }} />
            <Tooltip title="Edit picture">
              <IconButton
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: -8,
                  right: -8,
                  backgroundColor: 'white',
                  boxShadow: 1
                }}
              >
                <EditIcon fontSize="small" />
                <input hidden type="file" accept="image/*" onChange={handleFileChange} />
              </IconButton>
            </Tooltip>
          </Box>

          {/* User Info */}
          <Box flex={1}>
            {editing ? (
              <>
                <TextField
                  name="name"
                  label="Name"
                  value={formData.name}
                  onChange={handleFormChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleFormChange}
                  fullWidth
                  margin="normal"
                />
                <Button onClick={handleSaveInfo} variant="contained" sx={{ mt: 1 }}>Save</Button>
                <Button onClick={handleEditToggle} sx={{ mt: 1, ml: 1 }}>Cancel</Button>
              </>
            ) : (
              <>
                <Typography variant="h6">Name: {user.name || '—'}</Typography>
                <Typography variant="h6">Email: {user.email || '—'}</Typography>
                <Button onClick={handleEditToggle} startIcon={<EditIcon />} sx={{ mt: 1 }}>
                  Edit Info
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Study Groups */}
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

      {/* Messages */}
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
