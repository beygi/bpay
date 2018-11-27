/**
 * @module Components/OrderBook
 */
import { Table } from "antd";
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
    orders: [];
    /**  to symbol */
    type: string;
}

interface IState {
    /** crypto currencies exchange data */
    orders: any[];
}

/**
 * we have live currencies exchnage rate and price in this block
 */
class OrderBook extends React.Component<IProps, IState> {

    public static getDerivedStateFromProps(props) {
        // update state.balance when props changes by redux4
        if (props.orders !== null) {
            return { orders: props.orders[`${props.from}-${props.to}`] };
        }
        return null;
    }

    constructor(props: IProps) {
        super(props);
        // initial coin state. it must be available in config file
        this.state = {
            orders: null,
        };
    }

    public render() {
        const trades: any = <div>Loading ...</div>;
        const pDate = localDate(t.default.language);
        const priceFloatedNums = config.marketsOptions[`${this.props.from}:${this.props.to}`].priceFloatedNums;
        const columns = [
            {
                title: t.t("Price"),
                dataIndex: "price",
                render: (price) => (
                    <Ex fixFloatNum={priceFloatedNums} stockStyle={false} value={price} seperateThousand />
                ),
            },
            {
                title: t.t("Amount"),
                dataIndex: "amount",
                render: (price) => (
                    <Ex stockStyle={false} fixFloatNum={2} value={price} seperateThousand />
                ),
            },
            {
                title: t.t("Count"),
                dataIndex: "amount",
                render: (count) => {
                    return (<Ex fixFloatNum={0} stockStyle={false} value={count} />);
                },
            },
        ];
        if (this.state.orders) {
            return (
                <Table pagination={false} size="small" rowKey={(record, i) => `${i}`}
                    className="market-orders" dataSource={this.state.orders} columns={columns}>
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
            orders: state.app.market.trades,
            language: state.app.user.language,
        };
    }
    // there is no balance from redux, state must not be updated in getDerivedStateFromProps
    return {
        orders: null,
        language: state.app.user.language,
    };
}

export default connect(mapStateToProps)(OrderBook);
