import React, { useEffect, useState } from 'react';
import GroupCard from '../components/Groupcard';
import { fetchAllGroups } from '../api/GroupApi';

const HomePage = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const data = await fetchAllGroups(true); // Set to false for real API
        setGroups(data);
      } catch (err) {
        console.error('Failed to fetch groups:', err);
      }
    };

    loadGroups();
  }, []);

  return (
    <div>
      <h2>Available Study Groups</h2>
      {groups.map(group => (
        <GroupCard key={group._id} group={group} />
      ))}
    </div>
  );
};

export default HomePage;
