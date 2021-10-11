// import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

export const API = axios.create({ baseUrl: "http://localhost:5000" });

API.interceptors.request.use(async (request) => {
  if (Cookies.get("userInfo")) {
    let userInfo = JSON.parse(Cookies.get("userInfo"));

    request.headers.authentication = `Bearer ${userInfo.accessToken}`;
  }

  return request;
});

// CREATE POST
export const createPost = (post) => API.post("/posts", post);

// GET ALL POSTS
export const getAllPosts = (page) => {
  return API.get(`/posts?page=${page}`);
};

// GET POSTS BY SEARCH
export const getPostsBySearch = ({ title, tags }) =>
  API.get(`posts/srch?searchQuery=${title || "none"}&tags=${tags}`);

// EDIT POST
export const editPost = (updatePost) =>
  API.patch(`${"/posts"}/${updatePost.currentPostId}`, updatePost.postData);

// DELETE POST
export const deletePost = (id) => API.delete(`/posts/${id}`);

//LIKE POST
export const likePost = (id) => API.patch(`/posts/${id}/likes`);

// GET SINGLE POST
export const getSinglePost = (id) => API.get(`/posts/${id}`);

// REGISTER & LOGIN
export const registerUser = (userInfo) => API.post("/user/register", userInfo);
export const loginUser = (userInfo) => API.post("/user/login", userInfo);
