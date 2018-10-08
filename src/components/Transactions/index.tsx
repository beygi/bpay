/**
 * @module Components/Transactions
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Tag } from "antd";
import * as React from "react";
import { JsonTable } from "react-json-to-html";
import { connect } from "react-redux";
import config from "../../config";
import API from "../../lib/api/invoice";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import Ex from "../ExchangeValue";
import Block from "../Holder";
import USER from "./../../lib/user";
import "./style.less";

interface IProps {
    /**  current user's email address that is synced with redux */
    email: any;
}

interface IState {
    invoices: any[];
}

const icons = {
    failed: <FontAwesomeIcon className="archived" icon={["fas", "times"]} />,
    waiting: <FontAwesomeIcon className="waiting" icon={["fas", "hourglass-half"]} />,
    success: <FontAwesomeIcon className="success" icon={["fas", "check"]} />,
};

const columns = [{
    title: t.t("Order id"),
    dataIndex: "orderId",
},
{
    title: t.t("Symbol"),
    dataIndex: "symbol",
}, {
    title: t.t("Price"),
    dataIndex: "price",
}, {
    title: t.t("Create time"),
    dataIndex: "date",
}, {
    title: t.t("Status"),
    dataIndex: "status",
},
];

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
        let invoices = null;
        if (this.state.invoices !== null) {
            // map
            invoices = this.state.invoices.map((invoice) => {
                return (
                    <Block key={invoice.id} collapse className={"transaction-block"}
                        title={<span><Tag className="invoice-id" color="#453e41">
                            #{invoice.id}
                        </Tag>  <span className="symbol">
                                {invoice.symbol} </span> <Ex fixFloatNum={0} value={invoice.price} seperateThousand /></span>}
                        iconPosition="right" icon={<span><Tag color="#453e41">{invoice.desc}</Tag> <Tag color="#898989">{invoice.date}</Tag>
                            <a href="">{icons[invoice.status]}</a>
                            <a className="callback" target="blank" href={invoice.callback}><FontAwesomeIcon icon={["fas", "link"]} /></a>
                            &nbsp;
                            <a className="waiting" target="blank" href={`${config.gateWayUrl}/invoice/${invoice.id}`}><FontAwesomeIcon icon={["fas", "external-link-alt"]} /></a>
                        </span>}>
                        <Table pagination={false} columns={columns} dataSource={[invoice]} size="small" />
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
            apiKey: "B822BB93905A9BD8B3A0C08168C427696436CF8BF37ED4AB8EBF41A307642ED1",
            mob: "09355126588",
            size: 12,
            dir: "desc",
            $domain: "http://87.98.188.77:9193",
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
        email: state.app.user.email,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
