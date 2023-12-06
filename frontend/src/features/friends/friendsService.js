import axios from "axios";
import { fetcher } from "../../app/fetcher";

// TODO  - write sth like this for dynamic urls
// const API_URL = `${getBaseUrl()}/api/auth`;

// temporary - this will go to a seperate file
const getBaseUrl = () => {
  return window.location.hostname === "localhost"
    ? "http://localhost:4202"
    : `${window.location.protocol}//${window.location.hostname}`;
};

const prefix = "/friends";
const API_URL_FRIENDS = `${getBaseUrl()}/users`; // TEMP !!

const getAllFriends = async () => {
  const response = await fetcher.get(prefix);

  return response.data;
};

const addFriend = async (username) => {
  const response = await axios.post(`${prefix}/request`, { username: username });

  return response.data;
};

const friendsService = {
  getAllFriends,
  addFriend,
};

export default friendsService;
