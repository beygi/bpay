/**
 * @module AppContainer
 */
import * as React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { setUser } from "../redux/app/actions";
import { IRootState } from "../redux/reducers";
import t from "../services/trans/i18n";
import { pDate } from "../services/trans/i18n";
import Languages from "../services/trans/languages";
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
}

interface IState {
}

/**
 * this is our root component wich is route app to containers
 * based on browsers path
 */
class AppContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    public componentDidMount() {
        document.body.dir = Config.language.dir;
        document.body.addEventListener("changeLanguage", (event: CustomEvent) => {
            document.body.dir = Languages[event.detail.code].dir;
            t.changeLanguage(event.detail.code, () => {
                this.forceUpdate();
            });
        });
    }

    public componentWillUnmount() {
        // Make sure to remove the DOM listener when the component is unmounted.
        document.body.removeEventListener("changeLanguage", this.handleChangeLanguage);
    }

    public handleChangeLanguage = (event) => {
        // hande change
    }

    public render() {
        // console.log(t.default.language);
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

export default hot(module)(AppContainer);
// export default connect(mapStateToProps)(AppContainer);hot(module);
// export default AppContainer;
