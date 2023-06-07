import MessagesManager from '../dao/dbManagers/MessagesManager.js';

const messagesManager = new MessagesManager();
class MessageRepository{
    constructor(messagesManager){}

    getMessages = async()=>{
        const messages = await messagesManager.getMessages();
        return messages
    }

    createMessages = async(message)=>{
        let createdMessage = await messagesManager.createMessages(message);
        return createdMessage
    }
}

export const messageReposistory = new MessageRepository();