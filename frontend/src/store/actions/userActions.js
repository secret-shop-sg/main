// login
export const userLogin = (userId) => {
  return { type: "LOGIN", userId: userId };
};

// logout
export const userLogout = () => {
  return { type: "LOGOUT" };
};

/*
HOW TO LOGIN AND LOGOUT

import { useDispatch } from "react-redux";
// import the functions above

// inside component
dispatch = useDispatch();

// TO LOGIN
dispatch(userLogin(userId));
// TO LOGOUT
dispatch(userLogout)

*/
