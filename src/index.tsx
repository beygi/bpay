import {createBrowserHistory} from "history";
import * as Keycloak from "keycloak-js";
import * as _ from "lodash";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Redirect, Route, Router, Switch} from "react-router";
import Config from "./config";
import AppContainer from "./containers/app";
import { setUser } from "./redux/app/actions";
import {store} from "./redux/store";

const history = createBrowserHistory();
const keycloak = Keycloak(Config.keycloakConfig);

keycloak.init({ onLoad: "check-sso" }).success((authenticated) => {
  if (authenticated) {
      // console.log(keycloak.tokenParsed);
      const userData = _.pick(keycloak.tokenParsed, ["email", "name", "realm_access"]);
      // set user in store
      store.dispatch(setUser(userData));
} else {
    console.log(keycloak);
    // keycloak.login();
}
  ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route path="/" component={AppContainer}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("root"),
);
});
