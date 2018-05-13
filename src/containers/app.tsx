import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { IRootState } from "../redux/reducers";

import Layout from "./../components/Layout";
import PrivateRoute from "./../components/PrivateRoute";

import CustomersContainer from "./Customers";
import DashboardContainer from "./Dashboard";
import GroupsContainer from "./Groups";
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
        const LoggedIn: boolean = (this.state.user) ? true : false;
        return (
            <Layout private={LoggedIn}>
                <Switch>
                    {/*<Route path={`/user`} component={PublicContainer}/>*/}
                    {/*root page will be redirected to dashboard or login page based on login status*/}
                    <Route exact path="/" render={() => (
                      this.state.user ? (
                        <Redirect to="/dashboard"/>
                      ) : (
                        <Redirect to="/user/login" />
                      )
                    )}/>
                    <Route path={`/user`} component={UserContainer}/>
                    <PrivateRoute path={`/dashboard`} component={DashboardContainer}/>
                    <PrivateRoute path={`/companies`} component={CustomersContainer}/>
                    <PrivateRoute path={`/groups`} component={GroupsContainer}/>
                    <PrivateRoute path={`/users`} component={UsersContainer}/>

                </Switch>
            </Layout>
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
