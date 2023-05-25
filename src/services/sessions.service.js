import { sessionRepository } from "../repositories/sessions.repository.js";

class SessionService{
    constructor(){}

    async getUser (email){
        const user = await sessionRepository.getUser(email);
        return user
    }
}

export const sessionService = new SessionService();