/**
 * @module Components/DashboardMenuComponent
 */
import { Icon, Input, Layout, Tooltip } from "antd";
import * as React from "react";

const Search = Input.Search;
import Menu from "react-burger-menu/lib/menus/push";
import * as Gravatar from "react-gravatar";
import { connect } from "react-redux";
import { logOut } from "../../redux/app/actions";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import USER from "./../../lib/user";
import adminMenu from "./adminMenu";
import menu from "./menu";

import { NavLink } from "react-router-dom";

const logo = require("../../assets/images/logo-header.png");
import "./style.less";

const userObject = USER.getInstance();

interface IProps {
    path: any;
    logOut: () => void;
    isAdmin: boolean;
}

interface IState {
    isOpen: boolean;
    position: string;
}

class DashboardMenuComponent extends React.Component<IProps, IState> {

    public static getDerivedStateFromProps(nextProps, prevState) {
        return { isOpen: false, position: t.dir() };
    }
    constructor(props: IProps) {
        super(props);
        this.state = { isOpen: false, position: t.dir() };
        this.logOut = this.logOut.bind(this);
    }
    public shouldComponentUpdate(nextProps, nextState) {
        if (this.state.position !== nextState.position) {
            return true;
        }
        if (
            nextProps.path !== this.props.path ||
            nextProps.isAdmin !== this.props.isAdmin
        ) {
            return true;
        }
        return false;
    }
    public logOut() {
        this.props.logOut();
        userObject.keycloak.logout();
    }

    public render() {
        // prepare menus
        let Menus: any;
        if (this.props.isAdmin) {
            Menus = adminMenu();
        } else {
            Menus = menu();
        }

        const menuComponent = Object.keys(Menus).map((item) =>
            <NavLink key={item} to={Menus[item].path} exact activeClassName="active">
                <Icon type={Menus[item].icon} />
                {Menus[item].text}
            </NavLink>,
        );

        const right = (this.state.position === "rtl") ? true : false;
        return (<Menu right={right} pageWrapId={"privateContent"} outerContainerId={"privateContent"} isOpen={this.state.isOpen} >
            {menuComponent}
        </Menu >);
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logOut: () => dispatch(logOut()),
    };
}

function mapStateToProps(state: IRootState) {
    return {
        path: state.router.location.pathname,
        language: state.app.user.language,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMenuComponent);
