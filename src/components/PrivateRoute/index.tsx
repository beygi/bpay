import * as React from "react";
import {Redirect, Route} from "react-router";
import {store} from "../../redux/store";

const PrivateRoute = ({component: Component, ...rest}): JSX.Element => {
    // every private page will be redirect to login page when user does not exist in store
    return (
        <Route {...rest} render={(props) => (
            store.getState().app.user ? (
                <Component {...props}/>
            ) : (
                <Component {...props}/>
            )
        )}/>
    );
};
 // TODO
 /*<Redirect to={{
    pathname: "/user/login",
    state: {from: props.location},
}}/>*/
export default PrivateRoute;
