import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "antd";
import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import Battery from "../../components/Battery";
import Rate from "../../components/ExchangeValue";
import Gauge from "../../components/Gauge";
import Block from "../../components/Holder";
import config from "../../config";
import { IRootState } from "../../redux/reducers";
import tools from "../../services/tools";
import t from "../../services/trans/i18n";
import "./style.less";

interface IProps {
    symbol: string;
    toSymbol: string;
    cashDesks: any;
    forex: any;
    cryptos: any;
}

interface IState {
}

class InternalExchangeComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        let symbolTotalValue = 0;
        let goalTotalValue = 0;
        const gauge1 = [this.props.toSymbol].map((symbol) => {
            if (symbol !== this.props.symbol) {
                const symbolPromiesd = _.get(this.props, `cashDesks.${this.props.symbol}.CSD_${symbol}.value`, 0);
                const currenyPromised = _.get(this.props, `cashDesks.${this.props.symbol}.CSD_${symbol}.goalValue`, 0);
                const symbolToUsd = tools.getUsdPrice(this.props.symbol, symbolPromiesd);
                const promisedToUsd = tools.getUsdPrice(symbol, currenyPromised);
                let symbolCurrent = 0;
                let percent = 0;
                let promisedDiffinUsd = 0;

                symbolTotalValue += symbolToUsd;
                goalTotalValue += promisedToUsd;

                if (promisedToUsd !== 0) {
                    percent = (symbolToUsd / promisedToUsd) * 100;
                    symbolCurrent = symbolPromiesd + (((100 - percent) / 100) * symbolPromiesd);
                    promisedDiffinUsd = symbolToUsd - promisedToUsd;
                }

                return (
                    <Col className="symbol-gauge" md={12} key={symbol}>
                        <Block>
                            <Gauge to={symbol} percent={percent} />
                            <div className="owe-data">
                                <div><FontAwesomeIcon icon={["fas", "handshake"]} /> {config.icons[symbol]}{currenyPromised.toFixed(2)}</div>
                                <span><FontAwesomeIcon icon={["fas", "handshake"]} /> {symbolPromiesd.toFixed(2)}</span>
                                &nbsp;<span><FontAwesomeIcon icon={["fas", "hand-holding"]} /> {symbolCurrent.toFixed(2)}</span>
                            </div>
                            <div><FontAwesomeIcon icon={["fas", "balance-scale"]} /> $<Rate value={promisedDiffinUsd} fixFloatNum={1} seperateThousand /></div>
                        </Block>
                    </Col >);
            }
        });

        const gauge2 = [this.props.symbol].map((symbol) => {
            if (symbol !== this.props.toSymbol) {
                const symbolPromiesd = _.get(this.props, `cashDesks.${this.props.toSymbol}.CSD_${symbol}.value`, 0);
                const currenyPromised = _.get(this.props, `cashDesks.${this.props.toSymbol}.CSD_${symbol}.goalValue`, 0);
                const symbolToUsd = tools.getUsdPrice(this.props.toSymbol, symbolPromiesd);
                const promisedToUsd = tools.getUsdPrice(symbol, currenyPromised);
                let symbolCurrent = 0;
                let percent = 0;
                let promisedDiffinUsd = 0;

                symbolTotalValue += symbolToUsd;
                goalTotalValue += promisedToUsd;

                if (promisedToUsd !== 0) {
                    percent = (symbolToUsd / promisedToUsd) * 100;
                    symbolCurrent = symbolPromiesd + (((100 - percent) / 100) * symbolPromiesd);
                    promisedDiffinUsd = symbolToUsd - promisedToUsd;
                }

                return (
                    <Col className="symbol-gauge" md={12} key={symbol}>
                        <Block>
                            <Gauge to={symbol} percent={percent} />
                            <div className="owe-data">
                                <div><FontAwesomeIcon icon={["fas", "handshake"]} /> {config.icons[symbol]}{currenyPromised.toFixed(2)}</div>
                                <span><FontAwesomeIcon icon={["fas", "handshake"]} /> {symbolPromiesd.toFixed(2)}</span>
                                &nbsp;<span><FontAwesomeIcon icon={["fas", "hand-holding"]} /> {symbolCurrent.toFixed(2)}</span>
                            </div>
                            <div><FontAwesomeIcon icon={["fas", "balance-scale"]} /> $<Rate value={promisedDiffinUsd} fixFloatNum={1} seperateThousand /></div>
                        </Block>
                    </Col >);
            }
        });

        return (
            <Row gutter={8}>
                <Col md={24}>
                    <Row gutter={8}>
                        {gauge1}
                        {gauge2}
                    </Row>
                </Col>
                <Col md={24}>
                    <Block>
                        <Row gutter={8}>
                            <Col md={20}>
                                Difference
                    </Col>
                            <Col md={4}>
                                <Button size="small" className="neat-btn" type="primary">Do it</Button>
                            </Col>
                        </Row>
                    </Block>
                    <Block>
                        <Row gutter={8}>
                            <Col md={20}>
                                API
                    </Col>
                            <Col md={4}>
                                <Button size="small" className="neat-btn" type="primary">Do it</Button>
                            </Col>
                        </Row>
                    </Block>
                    <Block>
                        <Row gutter={8}>
                            <Col md={20}>
                                Exchange
                    </Col>
                            <Col md={4}>
                                <Button size="small" className="neat-btn" type="primary">Do it</Button>
                            </Col>
                        </Row>
                    </Block>
                </Col>
            </Row>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

function mapStateToProps(state: IRootState) {
    return {
        cashDesks: state.app.office.cashDesks || null,
        forex: state.app.market.forex || null,
        cryptos: state.app.market.cryptos || null,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InternalExchangeComponent);
