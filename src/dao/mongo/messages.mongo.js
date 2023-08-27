import { messageModel } from "./models/messages.model.js";

class Messages {
  constructor() {}
  getMessages = async () => {
    try {
      const messages = await messageModel.find().lean();
      return messages;
    } catch (error) {
      console.log(error);
    }
  };

  createMessages = async (message) => {
    try {
      const createdMessage = await messageModel.create(message);
      return createdMessage;
    } catch (error) {
      console.log(error);
    }
  };
}

export const messageMongo = new Messages()