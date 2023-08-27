import {messageRepository} from "../repositories/index.js";

class MessageService {
  constructor() {}
  async getMessages() {
    const messages = await messageRepository.getMessages();
    return messages;
  }

  async createMessages(message) {
    let createdMessage = await messageRepository.createMessages(message);
    return createdMessage;
  }
}

export const messageService = new MessageService();
