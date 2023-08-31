
export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getUsers = async () => {
    try {
      const users = await this.dao.getUsers();
      return users;
    } catch (error) {
      throw error;
    }
  };
  deleteInactiveUsers = async (inactiveUsers)=>{
    try {
      const usersDeleted = await this.dao.deleteInactiveUsers(inactiveUsers);
      return usersDeleted
    } catch (error) {
      throw error
    }
  }
}
