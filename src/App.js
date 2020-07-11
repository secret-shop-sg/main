import React from "react";
import Main from "./screens/Main"
import "./App.css";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import SearchResult from "./screens/SearchResult"
import Error404 from "./screens/Error404"

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
            <Route path= "/search" component={SearchResult}/>
            <Route component = {Error404} />
            {/* Routes client to error404 page if path does not match any of the others*/}
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
