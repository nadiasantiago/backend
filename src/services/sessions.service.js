import {sessionRepository} from "../repositories/index.js";

class SessionService {
  constructor() {
  }

  async getUser(query) {
    const user = await sessionRepository.getUser(query);
    return user;
  }
  async updateUser(query, update) {
    const updatedPassword = await sessionRepository.updateUser(
      query,
      update
    );
    return updatedPassword;
  }
  async changeRole(uid, rol) {
    const changeRole = await sessionRepository.changeRole(uid, rol);
    return changeRole;
  }
  async deleteUser(uid) {
    const deleteUser = await sessionRepository.deleteUser(uid);
    return deleteUser;
  }
}

export const sessionService = new SessionService();
