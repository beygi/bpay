/**
 * @module Components/Transactions
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Tag } from "antd";
import { Pagination, Spin } from "antd";
import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import config from "../../config";
import API from "../../lib/api/invoice";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import { localDate } from "../../services/trans/i18n";
import Ex from "../ExchangeValue";
import Block from "../Holder";
import USER from "./../../lib/user";
import "./style.less";

const fiats = [t.t("IRR"), t.t("USD"), t.t("EUR"), t.t("Bitcoin"), t.t("Ethereum"), t.t("failed"), t.t("waiting"), t.t("success")];
interface IProps {
    /**  current user's email address that is synced with redux */
    user: any;
}

interface IState {
    /**  list of all invoices */
    invoices: any;
    currentPage: number;
    loading: boolean;
    statusFilters: {
        success?: boolean,
        waiting?: boolean,
        failed?: boolean,
    };
}

const icons = {
    failed: <FontAwesomeIcon className="archived" icon={["fas", "times"]} />,
    waiting: <FontAwesomeIcon className="waiting" icon={["fas", "hourglass-half"]} />,
    success: <FontAwesomeIcon className="success" icon={["fas", "check"]} />,
};

/**
 * this component shows all transactions of merchant
 */
class Transactions extends React.Component<IProps, IState> {

    public api = API.getInstance();
    public userObject = USER.getInstance();

    constructor(props: IProps) {
        super(props);
        this.state = { invoices: { count: 0 }, currentPage: 1, loading: true, statusFilters: { success: false, waiting: false, failed: false } };
        // send token with all api requests
        this.api.SetHeader(this.userObject.getToken().name, this.userObject.getToken().value);
    }

    public componentDidMount() {
        this.getData();
        const intervalId = setInterval(this.getData.bind(this), 5000);
    }

    public render() {
        const columns = [
            {
                title: t.t("Shop Name"),
                dataIndex: "shopName",
            },
            {
                title: t.t("Order id"),
                dataIndex: "orderId",
            },
            {
                title: t.t("Symbol"),
                dataIndex: "symbol",
            }, {
                title: t.t("Price"),
                dataIndex: "priceComponent",
            }, {
                title: t.t("Create time"),
                dataIndex: "date",
            }, {
                title: t.t("Status"),
                dataIndex: "statusName",
            },
        ];

        let invoices = null;
        if (this.state.invoices && this.state.invoices.content !== undefined) {
            // local Date object
            const pDate = localDate(t.default.language);

            invoices = this.state.invoices.content.map((invoice) => {
                const date = new pDate(invoice.timestamp).toLocaleString();
                invoice.date = date;
                invoice.statusName = t.t(invoice.status);
                invoice.priceComponent = <Ex fixFloatNum={0} value={invoice.price} seperateThousand />;
                return (
                    <Block key={invoice.id} collapse className={"transaction-block"}
                        title={<span>
                            <Tag className="invoice-id" color="#453e41">
                                {invoice.id}
                            </Tag>
                            <span className="symbol">
                                {t.t(invoice.symbol)}
                            </span>
                            <span className="price-value" >
                                <Ex fixFloatNum={0} value={invoice.price} seperateThousand />
                            </span>
                        </span>}
                        iconPosition="right" icon={<span><Tag color="#453e41">{invoice.description}</Tag>
                            <Tag color="#898989">
                                {date}
                            </Tag>
                            {icons[invoice.status]}
                            <a className="callback" target="blank" href={invoice.callback}><FontAwesomeIcon icon={["fas", "link"]} /></a>
                            &nbsp;
                            <a className="waiting" target="blank" href={`${config.gateWayUrl}/invoice/${invoice.id}`}><FontAwesomeIcon icon={["fas", "external-link-alt"]} /></a>
                        </span>}>
                        <Table pagination={false} columns={columns} rowKey="id" dataSource={[invoice]} size="small" />
                    </Block>
                );
            });
        }
        // create filters.
        const filters = Object.keys(this.state.statusFilters).map(
            (status) => {
                return (<span onClick={() => {
                    const statusFilters = this.state.statusFilters;
                    statusFilters[status] = !statusFilters[status];
                    this.setState({ statusFilters, loading: true, currentPage: 1 }, () => { this.getData(); });
                }} key={status} className={`filter ${this.state.statusFilters[status]}`
                }>
                    {icons[status]}</span >);
            },
        );

        return (
            <Block title={t.t("Transactions")} icon={
                <span>
                    <FontAwesomeIcon icon={["fas", "money-check-alt"]} />
                    <span className="transaction-filters">{filters}</span>
                </span>
            }>

                < Spin spinning={this.state.loading} delay={500} >
                    {invoices}
                </Spin >
                <Pagination onChange={(page) => { this.setState({ currentPage: page, loading: true }, () => { this.getData(); }); }}
                    hideOnSinglePage pageSize={12} current={this.state.currentPage} total={this.state.invoices.count}
                    itemRender={this.itemRender}
                />
            </Block>
        );

    }

    // get invoices using api key
    public getData() {
        const statusFilters = Object.keys(_.pickBy(this.state.statusFilters, (value) => value)).toString();
        this.api.getAllInvoicev2UsingGET({
            apiKey: this.props.user.apiKey,
            mob: this.props.user.mobile,
            size: 12,
            page: this.state.currentPage - 1,
            status: statusFilters,
            dir: "desc",
            $domain: "https://api.becopay.com",
        }).then((response) => {
            this.setState({ invoices: response.body, loading: false });
        });
    }

    public itemRender(current: number, type: any, originalElement?: any) {
        if (type === "page") {
            return <a> <Ex fixFloatNum={0} value={current} seperateThousand /></a>;
        }
        return originalElement;
    }
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

function mapStateToProps(state: IRootState) {
    return {
        user: state.app.user,
    };
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Transactions);
