import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "antd";
import * as React from "react";
import Block from "../../components/Holder";
import SettleUps from "../../components/SettleUps";
import Unsettled from "../../components/Unsettled";
import t from "../../services/trans/i18n";
import USER from "./../../lib/user";
import "./style.less";

const userObject = USER.getInstance();

interface IProps {
}

interface IState {
}

class AccountingContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        if (userObject.keycloak.hasRealmRole("merchant") || userObject.keycloak.hasRealmRole("merchants_admin")) {
            return (
                <Row gutter={8}>
                    <Col md={8} >
                        <Row gutter={8}>
                            {userObject.keycloak.hasRealmRole("merchants_admin") ?
                                <Col md={24} >
                                    <Block title={t.t("Settle")} icon={<FontAwesomeIcon icon={["fas", "hand-holding-usd"]} />}>
                                        <Unsettled />
                                    </Block>
                                </Col>
                                : null
                            }
                        </Row>
                    </Col>
                    <Col md={16} >
                        <Row gutter={8}>
                            <Col md={24} >
                                <SettleUps />
                            </Col>
                        </Row>
                        {/* <Row gutter={8}>
                            <Col md={24} >
                                <Block title={t.t("Active Sessions")} icon={<FontAwesomeIcon icon={["fas", "user-clock"]} />}  >
                                    <ActieveSessions />
                                </Block>
                            </Col>
                        </Row> */}
                    </Col>
                </Row>
            );
        }
        return (
            <Row gutter={8}>
                <Col md={24} >
                    <Block><h3>{t.t("No Access")}</h3></Block>
                </Col>
            </Row>);
    }
}

export default AccountingContainer;
