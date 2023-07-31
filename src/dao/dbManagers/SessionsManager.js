import userModel from "../models/user.model.js";

export default class SessionManager {
  constructor() {}

  getUser = async (user) => {
    try {
      console.log(user)
      const foundUser = await userModel.findOne(user);
      return foundUser;
    } catch (error) {
      console.log(error);
    }
  };

  register = async (user) => {
    try {
      const registeredUser = await userModel.create(user);
      return registeredUser;
    } catch (error) {
      console.log(error);
    }
  };

  updatePassword = async (email, hashedPassword) => {
    try {
      const updatedPassword = await userModel.updateOne(email,hashedPassword);
      return updatedPassword;
    } catch (error) {
      console.log(error)
    }
  };

  changeRole = async(uid, rol)=>{
    try {
      const changeRole = await userModel.updateOne({_id: uid, rol})
      return changeRole
    } catch (error) {
      console.log(error)
    }
  }

  deleteUser = async (uid)=>{
    try {
      const deleteUser = await userModel.deleteOne({_id: uid});
      return deleteUser
    } catch (error) {
      console.log(error)
    }
  }
}
