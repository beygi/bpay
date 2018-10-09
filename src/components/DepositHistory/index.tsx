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
                    date: "Mon Jul 23 09:43:16",
                },
                {
                    value: 0.1,
                    coin: "BTC",
                    validation: 0,
                    date: "Mon Jul 23 09:48:34",
                },
                {
                    value: 3.0,
                    coin: "USD",
                    validation: 5,
                    date: "Mon Jul 23 09:43:16",
                },
                {
                    value: 2.0,
                    coin: "ETH",
                    validation: 4,
                    date: "Mon Jul 23 09:43:16",
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
        return (
            <List
                className="deposite-history"
                itemLayout="horizontal"
                dataSource={this.state.history}
                renderItem={(item) => {
                    const title = <span>{config.icons[item.coin]}&nbsp;{item.value}</span>;
                    const percent = item.validation * 20;
                    const percentText = (item.validation === 5) ? "Done" : ` ${item.validation} / 5`;

                    return (<List.Item className="deposit-item">
                        <List.Item.Meta title={title} description={item.date} />
                        <Progress className="transaction-validate" strokeWidth={10} width={50} type="circle" percent={percent} format={() => percentText} />
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
        };
    }
    // there is no balance from redux, state must not be updated in getDerivedStateFromProps
    return {
        history: null,
    };
}

export default connect(mapStateToProps, null, null, { pure: false })(DespositHistoryComponent);
