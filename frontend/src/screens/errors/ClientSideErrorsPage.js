import React from "react";
import { useHistory } from "react-router-dom";

const ClientSideErrorsPage = (props) => {
  let error;
  if (props.location.state) {
    error = props.location.state.current;
  } else
    error = {
      message: "The page you are requesting for could not be found",
      status: 404,
    };

  const history = useHistory();
  const onClickHandler = () => {
    history.push("/");
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Error {error.status}</h1>
      <p>
        Oh no!. It seems like the page you are requesting could not be found. Do
        check that you have entered the right address
      </p>
      <p>Click here to return to the main page</p>
      <button onClick={onClickHandler}>Main</button>
      <hr />
      <b>Development error message: {error.message}</b>
    </div>
  );
};

export default ClientSideErrorsPage;
