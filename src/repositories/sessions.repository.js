import SessionManager from "../dao/dbManagers/SessionsManager.js";
const sessionManager = new SessionManager();

class SessionRepository{
    constructor(sessionManager){}

    getUser = async(email)=>{
        const user = await sessionManager.getUser(email);
        return user
    }

    updatePassword = async (email, hashedPassword)=> {
        const updatedPassword = await sessionManager.updatePassword(email, hashedPassword)
        return updatedPassword
    }

}

export const sessionRepository = new SessionRepository();
