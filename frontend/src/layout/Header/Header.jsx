import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContextProvider'

import "./Header.css"

export default function Header() {
  const {loggedUser, logout} = useContext(AuthContext);

  return (
    <nav id="header">
      <ul>
        <Link to='/'>
          <li>Home</li>
        </Link>

        <Link to='/register'>
          <li>Register</li>
        </Link>

        <Link to='/login'>
          <li>Login</li>
        </Link>

        <Link to='/admin'>
          <li>Admin</li>
        </Link>
      </ul>

      {
        loggedUser &&
          <form onSubmit={logout}>
            <button className="logout" type="submit">Disconnect</button>
          </form>
      }
    </nav>

  )
}
