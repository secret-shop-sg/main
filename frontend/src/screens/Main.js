import React from "react";
import Header from "../components/Main/Header";
import Platforms from "../components/Home/Platforms";
import "./styles/Main.css";

const Main = (props) => {
  return (
    <div className="mainScreen">
      <Header />
      <div className="display">
        <Platforms />
      </div>
    </div>
  );
};

export default Main;
