/**
 * @module Components/OrderBook
 */
import { Table } from "antd";
import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import Ex from "../../components/ExchangeValue";
import config from "../../config";
import { updateUser } from "../../redux/app/actions";
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
    /**  order book type, sell or buy */
    type: "sell" | "buy";
    /** store dispatcher */
    updateStorePrice: (price) => void;
}

interface IState {
    /** crypto currencies exchange data */
    orders: any[];
    /** maximum volume of orders in final price step */
    max: number;
}

/**
 * we have live currencies exchnage rate and price in this block
 */
class OrderBook extends React.Component<IProps, IState> {

    public static getDerivedStateFromProps(props) {
        // update state.balance when props changes by redux4
        if (props.orders !== null) {

            let orders = props.orders[`${props.from}-${props.to}`][props.type].map((order) => {
                order.price = _.round(order.price, config.marketsOptions[`${props.from}:${props.to}`].orderBookRoundFactor);
                order.total = order.price * order.amount;
                return (order);
            });

            orders = _.groupBy(orders, "price");

            orders = Object.keys(orders).map(
                (key) => {
                    const count = orders[key].length;
                    return orders[key].reduce(
                        (accumulator, currentValue) => {
                            accumulator.amount += currentValue.amount;
                            accumulator.total += currentValue.total;
                            accumulator.count = count;
                            accumulator.price = currentValue.price;
                            return accumulator;
                        }, {
                            count: 0,
                            amount: 0,
                            total: 0,
                            price: 0,
                        },
                    );
                    // orders[key].map((item) => {
                    //     item.count = count;
                    //     return item;
                    // });
                },
            );
            orders = _.orderBy(orders, "price", (props.type === "sell") ? "asc" : "desc").slice(0, 12);
            // orders = _.orderBy(orders, "price", "asc").slice(0, 12);

            // append each row to next
            orders = orders.map((item, index) => {
                if (index === 0) { item.totalAmount = item.amount; return item; }
                item.totalAmount = item.amount + orders[index - 1].totalAmount;
                // item.amount += orders[index - 1].amount;
                item.total += orders[index - 1].total;
                return item;
            },

            );

            let max: any = _.maxBy(orders, "total");
            max = max.total;
            return {
                orders,
                max,
            };
        }
        return null;
    }

    constructor(props: IProps) {
        super(props);
        // initial coin state. it must be available in config file
        this.state = {
            orders: null,
            max: 0,
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
                title: t.t("Total"),
                dataIndex: "totalAmount",
                render: (price) => (
                    <Ex stockStyle={false} fixFloatNum={2} value={price} seperateThousand />
                ),
            },
            {
                title: t.t("Total value"),
                dataIndex: "total",
                render: (price) => (
                    <Ex stockStyle={false} fixFloatNum={0} value={price} seperateThousand />
                ),
            },
            {
                title: t.t("Count"),
                dataIndex: "count",
                render: (count) => {
                    return (<Ex fixFloatNum={0} stockStyle={false} value={count} />);
                },
            },
        ];
        // if (this.props.type === "sell") {
        //     columns.reverse();
        // }
        if (this.state.orders) {
            return (
                <Table pagination={false} size="small" rowKey={(record, i) => `${i}`}
                    className="market-orders" dataSource={(this.props.type === "buy") ? this.state.orders.reverse() : this.state.orders} columns={columns}
                    onRow={(record) => {
                        return {
                            style: (this.props.type === "sell") ?
                                { background: `linear-gradient(to left, rgba(255, 88, 88, 0.7) ${_.round((record.total / this.state.max) * 100)}%,transparent 0%)` } :
                                { background: `linear-gradient(to left, rgba(143, 170, 131 , 0.7) ${_.round((record.total / this.state.max) * 100)}%,transparent 0%)` },
                            onClick: () => { this.props.updateStorePrice(record.price); },
                        };
                    }}
                >
                </Table>
            );
        }
        return (
            <div className="user-balance live-price" > {trades}</div >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateStorePrice: (price) => dispatch(updateUser({ bidPrice: price })),
    };
}

function mapStateToProps(state: IRootState) {
    if (state.app.market && state.app.market.orders !== undefined) {
        return {
            orders: state.app.market.orders,
            language: state.app.user.language,
        };
    }
    // there is no balance from redux, state must not be updated in getDerivedStateFromProps
    return {
        orders: null,
        language: state.app.user.language,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderBook);
