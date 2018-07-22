import { Icon, Input, Layout, Tooltip } from "antd";
import * as React from "react";

const Search = Input.Search;
import { push as Menu } from "react-burger-menu";
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
}

class DashboardMenuComponent extends React.Component<IProps, IState> {

    public static getDerivedStateFromProps(nextProps, prevState) {
        return { isOpen: false };
    }
    constructor(props: IProps) {
        super(props);
        this.state = { isOpen: false};
        this.logOut = this.logOut.bind(this);
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

        return (<Menu pageWrapId={"privateContent"} outerContainerId={ "privateContent" }  isOpen={this.state.isOpen} >
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMenuComponent);
