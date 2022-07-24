import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()
export default AuthContext;

export function AuthContextProvider({children}) {
  const [loggedUser, setLoggedUser] = useState(false)
  const navigate = useNavigate();

  const logout = (event) => {
      event.preventDefault();

      axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/logout`,
      null,
      {
        withCredentials: true,
      })
      .then(() => {
        setLoggedUser({
          status: false,
          user: {}
        })
        navigate("/")
      })
      .catch(({response}) => console.error(response.data))
  };

  return (
    <AuthContext.Provider value={{loggedUser, setLoggedUser, logout}}>
      {children}
    </AuthContext.Provider>
  )
}
