import axios from 'axios'


const API_URL = '/api/users/'

// Register User
const registerUser = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Login User
const loginUser = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Logout User
const logoutUser = () => localStorage.removeItem('user')

const authService = {
  registerUser,
  loginUser,
  logoutUser,

}

export default authService