import { GoogleGenerativeAI } from "@google/generative-ai";
import dataSource from "../database/ormconfig";
import { Message } from "../entities/Message";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const generationConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};
const messageRepository = dataSource.getRepository(Message);

const model = genAI.getGenerativeModel({
  model: "gemini-pro",
  generationConfig,
});

export const getAndSaveBotResponseService = async (req, res) => {
  const { question } = req;

  const prompt = question;
  const result = await model.generateContent(prompt);

  if (result) {
    const response = result.response.text();

    const botResponse: Message = {
      messageId: "075a5f6c-dbbc-48a8-9324-88af405128af",
      conversationId: "075a5f6c-dbbc-48a8-9324-88af405128af",
      userId: "075a5f6c-dbbc-48a8-9324-88af405128af",
      interactionId: "075a5f6c-dbbc-48a8-9324-88af405128af",
      content: response,
      isUser: false,
    };

    await messageRepository.save(botResponse);

    return await res.status(200).json({
      msg: response,
    });
  }
};

export const saveMessageService = async (req, res) => {
  try {
    const response = await messageRepository.save(req);
    return await res.status(200).json({
      msg: response,
    });
  } catch (error) {
    return await res.status(500).json({
      error,
    });
  }
};

export const getMessageService = async (req, res) => {
  const { userId } = req;
  const response = await messageRepository.find({
    where: { userId: userId },
  });
  return await res.status(200).json({
    msg: response,
  });
};
