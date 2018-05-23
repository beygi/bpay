import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { IRootState } from "../redux/reducers";

import Layout from "./../components/Layout";
import PrivateRoute from "./../components/PrivateRoute";

import AdminDashboardContainer from "./AdminDashboard";
import GroupsContainer from "./Groups";
import LandingContainer from "./Landing";
import NotFoundContainer from "./NotFound";
import UserContainer from "./User";
import UsersContainer from "./Users";

import { setUser } from "../redux/app/actions";
import "./app.less";

import Config from "./../config";

interface IProps {
    user: any;
    setUser: (user: any) => void;
}

interface IState {
    collapsed?: boolean;
    user?: any;
}

class AppContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        const stateObj = this.parseProps(props);
        this.state = stateObj;

    }

    public componentDidMount() {
        document.body.dir = Config.language.dir;
    }

    public parseProps(props) {
        const stateObj: IState = {
        };
        stateObj.user = props.user;
        stateObj.collapsed = false;
        return stateObj;
    }

    public componentWillReceiveProps(nextProps) {
        const stateObj = this.parseProps(nextProps);
        this.setState(stateObj);
    }

    public render() {
        return (
            <Switch>

                {/* Private routes */}
                <PrivateRoute path={`/dashboard`} component={AdminDashboardContainer} />
                <PrivateRoute path={`/groups`} component={GroupsContainer} />
                <PrivateRoute path={`/users`} component={UsersContainer} />

                {/* Public routes */}
                <Route exact path={`/`} render={() => <Layout private={false}><LandingContainer /></Layout>} />

                {/* not Not Founded routes */}
                <Route component={NotFoundContainer} />
            </Switch>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setUser: (user) => dispatch(setUser(user)),
    };
}

function mapStateToProps(state: IRootState) {
    return {
        user: state.app.user,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
