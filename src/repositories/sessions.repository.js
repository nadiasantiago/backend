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
    
    changeRole = async (uid, rol)=>{
        const changeRole = await sessionManager.changeRole(uid, rol);
        return changeRole
    }

}

export const sessionRepository = new SessionRepository();
