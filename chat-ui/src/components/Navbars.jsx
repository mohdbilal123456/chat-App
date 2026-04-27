import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { getToken, removeToken } from '../config/axios/api'
import '../assets/css/Navbars.css'
import { useState, useEffect } from 'react'

const linkBase = 'nav-link'

const linkClasses = ({ isActive }) =>
  isActive ? `${linkBase} active` : `${linkBase}`

function Navbars() {
  const navigate = useNavigate()
  const location = useLocation()

  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken())

  const showBack = location.pathname !== '/'

  useEffect(() => {
    setIsLoggedIn(!!getToken())
  }, [location])

  const handleLogout = () => {
    removeToken()
    setIsLoggedIn(false)
    navigate('/login')
  }

  return (
    <nav className="site-nav" aria-label="Main navigation">
      <div className="nav-container">

        {/* LEFT: Back Button */}
        <div className="nav-left">
          {showBack && (
            <button onClick={() => navigate(-1)} className="back-btn">
              ← Back
            </button>
          )}
        </div>

        {/* RIGHT: Links */}
        <div className="nav-right">

          <NavLink to="/" className={linkClasses}>
            Home
          </NavLink>

          {/* Questions (SHOW ALWAYS or only logged in - your choice) */}
          {isLoggedIn && (
            <NavLink to="/admin/questions" className={linkClasses}>
              Questions
            </NavLink>
          )}

          {/* Not logged in */}
          {!isLoggedIn && (
            <>
              <NavLink to="/register" className={linkClasses}>
                Register
              </NavLink>

              <NavLink to="/login" className={linkClasses}>
                Login
              </NavLink>
            </>
          )}

          {/* Logged in */}
          {isLoggedIn && (
            <>
              <button onClick={handleLogout} className="nav-link logout-btn">
                Logout
              </button>
            </>
          )}

        </div>

      </div>
    </nav>
  )
}

export default Navbars