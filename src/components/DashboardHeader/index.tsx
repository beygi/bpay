import { Icon, Input, Layout, Popover, Tooltip } from "antd";
import * as React from "react";

const Search = Input.Search;
import * as  _ from "lodash";
import * as Gravatar from "react-gravatar";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../redux/app/actions";
import { IRootState } from "../../redux/reducers";

import t from "../../services/trans/i18n";
import adminMenu from "../DashboardMenu/adminMenu";
import menu from "../DashboardMenu/menu";

import HeaderProfile from "../DashboardHeaderProfile";
import USER from "./../../lib/user";

const logo = require("../../assets/images/logo-header.png");
import "./style.less";

const { Header }: any = Layout;
const userObject = USER.getInstance();

interface IProps {
    userEmail: any;
    path: any;
    logOut: () => void;
    isAdmin: boolean;
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
        alert("RENDER");
        // finde selected menu name based on pathname
        let Menus: any;
        let AdminClass: string;
        let AdminButton: any;
        let HeaderLogo: any;
        let isAdmin: boolean = false;
        if (this.props.path && this.props.path.startsWith("/admin/")) {
            isAdmin = true;
        }
        if (isAdmin) {
            Menus = adminMenu();
            AdminClass = "header-logo-user admin-menu";
            AdminButton = <Tooltip placement="bottom" title={t.t("User Dashboard")}>
                <Link to="/dashboard"><Icon type="user" /></Link>
            </Tooltip>;
            HeaderLogo = <Link to="/admin/dashboard"><img className="user-dashboard-logo" src={logo} /></Link>;
        } else {
            Menus = menu();
            AdminClass = "header-logo-user";
            // check user permission
            if (userObject.permission("admin").adminView) {
                AdminButton = <Tooltip placement="bottom" title={t.t("System Administration")}>
                    <Link to="/admin/dashboard"><Icon type="setting" /></Link>
                </Tooltip>;
                HeaderLogo = <Link to="/dashboard"><img className="user-dashboard-logo" src={logo} /></Link>;
            }
        }
        const MenuItem: any = _.find(Menus, { path: this.props.path });
        return (
            <div className={AdminClass}>
                <div className="selected-menu">
                    <Icon type={MenuItem.icon} />{MenuItem.text}
                </div>
                <div className="header-icons">
                    <Popover placement="bottom" title={t.t("Account information")} content={<HeaderProfile></HeaderProfile>} trigger="click">
                        <Gravatar email={this.props.userEmail} default="monsterid"
                            size={60} className={"ProfilePic"} />
                    </Popover>
                    <Tooltip placement="bottom" title={t.t("Logout")}>
                        <Icon type="logout" onClick={this.logOut} />
                    </Tooltip>
                    {AdminButton}
                    {HeaderLogo}
                </div>
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
        userEmail: state.app.user.email,
        path: state.router.location.pathname,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeaderComponent);
