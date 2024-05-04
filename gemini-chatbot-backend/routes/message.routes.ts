import express from "express";
import {
  getAndSaveBotResponse,
  getMessage,
  saveMessage,
} from "../controller/message.controller";

const messageRouter = express.Router();

messageRouter.post("/bot/response", getAndSaveBotResponse);
messageRouter.post("/save", saveMessage);
messageRouter.get("/get/:userId", getMessage);

export default messageRouter;
