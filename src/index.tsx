/**
 * @module MainEntryPoint
 */
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import * as _ from "lodash";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import AppContainer from "./containers/app";
import Seeder from "./lib/seeder";
import USER from "./lib/user";
import { updateUser } from "./redux/app/actions";
import { setUser } from "./redux/app/actions";
import { store } from "./redux/store";
import t from "./services/trans/i18n";
import "./theme/application.less";

require("./lib/icon");

import { VERSION } from "./constants";
import KeyCloacksApi from "./lib/api-old";

// we need a history object to hold browsers history
const history = createBrowserHistory();
const user = USER.getInstance();
// an unique user instance returned from an statc method in user class

const keyCloak = KeyCloacksApi.getInstance();

console.log("becopay version: " + VERSION);

// prepare user properties and set defaults from keycloak
function getUserAttr() {
    const userData = _.pick(user.keycloak.tokenParsed, ["email", "given_name", "family_name", "realm_access", "auth_time"]);
    return {
        ...userData,
        token: user.keycloak.token,
        apiKey: _.get(user.keycloak, "profile.attributes.apikey[0]", ""),
        mobile: _.get(user.keycloak, "profile.attributes.mobile[0]", ""),
        // theme: _.get(user.keycloak, "profile.attributes.theme[0]", "light"),
        // language: _.get(user.keycloak, "profile.attributes.locale[0]", ""),
    };

}

// Docs : `https://www.keycloak.org/docs/3.0/securing_apps/topics/oidc/javascript-adapter.html`
user.keycloak.init({ onLoad: "check-sso" }).success((authenticated) => {

    if (authenticated) {
        // token is in user.keycloak.token, pick and other useful information for saving in store
        // get user profile
        // console.log(user.keycloak);
        user.keycloak.loadUserProfile().then(() => {
            // set user in store
            store.dispatch(updateUser(getUserAttr()));

            // set user in user object because it has an instance now
            user.setUser(getUserAttr());
            // seeding user with defaults and random generated data
            // if (store.getState().app.user && !store.getState().app.user.balance) {
            // console.log("seeding user ... ");
            const seeder = new Seeder();
            seeder.initialSeed();
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

        // set token in api lib
        // api.SetHeader("Authorization", "Token " + JSON.stringify(user.keycloak.tokenParsed));
        keyCloak.setAuthToken(user.keycloak.token);

        // }

        // refresh token automatically after 1 minutes
        setInterval(() => {
            user.keycloak.updateToken().success((refreshed) => {
                if (refreshed) {
                    keyCloak.setAuthToken(user.keycloak.token);
                }
                user.keycloak.loadUserProfile().then(() => {
                    store.dispatch(updateUser(getUserAttr()));
                });
            });
        }, 60000);
    } else {
        // user is not logged in
        store.dispatch(setUser(null));
        user.keycloak.login({ kcLocale: t.default.language });
    }
    user.keycloak.onAuthLogout = () => {
        // user is sso loged out
        const cleanUser = user.getCurrent();
        Object.keys(cleanUser).map((key) => {
            if (key !== "theme" && key !== "language") {
                cleanUser[key] = null;
            }
        },
        );
        store.dispatch(setUser(
            { ...cleanUser },
        ));
        user.keycloak.login({ kcLocale: t.default.language });
    };
});
