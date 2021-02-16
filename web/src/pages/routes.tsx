import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { IRootState } from "../interface/rootState.interface";
import { CreateLinkPage } from "./CreateLinkPage";
import { LinkDetails } from "./LinkDetails";
import { LoginPage } from "./LoginPage";
import { ProfilePage } from "./ProfilePage";
import { RegisterPage } from "./RegisterPage";

interface routesProps {}

export const Routes: React.FC<routesProps> = ({}) => {
  const isUndefined = typeof useAuth() === "undefined";
  const isLogged = useSelector((state: IRootState) => state.authReducer.user);
  if (isUndefined) {
    return null;
  }
  if (isLogged) {
    return (
      <Switch>
        <Route component={CreateLinkPage} path="/create" exact />
        <Route component={ProfilePage} path="/profile" exact />
        <Route component={LinkDetails} path={`/details/:id`} />
        <Redirect to="/profile" />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route component={LoginPage} path="/login" exact />
        <Route component={RegisterPage} path="/register" exact />
        <Redirect to="/login" />
      </Switch>
    );
  }
};
