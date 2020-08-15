import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import "./App.css";
import RoutingTable from "./RoutingTable";

// import reducers
import userReducer from "./store/reducers/userReducer";

// combine reducers
const rootReducer = combineReducers({
  user: userReducer,
});

// create store
const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
