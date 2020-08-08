import React, { useCallback, useEffect, useReducer } from "react";
import "./Login.css";
import "../../constants/styles/Bootstrap.css";
import { FaUserCircle } from "react-icons/fa";
import { useAPI } from "../../utils/useAPI";
import { useDispatch } from "react-redux";
import { userLogin } from "../../store/actions/userActions";

// icons
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

// reducer for signup data
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
    case "CHECK_ACCEPTED":
      // update accepted
      const updatedAccepted = {
        ...state.inputAccepted,
        [action.input]: action.value,
      };

      // return updated state
      return {
        ...state,
        inputAccepted: updatedAccepted,
      };
    default:
      return state;
  }
};

function Signup(props) {
  // redux dispatch
  const dispatch = useDispatch();
  const [sendRequest] = useAPI();
  // use reducer for signup data
  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      username: "",
      email: "",
      password: "",
      confirmedPassword: "",
      // TODO: check if handling password securely
    },
    inputValidities: {
      username: false,
      email: false,
      password: false,
      confirmedPassword: false,
    },
    formIsValid: false,
    inputAccepted: {
      username: false,
      email: false,
    },
  });

  // input handler for all fields
  const inputChangeHandler = (inputIdentifier, value) => {
    // check if valid
    let isValid;
    if (value.length === 0) {
      isValid = false;
    } else {
      isValid = true;
    }
    // more specific validity checks
    switch (inputIdentifier) {
      case "username":
        break;
      case "email":
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(value).toLowerCase())) {
          isValid = false;
        }
        break;
      case "password":
        if (value.length < 6) {
          isValid = false;
        }
        break;
      case "confirmedPassword":
        if (value !== formState.inputValues.password) {
          isValid = false;
        }
        break;
      default:
        break;
    }

    // dispatch to reducer
    dispatchForm({
      type: "UPDATE",
      value: value,
      input: inputIdentifier,
      isValid: isValid,
    });
  };

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      props.signupFormHandler();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  // input is unfocused - check if value is accepted
  const onBlurHandler = async (event) => {
    const value = event.target.value;
    const inputIdentifier = event.target.id;
    let responseData;

    // do some other validation for username below?
    switch (inputIdentifier) {
      case "username":
        responseData = await sendRequest(
          "/api/user/validate/username",
          "POST",
          {
            username: value,
          }
        );
        break;
      case "email":
        responseData = await sendRequest("/api/user/validate/email", "POST", {
          email: value,
        });
        break;
      default:
        break;
    }

    // handle response
    if (responseData) {
      // dispatch results to reducer
      dispatchForm({
        type: "CHECK_ACCEPTED",
        value: responseData.isValid,
        input: inputIdentifier,
      });
    }
  };

  // submit button pressed
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // if form invalid, disallow submission
    if (!formState.formIsValid) {
      alert("Invalid fields");
      return;
    }

    const responseData = await sendRequest("/api/user/signup", "POST", {
      username: formState.inputValues.username,
      email: formState.inputValues.email,
      password: formState.inputValues.password,
    });

    // responseData returns the user's userID
    if (responseData) {
      if (responseData.userID) {
        // store userid in redux
        dispatch(
          userLogin(responseData.userID, formState.inputValues.username)
        );
        // success
        alert("Sign up successful");
        props.closeButtonHandler();
      }
    }
  };

  return (
    <div className="wrapper">
      <div id="formContent">
        <div className="closebutton" onClick={props.closeButtonHandler}>
          X
        </div>
        <div
          style={{ paddingTop: 10, paddingBottom: 10 }}
          className="fadeIn first"
        >
          <FaUserCircle size={61} />
        </div>
        <form onSubmit={onSubmitHandler}>
          <div className="fadeIn input textthing">
            <input
              type="text"
              id="username"
              className="validated-input"
              name="login"
              placeholder="username"
              onChange={(e) => inputChangeHandler(e.target.id, e.target.value)}
              onBlur={onBlurHandler}
            />
            {formState.inputAccepted.username &&
              formState.inputValues.username && <AiOutlineCheckCircle />}
            {!formState.inputAccepted.username &&
              formState.inputValues.username && <AiOutlineCloseCircle />}
          </div>
          <div className="fadeIn input textthing">
            <input
              type="email"
              id="email"
              className="validated-input"
              name="login"
              placeholder="email"
              onChange={(e) => inputChangeHandler(e.target.id, e.target.value)}
              onBlur={onBlurHandler}
            />
            {formState.inputAccepted.email && formState.inputValues.email && (
              <AiOutlineCheckCircle />
            )}
            {!formState.inputAccepted.email && formState.inputValues.email && (
              <AiOutlineCloseCircle />
            )}
          </div>
          <input
            type="password"
            id="password"
            className="fadeIn input textthing"
            name="login"
            placeholder="password"
            onChange={(e) => inputChangeHandler(e.target.id, e.target.value)}
          />
          <input
            type="password"
            id="confirmedPassword"
            className="fadeIn input textthing"
            name="login"
            placeholder="confirm password"
            onChange={(e) => inputChangeHandler(e.target.id, e.target.value)}
          />
          <input
            type="submit"
            className="fadeIn input"
            value="Create Account"
          />
        </form>
      </div>
    </div>
  );
}

export default Signup;
