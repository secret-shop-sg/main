// login
export const userLogin = (userId) => {
  return { type: "LOGIN", userId: userId };
};

// logout
export const userLogout = () => {
  return { type: "LOGOUT" };
};
