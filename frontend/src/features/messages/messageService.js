import { fetcher } from "../../app/fetcher";

const prefix = "/messages";

const getMessages = async (chat_id) => {
  const response = await fetcher.get(`${prefix}/${chat_id}`);

  return response.data;
};

const messageService = {
  getMessages,
};

export default messageService;
