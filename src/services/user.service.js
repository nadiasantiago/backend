import { sessionRepository } from "../repositories/sessions.repository.js";

class UserService {
  constructor() {}
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
        userDocuments,
        status: newUserStatus,
      };

      const updatedUserDocuments = await sessionRepository.updateUser(
        { email: user.email },
        updates
      );
      console.log(updatedUserDocuments)
      return updatedUserDocuments;
    } catch (error) {
      console.log(error);
    }
  }
}

export const userService = new UserService();
