import axios from 'axios'

// const BASE_URL = 'http://localhost:5000/api'
const BASE_URL = 'https://chat-app-chat-api.onrender.com/api'
/* ================================
TOKEN HELPERS
================================ */
export const setToken = (token) => {
  localStorage.setItem('token', token)
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user))
}
export const getUser = () => {
  return localStorage.getItem('user')
}

export const removeToken = () => {
  localStorage.removeItem('token')
}

/* ================================
 CREATE INSTANCE
================================ */
const createInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  /* Request Interceptor (Attach Token) */
  instance.interceptors.request.use(
    (config) => {
      const token = getToken()

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    (error) => Promise.reject(error)
  )

  /* Response Interceptor (Auto Logout) */
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        removeToken()
        window.location.href = '/login' // redirect
      }
      return Promise.reject(error)
    }
  )

  return instance
}

/* ================================
   INSTANCES
================================ */
export const userInstance = createInstance(`${BASE_URL}/users`)

export const adminInstance = createInstance(`${BASE_URL}/users`)

export const questionInstance = createInstance(`${BASE_URL}/questions`)
