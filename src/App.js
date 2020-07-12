import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import "./App.css";
import RoutingTable from "./RoutingTable";

// import reducers
import listingReducer from "./store/reducers/listingReducer";

// combine reducers
const rootReducer = combineReducers({
  listings: listingReducer,
});

// create store
const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <RoutingTable />
      <div className="App"></div>
    </Provider>
  );
}

export default App;
