
// // Static user
// const STATIC_USER = {
//   user_id: 1,
//   rollNumber: "91762315020",
//   password: "Test123!", // plaintext password
//   name: "Test User",
// };

// const findUserByrollNumber = async (rollNumber) => {
//   if (rollNumber === STATIC_USER.rollNumber) return STATIC_USER;
//   return null;
// };

// // We don’t need createUser for static login
// const createUser = async () => {
//   return 1;
// };

// const findUserById = async (id) => {
//   if (id === STATIC_USER.user_id) return STATIC_USER;
//   return null;
// };

//  module.exports = { findUserByrollNumber, createUser, findUserById };



const STATIC_USER = {
  user_id: 1,
  rollNumber: "91762315020",
  password: "Test123!", // plain password
  name: "Test User",
};

const findUserByrollNumber = async (rollNumber) => {
  if (rollNumber === STATIC_USER.rollNumber) return STATIC_USER;
  return null;
};

module.exports = { findUserByrollNumber };
