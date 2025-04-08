## 🛠 Project Overview:  
- **App Name**: User Manager  
- **Stack**: React + Redux Toolkit + TypeScript (optional)  
- **Features**:  
  - List users  
  - Add a user  
  - Edit a user  
  - Delete a user

---

## 🔧 Step 1: Setup Project

```bash
npx create-react-app user-manager --template redux
cd user-manager
npm install @reduxjs/toolkit react-redux uuid
```

✅ `uuid` will help us create unique user IDs.

---

## 🧱 Step 2: Project Structure

```
src/
├── app/
│   └── store.js
├── features/
│   └── users/
│       ├── userSlice.js
│       └── UserList.js
│       └── UserForm.js
├── App.js
└── index.js
```

---

## 🧠 Step 3: Configure Redux Store

📄 `src/app/store.js`  
```js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});
```

📄 `src/index.js`  
```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

---

## 🧩 Step 4: Create User Slice

📄 `src/features/users/userSlice.js`  
```js
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = [
  { id: uuidv4(), name: 'Alice', email: 'alice@example.com' },
  { id: uuidv4(), name: 'Bob', email: 'bob@example.com' },
];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push({ id: uuidv4(), ...action.payload });
    },
    updateUser: (state, action) => {
      const { id, name, email } = action.payload;
      const user = state.find(user => user.id === id);
      if (user) {
        user.name = name;
        user.email = email;
      }
    },
    deleteUser: (state, action) => {
      return state.filter(user => user.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
```

---

## 🧾 Step 5: User List Component

📄 `src/features/users/UserList.js`  
```js
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
          <strong>{user.name}</strong> — {user.email}
          <button onClick={() => onEdit(user)}>Edit</button>
          <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UserList;
```

---

## 📝 Step 6: User Form Component

📄 `src/features/users/UserForm.js`  
```js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from './userSlice';

const UserForm = ({ selectedUser, setSelectedUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
    }
  }, [selectedUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser) {
      dispatch(updateUser({ id: selectedUser.id, name, email }));
    } else {
      dispatch(addUser({ name, email }));
    }
    setName('');
    setEmail('');
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
      <button type="submit">{selectedUser ? 'Update' : 'Add'} User</button>
    </form>
  );
};

export default UserForm;
```

---

## 📦 Step 7: Main App Component

📄 `src/App.js`  
```js
import React, { useState } from 'react';
import UserForm from './features/users/UserForm';
import UserList from './features/users/UserList';

function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="App">
      <h1>User Manager</h1>
      <UserForm selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      <UserList onEdit={setSelectedUser} />
    </div>
  );
}

export default App;
```

---

## 🎉 Done! Run Your App

```bash
npm start
```

---

Would you like a downloadable GitHub repo or TypeScript version of this guide too?