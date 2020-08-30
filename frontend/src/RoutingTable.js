import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchResult from "./screens/SearchResult";
import ClientSideErrorsPage from "./screens/errors/ClientSideErrorsPage";
import ListingDetails from "./screens/ListingDetails";
import Main from "./screens/Main";
import UserPage from "./screens/UserPage";
import ServerSideErrorPage from "./screens/errors/ServerSideErrorPage";
import CreateListing from "./screens/CreateListing";
import UpdateProfile from "./screens/UpdateProfile";
import UpdateProfile2 from "./screens/UpdateProfile2";
import Chat from "./screens/Chat";
import AntiLoginError from "./screens/errors/AntiLoginError";

const RoutingTable = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/search" component={SearchResult} />
        <Route path="/listing" component={ListingDetails} />
        <Route exact path="/error/500" component={ServerSideErrorPage} />
        <Route exact path="/create" component={CreateListing} />
        <Route exact path="/update2" component={UpdateProfile} />
        <Route exact path="/update" component={UpdateProfile2} />
        <Route path="/user" component={UserPage} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/login=false" component={AntiLoginError} />
        <Route component={ClientSideErrorsPage} />
        {/* Routes client to ClientSideErrorsPage page if path does not match any of the others*/}
      </Switch>
    </Router>
  );
};

export default RoutingTable;
