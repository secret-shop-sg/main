import React, { useCallback, useEffect, useReducer } from "react";
import "./Login.css";
import "../../constants/styles/Bootstrap.css";
import { useAPI } from "../../utils/useAPI";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { userLogin } from "../../store/actions/userActions";

// reducer for login data
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      // update field values
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };

      // update field validity
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };

      // check if all fields are valid
      let formIsValid = true;
      for (const key in updatedValidities) {
        if (!updatedValidities[key]) {
          formIsValid = false;
          break;
        }
      }

      // return updated state
      return {
        ...state,
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        formIsValid: formIsValid,
      };
    default:
      return state;
  }
};

function Login(props) {
  const dispatch = useDispatch();

  // use reducer for login data
  const [sendRequest] = useAPI();
  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      username: "",
      password: "",
      // TODO: check if handling password securely
    },
    inputValidities: {
      username: false,
      password: false,
    },
    formIsValid: false,
  });

  // input handler for both fields
  const inputChangeHandler = (inputIdentifier, value) => {
    // check validity
    let isValid;
    if (value.length === 0) {
      isValid = false;
    } else {
      isValid = true;
    }

    //dispatch to reducer
    dispatchForm({
      type: "UPDATE",
      value: value,
      input: inputIdentifier,
      isValid: isValid,
    });
  };

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      props.loginFormHandler();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const responseData = await sendRequest("/api/user/login", "POST", {
      // change the fields below to the actual fields
      username: formState.inputValues.username,
      password: formState.inputValues.password,
    });

    // responseData returns the user's userID
    if (responseData) {
      if (!responseData.validCredentials) {
        // means either username or password is wrong
        alert("Authentication failed");
      } else {
        // login in redux
        //dispatch(userLogin(userID, formState.inputValues.username));
        alert("Log in successful");
      }
    }
  };

  return (
    <div className="wrapper">
      <div id="formContent">
        <div className="closebutton" onClick={props.closeButtonHandler}>
          X
        </div>
        <div style={{ paddingTop: 10, paddingBottom: 10 }} className="fadeIn">
          <FaUserCircle size={61} />
        </div>
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            id="username"
            className="fadeIn input textthing"
            name="login"
            placeholder="username"
            onChange={(e) => inputChangeHandler(e.target.id, e.target.value)}
          />
          <input
            type="password"
            id="password"
            className="fadeIn input textthing"
            name="login"
            placeholder="password"
            onChange={(e) => inputChangeHandler(e.target.id, e.target.value)}
          />
          <input type="submit" className="fadeIn input" value="Log In" />
        </form>

        <div id="formFooter">
          <a className="underlineHover" href="#">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
