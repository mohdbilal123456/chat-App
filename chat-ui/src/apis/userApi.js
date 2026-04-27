import { userInstance, setToken, setUser } from "../config/axios/api"

export const loginUser = async (payload) => {
  try {
    const res = await userInstance.post('/login', payload)
    
    setToken(res.data.token)
    setUser(res.data.user)
    return res.data
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' }
  }
}

export const registerUser = async (payload) => {
  try {
    const res = await userInstance.post('/register', payload)
    return res.data
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' }
  }
}

export const getProfile = async () => {
  try {
    const res = await userInstance.get('/me')
    return res.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch profile' }
  }
}