export default class MessageRepository {
  constructor(dao) {
    this.dao = dao
  }

  getMessages = async () => {
    const messages = await this.dao.getMessages();
    return messages;
  };

  createMessages = async (message) => {
    let createdMessage = await this.dao.createMessages(message);
    return createdMessage;
  };
}

