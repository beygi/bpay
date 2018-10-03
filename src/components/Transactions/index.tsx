/**
 * @module Components/Transactions
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse, Table, Tag } from "antd";
import axios from "axios";
import * as React from "react";
import { JsonTable } from "react-json-to-html";
import { connect } from "react-redux";
import API from "../../lib/api/invoice";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import Ex from "../ExchangeValue";
import Block from "../Holder";
import USER from "./../../lib/user";
import "./style.less";

const userObject = USER.getInstance();
const api = API.getInstance();
api.SetHeader(userObject.getToken().name, userObject.getToken().value);

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
    title: "Name",
    dataIndex: "name",
}, {
    title: "Price",
    dataIndex: "price",
}, {
    title: "Payment time",
    dataIndex: "date",
}, {
    title: "Vendor",
    dataIndex: "vendor",
},
];

/**
 * this component shows all transactions of merchant
 */
class Transactions extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = { invoices: null };
        this.getData();
    }

    public render() {
        let invoices = null;
        if (this.state.invoices !== null) {
            // map
            invoices = this.state.invoices.map((invoice) => {
                return (
                    <Block key={invoice.id} collapse className={"transaction-block"}
                        title={<span><Tag className="invoice-id" color="#453e41">#{invoice.id}</Tag> <Ex fixFloatNum={0} value={invoice.price} seperateThousand /> {invoice.symbol}</span>}
                        iconPosition="right" icon={<span><Tag color="#453e41">{invoice.desc}</Tag> <Tag color="#898989">{invoice.date}</Tag> {icons[invoice.status]}</span>}>
                        <Table pagination={false} columns={columns} dataSource={invoice.products} size="small" />
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
        api.getAllInvoiceUsingGET({
            apiKey: "B822BB93905A9BD8B3A0C08168C427696436CF8BF37ED4AB8EBF41A307642ED1",
            mob: "09355126588",
            size: 300,
            dir: "desc",
            $domain: "http://87.98.188.77:9193",
        }).then((response) => {
            console.log(response);
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
