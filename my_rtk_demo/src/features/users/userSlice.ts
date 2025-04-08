import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = [
  { id: uuidv4(), name: 'Alice', email: 'alice@example.com', age: 30 },
  { id: uuidv4(), name: 'Bob', email: 'bob@example.com', age: 37 },
];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push({ id: uuidv4(), ...action.payload });
    },
    updateUser: (state, action) => {
      const { id, name, email, age } = action.payload;
      const user = state.find(user => user.id === id);
      if (user) {
        user.name = name;
        user.email = email;
        user.age = age;
      }
    },
    deleteUser: (state, action) => {
      return state.filter(user => user.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
