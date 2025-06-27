import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchGroupById } from '../api/GroupApi'; // ✅ API call
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

    const fetchGroup = async () => {
      try {
        const data = await fetchGroupById(id, true); // 👈 switch to false when using backend
        setGroup(data);
      } catch (err) {
        console.error("Failed to fetch group details", err);
      }
    };

    fetchGroup();
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
