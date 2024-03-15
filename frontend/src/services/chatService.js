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

const API_URL_CHAT = `${getBaseUrl()}/chat`;
const prefix = "/chat";

const createChat = async (newChatData) => {
  const response = await fetcher.post(prefix, newChatData);

  return response.data;
};

const getAllChats = async () => {
  const response = await fetcher.get(prefix);

  return response.data;
};

const chatService = {
  createChat,
  getAllChats,
};

export default chatService;
