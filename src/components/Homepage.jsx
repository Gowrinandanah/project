import React, { useEffect, useState } from 'react';
import GroupCard from '../components/Groupcard';
import axios from 'axios';

const HomePage = () => {
  const [groups, setGroups] = useState([]);
  const dummyGroups = [
    {
      _id: '1',
      title: 'React Learners',
      subject: 'Web Development',
      description: 'A group for React.js enthusiasts to share tips and projects.'
    },
    {
      _id: '2',
      title: 'AI Club',
      subject: 'Artificial Intelligence',
      description: 'Discuss and collaborate on AI topics, models, and research papers.'
    }
  ];

  useEffect(() => {
    //axios.get('http://localhost:5000') // or your real API URL
     // .then(res => setGroups(res.data))
      //.catch(err => console.log(err));
      setGroups(dummyGroups);
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
