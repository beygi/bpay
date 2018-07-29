import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import config from "../../config";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import "./style.less";

interface IProps {
    cryptos: {};
}

interface IState {
    cryptos: {};
}

class LiveComponent extends React.Component<IProps, IState> {

     public static getDerivedStateFromProps(props, state) {
             // update state.balance when props changes by redux4
             if (props.cryptos !== null) {
                  return {cryptos: props.cryptos };
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
        coins = Object.keys(this.state.cryptos).map((key) =>
                <div className="coin-balance" key={key}>
                    <img  className="balance-icon" src={`img/${config.icons[key]}.svg`} alt={this.state.cryptos[key].name} />
                    <p className="balance-name">{this.state.cryptos[key].name}</p>
                    <p className="balance-number">{this.state.cryptos[key].quotes.USD.price || 0}</p>
                </div>,
            );
         }

        return(
            <div className= "user-balance" > {coins}</div >
        );
    }
}

function mapStateToProps(state: IRootState) {
    if     ( state.app.market && state.app.market.cryptos !== undefined) {
        return {
            cryptos:     state.app.market.cryptos,
        };
    }
    // there is no balance from redux, state must not be updated in getDerivedStateFromProps
    return {
        cryptos :      null,
    };
}

export default connect(mapStateToProps)(LiveComponent);
