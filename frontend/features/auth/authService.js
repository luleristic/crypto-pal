import axios from 'axios'

const API_URL = 'api/users'

//Register user
const register = async (userData) => {
  console.log(userData)
  const response = await axios.post(API_URL, userData);
  if(response.data) {
    localStorage.setItem('token', JSON.stringify(response.data));
  }

  return response.data
}

const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData);
  
  console.log(response);

  if(response.data) {
    localStorage.setItem('token', JSON.stringify(response.data));
  }

  return response.data
}


const logout = async () => {
  localStorage.removeItem('token');
}

const authService = {
  register,
  logout,
  login
}

export default authService
