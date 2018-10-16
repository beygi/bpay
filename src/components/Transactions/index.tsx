/**
 * @module Components/Transactions
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Tag } from "antd";
import * as React from "react";
// import { JsonTable } from "react-json-to-html";
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
    invoices: any[];
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
        this.state = { invoices: null };
        this.getData();
        const intervalId = setInterval(this.getData.bind(this), 5000);
        this.api.SetHeader(this.userObject.getToken().name, this.userObject.getToken().value);
    }

    public render() {
        const columns = [{
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
        if (this.state.invoices !== null) {
            // map
            const pDate = localDate(t.default.language);
            invoices = this.state.invoices.map((invoice) => {
                // const date = new pDate(invoice.date);
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
            return (
                <div>
                    {invoices}
                </div>
            );
        }
        return (
            <div>
                Loading ...
            </div >
        );

    }

    public getData() {
        // axios.get("http://staging1.b2mark.com:8090/?action=list").then((response) => {
        //     this.setState({ invoices: response.data });
        // });
        this.api.getAllInvoiceUsingGET({
            apiKey: this.props.user.apiKey,
            mob: this.props.user.mobile,
            size: 12,
            dir: "desc",
            $domain: "https://api.becopay.com",
        }).then((response) => {
            this.setState({ invoices: response.body });
        });
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
