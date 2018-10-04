/**
 * @module Components/DashboardHeaderComponent
 */

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
    /** email address of curren user */
    userEmail: any;

    /** current browser path we use it to find proper icon and title of the page */
    path: any;

    /** logout function which is binded to a redux function */
    logOut: () => void;

    /** holds current user's administration status */
    isAdmin: boolean;
}

interface IState {
}

/**
 * header of the users dashboard which contain user avatar, menus and buttons
 */
class DashboardHeaderComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    /** logout current user , it calls logOut from props which is binded to a redux function */
    public logOut() {
        this.props.logOut();
        userObject.keycloak.logout();
    }

    public render() {
        // finde selected menu name based on pathname
        let Menus: any;
        let AdminClass: string;
        let AdminButton: any;
        let HeaderLogo: any;
        let isAdmin: boolean = false;
        let MenuItem: any = "";
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
            MenuItem = _.find(Menus, { path: "/admin/" + this.props.path.split("/")[2] });
        } else {
            Menus = menu();
            AdminClass = "header-logo-user";
            // check user permission
            if (userObject.hasRealmRole("webapp_admin")) {
                AdminButton = <Tooltip placement="bottom" title={t.t("System Administration")}>
                    <Link to="/admin/dashboard"><Icon type="setting" /></Link>
                </Tooltip>;
            }
            HeaderLogo = <Link to="/dashboard"><img className="user-dashboard-logo" src={logo} /></Link>;
            MenuItem = _.find(Menus, { path: "/" + this.props.path.split("/")[1] });
        }

        return (
            <div className={AdminClass}>
                <div className="selected-menu">
                    <Icon type={MenuItem.icon} />{MenuItem.text}
                </div>
                <div className="header-icons">
                    <Popover placement="bottom" title={t.t("Account information")} content={<HeaderProfile />} trigger="click">
                        <Gravatar email={this.props.userEmail} default="retro"
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
