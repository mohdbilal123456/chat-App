import '../assets/css/LoginForm.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { loginUser } from '../apis/userApi'

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email:'', password:''})
  const [loading, setLoading] =  useState(false)
  const [error, setError] = useState('')

  const handleChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value,
    })
  }
    const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const data = await loginUser(formData)
      console.log('Login success:', data)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }
  return (
    <main className="login-container login-page">
      <section className="login-card">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="login-text">
          New user? <Link to="/register">Create account</Link>
        </p>
      </section>
    </main>
  )
}

export default LoginForm
