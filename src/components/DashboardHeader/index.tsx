/**
 * @module Components/DashboardHeaderComponent
 */

import { Icon, Popover, Tooltip } from "antd";
import axios from "axios";
import * as  _ from "lodash";
import * as React from "react";
import * as Gravatar from "react-gravatar";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { VERSION } from "../../constants";
import { logOut, updateUser } from "../../redux/app/actions";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import adminMenu from "../DashboardMenu/adminMenu";
import menu from "../DashboardMenu/menu";

import HeaderProfile from "../DashboardHeaderProfile";
import USER from "./../../lib/user";

const logo = require("../../assets/images/logo-header.png");
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.less";

const userObject = USER.getInstance();

interface IProps {
    /** email address of curren user */
    userEmail: any;

    /** current browser path we use it to find proper icon and title of the page */
    path: any;

    /** current ui theme which is binded to redux */
    theme: any;

    /** logout function which is binded to a redux function */
    logOut?: () => void;

    /** change user theme (this function is binded to a redux funtion) */
    updateUser?: (userObject: any) => void;

    /** holds current user's administration status */
    isAdmin: boolean;
}

interface IState {
    uiUpdate: boolean;
}

/**
 * header of the users dashboard which contain user avatar, menus and buttons
 */
class DashboardHeaderComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.changeTheme = this.changeTheme.bind(this);
        this.state = {
            uiUpdate: false,
        };
    }

    public componentDidMount() {
        // we fetch data every 5 seconds until our websocket is available
        const intervalId = setInterval(this.getVersion.bind(this), 20000);
    }

    public getVersion() {
        axios.get("/VERSION?" + Date.now(), { responseType: "text" })
            .then((response) => {
                // handle success
                if (!this.state.uiUpdate && response.data + "" !== VERSION + "") {
                    this.setState(
                        { uiUpdate: true },
                    );
                }
                if (this.state.uiUpdate && response.data + "" === VERSION + "") {
                    this.setState(
                        { uiUpdate: false },
                    );
                }
            });
    }

    /** logout current user , it calls logOut from props which is binded to a redux function */
    public logOut() {
        this.props.logOut();
        userObject.keycloak.logout();
    }

    /** change user theme */
    public changeTheme() {
        if (this.props.theme === "light") {
            this.props.updateUser({ theme: "dark" });
        } else {
            this.props.updateUser({ theme: "light" });
        }

    }

    /** relaod current window to get new version */
    public reload() {
        location.reload(true);
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

        const uiUpdateButton = this.state.uiUpdate ? <Tooltip placement="bottom" title={t.t("New version available , click for update")}>
            <Icon onClick={this.reload} type="sync" />
        </Tooltip> : null;

        return (
            <div className={AdminClass}>
                <div className="selected-menu">
                    <Icon type={MenuItem.icon} />{MenuItem.text}
                </div>
                <div className="header-icons" id="header-icons">
                    {uiUpdateButton}
                    <Popover getPopupContainer={() => document.getElementById("header-icons")} placement="bottom" title={t.t("Account information")} content={<HeaderProfile />} trigger="click">
                        <Gravatar email={this.props.userEmail} default="retro"
                            size={60} className={`ProfilePic${(this.state.uiUpdate ? " ui-update" : "")}`} />
                    </Popover>
                    <Tooltip placement="bottom" title={t.t("Logout")}>
                        <Icon type="logout" onClick={this.logOut} />
                    </Tooltip>
                    <Tooltip placement="bottom" title={(this.props.theme === "light") ? t.t("Night mode: off") : t.t("Night mode: on")}>
                        <span className={`anticon anticon-${this.props.theme}`} onClick={this.changeTheme}>
                            {
                                (this.props.theme === "light") ?
                                    <FontAwesomeIcon icon={["far", "moon"]} /> :
                                    <FontAwesomeIcon icon={["fas", "moon"]} />
                            }
                        </span>
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
        updateUser: (user) => dispatch(updateUser(user)),
    };
}

function mapStateToProps(state: IRootState) {
    return {
        userEmail: state.app.user.email,
        theme: state.app.user.theme,
        language: state.app.user.language,
        path: state.router.location.pathname,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeaderComponent);
