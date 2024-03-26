import React from 'react'
import { useUserAuth } from './UserAuthentication'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth()

  if (!user) {
    return <Navigate to="/signup" />
  }

  return children
}

export default ProtectedRoute