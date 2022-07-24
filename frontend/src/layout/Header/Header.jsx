import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext'

import "./Header.css"

export default function Header() {
  const {loggedUser} = useContext(AuthContext)
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

        <Link to='/users'>
          <li>Users</li>
        </Link>

        {
        loggedUser &&
          <li>
            <Link to='/logout'>Disconnect</Link>
          </li>
        }
      </ul>
    </nav>
  )
}
