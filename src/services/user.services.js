import User from "../models/user.models.js";

 const createUser = async ({email, firstname, lastname, password}) =>{
  if(!firstname || !email || !password){
    throw new Error("All fields are required")
  }

    const user = User.create({
    fullname: {
      firstname,
      lastname
    },
    email,
    password
  });

  return user;
}

export default createUser

