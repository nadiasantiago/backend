import { sessionRepository } from "../repositories/sessions.repository.js";

class SessionService {
  constructor() {
    this.sessionRepository = sessionRepository;
  }

  async getUser(query) {
    const user = await this.sessionRepository.getUser(query);
    return user;
  }
  async updateUser(query, update) {
    const updatedPassword = await this.sessionRepository.updateUser(
      query,
      update
    );
    return updatedPassword;
  }
  async changeRole(uid, rol) {
    const changeRole = await this.sessionRepository.changeRole(uid, rol);
    return changeRole;
  }
  async deleteUser(uid) {
    const deleteUser = await this.sessionRepository.deleteUser(uid);
    return deleteUser;
  }
}

export const sessionService = new SessionService();
