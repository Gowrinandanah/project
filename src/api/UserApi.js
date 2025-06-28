// src/api/UserApi.js
import axios from './Axios';

const useDummy = true; // Toggle mock vs real backend

/* 1. Login */
export const loginUser = async (form) => {
  if (useDummy) {
    if (form.email === "admin@gmail.com" && form.password === "admin123") {
      return { role: "admin", token: "adminToken" };
    } else {
      return { role: "user", token: "userToken" };
    }
  }
  const res = await axios.post('/login', form);
  return res.data;
};

/* 2. Register */
export const registerUser = async (formData) => {
  if (useDummy) {
    console.log('Simulated registration:', formData);
    return { data: { token: 'userToken', role: 'user' } };
  }
  const res = await axios.post('/users/register', formData);
  return res.data;
};

/* 3. Get User Profile */
export const getUserProfile = async (token) => {
  if (useDummy) {
    return {
      data: {
        user: {
          name: 'John Doe',
          email: 'john@example.com',
          profilePicture: ''
        },
        groups: [
          { _id: 1, title: 'React Learners' },
          { _id: 2, title: 'AI Club' },
        ],
        messages: [
          { _id: 1, content: 'Excited to be part of this group!' },
          { _id: 2, content: 'Can someone help with useEffect?' },
        ]
      }
    };
  }

  const res = await axios.get('/user/profile', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

/* 4. Upload Profile Picture (Base64) */
export const updateProfilePic = async (imageBase64) => {
  const token = localStorage.getItem('token');

  if (useDummy) {
    console.log('Simulated profile picture upload');
    return { data: { success: true } };
  }

  const res = await axios.post(
    '/user/profile-pic',
    { image: imageBase64 },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};


/* Update User Info */
export const updateUserInfo = async (newData, token) => {
  if (useDummy) {
    console.log('Mock update user info:', newData);
    return { data: { success: true } };
  } else {
    const res = await axios.put(
      '/user/update',
      newData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  }
};




/* 5. Fetch All Users (Admin Only) */
export const fetchAllUsers = async () => {
  if (useDummy) {
    return [
      { _id: '1', name: 'Alice', email: 'alice@example.com' },
      { _id: '2', name: 'Bobby', email: 'bobby@example.com' },
      { _id: '3', name: 'Amelia', email: 'ame@example.com' },
      { _id: '4', name: 'Raj', email: 'raj@example.com' }
    ];
  }

  const res = await axios.get('/admin/users');
  return res.data;
};

/* 6. Suspend User */
export const suspendUser = async (id) => {
  return await axios.put(`/users/${id}/suspend`);
};
