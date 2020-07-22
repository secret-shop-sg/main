import React, { useState } from "react";
import "./Header.css";
import { FaUserAlt, FaUserPlus } from "react-icons/fa";

function UserButtons(props) {
    return (
        <div id="userbuttonholder">
            <span
                className="userButtons"
                id="login"
                onClick={() => {
                    if (props.signupForm) {
                        props.loginFormHandler();
                        props.signupFormHandler()
                    }
                    else {
                        props.loginFormHandler()
                    }
                }
                }
            >
                <span>
                    <FaUserAlt size={18} />
                </span>
                <span> </span>
                <span>
                    Login
            </span>
            </span>
            <span
                id="signup"
                className="userButtons"
                onClick={() => {
                    if (props.loginForm) {
                        props.loginFormHandler();
                        props.signupFormHandler()
                    }
                    else {
                        props.signupFormHandler()
                    }
                }
                }
            >
                <span>
                    <FaUserPlus size={23} />
                </span>
                <span> </span>
                <span>
                    Signup
            </span>
            </span>
        </div>
    )
}

export default UserButtons