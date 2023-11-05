import axios from "axios";

// TODO  - write sth like this for dynamic urls
// const API_URL = `${getBaseUrl()}/api/auth`;

// temporary - this will go to a seperate file
const getBaseUrl = () => {
  return window.location.hostname === "localhost"
    ? "http://localhost:4202"
    : `${window.location.protocol}//${window.location.hostname}`;
};

const API_URL_CHAT = `${getBaseUrl()}/chat`;

const createChat = async (newChatData) => {
  const response = await axios.post(`${API_URL_CHAT}/`, newChatData);

  return response.data;
};

const chatService = {
  createChat,
};

export default chatService;
