import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import config from "../../config";
import btcApi from "../../lib/api/btc";
import { updateUserBalance } from "../../redux/app/actions";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import USER from "./../../lib/user";
import "./style.less";

const allApis = { btc: btcApi.getInstance(), usd: btcApi.getInstance() , eth: btcApi.getInstance() };
const userObject = USER.getInstance();

interface IProps {
    updateUserBalance: (balance) => void;
    balance: {};
}

interface IState {
    balance: {};
}

class BalanceComponent extends React.Component<IProps, IState> {

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
            balance: config.currencies,
        };

        // load balance data of each coin
        this.loadData = this.loadData.bind(this);
    }

    public componentDidMount() {
        this.loadData();
        // setInterval( () => { this.loadData(); }, 3000);
    }

    public loadData() {
        // call apis and add result to redux, prepare fundamentals for websocket
        Object.keys(this.state.balance).forEach((key) => {
            // allApis[key].allBalancesUsingGET({}).then((res) => {
            //     // console.log(res.data);
            //     // Parse data
            //     // this.props.updateUserBalanceBalance(coin.symbol, 1200)"
            // },
            // ).catch((err) => {
            //     console.log("err");
            // });
            const balance = {};
            balance[key] = { ...this.state.balance[key] , ...{balance: Math.ceil (  (Math.random() * 1000) + 1 )    }    };
            this.props.updateUserBalance(balance);
        },
        );
    }

    public render() {
        const coins = Object.keys(this.state.balance).map((key) =>
            <div className="coin-balance" key={key}>
                <FontAwesomeIcon className="balance-icon" icon={this.state.balance[key].icon} />
                <p className="balance-name">{this.state.balance[key].name}</p>
                <p className="balance-number">{this.state.balance[key].balance}</p>
            </div>,
        );
        return(
            <   div className= "user-balance" > {coins}</div >
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

export default connect(mapStateToProps, mapDispatchToProps)(BalanceComponent);
