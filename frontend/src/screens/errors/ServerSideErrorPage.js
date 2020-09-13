import React from "react";

const ServerSideErrorPage = (props) => {
  const error = props.location.state.current || 503;
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Error {error.status}</h1>
      <p>
        Oh no! There seems to be some errors with our servers! Check back again
        in a moment
      </p>
      <p>
        Development error message: {error.message || "Error with chat server"}
      </p>
    </div>
  );
};

export default ServerSideErrorPage;
