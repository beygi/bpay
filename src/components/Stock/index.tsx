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
    symbol: string;
    cryptos: any[];
    forex: any[];
}

interface IState {
    exchangeRates: any[];
}

function calcExchangeRate(props) {
    // calcucalte exchange rate from store
    const exchange = [
        { symbol: "EUR", rate: 0 },
        { symbol: "USD", rate: 0 },
        { symbol: "IRR", rate: 0 },
    ];
    if (!props.forex || !props.cryptos) {
        return exchange;
    }
    // calc exchange rate
    const calculated = exchange.map((fiat) => {
        fiat.rate = _.round(props.cryptos[props.symbol].quotes.USD.price * props.forex[fiat.symbol], 2);
        if (fiat.symbol === "IRR") { fiat.rate = _.round( fiat.rate, 0); }
        return fiat;
    });
    return calculated;
}

class StockComponent extends React.Component<IProps, IState> {

    public static getDerivedStateFromProps(props, state) {
            // update state.balance when props changes by redux4
            if (props.cryptos !== null && props.forex !== null) {
                 return {  exchangeRates : calcExchangeRate(props)};
            }
            return null;
    }

    constructor(props: IProps) {
        super(props);
        // initial coin state. it must be available in config file
        this.state = {
            exchangeRates: calcExchangeRate(this.props),
        };
    }
    public componentDidMount() {
        //
    }

    public render() {
        if (!this.props.cryptos || !this.props.forex) {
            return (<div>Loading ...</div>);
        }
        const rates = this.state.exchangeRates.map( (rate) => {
            return <div key={rate.symbol}><span className="symbol">{rate.symbol}: </span><span className="rate"><Ex value={rate.rate} seperateThousand /></span></div>;
        } );
        return (
            <div className="stock" >
                <p className="balance-name">
                    <i className={`live-icon cc ${this.props.symbol}`}></i>
                    {this.props.cryptos[this.props.symbol].name}</p>
                    <div className="rates">
                        {rates}
                    </div>
            </div >
        );
    }
}

function mapStateToProps(state: IRootState) {
    if (state.app.market && state.app.market.cryptos && state.app.market.forex) {
        return {
            cryptos: state.app.market.cryptos,
            forex: state.app.market.forex,
        };
    }
    // there is no balance from redux, state must not be updated in getDerivedStateFromProps
    return {
        cryptos: null,
        forex: null,
    };
}

export default connect(mapStateToProps)(StockComponent);
