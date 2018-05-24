import { Icon, Input, Layout, Tooltip } from "antd";
import * as React from "react";

const Search = Input.Search;
import * as Gravatar from "react-gravatar";
import { connect } from "react-redux";
import { logOut } from "../../redux/app/actions";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import USER from "./../../lib/user";

const logo = require("../../assets/images/logo-header.png");
import "./style.less";

const { Header }: any = Layout;
const userObject = USER.getInstance();

interface IProps {
    user: any;
    logOut: () => void;
}

interface IState {
}

class DashboardHeaderComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.logOut = this.logOut.bind(this);
    }

    public logOut() {
        this.props.logOut();
        userObject.keycloak.logout();
    }
    // <div className="header-logo">
    //
    // </div>

    public render() {
        return (
            <div className=" header-logo-user">
                <div className="selected-menu">
                    <Icon type="dashboard" />Dashboard
                </div>
                <Tooltip placement="bottom" title={t.t("View Profile Page")}>
                    <Gravatar email={this.props.user.email} default="monsterid"
                        size={60} className={"ProfilePic"} />
                </Tooltip>
                <Tooltip placement="bottom" title={t.t("Logout")}>
                    <Icon type="logout" onClick={this.logOut} />
                </Tooltip>
                <img className="user-dashboard-logo" src={logo} />
            </div >
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        logOut: () => dispatch(logOut()),
    };
}

function mapStateToProps(state: IRootState) {
    return {
        user: state.app.user,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeaderComponent);
