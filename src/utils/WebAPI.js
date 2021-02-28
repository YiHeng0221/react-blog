import { getAuthToken } from "./auth";

const BASE_URL = "https://student-json-api.lidemy.me";

// GET 系列
export const getPosts = (num) => {
  if (num) {
    return fetch(
      `${BASE_URL}/posts?_sort=createdAt&_order=desc&_limit=${num}`
    ).then((res) => res.json());
  }
  return fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`).then((res) =>
    res.json()
  );
};

export const getSinglePost = async (id) => {
  const fetchAPI = await fetch(`${BASE_URL}/posts?id=${id}`);
  const jsonData = await fetchAPI.json();
  return jsonData;
};

export const getMe = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

//  POST 系列
export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const addNewPost = (title, body) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
    }),
  }).then((res) => res.json());
};

// DELETE 系列

export const deletePost = (id) => {
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

// 註冊功能

export const register = (nickname, username, password) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  }).then((res) => res.json());
};

// 留言板

export const addNewComment = (nickname, body) => {
  return fetch(`${BASE_URL}/comments`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      body,
    }),
  }).then((res) => res.json());
};

export const getComments = () => {
  return fetch(`${BASE_URL}/comments?_sort=createdAt&_order=desc`).then((res) =>
    res.json()
  );
};
