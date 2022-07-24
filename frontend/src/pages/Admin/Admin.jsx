import axios from "axios";
import { useEffect, useState } from "react";

function Admin() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`,
    {
      withCredentials: true,
    })
    .then(({data}) => setUsers(data))
    .catch(({response}) => console.error(response.data))
  }, []);

  return (
    <div>
      <p>Users List in Admin section</p>

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
