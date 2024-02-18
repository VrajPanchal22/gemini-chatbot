import axios from "axios";

export const getChatHistoryService = async (userId: string) => {
  const url = `${process.env.API_BASE_URL}/message/get`;
  const { data } = await axios(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: userId,
  });

  return data;
};

interface Message {
  conversationId: string;
  userId: string;
  interactionId: string;
  content: string;
  isUser: boolean;
}

export const saveUserMessage = async (dto: Message) => {
  const url = `${process.env.API_BASE_URL}/message/save`;
  const { data } = await axios(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: dto,
  });

  return data;
};

export const getBotResponse = async (dto: Message) => {
  const url = `${process.env.API_BASE_URL}/message/bot/response`;
  const { data } = await axios(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: dto,
  });

  return data;
};

getBotResponse;
