import { Button, Icon, Tag } from "antd";
import * as React from "react";

import { connect } from "react-redux";
import { logOut } from "../../redux/app/actions";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import USER from "./../../lib/user";
import "./style.less";

const userObject = USER.getInstance();

interface IProps {
    user: any;
    logOut: () => void;
}

interface IState {
}

class DashboardHeaderProfileComponent extends React.Component<IProps, IState> {

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
            <div className="header-user-profile">
                <div>
                    <p><span className="caption">{t.t("Email:")} </span>{this.props.user.email}</p>
                </div>
                <div>
                    <p>
                        <span className="caption">{t.t("Verification level:")} </span><Tag className="verify">Verified</Tag>
                    </p>
                </div>
                <div>
                    <p><span className="caption">{t.t("Last login:")} </span>12 May 2017 23:32:12</p>
                </div>
                <div>
                    <p>
                         <Button type="primary">{t.t("Change Password")}</Button>
                         <Button  type="primary">{t.t("Logout")}</Button>
                    </p>
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
