import React from 'react'
import { Route, Routes } from "react-router-dom";

// Composants de page
import Users from "./Users/Users";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Logout from "./Logout/Logout";
import Home from './Home/Home';

export default function Pages() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/users' element={<Users />} />
      <Route path='/logout' element={<Logout />} />
    </Routes>
  )
}
