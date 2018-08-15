/**
 * @module Components/GoogleAuthComponent
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
 * a simple component for redirecting user to google auth setup page
 */
class GoogleAuthComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <div className="change-password">
                <div className="description">
                    <FontAwesomeIcon icon={["fab", "google"]} />
                    <span>{t.t("Google Authenticator")}</span>
                </div>
                <div className="action">
                    <Button href={`${config.keycloakConfig.url}/realms/master/account/totp`}
                     size="large" className="neat-btn" type="primary"><FontAwesomeIcon icon={["fas", "lock"]} />Active</Button>
                </div>
            </div >
        );
    }
}

export default GoogleAuthComponent;
