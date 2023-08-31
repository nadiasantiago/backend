import outputUserDto from "../dao/dto/outputUser.dto.js";
import Exception from "../exceptions.js";
import { sessionRepository, userRepository } from "../repositories/index.js";
import { mailingService } from "./mailing.service.js";

class UserService {
  constructor() {}
  async getUsers() {
    try {
      const users = await userRepository.getUsers();
      const usersDto = users.map((user) => {
        return new outputUserDto(user);
      });
      return usersDto;
    } catch (error) {
      throw error;
    }
  }
  async deleteInactiveUsers() {
    try {
      const users = await this.getUsers();

      const currentDate = new Date();
      const lastTwoDays = currentDate - 2 * 24 * 60 * 60 * 1000;

      const inactiveUsers = users.filter((user) => {
        const lastConnection = new Date(user.last_connection);
        if (user.rol != "admin" && lastConnection <= lastTwoDays) return user;
      });

      if (inactiveUsers.length == 0) {
        throw new Exception(400, {
          status: "error",
          message: `No se encontraron usuarios inactivos`,
        });
      }

      const usersDeleted = await userRepository.deleteInactiveUsers(
        inactiveUsers
      );
      inactiveUsers.forEach(async (user) => {
        await mailingService.userDeleted(user);
      });
      if (!usersDeleted)
        throw new Exception(400, {
          status: "error",
          message: `Error al eliminar los usuarios`,
        });
      return usersDeleted;
    } catch (error) {
      throw error;
    }
  }
  async updatedUserDocuments(user, newDocuments) {
    try {
      const userDocuments = user.documents;
      const newUserStatus = [];
      const newUserDocuments = [];

      Object.values(newDocuments).forEach((e) => {
        e.forEach((el) => {
          const doc = {
            name: el.fieldname,
            reference: `${el.fieldname}/${el.filename}`,
          };
          newUserDocuments.push(doc);
        });
      });

      newUserDocuments.forEach((newDoc) => {
        const existingDocument = userDocuments.findIndex(
          (doc) => doc.name === newDoc.name
        );
        if (existingDocument !== -1) {
          userDocuments[existingDocument] = newDoc;
        } else {
          userDocuments.push(newDoc);
        }
      });

      userDocuments.forEach((e) => {
        newUserStatus.push(e.name);
      });

      const updates = {
        documents: userDocuments,
        status: newUserStatus,
      };
      const updatedUserDocuments = await sessionRepository.updateUser(
        { email: user.email },
        updates
      );
      return updatedUserDocuments;
    } catch (error) {
      console.log(error);
    }
  }
}

export const userService = new UserService();
