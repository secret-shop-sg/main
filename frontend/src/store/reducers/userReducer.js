// set intitial state of listings

const intialState = {
  userId: null,
};

const userReducer = (state = intialState, action) => {
  switch (action.type) {
    case "LOGIN":
      // login
      return {
        ...state,
        userId: action.userId,
      };
    case "LOGOUT":
      // logout
      return {
        ...state,
        userId: null,
      };
    default:
      return state;
  }
};

export default userReducer;

/*
// HOW TO GET USER ID
import { useSelector } from "react-redux";
const id = useSelector((state) => state.user.userId);
// if not logged in, id will be null
*/
