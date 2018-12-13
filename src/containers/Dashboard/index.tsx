import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Button, Col, Icon, Modal, Row } from "antd";
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
import { connect } from "react-redux";
import GatewayInformation from "../../components/GatewayInformation";
import PhoneValidate from "../../components/PhoneValidate";
import t from "../../services/trans/i18n";
import USER from "./../../lib/user";
import "./style.less";

const userObject = USER.getInstance();

interface IProps {
    /** current user token from redux. used for re-render in case of changing permission */
    token: string;
    /** current user theme from redux */
    theme: string;
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

        const merchantWarning = (userObject.keycloak.hasRealmRole("merchant") && userObject.getLevel().level === 1) ?
            <Col md={24} >
                <Block transparent noPadding>
                    {
                        /* <Link to="/kyc">
                        <Button
                            size="large"
                            icon="import"
                            className="neat-btn" type="primary">
                            {t.t("Verify your account now")}
                        </Button>
                    </Link> */}
                    <Alert
                        description={
                            <Button
                                href="https://becopay.com/fa/support/"
                                target="_blank"
                                size="large"
                                icon="message"
                                className="neat-btn" type="primary">
                                {t.t("Contact us")}
                            </Button>
                        }
                        message={
                            <div>
                                {t.t("You can now create becopay invoices. but your account must be verified to withdraw your balance.")}
                                {t.t(" Please contact us to verify your accout")}
                                <br /><br />
                            </div>
                        } type="warning" showIcon />
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
                            {merchantWarning}
                            <Col md={24} >
                                <Block title={t.t("New Invoice")} icon={<FontAwesomeIcon icon={["fas", "edit"]} />}>
                                    <NewInvoice />
                                </Block>
                            </Col>
                            <Col md={24} >
                                <Block title={t.t("Gateway information")} icon={<FontAwesomeIcon icon={["fas", "th-list"]} />}>
                                    <GatewayInformation />
                                </Block>
                            </Col>
                            <Col md={24} >
                                <Block>
                                    <ChangePassword />
                                </Block>
                            </Col>
                            <Col md={24} >
                                <Block>
                                    <GoogleAuth />
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
                                <Block collapse
                                    className="user-balance" title={t.t("Your balance")} icon={<FontAwesomeIcon icon={["fas", "balance-scale"]} />} iconPosition="right" >
                                    <Balance />
                                </Block>
                            </Col>
                            <Col md={24} >
                                <Block collapse title={t.t("Live prices")} icon={<FontAwesomeIcon icon={["fas", "chart-line"]} />} iconPosition="right" >
                                    <Live />
                                </Block>
                            </Col>
                            <Col md={24} >
                                <Block iconPosition="right" collapse collapseClosed title={t.t("Deposit history")} icon={<FontAwesomeIcon icon={["fas", "history"]} />}  >
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
        }

        if (allBlocks.length === 0) {
            allBlocks.push(
                <Row key="denied" gutter={8}>
                    {sandbox}
                    <Col md={24} >
                        <Block><h3>{t.t("You don't have enough permission to view this area")}</h3></Block>
                    </Col>
                    <Modal
                        className={`phone-modal ${this.props.theme}`}
                        maskClosable
                        visible={true}
                        destroyOnClose
                        footer={null}
                        width={600}
                        title={t.t("validate your phone number")}
                        zIndex={10}
                    >
                        <PhoneValidate />
                    </Modal>
                </Row>);
        }

        return allBlocks;
    }
}

function mapStateToProps(state: IRootState) {
    return {
        token: state.app.user.token,
        theme: state.app.user.theme,
    };
}

export default connect(mapStateToProps)(DashboardContainer);
