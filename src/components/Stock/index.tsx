/**
 * @module Components/StockComponent
 */
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
    /**  selected symbol */
    symbol: string;
    /**  crypto currencies data from redux */
    cryptos: any[];
    /**  forex data from redux */
    forex: any[];
    /**  don't dispay title and icon if sets to true, useful for using in collapsable blocks */
    hideTitle?: boolean;
}

interface IState {
    /**  holds exchange rate data to display */
    exchangeRates: any[];
}

/** calcucalte exchange rate from store */
function calcExchangeRate(props) {
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
        if (fiat.symbol === "IRR") { fiat.rate = _.round(fiat.rate, 0); }
        return fiat;
    });
    return calculated;
}

/**
 * display a currency price in fiat
 */
class StockComponent extends React.Component<IProps, IState> {

    public static getDerivedStateFromProps(props, state) {
        // update state.balance when props changes by redux
        if (props.cryptos !== null && props.forex !== null) {
            return { exchangeRates: calcExchangeRate(props) };
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
        const rates = this.state.exchangeRates.map((rate) => {
            return <div key={rate.symbol}><span className="symbol">{t.t(rate.symbol)}: </span><span className="rate"><Ex value={rate.rate} seperateThousand /></span></div>;
        });
        const title = (this.props.hideTitle) ? null : <span className="balance-name"><i className={`live-icon cc ${this.props.symbol}`}></i>{t.t(this.props.cryptos[this.props.symbol].name)}</span>;
        return (
            <div className="stock" >
                {title}
                <div className="rates">
                    {rates}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: IRootState) {
    if (state.app.market && state.app.market.cryptos && state.app.market.forex) {
        return {
            cryptos: state.app.market.cryptos,
            forex: state.app.market.forex,
            language: state.app.user.language,
        };
    }
    // there is no balance from redux, state must not be updated in getDerivedStateFromProps
    return {
        cryptos: null,
        forex: null,
        language: state.app.user.language,
    };
}

export default connect(mapStateToProps)(StockComponent);
