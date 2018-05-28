import {createBrowserHistory} from "history";
import * as Keycloak from "keycloak-js";
import * as _ from "lodash";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Redirect, Route, Switch} from "react-router";
import { ConnectedRouter} from "react-router-redux";

import AppContainer from "./containers/app";
import USER from "./lib/user";
import { setUser } from "./redux/app/actions";
import {store} from "./redux/store";

const history = createBrowserHistory();
const user =  USER.getInstance();

user.keycloak.init({ onLoad: "check-sso" }).success((authenticated) => {
  if (authenticated) {
      // console.log(user.keycloak.tokenParsed);
      // TODO: add token in store
      const userData = _.pick(user.keycloak.tokenParsed, ["email", "name", "realm_access"]);
      // set user in store
      store.dispatch(setUser(userData));
      // set user in user object because it an instance now
      user.setUser(userData);
} else {
    console.log(user.keycloak);
    // user.keycloak.login();
}
  ReactDOM.render(
    <Provider store={store}>
         <ConnectedRouter history={history}>
            <Switch>
                <Route path="/" component={AppContainer}/>
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root"),
);
});
