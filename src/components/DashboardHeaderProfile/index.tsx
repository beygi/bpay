/**
 * @module Components/DashboardHeaderProfileComponent
 */
import { Button, Icon, Tag } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import config from "../../config";
import { logOut } from "../../redux/app/actions";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import USER from "./../../lib/user";
import "./style.less";

const userObject = USER.getInstance();

interface IProps {
     /** current user's email address */
    email: any;

     /** logout current user (this function is binded to a redux funtion) */
    logOut: () => void;
}

interface IState {
}

/**
 * user's menu that is visible after click to users avatar
 * it shows some usefull information and includes logout
 * and change password button
 */
class DashboardHeaderProfileComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }

     /** logout current user using redux's logOut function available in props */
    public logOut() {
        this.props.logOut();
        userObject.keycloak.logout();
    }

    public render() {
        return (
            <div className="header-user-profile">
                <div className="line">
                    <span className="caption">{t.t("Email:")} </span>{this.props.email}
                </div>
                <div className="line">
                    <span className="caption">{t.t("Verification level:")} </span><Tag className="verify">Verified</Tag>
                </div>
                <div className="line">
                    <span className="caption">{t.t("Last login:")} </span>12 May 2017 23:32:12
                </div>
                <div className="line">

                    <Button type="primary" href={`${config.keycloakConfig.url}/realms/master/account/password`}>{t.t("Change Password")}</Button>
                    <Button onClick={this.logOut} type="primary" className="logout">{t.t("Logout")}</Button>

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
        email: state.app.user.email,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeaderProfileComponent);
