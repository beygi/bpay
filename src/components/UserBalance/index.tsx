import { Collapse } from "antd";
import * as React from "react";

import { connect } from "react-redux";
import { IRootState } from "../../redux/reducers";

import { updateUserBalance } from "../../redux/app/actions";
import t from "../../services/trans/i18n";
import USER from "./../../lib/user";
import "./style.less";

const userObject = USER.getInstance();

interface IProps {
    balance: any;
    updateUserBalance: (symbol: string, balance: number) => void;
}

interface IState {
    coins: Array<{ name: string, balance: number, symbol: string }>;
}

class UserBalanceComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        // this.action = this.action.bind(this);
        this.state = {
            coins: [
                {
                    name: "Bit Coin",
                    balance: 45,
                    symbol: "btc",
                },
                {
                    name: "US dollar",
                    balance: 145,
                    symbol: "usd",
                },
            ],
        };
        this.loadData = this.loadData.bind(this);
    }

    public componentDidMount() {
        this.loadData();
    }

    public loadData() {
        const coins = this.state.coins;
        // call apis and add result to redux, prepare fundamentals for websocket
        this.state.coins.forEach( (coin) =>
            console.log(coin),
        );
        this.setState({ coins });
        this.props.updateUserBalance("btc", 1200);
        this.props.updateUserBalance("usd", 1800);
    }

    public render() {
        const coins = this.state.coins.map((coin) =>
            <div className="coin-balance">
                <p className={"balance-icon coin-" + coin.symbol}></p>
                <p className="balance-name">{coin.name}</p>
                <p className="balance-number">{coin.balance}</p>
            </div>,
        );
        return (
            <div className="user-balance">{coins}</div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateUserBalance : (symbol, balance) => dispatch(updateUserBalance({ symbol, balance })),
    };
}

function mapStateToProps(state: IRootState) {
    return {
        balance: state.app.user.balance,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBalanceComponent);
