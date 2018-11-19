/**
 * @module Components/DespositHistoryComponent
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse, List, Progress } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import config from "../../config";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import { localDate } from "../../services/trans/i18n";
import Ex from "../ExchangeValue";
import USER from "./../../lib/user";
import "./style.less";

const userObject = USER.getInstance();

interface IProps {
    /**  deposite history object that is a available in redux store */
    history: {};
}

interface IState {
    /**  holds deposite history of the user */
    history: any[];
}

/**
 * a component to display recent deposite histories width
 * confirmation count and status
 */
class DespositHistoryComponent extends React.Component<IProps, IState> {

    public static getDerivedStateFromProps(props, state) {
        // update state.balance when props changes by redux
        if (props.history !== null) {
            return { history: props.history };
        }
        return null;
    }

    constructor(props: IProps) {
        super(props);

        // initial coin state. it must be available in config file
        this.state = {
            history: [
                {
                    value: 2.0,
                    coin: "BTC",
                    validation: 4,
                    total: 5,
                    date: new Date().getTime(),
                },
                {
                    value: 0.1,
                    coin: "BTC",
                    validation: 0,
                    total: 5,
                    date: new Date(new Date().setDate(new Date().getDate() - 2)).getTime(),
                },
                {
                    value: 3.0,
                    coin: "USD",
                    validation: 5,
                    total: 5,
                    date: new Date(new Date().setDate(new Date().getDate() - 3)).getTime(),
                },
                {
                    value: 2.0,
                    coin: "ETH",
                    validation: 15,
                    total: 25,
                    date: new Date(new Date().setDate(new Date().getDate() - 6)).getTime(),
                },
            ],
        };

        // load balance data of each coin
        this.loadData = this.loadData.bind(this);
    }

    public componentDidMount() {
        this.loadData();
    }

    public loadData() {
        // call apis and add result to redux, prepare fundamentals for websocket

        // allApis[key].allBalancesUsingGET({}).then((res) => {
        //     // console.log(res.data);
        //     // Parse data
        //     // this.props.updateUserBalanceBalance(coin.symbol, 1200)"
        // },
        // ).catch((err) => {
        //     console.log("err");
        // });
    }

    public render() {
        const pDate = localDate(t.default.language);
        return (
            <List
                className="deposite-history"
                itemLayout="horizontal"
                dataSource={this.state.history}
                renderItem={(item) => {
                    const title = <span>{config.icons[item.coin]}<Ex stockStyle={false} value={item.value} /></span>;
                    const percent = (item.validation * 100) / item.total;
                    const percentText = (item.validation === item.total) ? "Done" : ` ${item.validation.toLocaleString(t.default.language)}/${item.total.toLocaleString(t.default.language)}`;
                    const date = new pDate(item.date).toLocaleString();

                    return (<List.Item className="deposit-item">
                        <List.Item.Meta title={title} description={date} />
                        {
                            (percent === 100) ?
                                <Progress className="transaction-success" strokeWidth={10} width={50} type="circle" percent={percent} />
                                :
                                <Progress className="transaction-validate" strokeWidth={10} width={50} type="circle" percent={percent} format={() => percentText} />
                        }

                    </List.Item>);
                }}
            />
        );
    }
}

function mapStateToProps(state: IRootState) {
    if (state.app.user.history !== undefined) {
        return {
            history: state.app.user.history,
            language: state.app.user.language,
        };
    }
    // there is no balance from redux, state must not be updated in getDerivedStateFromProps
    return {
        history: null,
        language: state.app.user.language,
    };
}

export default connect(mapStateToProps)(DespositHistoryComponent);
