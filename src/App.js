import React from "react";
import Main from "./screens/Main"
import "./App.css";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SearchResult from "./screens/SearchResult"

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
            <Route exact path = "/" component ={Main} />
            <Route exact path = "/search" component ={SearchResult} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
