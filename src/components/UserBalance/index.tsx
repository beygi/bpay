import { Collapse } from "antd";
import * as React from "react";

import { connect } from "react-redux";
import { IRootState } from "../../redux/reducers";

import { updateUserBalance } from "../../redux/app/actions";
import t from "../../services/trans/i18n";
import USER from "./../../lib/user";
import "./style.less";

import btcApi from "../../lib/api/btc";
const allApis = { btc: btcApi.getInstance(), usd: btcApi.getInstance() };
const userObject = USER.getInstance();

interface IProps {
    updateUserBalance: (balance) => void;
    balance: {};
}

interface IState {
    balance: {};
}

class UserBalanceComponent extends React.Component<IProps, IState> {

     public static getDerivedStateFromProps(props, state) {
             // update state.balance when props changes by redux
             if (props.balance !== null) {
                  return {balance: {...state.balance, ...props.balance} };
             }
             return null;
     }

    constructor(props: IProps) {
        super(props);

        // initial coin state. it must be available in config file
        this.state = {
            balance: {
                btc: {
                    name: "Bit Coin",
                    balance: 0,
                },
                usd: {
                    name: "US dollar",
                    balance: 0,
                },
            },
        };

        // load balance data of each coin
        this.loadData = this.loadData.bind(this);
    }

    public componentDidMount() {
        this.loadData();
    }

    public loadData() {
        // call apis and add result to redux, prepare fundamentals for websocket
        Object.keys(this.state.balance).forEach((key) => {
            allApis[key].allBalancesUsingGET({}).then((res) => {
                // console.log(res.data);
                // Parse data
                // this.props.updateUserBalanceBalance(coin.symbol, 1200)"
            },
            ).catch((err) => {
                setTimeout( () => { this.props.updateUserBalance({ eth: { name: "Etheriom", balance: 185 }}); }, 8000 );
            });
        },
        );
        this.props.updateUserBalance({ usd: { name: "US Dollar", balance: 105 }} );
        this.props.updateUserBalance({ btc: { name: "Bit Coin", balance: 1512 }} );
    }

    public render() {
        const coins = Object.keys(this.state.balance).map((key) =>
            <div className="coin-balance" key={key}>
                <p className={"balance-icon coin-" + key}></p>
                <p className="balance-name">{this.state.balance[key].name}</p>
                <p className="balance-number">{this.state.balance[key].balance}</p>
            </div>,
        );
        return (
            <div className="user-balance">{coins}</div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateUserBalance: (balance) => dispatch(updateUserBalance(balance)),
    };
}

function mapStateToProps(state: IRootState) {
    if ( state.app.user.balance !== undefined) {
        return {
            balance: state.app.user.balance,
        };
    }
    // there is no balance from redux, state must not be updated in getDerivedStateFromProps
    return {
        balance :  null,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBalanceComponent);
