import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { IRootState } from "../redux/reducers";

import Layout from "./../components/Layout";
import PrivateRoute from "./../components/PrivateRoute";

import ChatAdminContainer from "./Admin/Chat";
import AdminDashboardContainer from "./Admin/Dashboard";
import KycAdminContainer from "./Admin/KYC";
// import UserContainer from "./User";
import UsersAdminContainer from "./Admin/Users";
import DashboardContainer from "./Dashboard";
import DepositContainer from "./Deposit";
import ExchangeContainer from "./Exchange";
import GroupsContainer from "./Groups";
import KycContainer from "./KYC";
import LandingContainer from "./Landing";
import NotFoundContainer from "./NotFound";

import { setUser } from "../redux/app/actions";
import "./app.less";

import Config from "./../config";

interface IProps {
    email: any;
    setUser: (user: any) => void;
}

interface IState {
    collapsed?: boolean;
    email?: any;
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
        stateObj.email = props.email;
        stateObj.collapsed = false;
        return stateObj;
    }

    public shouldComponentUpdate(nextProps) {
        const stateObj = this.parseProps(nextProps);
        if (nextProps.email !== this.state.email && nextProps.email === null) {
            // this is a log out, just do nothing
            return false;
        } else {
             return true;
        }
}

    public render() {
       return (
          <Switch>

                {/* Private routes */}

                {/* <PrivateRoute path={`/dashboard`} component={AdminDashboardContainer} /> */}
                <PrivateRoute path={`/dashboard`} component={DashboardContainer} />
                <PrivateRoute path={`/kyc`} component={KycContainer} />
                {/* <PrivateRoute path={`/balance`} component={DashboardContainer} /> */}
                <PrivateRoute path={`/exchange`} component={ExchangeContainer} />
                <PrivateRoute path={`/deposit`} component={DepositContainer} />

                {/* Private admin routes */}
                <PrivateRoute path={`/admin/dashboard`} component={AdminDashboardContainer} />
                <PrivateRoute path={`/admin/kyc`} component={KycAdminContainer} />
                <PrivateRoute path={`/admin/chat`} component={ChatAdminContainer} />
                <PrivateRoute path={`/admin/users`} component={UsersAdminContainer} />

                {/* Public routes */}
                <Route exact path={`/`} render={() => <Layout private={false}><LandingContainer /></Layout>} />
                {/* <Route exact path={`/dashboard`} render={() => <Layout private={false}><DashboardContainer /></Layout>} /> */}

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
    if (state.app.user) {
        return {
            email: state.app.user.email,
        };
    }
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
