import axios from "axios";
import { fetcher } from "../app/fetcher";

// TODO  - write sth like this for dynamic urls
// const API_URL = `${getBaseUrl()}/api/auth`;

// temporary - this will go to a seperate file
const getBaseUrl = () => {
  return window.location.hostname === "localhost"
    ? "http://localhost:4202"
    : `${window.location.protocol}//${window.location.hostname}`;
};

// not sure if this is needed but will see
// const API_URL_AUTH = `${getBaseUrl()}/auth`;
const prefix = "/auth";

const login = async (userLoginData) => {
  const response = await fetcher.post(`${prefix}/login`, userLoginData);

  if (response.data && response.data.isAuthSuccessful && response.data.expires) {
    localStorage.setItem("tokenExpires", response.data.expires);
    localStorage.setItem("username", response.data.user.username);
    localStorage.setItem("userId", response.data.user.user_id);
  }

  return response.data;
};

const register = async (userRegistrationData) => {
  const response = await fetcher.post(`${prefix}/register`, userRegistrationData);

  if (response.data && response.data.isAuthSuccessful && response.data.expires) {
    localStorage.setItem("tokenExpires", response.data.expires);
    localStorage.setItem("username", response.data.user.username);
    localStorage.setItem("userId", response.data.user.user_id);
  }

  return response.data;
};

const logout = async () => {
  const response = await fetcher.post(`${prefix}/logout`);

  if (response.status >= 200 && response.status < 300) {
    localStorage.removeItem("tokenExpires");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
  }

  return response.data;
};

const authService = {
  login,
  register,
  logout,
};

export default authService;
