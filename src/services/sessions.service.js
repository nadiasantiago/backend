import { sessionRepository } from "../repositories/sessions.repository.js";

class SessionService{
    constructor(){}

    async getUser (email){
        const user = await sessionRepository.getUser(email);
        return user
    }
    async updatePassword(email, hashedPassword){
        const updatedPassword = await sessionRepository.updatePassword(email, hashedPassword)
        return updatedPassword
    }
}

export const sessionService = new SessionService();