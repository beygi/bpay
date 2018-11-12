import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import Balance from "../../components/Balance";
import ChangePassword from "../../components/ChangePassword";
import DepositHistory from "../../components/DepositHistory";
import Forex from "../../components/Forex";
import GoogleAuth from "../../components/GoogleAuth";
import Block from "../../components/Holder";
import Live from "../../components/Live";
import NewInvoice from "../../components/NewInvoice";
import ActieveSessions from "../../components/Sessions";
import Stock from "../../components/Stock";
import Transactions from "../../components/Transactions";
import Unsettled from "../../components/Unsettled";
import Guide from "../../components/UserStatusGuide";
import { DEPLOY_TYPE } from "../../constants";
import { setUser } from "../../redux/app/actions";
import { IRootState } from "../../redux/reducers";

import * as _ from "lodash";
import t from "../../services/trans/i18n";
import USER from "./../../lib/user";
import "./style.less";

const userObject = USER.getInstance();

interface IProps {
}

interface IState {
}

class DashboardContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {

        const sandbox = (DEPLOY_TYPE === "sandbox") ?
            <Col md={24} >
                <Block className="sandbox">
                    {t.t("this is the sandbox enviroment , you can test your payments here, \
all transactions will be done using bitcoin test network not real network.")}
                </Block>
            </Col>

            : null;

        const allBlocks = [];

        if (userObject.keycloak.hasRealmRole("merchant") || userObject.keycloak.hasRealmRole("merchants_admin")) {
            allBlocks.push(
                <Row key="merchant" gutter={8}>
                    {sandbox}
                    <Col sm={24} md={24} lg={8} >
                        <Row gutter={8}>
                            {/* <Col md={24} >
                                <Block className="user-balance" title="Your balance" icon={<FontAwesomeIcon icon={["fas", "balance-scale"]} />} iconPosition="right" >
                                    <Balance />
                                </Block>
                            </Col> */}
                            {/* <Col md={24} >
                                <Block>
                                    <GoogleAuth />
                                </Block>
                            </Col> */}
                            {userObject.keycloak.hasRealmRole("merchants_admin") ?
                                <Col md={24} >
                                    <Block title={t.t("Settle")} icon={<FontAwesomeIcon icon={["fas", "hand-holding-usd"]} />}>
                                        <Unsettled />
                                    </Block>
                                </Col>
                                : null
                            }
                            <Col md={24} >
                                <Block title={t.t("New Invoice")} icon={<FontAwesomeIcon icon={["fas", "edit"]} />}>
                                    <NewInvoice />
                                </Block>
                            </Col>
                            <Col md={24} >
                                <Block>
                                    <ChangePassword />
                                </Block>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={24} md={24} lg={16} >
                        <Row gutter={8}>
                            <Col md={24} >
                                <Transactions />
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
                </Row>)
                ;
        }

        if (userObject.keycloak.hasRealmRole("webapp_user") || userObject.keycloak.hasRealmRole("webapp_admin")) {
            allBlocks.push(
                <Row key="webapp" gutter={8}>
                    {sandbox}
                    <Col md={8} >
                        <Row gutter={8}>
                            <Col md={24} >
                                <Block className="user-balance" title={t.t("Your balance")} icon={<FontAwesomeIcon icon={["fas", "balance-scale"]} />} iconPosition="right" >
                                    <Balance />
                                </Block>
                            </Col>
                            <Col md={24} >
                                <Block collapse title={t.t("Live prices")} icon={<FontAwesomeIcon icon={["fas", "chart-line"]} />} iconPosition="right" >
                                    <Live />
                                </Block>
                            </Col>
                            <Col md={24} >
                                <Block iconPosition="right" collapse title={t.t("Deposit history")} icon={<FontAwesomeIcon icon={["fas", "history"]} />}  >
                                    <DepositHistory />
                                </Block>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={16} >
                        {/* <Row gutter={8}>
                            <Col md={8} >
                                <Block>
                                    <Stock symbol="BTC" />
                                </Block>
                            </Col>
                            <Col md={8} >
                                <Block>
                                    <Stock symbol="ETH" />
                                </Block>
                            </Col>
                            <Col md={8} >
                                <Block>
                                    <Stock symbol="XRP" />
                                </Block>
                            </Col>
                            <Col md={8} >
                                <Block title="IRR"  >
                                    <Forex symbol="IRR" />
                                </Block>
                            </Col>
                            <Col md={8} >
                                <Block title="EUR"  >
                                    <Forex symbol="EUR" />
                                </Block>
                            </Col>
                            <Col md={8} >
                                <Block title="USD"  >
                                    <Forex symbol="USD" />
                                </Block>
                            </Col>
                        </Row> */}

                        <Row gutter={8}>
                            <Col md={24} >
                                <Block>
                                    <Guide />
                                </Block>
                            </Col>
                            <Col md={12} >
                                <Block>
                                    <ChangePassword />
                                </Block>
                            </Col>
                            <Col md={12} >
                                <Block>
                                    <GoogleAuth />
                                </Block>
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
                </Row>,
            );
        } else {
            allBlocks.push(
                <Row key="denied" gutter={8}>
                    {sandbox}
                    <Col md={24} >
                        <Block><h3>{t.t("No Access")}</h3></Block>
                    </Col>
                </Row>);
        }
        console.log(allBlocks);
        return allBlocks;
    }
}

export default DashboardContainer;
