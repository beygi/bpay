import { Icon, Input, Layout, Popover, Tooltip } from "antd";
import * as React from "react";

const Search = Input.Search;
import * as  _ from "lodash";
import * as Gravatar from "react-gravatar";
import { connect } from "react-redux";
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
    user: any;
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
        // finde selected menu name based on pathname
        let Menus: any;
        if (this.props.isAdmin) {
            Menus = adminMenu();
        } else {
            Menus = menu();
        }
        const MenuItem: any = _.find(Menus, { path: this.props.path });
        return (
            <div className="header-logo-user">
                <div className="selected-menu">
                    <Icon type={MenuItem.icon} />{MenuItem.text}
                </div>
                <Popover placement="bottom" title={t.t("Account information")} content={<HeaderProfile></HeaderProfile>} trigger="click">
                    <Gravatar email={this.props.user.email} default="monsterid"
                        size={60} className={"ProfilePic"} />
                </Popover>
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
        path: state.router.location.pathname,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeaderComponent);
