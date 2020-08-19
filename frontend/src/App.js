import React from "react";
import "./App.css";
import RoutingTable from "./RoutingTable";

function App() {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossOrigin="anonymous"
      />
      <div className="App">
        <RoutingTable />
      </div>
    </div>
  );
}

export default App;
