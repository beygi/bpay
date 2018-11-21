/**
 * @module Components/MarketTrades
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse, Table } from "antd";
import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import Ex from "../../components/ExchangeValue";
import config from "../../config";
import { IRootState } from "../../redux/reducers";
import t, { localDate } from "../../services/trans/i18n";
import "./style.less";

interface IProps {
    /**  from symbol */
    from: string;
    /**  to symbol */
    to: string;
    /** crypto currencies exchange data from redux store */
    trades: [];
}

interface IState {
    /** crypto currencies exchange data */
    trades: any[];
}

/**
 * we have live currencies exchnage rate and price in this block
 */
class MarketTradesComponent extends React.Component<IProps, IState> {

    public static getDerivedStateFromProps(props) {
        // update state.balance when props changes by redux4
        if (props.trades !== null) {
            return { trades: props.trades[`${props.from}-${props.to}`] };
        }
        return null;
    }

    constructor(props: IProps) {
        super(props);
        // initial coin state. it must be available in config file
        this.state = {
            trades: null,
        };
    }

    public render() {
        const trades: any = <div>Loading ...</div>;
        const pDate = localDate(t.default.language);
        const priceFloatedNums = config.marketsOptions[`${this.props.from}:${this.props.to}`].priceFloatedNums;
        const columns = [
            {
                title: t.t("Time"),
                dataIndex: "time",
                render: (date) => {
                    const TimeStamp = +new Date(date);
                    const tradeDate = new pDate(TimeStamp);
                    return (<div className="time"><Ex fixFloatNum={0} value={tradeDate.getHours()}
                        stockStyle={false} />:<Ex fixFloatNum={0} value={tradeDate.getMinutes()} stockStyle={false} />
                    </div>);
                },
            },
            {
                title: t.t("Price"),
                dataIndex: "price",
                render: (price) => (
                    <Ex fixFloatNum={priceFloatedNums} value={price} seperateThousand />
                ),
            },
            {
                title: t.t("Amount"),
                dataIndex: "amount",
                render: (price) => (
                    <Ex stockStyle={false} fixFloatNum={2} value={price} seperateThousand />
                ),
            },
        ];
        if (this.state.trades) {
            return (
                <Table pagination={false} size="small" rowKey={(record, i) => `${i}`}
                    className="market-trades" dataSource={this.state.trades} columns={columns}>
                </Table>
            );
        }
        return (
            <div className="user-balance live-price" > {trades}</div >
        );
    }
}

function mapStateToProps(state: IRootState) {
    if (state.app.market && state.app.market.trades !== undefined) {
        return {
            trades: state.app.market.trades,
            language: state.app.user.language,
        };
    }
    // there is no balance from redux, state must not be updated in getDerivedStateFromProps
    return {
        trades: null,
        language: state.app.user.language,
    };
}

export default connect(mapStateToProps)(MarketTradesComponent);
