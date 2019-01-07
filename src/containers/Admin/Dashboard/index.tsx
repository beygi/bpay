import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Layout, Row } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import Analysis from "../../../components/Analysis";
import Balance from "../../../components/Balance";
import Profile from "../../../components/DashboardHeaderProfile";
import Block from "../../../components/Holder";
import Chart from "../../../components/LineChart";
import Guide from "../../../components/UserStatusGuide";
import config from "../../../config";
import { setUser } from "../../../redux/app/actions";
import { IRootState } from "../../../redux/reducers";
import t from "../../../services/trans/i18n";
import "./style.less";

interface IProps {
    /** crypto currencies exchange data from redux store */
    trades: [];
}

interface IState {
}

class AdminDashboardContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const series =
            [
                {
                    name: "Bitcoin",
                    type: "line",
                    data: [["2017-10-16T10:04:01.339Z", 9], ["2017-10-17T10:14:13.914Z", 12], ["2017-10-25T10:14:13.914Z", 22]],
                },
                {
                    name: "Ethereum",
                    type: "line",
                    data: [["2017-10-16T10:04:01.339Z", 18], ["2017-10-17T10:14:13.914Z", 15], ["2017-10-25T10:14:13.914Z", 5]],
                },
                {
                    name: "Litecoin",
                    type: "line",
                    data: [["2017-10-16T10:04:01.339Z", 14], ["2017-10-17T10:14:13.914Z", 29], ["2017-10-25T10:14:13.914Z", 12]],
                },
            ];

        const trade = [
            {
                name: "BTC-USD",
                type: "line",
                data: this.props.trades["BTC-USD"].map((item) => [item.time, item.price]),
            },
        ];
        const AnalysisBlocks = Object.keys(config.currencies).map((symbol) =>
            <Block key={symbol}>
                <Analysis symbol={symbol} />
            </Block>);

        return (
            <Row gutter={8}>
                <Col md={6} >
                    <Block title={t.t("Hot storage")} icon={<FontAwesomeIcon className="hot-storage" icon={["fab", "gripfire"]} />} >
                        <Balance hideButton />
                    </Block>
                    <Block title={t.t("Cold storage")} icon={<FontAwesomeIcon className="cold-storage" icon={["fas", "snowflake"]} />} >
                        <Balance hideButton />
                    </Block>
                    <Block title={t.t("Tax Cash Desk")} icon={<FontAwesomeIcon icon={["fas", "box"]} />} >
                        <Balance hideButton />
                    </Block>
                    <Block title={t.t("Fee Cash Desk")} icon={<FontAwesomeIcon icon={["fas", "box"]} />}  >
                        <Balance hideButton />
                    </Block>
                </Col>
                <Col md={18} >
                    <Row gutter={8}>
                        <Col md={24}>
                            <Block noPadding className="line-chart">
                                <Chart title="‌BTC/USD" series={trade} />
                            </Block>
                            {AnalysisBlocks}
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

function mapStateToProps(state: IRootState) {
    if (state.app.market && state.app.market.trades !== undefined) {
        return {
            trades: state.app.market.trades,
        };
    }
    // there is no balance from redux, state must not be updated in getDerivedStateFromProps
    return {
        trades: null,
    };
}

export default connect(mapStateToProps)(AdminDashboardContainer);
