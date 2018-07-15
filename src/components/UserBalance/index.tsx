import { Collapse } from "antd";
import * as React from "react";

import { connect } from "react-redux";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import USER from "./../../lib/user";
import "./style.less";

const userObject = USER.getInstance();

interface IProps {
    user: any;
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
                    name: "USD",
                    balance: 145,
                    symbol: "usd",
                },
            ],
        };
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
    };
}

function mapStateToProps(state: IRootState) {
    return {
        user: state.app.user,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBalanceComponent);
