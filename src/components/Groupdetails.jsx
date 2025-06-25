import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios'; 
import MessageBox from './Messagebox';
import MaterialItem from './Materialitem';

const Groupdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Dummy data for now
    const dummyGroup = {
      _id: id,
      title: 'React Learners',
      subject: 'Web Development',
      description: 'A group for React.js enthusiasts.',
      members: ['Alice', 'Bob'],
      messages: [{ text: 'Welcome!', user: 'Alice' }],
      materials: [{ title: 'Intro to React' }]
    };

    setGroup(dummyGroup);

    // axios.get(`http://localhost:5000/api/group/${id}`)
    //   .then(res => setGroup(res.data))
    //   .catch(err => console.log(err));
  }, [id, navigate]);

  if (!group) return <div>Loading...</div>;

  return (
    <div>
      <h2>{group.title}</h2>
      <p><strong>Subject:</strong> {group.subject}</p>
      <p><strong>Description:</strong> {group.description}</p>

      <h3>Members</h3>
      <ul>
        {group.members.map((member, idx) => (
          <li key={idx}>{member}</li>
        ))}
      </ul>

      <h3>Messages</h3>
      {group.messages.map((msg, idx) => (
        <MessageBox key={idx} message={msg} />
      ))}

      <h3>Materials</h3>
      {group.materials.map((item, idx) => (
        <MaterialItem key={idx} material={item} />
      ))}
    </div>
  );
};

export default Groupdetails;
