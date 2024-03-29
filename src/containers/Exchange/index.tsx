import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Layout, Modal, Row } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import Balance from "../../components/Balance";
import Profile from "../../components/DashboardHeaderProfile";
import DepositHistory from "../../components/DepositHistory";
import Block from "../../components/Holder";
import Live from "../../components/Live";
import Market from "../../components/Market";
import MarketTrades from "../../components/MarketTrades";
import OrderBook from "../../components/OrderBook";
import Orders from "../../components/Orders";
import PlaceOrder from "../../components/PlaceOrder";
import ActieveSessions from "../../components/Sessions";
import Stock from "../../components/Stock";
import config from "../../config";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import USER from "./../../lib/user";
import "./style.less";

const userObject = USER.getInstance();

interface IProps {
    match?: any;
    theme?: string;
}

interface IState {
    fromSymbol?: string;
    toSymbol?: string;
    kycModal: boolean;
}

class ExchangeContainer extends React.Component<IProps, IState> {

    public static getDerivedStateFromProps(props, state) {
        if (props.match.params.market) {
            return {
                fromSymbol: props.match.params.market.split(":")[0],
                toSymbol: props.match.params.market.split(":")[1],
            };
        }
        return {
            fromSymbol: "BTC",
            toSymbol: "USD",
        };
    }

    constructor(props: IProps) {
        super(props);
        if (this.props.match.params.market) {
            this.state = {
                fromSymbol: this.props.match.params.market.split(":")[0],
                toSymbol: this.props.match.params.market.split(":")[1],
                kycModal: (userObject.getLevel().code === "verified" ? false : true),
            };
        } else {
            this.state = {
                fromSymbol: "BTC",
                toSymbol: "USD",
                kycModal: (userObject.getLevel().code === "verified" ? false : true),
            };
        }
        this.showModal = this.showModal.bind(this);
    }

    public showModal() {
        this.setState({ kycModal: true });
    }

    public render() {
        return (
            <Row type="flex" className="exchange-row" gutter={4}>
                <Col className="parent" lg={14} md={24}>
                    {/* <Row gutter={4}>
                        <Col md={12} >
                            <Block title={t.t(config.currencies[this.state.toSymbol].name)} icon={config.icons[this.state.toSymbol]}>
                                <Stock symbol={this.state.toSymbol} hideTitle />
                            </Block>
                        </Col>
                    </Row> */}
                    <Row type="flex" justify="start" className="main-row grow" gutter={4}>
                        <Col md={24} >
                            <Block>
                                <Market from={this.state.fromSymbol} to={this.state.toSymbol} />
                            </Block>
                        </Col>
                        <Col className="trading-view-block" md={24} >
                            <Block className="trading-view" transparent noPadding >
                                <TradingViewWidget
                                    symbol={`${this.state.fromSymbol}${this.state.toSymbol}`}
                                    theme={(this.props.theme === "light") ? Themes.LIGHT : Themes.DARK}
                                    autosize
                                    style={2}
                                    allow_symbol_change={false}
                                />
                            </Block>
                        </Col>
                        <Col md={24} >
                            <Row gutter={4}>
                                <Col md={24} lg={24} xl={12}>
                                    <Block className="place-order" transparent noPadding >
                                        <PlaceOrder fromSymbol={this.state.fromSymbol} toSymbol={this.state.toSymbol} kycModal={this.showModal} />
                                    </Block>
                                </Col>
                                <Col md={24} lg={24} xl={12}>
                                    <Block className="orders" transparent noPadding >
                                        <Orders fromSymbol={this.state.fromSymbol} toSymbol={this.state.toSymbol} />
                                    </Block>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col className="parent" lg={10} md={24} >
                    <Row type="flex" className="main-row" gutter={4}>
                        <Col md={24} >
                            <Block className="user-balance" title={t.t("Your balance")} icon={<FontAwesomeIcon icon={["fas", "balance-scale"]} />} iconPosition="right" >
                                <Balance symbols={[this.state.toSymbol, this.state.fromSymbol]} hideButton />
                            </Block>
                        </Col>
                    </Row>

                    {/* <Block iconPosition="right" title={t.t("Deposit history")} icon={<FontAwesomeIcon icon={["fas", "history"]} />}  >
                        <DepositHistory />
                    </Block> */}
                    <Row type="flex" className="main-row main-horizontal-row grow" gutter={4}>
                        <Col className="horizontal-col" xl={14} md={24} >
                            <Block className="order-book" title={<div>{`${t.t("Order book")}`}
                                <span className="subtitle"> {`${t.t(config.currencies[this.state.fromSymbol].name)} / ${t.t(config.currencies[this.state.toSymbol].name)}`}</span></div>}
                                icon={<FontAwesomeIcon icon={["fas", "list"]} />} iconPosition="right" >
                                <OrderBook type="buy" from={this.state.fromSymbol} to={this.state.toSymbol} />
                                <br />
                                <OrderBook type="sell" showHeaders={false} from={this.state.fromSymbol} to={this.state.toSymbol} />
                                <div className="info">
                                    <FontAwesomeIcon className="buy" icon={["fas", "square-full"]} />
                                    <span>{t.t("buy")}</span>
                                    <FontAwesomeIcon className="sell" icon={["fas", "square-full"]} />
                                    <span>{t.t("sell")}</span>
                                </div>
                            </Block>
                        </Col>
                        <Col className="horizontal-col" xl={10} md={24} >
                            <Block className="order-book" title={<div>{`${t.t("Trades")}`}
                                <span className="subtitle"> {`${t.t(config.currencies[this.state.fromSymbol].name)} / ${t.t(config.currencies[this.state.toSymbol].name)}`}</span></div>}
                                icon={<FontAwesomeIcon icon={["fas", "list"]} />} iconPosition="right" >
                                <MarketTrades from={this.state.fromSymbol} to={this.state.toSymbol} />
                            </Block>
                        </Col>
                    </Row>
                </Col>
                {/* <Col md={5} >
                    <Block title={t.t("Live prices")} icon={<FontAwesomeIcon icon={["fas", "chart-line"]} />} iconPosition="right" >
                        <Live />
                    </Block>
                    <Block title={<div>{`${t.t("Trades")}`}
                        <span className="subtitle"> {`${t.t(config.currencies[this.state.fromSymbol].name)} / ${t.t(config.currencies[this.state.toSymbol].name)}`}</span></div>}
                        icon={<FontAwesomeIcon icon={["fas", "list"]} />} iconPosition="right" >
                        <MarketTrades from={this.state.fromSymbol} to={this.state.toSymbol} />
                    </Block>
                </Col> */}
                <Modal className={this.props.theme} onCancel={() => this.setState({ kycModal: false })} closable
                    cancelButtonDisabled visible={this.state.kycModal} title={t.t("Account verification")}
                    footer={[
                        <Link key="kyc" to="/kyc">
                            <Button
                                className="verify-btn" type="primary" size="large">
                                {t.t("Verify Account")}
                            </Button>
                        </Link>,
                    ]}
                >
                    <div>
                        {
                            t.t("Your account is not verified. Only verified accounts can use exchange area. Please verify your account.")
                        }
                    </div>

                </Modal>
            </Row>
        );
    }
}

function mapStateToProps(state: IRootState) {
    return {
        theme: state.app.user.theme,
    };
}

export default connect(mapStateToProps, null, null)(ExchangeContainer);
