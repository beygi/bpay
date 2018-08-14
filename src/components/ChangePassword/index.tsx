/**
 * @module Components/ChangePasswordComponent
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import * as React from "react";
import config from "../../config";

import t from "../../services/trans/i18n";
import "./style.less";

interface IProps {
}

interface IState {
}

/**
 * a simple component for redirecting user to change password page
 */
class ChangePasswordComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <div className="change-password">
                <div className="description">
                    <FontAwesomeIcon icon={["fas", "key"]} />
                    <span>{t.t("Login Password")}</span>
                </div>
                <div className="action">
                    <Button href={`${config.keycloakConfig.url}/realms/master/account/password`}
                     size="large" className="neat-btn" type="primary"><FontAwesomeIcon icon={["fas", "edit"]} />{t.t("Change")}</Button>
                </div>
            </div >
        );
    }
}

export default ChangePasswordComponent;
