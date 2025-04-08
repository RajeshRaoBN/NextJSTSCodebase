import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from './userSlice';

const UserList = ({ onEdit }) => {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>User List</h2>
      {users.map(user => (
        <div key={user.id}>
          <strong>{user.name}</strong> — {user.email} -- {user.age}yrs
          <button onClick={() => onEdit(user)}>Edit</button>
          <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UserList;
