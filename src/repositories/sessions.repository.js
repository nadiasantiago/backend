import SessionManager from "../dao/dbManagers/SessionsManager.js";
const sessionManager = new SessionManager();

class SessionRepository{
    constructor(sessionManager){}

    getUser = async(email)=>{
        const user = await sessionManager.getUser(email);
        return user
    }
}

export const sessionRepository = new SessionRepository();
