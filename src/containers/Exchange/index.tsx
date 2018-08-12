import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Layout, Row } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import Balance from "../../components/Balance";
import Profile from "../../components/DashboardHeaderProfile";
import DepositHistory from "../../components/DepositHistory";
import Block from "../../components/Holder";
import Live from "../../components/Live";
import PlaceOrder from "../../components/PlaceOrder";
import ActieveSessions from "../../components/Sessions";
import Stock from "../../components/Stock";
import config from "../../config";
import { setUser } from "../../redux/app/actions";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import "./style.less";

interface IProps {
}

interface IState {
}

class ExchangeContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <Row gutter={8}>
                <Col md={5} >
                    <Block className="user-balance" collapse title="Your balance" icon={<FontAwesomeIcon icon={["fas", "balance-scale"]} />} iconPosition="right" >
                        <Balance />
                        <Link to="/deposit">
                            <Button className="action" type="primary" size="small">Deposit</Button>
                        </Link>
                    </Block>
                    <Block iconPosition="right" title={t.t("Deposit history")} icon={<FontAwesomeIcon icon={["fas", "history"]} />}  >
                        <DepositHistory />
                    </Block>
                </Col>
                <Col md={14} >
                    <Row gutter={8}>
                        <Col md={8} >
                            <Block collapse title={config.currencies.BTC.name} icon={config.icons.BTC}>
                                <Stock symbol="BTC" hideTitle />
                            </Block>
                        </Col>
                        <Col md={8} >
                            <Block collapse title={config.currencies.ETH.name} icon={config.icons.ETH}>
                                <Stock symbol="ETH" hideTitle />
                            </Block>
                        </Col>
                        <Col md={8} >
                            <Block collapse title="XRP" icon={<i className="live-icon cc XRP-ALT"></i>} >
                                <Stock symbol="XRP" hideTitle />
                            </Block>
                        </Col>
                    </Row>
                    <Block className="trading-view" transparent noPadding >
                        <TradingViewWidget
    symbol="BITFINEX:BTCUSD"
    theme={Themes.DARK}
    autosize
/>
                    </Block>
                    <Block>
                        <PlaceOrder />
                    </Block>
                </Col>
                <Col md={5} >
                    <Block  title="Live prices" icon={<FontAwesomeIcon icon={["fas", "chart-line"]} />} iconPosition="right" >
                        <Live />
                    </Block>
                </Col>
            </Row>
        );
    }
}

export default ExchangeContainer;
