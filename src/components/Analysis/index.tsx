import * as React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "antd";
import * as _ from "lodash";
import { connect } from "react-redux";
import Gauge from "../../components/Gauge";
import config from "../../config";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import "./style.less";

interface IProps {
    symbol: string;
    cashDesks: any;
}

interface IState {
}

class AnalysisComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const gauges = Object.keys(config.currencies).map((symbol) => {
            if (symbol !== this.props.symbol) {
                return (
                    <Col md={4} key={symbol}>
                        <Gauge to={symbol} />
                    </Col>);
            }
        });

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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisComponent);
