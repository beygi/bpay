/**
 * @module Components/BalanceComponent
 */

import { Button, Spin } from "antd";
import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Ex from "../../components/ExchangeValue";
import config from "../../config";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import "./style.less";

interface IProps {
    updateUserBalance: (balance) => void;
    /**  holds user balance object */
    balance: {};
    /** display deposit button */
    hideButton?: boolean;
    /** symbols to show, default is all */
    symbols?: string[];
}

interface IState {
}

/**
 * represent user balance status for all available symbols
 */
class BalanceComponent extends React.Component<IProps, IState> {

    // default properties
    public static defaultProps: Partial<IProps> = {
        symbols: [],
        balance: null,
    };

    public interval: any;
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        // display loading spinner
        if (this.props.balance === null) {
            return (
                <div className="user-balance" >
                    <Spin />
                </div>
            );
        }

        const coins =
            ((this.props.symbols.length !== 0) ? this.props.symbols : Object.keys(config.currencies)).map((key) =>
                <div className="coin-balance" key={key}>
                    <span className="balance-icon" > {config.icons[key]}</span >
                    <p className="balance-name">{t.t(this.props.balance[key].name)}</p>
                    <p className="balance-number">
                        <Ex value={this.props.balance[key].balance.available || 0} />
                    </p>
                </div>);

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
            </div>
        );
    }
}

function mapStateToProps(state: IRootState) {
    return {
        balance: state.app.user.balance || null,
        language: state.app.user.language,
    };
}

export default connect(mapStateToProps)(BalanceComponent);
