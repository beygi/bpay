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
import Block from "../../components/Holder";
import Live from "../../components/Live";
import Stock from "../../components/Stock";
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
                <Col md={6} >
                    <Block className="user-balance" collapse title="Your balance" icon={<FontAwesomeIcon icon={["fas", "balance-scale"]} />} iconPosition="right" >
                        <Balance />
                        <Link to="/deposit">
                            <Button className="action" type="primary" size="small">Deposit</Button>
                        </Link>
                    </Block>
                    <Block collapse title="Live prices" icon={<FontAwesomeIcon icon={["fas", "chart-line"]} />} iconPosition="right" >
                        <Live />
                    </Block>
                </Col>
                <Col md={18} >
                    <Row gutter={8}>
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
                    </Block>
                    <Row gutter={8}>
                        <Col md={12} >
                            <Block iconPosition="right" collapse title={t.t("Deposit history")} icon={<FontAwesomeIcon icon={["fas", "history"]} />}  >
                                <DepositHistory />
                            </Block>
                        </Col>
                        <Col md={12} >
                            <Block>
                                <ChangePassword />
                            </Block>
                            <Block>
                                <img src="https://dummyimage.com/1000x800/4c4649/3ee6e0.png" alt="" />
                            </Block>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default DashboardContainer;
