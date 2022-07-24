import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../contexts/AuthContextProvider';

export default function PrivateRoutes() {
  const {loggedUser, setLoggedUser} = useContext(AuthContext)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!loggedUser.status){
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/is-logged`,
      {
        withCredentials: true
      })
      .then((data) => setLoggedUser({
        status: true,
        user: data
      }))
      .finally(() => {
        setIsLoaded(true)
      })
    }else{
      setIsLoaded(true)
    }
  }, [])

  if (!isLoaded) return null

  return (
    loggedUser ? <Outlet/> : <Navigate to='/login' />
  )
}