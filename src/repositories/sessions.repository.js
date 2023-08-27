export default class SessionRepository {
  constructor(dao) {
    this.dao = dao
  }

  getUser = async (email) => {
    const user = await this.dao.getUser(email);
    return user;
  };

  updateUser = async (query, update) => {
    const updatedUser = await this.dao.updateUser(
      query,
      update
    );
    return updatedUser;
  };

  changeRole = async (uid, rol) => {
    const changeRole = await this.dao.changeRole(uid, rol);
    return changeRole;
  };

  deleteUser = async (uid) => {
    const deleteUser = await this.dao.deleteUser(uid);
    return deleteUser;
  };
}