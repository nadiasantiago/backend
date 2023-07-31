import { sessionRepository } from "../repositories/sessions.repository.js";

class SessionService{
    constructor(){}

    async getUser (email){
        const user = await sessionRepository.getUser({email});
        return user
    }
    async updatePassword(email, hashedPassword){
        const updatedPassword = await sessionRepository.updatePassword(email, hashedPassword)
        return updatedPassword
    }
    async changeRole(uid, rol){
        const changeRole = await sessionRepository.changeRole(uid, rol)
        return changeRole
    }
    async deleteUser(uid){
        const deleteUser = await sessionRepository.deleteUser(uid);
        return deleteUser
    }
}

export const sessionService = new SessionService();