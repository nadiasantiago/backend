class UserService {
  constructor() {}
  async updatedUserDocuments(userDocuments, newDocuments){
    try {
      const newUserStatus = [];
      const newUserDocuments = [];

      Object.values(newDocuments).forEach((e)=>{
        e.forEach((el)=>{
          const doc = {
            name: el.fieldname,
            reference: `${el.fieldname}/${el.filename}`
          }
          newUserDocuments.push(doc)
        })
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const userService = new UserService()