import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from './userSlice';

const UserForm = ({ selectedUser, setSelectedUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setAge(selectedUser.age);
    }
  }, [selectedUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser) {
      dispatch(updateUser({ id: selectedUser.id, name, email, age }));
    } else {
      dispatch(addUser({ name, email, age }));
    }
    setName('');
    setEmail('');
    setAge('');
    setSelectedUser(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedUser ? 'Edit' : 'Add'} User</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
        required
      />
      <button type="submit">{selectedUser ? 'Update' : 'Add'} User</button>
    </form>
  );
};

export default UserForm;
