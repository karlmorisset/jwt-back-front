import axios from 'axios'
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';

function Logout() {
  const {setLoggedUser} = useContext(AuthContext)

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/logout`,
    {
      withCredentials: true,
    })
      .then(() => setLoggedUser())
      .catch(({response}) => console.error(response.data))
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='submit' value='Disconnect' />
    </form>
  );
};

export default Logout;
