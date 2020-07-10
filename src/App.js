import React from "react";
import Home from "./components/Main/Home"
import "./App.css";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Search from "./components/Search/Search"

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
      <Router>
        <div className="App">
          <Switch>
            <Route exact path = "/" component ={Home} />
            <Route exact path = "/search" component ={Search} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
