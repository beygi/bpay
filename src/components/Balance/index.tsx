/**
 * @module Components/BalanceComponent
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Collapse } from "antd";
import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Ex from "../../components/ExchangeValue";
import config from "../../config";
import btcApi from "../../lib/api/btc";
import { updateUserBalance } from "../../redux/app/actions";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import USER from "./../../lib/user";
import "./style.less";

const allApis = { btc: btcApi.getInstance(), usd: btcApi.getInstance(), eth: btcApi.getInstance() };
const userObject = USER.getInstance();

interface IProps {
    updateUserBalance: (balance) => void;
    /**  holds user balance object */
    balance: {};
    /** display deposit button */
    hideButton?: boolean;
}

interface IState {
    /**  holds user balance object */
    balance: {};
    fiats: {};
}

/**
 * represent user balance status for all available symbols
 */
class BalanceComponent extends React.Component<IProps, IState> {

    public static getDerivedStateFromProps(props, state) {
        // update state.balance when props changes by redux
        if (props.balance !== null) {
            return { balance: { ...state.balance, ...props.balance } };
        }
        return null;
    }
    public interval: any;
    constructor(props: IProps) {
        super(props);

        // initial coin state. it must be available in config file
        const fiats = {};
        Object.keys(config.currencies).map((key) => {
            if (config.currencies[key].type === "fiat") {
                fiats[key] = config.currencies[key];
            }
        });

        this.state = { fiats, balance: null };

        // load balance data of each coin
        this.loadData = this.loadData.bind(this);
    }

    public componentDidMount() {
        this.loadData();
        clearInterval(this.interval);
        this.interval = setInterval(() => { this.loadData(); }, 5000);
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
        },
        );

        // const balance = {};
        // let name = "btc";
        // balance[name] = { ...this.state.balance[name] , ...{balance: Math.ceil (  (Math.random() * 3000) + 1 )    }    };
        // name = "usd";
        // balance[name] = { ...this.state.balance[name] , ...{balance: Math.ceil (  (Math.random() * 5000) + 1 )    }    };
        // name = "eth";
        // balance[name] = { ...this.state.balance[name] , ...{balance: Math.ceil (  (Math.random() * 7000) + 1 )    }    };
        // this.props.updateUserBalance(balance);
    }

    public render() {
        const coins = Object.keys(this.state.fiats).map((key) =>
            <div className="coin-balance" key={key}>
                <span className="balance-icon" > {config.icons[key]}</span >
                <p className="balance-name">{t.t(this.state.balance[key].name)}</p>
                <p className="balance-number">
                    <Ex value={this.state.balance[key].balance.available || 0} />
                </p>
            </div>,
        );
        return (
            <div className="user-balance" > {coins}
                {(!this.props.hideButton) ?
                    <Link to="/deposit">
                        <Button
                            icon="import"
                            className="neat-btn" type="primary" size="large">
                            {t.t("Deposit")}
                        </Button>
                    </Link> : null
                }

            </div >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateUserBalance: (balance) => dispatch(updateUserBalance(balance)),
    };
}

function mapStateToProps(state: IRootState) {
    if (state.app.user.balance !== undefined) {
        return {
            balance: state.app.user.balance,
        };
    }
    // there is no balance from redux, state must not be updated in getDerivedStateFromProps
    return {
        balance: null,
    };
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(BalanceComponent);
