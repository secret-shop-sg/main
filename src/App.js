import React from "react";
import "./App.css";
import Header from "./components/Main/Header";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

// combine reducers
const rootReducer = combineReducers({});
// create store
const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
      </div>
    </Provider>
  );
}

export default App;
