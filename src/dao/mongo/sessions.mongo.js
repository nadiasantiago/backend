import userModel from "./models/user.model.js";

class Session {
  constructor() {}

  getUser = async (user) => {
    try {
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

  updateUser = async (query, update) => {
    try {
      const updatedUser = await userModel.updateOne(query,update);
      return updatedUser;
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

export const sessionMongo = new Session()