import React from "react";
// im using this page to test cookies. Will be deleted eventually

const sendRequest = async (event) => {
  event.preventDefault();
  let response;

  try {
    response = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "Joshua", password: "qwerty" }),
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

const checkCookie = async (event) => {
  event.preventDefault();
  let response;

  try {
    response = await fetch("http://localhost:5000/api/listing/recent", {
      // mode:"cors"
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
      <input type="button" onClick={checkCookie} value="test send" />
    </div>
  );
};

export default test;
