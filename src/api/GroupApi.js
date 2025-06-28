
import axios from './Axios';

// Toggle this flag to switch between dummy data and backend
const useDummy = true;

/* 1. Create Group */
export const createGroup = async (form, token) => {
  if (useDummy) {
    const existing = JSON.parse(localStorage.getItem('dummyGroups')) || [];
    const newGroup = {
      ...form,
      _id: new Date().getTime().toString(),
      status: 'pending',
    };
    existing.push(newGroup);
    localStorage.setItem('dummyGroups', JSON.stringify(existing));
    return { data: newGroup };
  } else {
    return await axios.post('/groups', form, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};

/* 2. Fetch One Group by ID */
export const fetchGroupById = async (id) => {
  if (useDummy) {
    return {
      _id: id,
      title: 'React Learners',
      subject: 'Web Development',
      description: 'A group for React.js enthusiasts.',
      members: ['Alice', 'Bob'],
      messages: [{ text: 'Welcome!', user: 'Alice' }],
      materials: [{ title: 'Intro to React' }],
    };
  } else {
    const res = await axios.get(`/group/${id}`);
    return res.data;
  }
};

/* 3. Fetch All Groups */
export const fetchAllGroups = async () => {
  if (useDummy) {
    return [
      {
        _id: '1',
        title: 'React Learners',
        subject: 'Web Development',
        description: 'A group for React.js enthusiasts.',
        status: 'pending'
      },
      {
        _id: '2',
        title: 'Python Beginners',
        subject: 'Programming',
        description: 'Helping newcomers get started with Python.',
        status: 'pending'
      },
      {
        _id: '3',
        title: 'AI Club',
        subject: 'Artificial Intelligence',
        description: 'Discuss AI topics.',
        status: 'approved'
      },
      {
         _id: '4',
         title: 'Python ',
         subject: 'Programming',
         description: 'Helping newcomers get started with Python.',
         status: 'pending'
      },
      {
        _id: '5',
        title: 'Coding Club',
        subject: 'Artificial Intelligence',
        description: 'Discuss AI topics.',
        status: 'approved'
      },
      {
        _id: '6',
        title: 'C++ Club',
        subject: 'Artificial Intelligence',
        description: 'Discuss AI topics.',
        status: 'approved'
      },
      {
        _id: '7',
        title: 'java Club',
        subject: 'Artificial Intelligence',
        description: 'Discuss AI topics.',
        status: 'approved'
      },
      {
        _id: '8',
        title: 'Robotics Club',
        subject: 'Artificial Intelligence',
        description: 'Discuss AI topics.',
        status: 'approved'
      },
    ];
  } else {
    const res = await axios.get('/groups');
    return res.data;
  }
};

/* 4. Approve Group */
export const approveGroup = async (id) => {
  if (useDummy) {
    const groups = JSON.parse(localStorage.getItem('dummyGroups')) || [];
    const updated = groups.map(g => g._id === id ? { ...g, status: 'approved' } : g);
    localStorage.setItem('dummyGroups', JSON.stringify(updated));
    return { data: true };
  } else {
    return await axios.put(`/groups/${id}/approve`);
  }
};

/* 5. Delete Group */
export const deleteGroup = async (id) => {
  if (useDummy) {
    const groups = JSON.parse(localStorage.getItem('dummyGroups')) || [];
    const updated = groups.filter(g => g._id !== id);
    localStorage.setItem('dummyGroups', JSON.stringify(updated));
    return { data: true };
  } else {
    return await axios.delete(`/groups/${id}`);
  }
};




/*// src/api/GroupApi.js
import axios from './Axios';

// Create a new group
export const createGroup = async (form, token) => {
  return await axios.post('/groups', form, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Fetch details of a single group by ID
export const fetchGroupById = async (id) => {
  const res = await axios.get(`/group/${id}`);
  return res.data;
};

// Fetch all groups
export const fetchAllGroups = async () => {
  const res = await axios.get('/');
  return res.data;
};
*/