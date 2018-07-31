import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse } from "antd";
import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
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

class StockComponent extends React.Component<IProps, IState> {

     // public static getDerivedStateFromProps(props, state) {
     //         // update state.balance when props changes by redux4
     //         if (props.cryptos !== null) {
     //              return {  cryptos : _.sortBy(props.cryptos, ["rank"]) };
     //         }
     //         return null;
     // }

    constructor(props: IProps) {
        super(props);
        // initial coin state. it must be available in config file
        this.state = {
            exchangeRates : this.calcExchangeRate(),
        };
    }
    public calcExchangeRate() {
            // calcucalte exchange rate from store
            return [];
    }
    public componentDidMount() {
            //
    }

    public render() {
        return (
            <div className= "user-balance" ></div >
        );
    }
}

function mapStateToProps(state: IRootState) {
    if     ( state.app.market && state.app.market.cryptos && state.app.market.forex) {
        return {
            cryptos:     state.app.market.cryptos,
            forex:     state.app.market.forex,
        };
    }
    // there is no balance from redux, state must not be updated in getDerivedStateFromProps
    return {
        cryptos :      null,
        forex :      null,
    };
}

export default connect(mapStateToProps)(StockComponent);
