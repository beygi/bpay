import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "antd";
import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import Battery from "../../components/Battery";
import Gauge from "../../components/Gauge";
import config from "../../config";
import { IRootState } from "../../redux/reducers";
import tools from "../../services/tools";
import t from "../../services/trans/i18n";
import "./style.less";

interface IProps {
    symbol: string;
    cashDesks: any;
    forex: any;
    cryptos: any;
}

interface IState {
}

class AnalysisComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        let symbolTotalValue = 0;
        let goalTotalValue = 0;
        const gauges = Object.keys(config.currencies).map((symbol) => {
            if (symbol !== this.props.symbol) {
                const symbolToUsd = tools.getUsdPrice(this.props.symbol, _.get(this.props, `cashDesks.${this.props.symbol}.CSD_${symbol}.value`, 0)  );
                const childToUsd =  tools.getUsdPrice(symbol, _.get(this.props, `cashDesks.${this.props.symbol}.CSD_${symbol}.goalValue`, 0));

                symbolTotalValue += symbolToUsd;
                goalTotalValue += childToUsd;

                let percent = 0;
                if (childToUsd !== 0) {
                    percent = (symbolToUsd / childToUsd ) * 100;
                }

                return (
                    <Col md={4} key={symbol}>
                        {/* <div>{_.get(this.props, `cashDesks.${this.props.symbol}.CSD_${symbol}.value`, 0)}</div>
                        <div>{_.get(this.props, `cashDesks.${this.props.symbol}.CSD_${symbol}.goalValue`, 0)}</div>
                        <div>{symbolToUsd}</div>
                        <div>{childToUsd}</div>
                        <div>{percent}</div> */}
                        <Gauge to={symbol} percent={percent} />
                    </Col>);
            }
        });
        const totalPercent = (symbolTotalValue / goalTotalValue ) * 100;

        const cashDesks = [
            {
                name: t.t("Master"),
                icon: <FontAwesomeIcon icon={["fas", "archive"]} />,
                value: _.get(this.props, `cashDesks.${this.props.symbol}.CSD_MASTER.value`, 0),
            },
            {
                name: t.t("Hot"),
                icon: <FontAwesomeIcon className="hot-storage" icon={["fab", "gripfire"]} />,
                value: _.get(this.props, `cashDesks.${this.props.symbol}.CSD_HOT.value`, 0),
            },
            {
                name: t.t("Cold"),
                icon: <FontAwesomeIcon className="cold-storage" icon={["fas", "snowflake"]} />,
                value: _.get(this.props, `cashDesks.${this.props.symbol}.CSD_COLD.value`, 0),
            },
            {
                name: t.t("Owes"),
                icon: <FontAwesomeIcon icon={["fas", "hand-holding"]} />,
                value: _.get(this.props, `cashDesks.${this.props.symbol}.CSD_OWES.value`, 0),
            },
        ];

        const cashDesksRows = cashDesks.map((desk) =>
            <div className="coin-balance" key={desk.name}>
                <span className="balance-icon" >
                    {desk.icon}</span >
                <p className="balance-name">{desk.name}</p>
                <p className="balance-number">{desk.value.toFixed(2) || 0}</p>
            </div>,
        );

        return (
            <div>
                <Col md={6}>
                    <h3>{config.icons[this.props.symbol]} {config.currencies[this.props.symbol].name}</h3>
                    <div className="user-balance">
                        {cashDesksRows}
                        <Battery percent={totalPercent} title="" />
                    </div>
                </Col>
                <Row gutter={8}>
                    {gauges}
                </Row>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisComponent);
