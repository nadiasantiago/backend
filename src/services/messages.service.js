import { messageReposistory } from "../repositories/messages.repository.js";

class MessageService {
    constructor(){}
    async getMessages(){
        const messages = await messageReposistory.getMessages();
        return messages
    }

    async createMessages(message){
        let createdMessage = await messageReposistory.createMessages(message);
        return createdMessage
    }
}

export const messageService = new MessageService()