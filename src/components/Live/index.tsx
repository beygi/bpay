import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse } from "antd";
import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import Ex from "../../components/ExchangeValue";
import config from "../../config";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import "./style.less";

interface IProps {
    cryptos: {};
}

interface IState {
    cryptos: any[];
}

class LiveComponent extends React.Component<IProps, IState> {

    public static getDerivedStateFromProps(props, state) {
        // update state.balance when props changes by redux4
        if (props.cryptos !== null) {
            return { cryptos: _.sortBy(props.cryptos, ["rank"]) };
        }
        return null;
    }

    constructor(props: IProps) {
        super(props);
        // initial coin state. it must be available in config file
        this.state = {
            cryptos: null,
        };
    }

    public componentDidMount() {
        //
    }

    public render() {
        let coins: any = <div>Loading ...</div>;
        if (this.state.cryptos) {
            coins = this.state.cryptos.map((coin) => {
                const btcPrice: number = _.round(parseFloat(coin.quotes.BTC.price), 6) || 0;
                const usdPrice: number = _.round(parseFloat(coin.quotes.USD.price), 2) || 0;
                return (
                    <div className="coin-balance" key={coin.symbol}>
                        <i className={`live-icon cc ${coin.symbol}`}></i>
                        <p className="balance-name">{coin.name}</p>
                        <p className="balance-number">$<Ex value={usdPrice} /></p>
                        <p className="balance-number"><i className={"cc BTC-alt"}></i><Ex value={btcPrice} fixFloatNum={6} /></p>
                    </div>);
            },
            );
        }

        return (
            <div className="user-balance live-price" > {coins}</div >
        );
    }
}

function mapStateToProps(state: IRootState) {
    if (state.app.market && state.app.market.cryptos !== undefined) {
        return {
            cryptos: state.app.market.cryptos,
        };
    }
    // there is no balance from redux, state must not be updated in getDerivedStateFromProps
    return {
        cryptos: null,
    };
}

export default connect(mapStateToProps)(LiveComponent);
