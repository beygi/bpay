import { createBrowserHistory } from "history";
import * as Keycloak from "keycloak-js";
import * as _ from "lodash";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { ConnectedRouter } from "react-router-redux";

import AppContainer from "./containers/app";
import Seeder from "./lib/seeder";
import USER from "./lib/user";
import { updateUser } from "./redux/app/actions";
import { setUser } from "./redux/app/actions";
import { store } from "./redux/store";
require("./lib/icon");

import KeyCloacksApi from "./lib/api-old";

const history = createBrowserHistory();
const user = USER.getInstance();

// const api = Api.getInstance();
const keyCloak = KeyCloacksApi.getInstance();
// api.SetHeader("Accept-Language", "fa_IR");

user.keycloak.init({ onLoad: "check-sso" }).success((authenticated) => {
    if (authenticated) {
                    console.log(user.keycloak);
        // token is in user.keycloak.token
                    const userData = _.pick(user.keycloak.tokenParsed, ["email", "name", "realm_access"]);
        // set user in store
                    store.dispatch(updateUser(userData));
        // set user in user object because it has an instance now
                    user.setUser(userData);
        // set token in api lib
        // api.SetHeader("Authorization", "Token " + JSON.stringify(user.keycloak.tokenParsed));
                    keyCloak.setAuthToken(user.keycloak.token);
                    // if (store.getState().app.user && !store.getState().app.user.balance) {
                    console.log("seeding user ... ");
                    const seeder = new Seeder();
                    seeder.initialSeed();
                    // }
        // token must be refreshed automatically
                    setInterval( () => {
            user.keycloak.updateToken().success((refreshed) => {
                if (refreshed) {
                    keyCloak.setAuthToken(user.keycloak.token);
                }
            });
        }, 30000);

    } else {
        console.log(user.keycloak);
        store.dispatch(setUser(null));
        // user.keycloak.login();
    }
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
});
