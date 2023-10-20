import axios from "axios";

// TODO  - write sth like this for dynamic urls
// const API_URL = `${getBaseUrl()}/api/auth`;

// temporary
const API_URL = `http://localhost:4202`;

const login = async (userLoginData) => {
  const response = await axios.post(`${API_URL}/login`, loginData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const register = async (userRegistrationData) => {
  const response = await axios.post(
    `${API_URL}/register`,
    userRegistrationData
  );

  return response.data;
};

const userService = {
  login,
  register,
};

export default userService;
