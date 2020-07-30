import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchResult from "./screens/SearchResult";
import ClientSideErrorsPage from "./screens/errors/ClientSideErrorsPage";
import ListingDetails from "./screens/ListingDetails";
import Main from "./screens/Main";
import UserPage from "./screens/UserPage";
import ServerError from "./screens/errors/ServerSideErrorPage";
import CreateListing from "./screens/CreateListing";
import AddGames from "./components/AddGames";

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
        <Route path="/test" component={AddGames} />
        <Route component={ClientSideErrorsPage} />
        {/* Routes client to ClientSideErrorsPage page if path does not match any of the others*/}
      </Switch>
    </Router>
  );
};

export default RoutingTable;
