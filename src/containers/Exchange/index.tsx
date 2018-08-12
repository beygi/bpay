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
        match?: any;
}

interface IState {
    fromSymbol?: string;
    toSymbol?: string;
}

class ExchangeContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        if (this.props.match.params.market) {
            this.state = {
                fromSymbol : this.props.match.params.market.split(":")[0],
                toSymbol: this.props.match.params.market.split(":")[1],
            };
        } else {
            this.state = {
                fromSymbol : "ETH",
                toSymbol : "BTC",
            };
        }
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
                        <Col md={12} >
                            <Block collapse title={config.currencies[this.state.fromSymbol].name} icon={config.icons[this.state.fromSymbol]}>
                                <Stock symbol={this.state.fromSymbol} hideTitle />
                            </Block>
                        </Col>
                        <Col md={12} >
                            <Block collapse title={config.currencies[this.state.toSymbol].name} icon={config.icons[this.state.toSymbol]}>
                                <Stock symbol={this.state.toSymbol} hideTitle />
                            </Block>
                        </Col>
                    </Row>
                    <Block className="trading-view" transparent noPadding >
                        <TradingViewWidget
                                symbol={`BITFINEX:${this.state.fromSymbol}${this.state.toSymbol}`}
    theme={Themes.DARK}
    autosize
/>
                    </Block>
                    <Block>
                        <PlaceOrder fromSymbol={this.state.fromSymbol} toSymbol={this.state.toSymbol} />
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
