import React from "react";

const sendRequest = async (event) => {
  event.preventDefault();
  let response;

  try {
    response = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      body: { username: "Joshua", password: "qwerty" },
      mode: "cors",
      // include cookies/ authorization headers
      credentials: "include",
    });
  } catch (err) {
    console.log(err);
  }
  if (response) {
    const responseData = await response.json();
    console.log(responseData);
  }
};

const test = () => {
  return (
    <div>
      <input type="button" onClick={sendRequest} value="send" />
    </div>
  );
};

export default test;
