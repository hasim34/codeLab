// If you have DB, use mysql2 and real queries
// For minimal JWT test without DB:
export const findUserByEmail = async (email) => {
  // return dummy user
  if(email === "test@gmail.com") {
    return { user_id: 1, email: "test@gmail.com", password: "$2a$10$hashedpassword" };
  }
  return null;
};

export const createUser = async (name, roll_number, email, phone, password) => {
  // return fake user id
  return 1;
};

export const findUserById = async (id) => {
  return { user_id: id, email: "test@gmail.com", name: "Test User" };
};
