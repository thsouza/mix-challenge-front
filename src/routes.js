import React from "react";
import { Route, Switch, Redirect, Router } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import history from './configs/history';
import SignIn from "./pages/SignIn";
import Layout from "./components/Layout";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
        }
    />
);

const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={SignIn} />
            <PrivateRoute path="/app" component={Layout} />
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </Router>
);

export default Routes;