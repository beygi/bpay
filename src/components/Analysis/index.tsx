/**
 * @module Components/AnalysisComponent
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Modal, Row } from "antd";
import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import Battery from "../../components/Battery";
import Rate from "../../components/ExchangeValue";
import Gauge from "../../components/Gauge";
import Internal from "../../components/InternalExchange";
import config from "../../config";
import { IRootState } from "../../redux/reducers";
import tools from "../../services/tools";
import t from "../../services/trans/i18n";
import "./style.less";

interface IProps {
    /** main symbol which is analysed */
    symbol: string;
    /** system cashDesks which is synced with redux store */
    cashDesks: any;
    /** forex data  which is synced with redux store */
    forex: any;
    /** cryptosCurrencies market data  which is synced with redux store */
    cryptos: any;
}

interface IState {
    /** visibility status of exchange modal */
    ModalVisible: boolean;
    /** target symbol that we want to convert our symbol to it */
    toSymbol?: string;
}

/**
 * represent couple of charts and values for a symbol analysis
 */
class AnalysisComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            ModalVisible: false,
        };
    }

    public showModal(from, to) {
        this.setState({ toSymbol: to, ModalVisible: true });
    }

    public setModalStatus(ModalVisible: boolean) {
        this.setState({ ModalVisible });
    }

    public render() {
        let symbolTotalValue = 0;
        let goalTotalValue = 0;
        const gauges = Object.keys(config.currencies).map((symbol) => {
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
                    <Col className="symbol-gauge" md={6} key={symbol}>
                        {/* <div>{_.get(this.props, `cashDesks.${this.props.symbol}.CSD_${symbol}.value`, 0)}</div>
                        <div>{_.get(this.props, `cashDesks.${this.props.symbol}.CSD_${symbol}.goalValue`, 0)}</div>
                        <div>{symbolToUsd}</div>
                        <div>{promisedToUsd}</div>
                        <div>{percent}</div> */}
                        <Gauge title={symbol} percent={percent} />
                        <div className="owe-data">
                            <div><FontAwesomeIcon icon={["fas", "handshake"]} /> {config.icons[symbol]}{currenyPromised.toFixed(2)}</div>
                            <span><FontAwesomeIcon icon={["fas", "handshake"]} /> {symbolPromiesd.toFixed(2)}</span>
                            &nbsp;<span><FontAwesomeIcon icon={["fas", "hand-holding"]} /> {symbolCurrent.toFixed(2)}</span>
                        </div>
                        <div><FontAwesomeIcon icon={["fas", "balance-scale"]} /> $<Rate value={promisedDiffinUsd} floatsNum={1} seperateThousand /></div>
                        <Button onClick={() => this.showModal(this.props.symbol, symbol)} size="small" className="neat-btn" type="primary">Exchange</Button>
                    </Col >);
            }
        });

        const totalPercent = (symbolTotalValue / goalTotalValue) * 100;

        const count = goalTotalValue / tools.getUsdRate(this.props.symbol);
        const diffInUsd = symbolTotalValue - goalTotalValue;

        const cashDesks = [
            {
                name: t.t("Master"),
                icon: <FontAwesomeIcon icon={["fas", "archive"]} />,
                value: _.get(this.props, `cashDesks.${this.props.symbol}.CSD_MASTER.value`, 0).toFixed(2),
            },
            {
                name: t.t("Hot"),
                icon: <FontAwesomeIcon className="hot-storage" icon={["fab", "gripfire"]} />,
                value: _.get(this.props, `cashDesks.${this.props.symbol}.CSD_HOT.value`, 0).toFixed(2),
            },
            {
                name: t.t("Cold"),
                icon: <FontAwesomeIcon className="cold-storage" icon={["fas", "snowflake"]} />,
                value: _.get(this.props, `cashDesks.${this.props.symbol}.CSD_COLD.value`, 0).toFixed(2),
            },
            {
                name: t.t("Promised owes"),
                icon: <FontAwesomeIcon icon={["fas", "handshake"]} />,
                value: _.get(this.props, `cashDesks.${this.props.symbol}.CSD_OWES.value`, 0).toFixed(2),
            },
            {
                name: t.t("Current owes"),
                icon: <FontAwesomeIcon icon={["fas", "hand-holding"]} />,
                value: count.toFixed(2),
            },
            {
                name: t.t("Balance"),
                icon: <FontAwesomeIcon icon={["fas", "balance-scale"]} />,
                value: <div> $<Rate value={diffInUsd} floatsNum={1} seperateThousand /></div>,
            },
        ];

        const cashDesksRows = cashDesks.map((desk) =>
            <div className="coin-balance" key={desk.name}>
                <span className="balance-icon" >
                    {desk.icon}</span >
                <p className="balance-name">{desk.name}</p>
                <p className="balance-number">{desk.value}</p>
            </div>,
        );

        return (
            <Row gutter={8}>
                <Col md={6}>
                    <h3>{config.icons[this.props.symbol]} {config.currencies[this.props.symbol].name}</h3>
                    <div className="user-balance">
                        {cashDesksRows}
                        <br />
                    </div>
                </Col>
                <Col md={18}>
                    <Row gutter={8}>
                        {gauges}
                        <Modal
                            title={`${this.props.symbol} to ${this.state.toSymbol}`}
                            wrapClassName="vertical-center-modal"
                            visible={this.state.ModalVisible}
                            onOk={() => this.setModalStatus(false)}
                            onCancel={() => this.setModalStatus(false)}
                            footer={null}
                        >
                            <Internal symbol={this.props.symbol} toSymbol={this.state.toSymbol} />
                        </Modal>
                        <Col md={24}>
                            <Battery percent={totalPercent} title="" />
                        </Col>
                    </Row>
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
        language: state.app.user.language,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisComponent);
