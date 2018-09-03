import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Layout, Row } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Balance from "../../components/Balance";
import ChangePassword from "../../components/ChangePassword";
import Profile from "../../components/DashboardHeaderProfile";
import DepositHistory from "../../components/DepositHistory";
import Forex from "../../components/Forex";
import GoogleAuth from "../../components/GoogleAuth";
import Block from "../../components/Holder";
import Live from "../../components/Live";
import ActieveSessions from "../../components/Sessions";
import Stock from "../../components/Stock";
import Transactions from "../../components/Transactions";
import Guide from "../../components/UserStatusGuide";
import { setUser } from "../../redux/app/actions";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import "./style.less";

interface IProps {
}

interface IState {
}

class DashboardContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <Row gutter={8}>
                <Col md={8} >
                    <Row gutter={8}>
                    <Col md={24} >
                        <Block className="user-balance" title="Your balance" icon={<FontAwesomeIcon icon={["fas", "balance-scale"]} />} iconPosition="right" >
                            <Balance />
                            {/* <Link to="/deposit">
                                <Button className="action" type="primary" size="small">Deposit</Button>
                            </Link> */}
                        </Block>
                    </Col>

                    {/* <Block collapse title="Live prices" icon={<FontAwesomeIcon icon={["fas", "chart-line"]} />} iconPosition="right" >
                        <Live />
                    </Block> */}
                    {/* <Block iconPosition="right" collapse title={t.t("Deposit history")} icon={<FontAwesomeIcon icon={["fas", "history"]} />}  >
                        <DepositHistory />
                    </Block> */}
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
                    </Row>
                    <Block>
                        <Guide />
                    </Block> */}
                    <Row gutter={8}>
                        <Col md={24} >
                            <Block title={t.t("Transactions")} icon={<FontAwesomeIcon icon={["fas", "money-check-alt"]} />}>
                                    <Transactions />
                           </Block>
                       </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col md={24} >
                            <Block title={t.t("Action Sessions")} icon={<FontAwesomeIcon icon={["fas", "user-clock"]} />}  >
                                <ActieveSessions />
                            </Block>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default DashboardContainer;
