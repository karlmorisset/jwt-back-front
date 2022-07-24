import React from 'react'
import { Route, Routes } from "react-router-dom";

// Composants de page
import Admin from "./Admin/Admin";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Home from './Home/Home';
import PrivateRoutes from './PrivateRoutes';

export default function Pages() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route element={<PrivateRoutes />}>
        <Route path='/admin' element={<Admin />} />
      </Route>

    </Routes>
  )
}
