import React from 'react'
import { useAuthContext } from '../../context/auth.context'
import Login from './Login'
import Register from './Register'


const Authentication = () => {

  const { authSection } = useAuthContext()

  return (
    authSection === 'login'
      ? <Login />
      : <Register />
  )

}

export default Authentication