import {createBrowserHistory} from "history";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Redirect, Route, Router, Switch} from "react-router";
import AppContainer from "./containers/app";
import {store} from "./redux/store";

const history = createBrowserHistory();

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
