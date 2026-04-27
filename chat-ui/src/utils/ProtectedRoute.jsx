import { Navigate } from 'react-router-dom'

const getUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

const getToken = () => {
  return localStorage.getItem('token')
}

function ProtectedRoute({ children }) {
  const token = getToken()
  const user = getUser()
  // Not logged in
  if (!token) {
    return <Navigate to="/login" />
  }

  // Not admin
  if (user?.role !== 'admin') {
    return <Navigate to="/" />
  }

  return children
}

export default ProtectedRoute