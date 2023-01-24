import axios from "axios";

const API_URL = "api";

const editUser = async (body, token) => {
  try {
    const response = await axios.put(API_URL + "/users/me", body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return response.data;
  } catch (err) {
    return err;
  }
};

const editUserAvatar = async (body, token) => {
  try {
    const response = await axios.post(API_URL + "/users/me/avatar", body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return response.data;
  } catch (err) {
    return err;
  }
};

const getSignedUrl = async (body, token) => {
  try {
    const response = await axios.post(API_URL + "/posts/getSignedUrl", body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

const addPost = async (body, token) => {
  try {
    const response = await axios.post(API_URL + "/posts/add", body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

const fetchUserPosts = async (body, token) => {
  try {
    const response = await axios.post(API_URL + "/posts/user", body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};
module.exports = {
  editUser,
  editUserAvatar,
  getSignedUrl,
  addPost,
  fetchUserPosts
};
