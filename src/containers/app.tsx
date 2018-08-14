/**
 * @module AppContainer
 */
import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { setUser } from "../redux/app/actions";
import { IRootState } from "../redux/reducers";
import Layout from "./../components/Layout";
import PrivateRoute from "./../components/PrivateRoute";
import Config from "./../config";
import ChatAdminContainer from "./Admin/Chat";
import AdminDashboardContainer from "./Admin/Dashboard";
import KycAdminContainer from "./Admin/KYC";
import UsersAdminContainer from "./Admin/Users";
import "./app.less";
import DashboardContainer from "./Dashboard";
import DepositContainer from "./Deposit";
import ExchangeContainer from "./Exchange";
import KycContainer from "./KYC";
import LandingContainer from "./Landing";
import NotFoundContainer from "./NotFound";

interface IProps {
    /** user's email from redux */
    email: any;
}

interface IState {
    /** user's email, synced with email in props */
    email?: any;
}

/**
 * this is our root component wich is route app to containers
 * based on browsers path
 */
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
                <PrivateRoute path={`/exchange/:market`} component={ExchangeContainer} />
                <PrivateRoute path={`/exchange`} component={ExchangeContainer} />

                <PrivateRoute path={`/deposit/:coin`} component={DepositContainer} />
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

function mapStateToProps(state: IRootState) {
    if (state.app.user) {
        return {
            email: state.app.user.email,
        };
    }
    return {};
}

export default connect(mapStateToProps)(AppContainer);
