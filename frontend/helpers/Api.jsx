import axios from "axios";

const API_URL = "api/users";


const editUser = async (body, token) => {
  try {
    const response = await axios.put(API_URL + "/me", body , {
      headers: {
        Authorization : 'Bearer ' + token 
      }
    });
  
    return response.data;
  }
  catch(err) {
    return err;
  }
}

const editUserAvatar = async (body, token) => {
  try {
    const response = await axios.post(API_URL + "/me/avatar", body, {
      headers: {
        Authorization : 'Bearer ' + token
      }
    });
    
    console.log(response)
    return response.data;
  }
  catch(err) {
    return err;
  }
}

module.exports = {
  editUser,
  editUserAvatar
}