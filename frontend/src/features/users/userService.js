import axios from "axios";

// TODO  - write sth like this for dynamic urls
// const API_URL = `${getBaseUrl()}/api/auth`;

// temporary - this will go to a seperate file
const getBaseUrl = () => {
  return window.location.hostname === "localhost"
    ? "http://localhost:4202"
    : `${window.location.protocol}//${window.location.hostname}`;
};

const API_URL_AUTH = `${getBaseUrl()}/auth`;

const login = async (userLoginData) => {
  const response = await axios.post(`${API_URL_AUTH}/login`, userLoginData);

  // if (response.data) {
  //   localStorage.setItem("user", JSON.stringify(response.data.token));
  // }

  return response.data;
};

const register = async (userRegistrationData) => {
  const response = await axios.post(
    `${API_URL_AUTH}/register`,
    userRegistrationData
  );

  // if (response.data) {
  //   localStorage.setItem("user", JSON.stringify(response.data.token));
  // }

  return response.data;
};

const userService = {
  login,
  register,
};

export default userService;
