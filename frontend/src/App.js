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
        <RoutingTable />
        <div className="App"></div>
      </div>
    </Provider>
  );
}

export default App;
