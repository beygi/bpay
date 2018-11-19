/**
 * @module Components/MarketComponent
 */
import { Col, Dropdown, Icon, Menu, Row, Table } from "antd";
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
    const calculated = exchange.map((currency) => {
        if (config.currencies[currency.symbol].type === "fiat") {
            currency.rate = _.round(props.cryptos[props.from].quotes.USD.price * props.forex[currency.symbol], 4);
        } else {
            currency.rate = _.round(1 / (props.cryptos[props.to].quotes.USD.price / props.cryptos[props.from].quotes.USD.price), 4);
        }

        return currency;
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
            return (<div>{t.t("Loading ...")}</div>);
        }

        // get available markets
        const availableMarkets = Object.keys(config.currencies).map((key) => {
            return config.currencies[key].markets.map((market) => {
                return (
                    <Menu.Item key={`${market}:${key}`}>
                        <Link className="market-link" to={`/exchange/${market}:${key}`}  >
                            <span>
                                {`${t.t(config.currencies[market].name)}`}
                            </span>
                            &nbsp;/&nbsp;
                            <span>
                                {`${t.t(config.currencies[key].name)}`}
                            </span>
                        </Link>
                    </Menu.Item>
                );
            },
            );
        });

        let floatNumbers = 2;
        if (this.props.to === "IRR") {
            floatNumbers = 0;
        }
        if (this.props.to === "BTC" || this.props.to === "ETH") {
            floatNumbers = 4;
        }

        const columns = [{
            title: t.t("Last Price"),
            dataIndex: "price",
            key: "price",
            render: (text) => <Ex fixFloatNum={floatNumbers} value={text} seperateThousand />,
        },
        {
            title: t.t("24h Change"),
            dataIndex: "change",
            key: "change",
            render: (text, record) => <Ex fixFloatNum={floatNumbers} percentMark value={((record.high / record.low) - 1) * 100} seperateThousand />,
        },
        {
            title: t.t("24h High"),
            dataIndex: "high",
            key: "high",
            render: (text) => <Ex value={text} fixFloatNum={floatNumbers} seperateThousand />,
        },
        {
            title: t.t("24h Low"),
            dataIndex: "low",
            key: "low",
            render: (text) => <Ex value={text} fixFloatNum={floatNumbers} seperateThousand />,
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
                    <Dropdown getPopupContainer={() => document.getElementById("privateContent")} overlay={<Menu>{availableMarkets}</Menu>} trigger={["click"]}>
                        <a className="ant-dropdown-link select-market" href="#">
                            <div className="stock" >
                                <Icon type="down" />
                                {title}
                            </div>
                        </a>
                    </Dropdown>
                </Col >
                <Col md={16} >
                    <Table className="market-prices" bordered={false} size="small" pagination={false} dataSource={dataSource} columns={columns} />
                </Col>
            </Row >
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

export default connect(mapStateToProps)(MarketComponent);
