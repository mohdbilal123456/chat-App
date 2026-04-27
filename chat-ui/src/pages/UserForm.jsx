import '../assets/css/UserForm.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { registerUser } from '../apis/userApi'
function UserForm() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  /*  Handle Input */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  /*  Handle Register */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const data = await registerUser(formData)

      console.log('Register success:', data)

      // Redirect to login
      navigate('/login')
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="register-container register-page">
      <section className="register-card">
        <h2>Create Account</h2>

        <form className="register-form" onSubmit={handleSubmit}>

          <label htmlFor="register-name">Name</label>
          <input
            id="register-name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="register-email">Email</label>
          <input
            id="register-email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Mobile */}
          <label htmlFor="register-mobile">Mobile</label>
          <input
            id="register-mobile"
            name="mobile"
            type="text"
            placeholder="Enter mobile number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />

          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/*  Error */}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>

        </form>

        <p className="register-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  )
}

export default UserForm