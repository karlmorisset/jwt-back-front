import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

import "./Login.css";

function Login() {
  const {loggedUser, setLoggedUser} = useContext(AuthContext)
  const navigate = useNavigate()
  const initLogin = {
    email: "",
    password: ""
  }

  const [login, setLogin] = useState(initLogin)

  const handleChange = (e, field) => {
    setLogin({...login, [field]: e.target.value})
  }

  useEffect(() => {
    if (loggedUser) navigate('/')
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/login`,
      {...login},
      {
        withCredentials: true,
      })
      .then(({data}) => {
        setLoggedUser(data)
        // navigate('/users')
      })
      .catch(({response}) => console.error(response.data))
  }

  return (
    <div className="wrapper">
      <form className="formulaire">
        <h1>Login</h1>
        <label htmlFor="email">
          Email
          <input
            type="text"
            id="email"
            name="email"
            value={login.email}
            onChange={(e) => handleChange(e, "email")}
          />
        </label>

        <label htmlFor="password">
          Mot de passe
          <input
            type="text"
            id="password"
            name="password"
            value={login.password}
            onChange={(e) => handleChange(e, "password")}
          />
        </label>

        <input type="submit" onClick={handleSubmit} value="Se connecter" />
      </form>
    </div>
  );
}

export default Login;
