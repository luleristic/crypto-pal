import axios from "axios";

const API_URL = "api/users";

//Register user
const register = async (userData) => {
  console.log(userData);
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("token", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "/login", userData);

  if (response.data) {
    localStorage.setItem("token", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = async () => {
  localStorage.removeItem("token");
};

const getUser = async (token) => {
  const response = await axios.get(API_URL + "/me", {
    headers: {
      Authorization : 'Bearer ' + token 
    }
  });

  console.log(response.data);

  return response.data;
};

const authService = {
  register,
  logout,
  login,
  getUser,
};

export default authService;
