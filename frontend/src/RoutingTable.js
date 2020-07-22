<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SearchResult from "./screens/SearchResult"
import Error404 from "./screens/Error404"
import ListingDetails from "./screens/ListingDetails"
import UserPage from "./screens/UserPage"
import Main from "./screens/Main"

const RoutingTable = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/search" component={SearchResult} />
                <Route path="/listing" component={ListingDetails} />
                <Route path="/user" component={UserPage} />
                <Route component={Error404} />
                {/* Routes client to error404 page if path does not match any of the others*/}
            </Switch>
        </Router>
    )
}
=======
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SearchResult from "./screens/SearchResult";
import PageNotFound from "./screens/errors/PageNotFound";
import ListingDetails from "./screens/ListingDetails";
import Main from "./screens/Main";
import ServerError from "./screens/errors/ServerError";

const RoutingTable = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/search" component={SearchResult} />
        <Route path="/listing" component={ListingDetails} />
        <Route exact path="/error/500" component={ServerError} />
        <Route component={PageNotFound} />
        {/* Routes client to PageNotFound page if path does not match any of the others*/}
      </Switch>
    </Router>
  );
};
>>>>>>> 314a3882ee08f0bdbe47dd67ad8b45e2038855cc

export default RoutingTable;
