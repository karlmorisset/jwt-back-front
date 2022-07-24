import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

function Users() {
  const [users, setUsers] = useState([])
  const {loggedUser} = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedUser) {
      navigate('/Login')
    }else{
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`,
      {
        withCredentials: true,
      })
      .then(({data}) => setUsers(data))
      .catch(({response}) => console.error(response.data))
    }
  }, []);

  return (
    <div>
      <p>Users List</p>
      <ul>
        {users.map((user) => {
          <li>{user.name}</li>
        })}
      </ul>
    </div>
  );
}

export default Users;
