import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchResult from "./screens/SearchResult";
import ClientSideErrorsPage from "./screens/errors/ClientSideErrorsPage";
import ListingDetails from "./screens/ListingDetails";
import Main from "./screens/Main";
import UserPage from "../src/screens/UserPage";
import ServerError from "./screens/errors/ServerSideErrorPage";
import CreateListing from "../src/screens/CreateListing";
import UpdateUser from "../src/screens/updateUserProfile";
const RoutingTable = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/search" component={SearchResult} />
        <Route path="/listing" component={ListingDetails} />
        <Route path="/user" component={UserPage} />
        <Route exact path="/error/500" component={ServerError} />
        <Route path="/create" component={CreateListing} />
        <Route path="/update" component={UpdateUser} />
        <Route component={ClientSideErrorsPage} />
        {/* Routes client to ClientSideErrorsPage page if path does not match any of the others*/}
      </Switch>
    </Router>
  );
};

export default RoutingTable;
