import {
  getAndSaveBotResponseService,
  getMessageService,
  saveMessageService,
} from "../services/message.service";

export const getAndSaveBotResponse = async (req, res) => {
  try {
    return await getAndSaveBotResponseService(req.body, res);
  } catch (error) {
    return await res.status(500).json({
      error,
    });
  }
};

export const saveMessage = async (req, res) => {
  try {
    return await saveMessageService(req.body, res);
  } catch (error) {
    return await res.status(500).json({
      error,
    });
  }
};

export const getMessage = async (req, res) => {
  try {
    return await getMessageService(req.params, res);
  } catch (error) {
    return await res.status(500).json({
      error,
    });
  }
};
