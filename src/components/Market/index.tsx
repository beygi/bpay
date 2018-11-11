/**
 * @module Components/MarketComponent
 */
import { Col, Row, Table } from "antd";
import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import Ex from "../../components/ExchangeValue";
import config from "../../config";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import "./style.less";

interface IProps {
    /**  from symbol */
    from: string;
    /**  to symbol */
    to: string;
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
        { symbol: props.to, rate: 0 },
    ];
    if (!props.forex || !props.cryptos) {
        return exchange;
    }
    // calc exchange rate
    const calculated = exchange.map((fiat) => {
        fiat.rate = _.round(props.cryptos[props.from].quotes.USD.price * props.forex[fiat.symbol], 2);
        if (fiat.symbol === "IRR") {
            fiat.rate = _.round(fiat.rate, 0);
        }
        return fiat;
    });
    return calculated;
}

/**
 * display a currency price in fiat
 */
class MarketComponent extends React.Component<IProps, IState> {

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
        const columns = [{
            title: t.t("Last Price"),
            dataIndex: "price",
            key: "price",
            render: (text) => <Ex value={text} seperateThousand />,
        },
        {
            title: t.t("24h Change"),
            dataIndex: "change",
            key: "change",
            render: (text, record) => <Ex percentMark value={((record.high / record.low) - 1) * 100} seperateThousand />,
        },
        {
            title: t.t("24h High"),
            dataIndex: "high",
            key: "high",
            render: (text) => <Ex value={text} seperateThousand />,
        },
        {
            title: t.t("24h Low"),
            dataIndex: "low",
            key: "low",
            render: (text) => <Ex value={text} seperateThousand />,
        },
        ];
        // const rates = this.state.exchangeRates.map((rate) => {
        //     return <div key={rate.symbol}><span className="symbol">{t.t(rate.symbol)}: </span><span className="rate"><Ex value={rate.rate} seperateThousand /></span></div>;
        // });
        const title = (this.props.hideTitle) ? null : <span className="balance-name"><i className={`live-icon cc ${this.props.from}-alt`}></i>
            {t.t(config.currencies[this.props.from].name)} / {t.t(config.currencies[this.props.to].name)}
        </span>;

        const dataSource = [{
            key: "1",
            price: this.state.exchangeRates[0].rate,
            change: "12",
            high: this.state.exchangeRates[0].rate * 1.01,
            low: this.state.exchangeRates[0].rate * 0.99,
        }];

        return (
            <Row gutter={8}>
                <Col md={8} >
                    <div className="stock" >
                        {title}
                    </div>
                </Col>
                <Col md={16} >
                    <Table className="market-prices" bordered={false} size="small" pagination={false} dataSource={dataSource} columns={columns} />
                </Col>
            </Row>
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

export default connect(mapStateToProps, null, null, { pure: false })(MarketComponent);
