import { messageService } from "../services/messages.service.js";

export const getMessages = async (req, res) => {
  const messages = await messageService.getMessages();
  return res.send({ status: "success", payload: messages });
};

export const createMessages = async (req, res) => {
  let message = req.body;
  let createdMessage = await messageService.createMessages(message);
  res.status(201).send({ status: "OK", payload: createdMessage });
};
