import React from "react";
import "../../constants/styles/Bootstrap.css";

const HomeListing = (props) => {
  return (
    <div className="card">
      <img alt="name of game" src={props.image} width={100} />
      <div className="card-body">
        <div>{props.title}</div>
        <div>{props.description}</div>
      </div>
    </div>
  );
};

export default HomeListing;
