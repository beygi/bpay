/**
 * @module Components/DashboardHeaderProfileComponent
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Icon, Tag } from "antd";
import * as React from "react";
import { connect } from "react-redux";
// import strftime from "strftime";
import Translate from "../../components/Translate";
import config from "../../config";
import { logOut } from "../../redux/app/actions";
import { IRootState } from "../../redux/reducers";
import { localDate } from "../../services/trans/i18n";
import t from "../../services/trans/i18n";
import USER from "./../../lib/user";
import "./style.less";

const userObject = USER.getInstance();

interface IProps {
    /** current user object from redux */
    user: any;
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
        // const date = strftime("%B %d, %Y %H:%M:%S", new pDate(this.props.auth_time * 1000));
        const pDate = localDate(t.default.language);
        const date = new pDate(this.props.user.auth_time * 1000).toLocaleString();
        return (
            <div className="header-user-profile">
                <div className="line">
                    <span className="caption">{t.t("Email:")} </span>{this.props.user.email}
                </div>
                <div className="line">
                    <span className="caption" >{t.t("User level:")} </span>
                    <span className={`${userObject.getLevel().code}`}>{userObject.getLevel().name}</span>
                </div>
                <div className="line">
                    <span className="caption">{t.t("Last login:")} </span>{date}
                </div>
                <div className="line">
                    <span className="caption">{t.t("System language:")} </span>
                    <Translate />
                </div>
                <div className="line">
                    <span className="caption">{t.t("Connection status:")} </span>
                    <FontAwesomeIcon className={this.props.user.socketStatus} icon={["fas", "wifi"]} />
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
        user: state.app.user,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeaderProfileComponent);
