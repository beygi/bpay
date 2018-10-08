/**
 * @module MainEntryPoint
 */
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import * as Keycloak from "keycloak-js";
import * as _ from "lodash";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Redirect, Route, Switch } from "react-router";

import AppContainer from "./containers/app";
import Seeder from "./lib/seeder";
import USER from "./lib/user";
import { updateUser } from "./redux/app/actions";
import { setUser } from "./redux/app/actions";
import { store } from "./redux/store";
import "./theme/application.less";

require("./lib/icon");

import KeyCloacksApi from "./lib/api-old";

// we need a history object to hold browsers history
const history = createBrowserHistory();
// an unique user instance returned from an statc method in user class
const user = USER.getInstance();

const keyCloak = KeyCloacksApi.getInstance();

// Docs : `https://www.keycloak.org/docs/3.0/securing_apps/topics/oidc/javascript-adapter.html`
user.keycloak.init({ onLoad: "check-sso" }).success((authenticated) => {
    if (authenticated) {
        // console.log(user.keycloak);

        // token is in user.keycloak.token, pick and other useful information for saving in store
        const userData = _.pick(user.keycloak.tokenParsed, ["email", "name", "family_name", "realm_access", "auth_time"]);
        // set user in store
        store.dispatch(updateUser({ ...userData, token: user.keycloak.token }));
        // set user in user object because it has an instance now
        user.setUser(userData);
        // set token in api lib
        // api.SetHeader("Authorization", "Token " + JSON.stringify(user.keycloak.tokenParsed));
        keyCloak.setAuthToken(user.keycloak.token);
        // seeding user with defaults and random generated data
        // if (store.getState().app.user && !store.getState().app.user.balance) {
        // console.log("seeding user ... ");
        const seeder = new Seeder();
        seeder.initialSeed();
        // }

        // refresh token automatically after 3000 seconds
        setInterval(() => {
            user.keycloak.updateToken().success((refreshed) => {
                if (refreshed) {
                    keyCloak.setAuthToken(user.keycloak.token);
                    store.dispatch(updateUser({ ...userData, token: user.keycloak.token }));
                }
            });
        }, 30000);
        ReactDOM.render(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" component={AppContainer} />
                    </Switch>
                </ConnectedRouter>
            </Provider>,
            document.getElementById("root"),
        );
    } else {
        // user is not authenticated
        store.dispatch(setUser(null));
        // redirect to login/register page
        user.keycloak.login();
    }
});
