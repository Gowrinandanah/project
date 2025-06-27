

import axios from './Axios';

// Toggle this to switch between dummy and backend
const useDummy = true;

/* 1. Login */
export const loginUser = async (form) => {
  if (useDummy) {
    if (form.email === "admin@gmail.com" && form.password === "admin123") {
      return { role: "admin", token: "adminToken" };
    } else {
      return { role: "user", token: "userToken" };
    }
  } else {
    const res = await axios.post('/login', form);
    return res.data; // { token, role }
  }
};

/* 2. Register */
export const registerUser = async (formData) => {
  if (useDummy) {
    console.log('Simulated registration:', formData);
    return { data: { token: 'userToken', role: 'user' } };
  } else {
    const res = await axios.post('/users/register', formData);
    return res.data;
  }
};

/* 3. Get User Profile */
export const getUserProfile = async (token) => {
  if (useDummy) {
    return {
      data: {
        user: {
          name: 'John Doe',
          email: 'john@example.com',
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
  } else {
    const res = await axios.get('/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  }
};

/* 4. Fetch All Users (Admin Only) */
export const fetchAllUsers = async () => {
  if (useDummy) {
    return [
      { _id: '1', name: 'Alice', email: 'alice@example.com' },
      { _id: '2', name: 'Bobby', email: 'bobby@example.com' },
      { _id: '3', name: 'Amelia', email: 'ame@example.com' },
      { _id: '4', name: 'Raj', email: 'raj@example.com' }

    ];
  } else {
    const res = await axios.get('/admin/users');
    return res.data;
  }
};


//deleteuser

export const suspendUser = async (id) => {
  return await axios.put(`/users/${id}/suspend`); 
};



/*
// src/api/UserApi.js
import axios from './Axios'; // Make sure Axios.js has your base URL setup

// Real login
export const loginUser = async (form) => {
  const res = await axios.post('/login', form);
  return res.data; // Should return { token, role }
};

// Real registration
export const registerUser = async (formData) => {
  const res = await axios.post('/users/register', formData);
  return res.data; // Should return { token, role }
};

// Real user profile fetch
export const getUserProfile = async (token) => {
  const res = await axios.get('/user/profile', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};


*/
