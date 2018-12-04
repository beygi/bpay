/**
 * @module Components/ForexComponent
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
    /** input symbol */
    symbol: string;
    /** holds all exchange rates. synced from redux store */
    forex: any[];
}

interface IState {
    /** holds calcucalted exchange rates */
    exchangeRates: any[];
}

/**
 * this component displays exchange rate off given price with
 * other common fiats or given fiats
 */
function calcExchangeRate(props) {
    // calcucalte exchange rate from store
    const exchange = [
        { symbol: "EUR", rate: 0, round: 2 },
        { symbol: "USD", rate: 0, round: 2 },
        { symbol: "IRR", rate: 0, round: 7 },
    ];
    if (!props.forex) {
        return exchange;
    }
    // calc exchange rate
    const calculated = exchange.map((fiat) => {
        fiat.rate = _.round((props.forex[props.symbol] * (1 / props.forex[fiat.symbol])), fiat.round);
        // if (fiat.symbol === "IRR") { fiat.rate = _.round( fiat.rate, 0); }
        return fiat;
    });
    return calculated;
}

class ForexComponent extends React.Component<IProps, IState> {

    public static getDerivedStateFromProps(props, state) {
        // update state.balance when props changes by redux4
        if (props.forex !== null) {
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
        if (!this.props.forex) {
            return (<div>Loading ...</div>);
        }
        const rates = this.state.exchangeRates.map((rate) => {
            if (rate.symbol !== this.props.symbol) {
                return <div key={rate.symbol}><span className="symbol">
                    {t.t(rate.symbol)}:
                </span><span className="rate"><Ex value={rate.rate} floatsNum={rate.round} seperateThousand /></span></div>;
            }
            return null;
        });
        return (
            <div className="stock" >
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
            forex: state.app.market.forex,
            language: state.app.user.language,
        };
    }
    // there is no balance from redux, state must not be updated in getDerivedStateFromProps
    return {
        forex: null,
        language: state.app.user.language,
    };
}

export default connect(mapStateToProps)(ForexComponent);
