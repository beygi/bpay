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

import { NavLink } from "react-router-dom";

const logo = require("../../assets/images/logo-header.png");
import "./style.less";

const userObject = USER.getInstance();

interface IProps {
    user: any;
    path: any;
    logOut: () => void;
}

interface IState {
}

class DashboardMenuComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    public logOut() {
        this.props.logOut();
        userObject.keycloak.logout();
    }

    public render() {
        return (
            <Menu pageWrapId={ "privateContent" } >
                 <NavLink to="/dashboard" exact activeClassName="active"><Icon type="dashboard" />Dashboard1</NavLink>
                 <NavLink to="/balance" exact activeClassName="active"><Icon type="calculator" />Balance1</NavLink>
                 <NavLink to="/exchange" exact activeClassName="active"><Icon type="calculator" />Exchange1</NavLink>

                <a id="about" className="menu-item" href="/about"><Icon type="calculator" />Balance</a>
                <a id="contact" className="menu-item" href="/contact"><Icon type="line-chart" />Exchange</a>
                <a id="contact" className="menu-item" href="/contact"><Icon type="export" />Deposite</a>
                <a id="contact" className="menu-item" href="/contact"><Icon type="wallet" />Wallets</a>
                <a  className="menu-item" href=""><Icon type="setting" />Settings</a>
            </Menu>
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
        path : state.router.location.pathname,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMenuComponent);
