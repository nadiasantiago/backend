import Exception from "../../exceptions.js";
import userModel from "./models/user.model.js";

class User {
  constructor() {}

  getUsers = async () => {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      throw new Exception(500, {
        status: "error",
        message: error.message,
      });
    }
  };

  getUser = async (user) => {
    try {
      const foundUser = await userModel.findOne(user);
      return foundUser;
    } catch (error) {
      throw new Exception(500, {
        status: "error",
        message: error.message,
      });
    }
  };

  register = async (user) => {
    try {
      const registeredUser = await userModel.create(user);
      return registeredUser;
    } catch (error) {
      throw new Exception(500, {
        status: "error",
        message: error.message,
      });
    }
  };

  updateUser = async (query, update) => {
    try {
      const updatedUser = await userModel.updateOne(query, update);
      return updatedUser;
    } catch (error) {
      throw new Exception(500, {
        status: "error",
        message: error.message,
      });
    }
  };

  changeRole = async (uid, rol) => {
    try {
      const changeRole = await userModel.updateOne({ _id: uid, rol });
      return changeRole;
    } catch (error) {
      throw new Exception(500, {
        status: "error",
        message: error.message,
      });
    }
  };

  deleteUser = async (uid) => {
    try {
      const deleteUser = await userModel.deleteOne({ _id: uid });
      return deleteUser;
    } catch (error) {
      throw new Exception(500, {
        status: "error",
        message: error.message,
      });
    }
  };

  deleteInactiveUsers = async (inactiveUsers) => {
    try {
      const usersDeleted = await userModel.deleteMany({
        email: { $in: inactiveUsers.map((user) => user.email) },
      });
      return usersDeleted;
    } catch (error) {
      throw new Exception(500, {
        status: "error",
        message: error.message,
      });
    }
  };
}

export const userMongo = new User();
