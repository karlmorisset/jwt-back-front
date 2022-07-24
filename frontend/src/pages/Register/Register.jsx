import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContextProvider";

import "./Register.css";

function Register() {
  const initUser = {
    email: "",
    password: "",
    password_confirmation: "",
    role: "ROLE_USER",
  }

  const [user, setUser] = useState(initUser)
  const [errors, setErrors] = useState()
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/register`, user)
      .then(({data}) => navigate("/login"))
      .catch(({response}) => setErrors(response.data))
  }

  return (
    <div className="wrapper">
      <form className="formulaire">
        <h1>Register</h1>
        <label htmlFor="email">
          Email
          <input
            type="text"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          {errors?.email && <span className="error">{errors.email}</span>}
        </label>

        <label htmlFor="password">
          Mot de passe
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          {errors?.password && <span className="error">{errors.password}</span>}
        </label>

        <label htmlFor="password_confirmation">
          Confirmation du mot de passe
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={user.password_confirmation}
            onChange={handleChange}
          />
          {errors?.password_confirmation && <span className="error">{errors.password_confirmation}</span>}
        </label>

        <label htmlFor="role">
          Rôle
          <select
            name="role"
            id="role"
            value={user.role}
            onChange={handleChange}
          >
            <option value="ROLE_USER">Utilisateur ordinaire</option>
            <option value="ROLE_ADMIN">Administrateur</option>
          </select>
          {errors?.role && <span className="error">{errors.role}</span>}
        </label>

        <input type="submit" onClick={handleSubmit} value="S'enregistrer" />
      </form>
    </div>
  );
}

export default Register;
