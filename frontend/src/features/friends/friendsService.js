import axios from "axios";

// TODO  - write sth like this for dynamic urls
// const API_URL = `${getBaseUrl()}/api/auth`;

// temporary - this will go to a seperate file
const getBaseUrl = () => {
  return window.location.hostname === "localhost"
    ? "http://localhost:4202"
    : `${window.location.protocol}//${window.location.hostname}`;
};

const API_URL_FRIENDS = `${getBaseUrl()}/friends`;

const getAllFriends = async () => {
  const response = await axios.get(`${API_URL_FRIENDS}`);

  return response.data;
};

const addFriend = async (username) => {
  const response = await axios.post(`${API_URL_FRIENDS}/request`, { username: username });

  return response.data;
};

const friendsService = {
  getAllFriends,
  addFriend,
};

export default friendsService;
