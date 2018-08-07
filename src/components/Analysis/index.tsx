import * as React from "react";

import { Col, Row } from "antd";
import { connect } from "react-redux";
import Gauge from "../../components/Gauge";
import config from "../../config";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import "./style.less";

interface IProps {
    symbol: string;
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

        return (
            <div>
                <Col md={6}>
                    {this.props.symbol}
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisComponent);
