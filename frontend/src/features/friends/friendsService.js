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
const prefixTemp = "/user"; // TEMP !!

const API_URL_FRIENDS = `${getBaseUrl()}/users`; // TEMP !!

const getAllFriends = async () => {
  const response = await fetcher.get(`${prefix}/friendList`);

  // const response = await fetcher.get(prefixTemp);

  return response.data;
};

const addFriend = async (username) => {
  const response = await fetcher.post(`${prefix}/request`, { username: username });

  return response.data;
};

const getAllFriendRequests = async () => {
  const response = await fetcher.get(`${prefix}/friendRequests`);

  return response.data;
};

const acceptFriendRequest = async (requestData) => {
  const response = await fetcher.put(`${prefix}/accept/${requestData.id}`, { friend_id: requestData.senderId });

  return response.data;
};

const declineFriendRequest = async (requestId) => {
  const response = await fetcher.put(`${prefix}/decline/${requestId}`);

  return response.data;
};

const friendsService = {
  getAllFriends,
  addFriend,
  getAllFriendRequests,
  acceptFriendRequest,
  declineFriendRequest,
};

export default friendsService;
