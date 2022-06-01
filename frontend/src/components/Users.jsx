import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // TODO your code here
  }, []);

  return (
    <div>
      <p>Users List</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id} - email: {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
