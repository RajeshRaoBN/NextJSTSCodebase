import { useState } from 'react'
import UserForm from './features/users/UserForm'
import UserList from './features/users/userList'

function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      <div>
        <h1>User Manager</h1>
        <UserForm selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <UserList onEdit={setSelectedUser} />
      </div>
    </>
  )
}

export default App
