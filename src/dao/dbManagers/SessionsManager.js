import userModel from "../models/user.model.js";

export default class SessionManager {
    constructor(){}

    getUser = async (user)=>{
        try {
            const foundUser = await userModel.findOne(user);
            return foundUser;
        } catch (error) {
            console.log(error);
        }
    };

    register = async (user)=>{
        try {
            const registeredUser = await userModel.create(user);
            return registeredUser
        } catch (error) {
            console.log(error)
        }
    }
}