/**
 * @module Components/Invoice
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Tag } from "antd";
import * as _ from "lodash";
import * as React from "react";
import config from "../../config";
import t from "../../services/trans/i18n";
import { localDate } from "../../services/trans/i18n";
import Ex from "../ExchangeValue";
import Block from "../Holder";
import "./style.less";

interface IProps {
    /**  id of invoices */
    invoice: any;
}

interface IState {
}

/**  holds icons and colors for all invoice statuses */
const icons = {
    failed: <FontAwesomeIcon className="archived" icon={["fas", "times"]} />,
    waiting: <FontAwesomeIcon className="waiting" icon={["fas", "hourglass-half"]} />,
    success: <FontAwesomeIcon className="success" icon={["fas", "check"]} />,
    settled: <FontAwesomeIcon className="settled" icon={["fas", "check-double"]} />,
};

/**
 * this component shows one invoice details in a block
 */
class Invoice extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {

        /**  holds detail table columns  */
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

        // local Date object
        const pDate = localDate(t.default.language);
        const invoice = this.props.invoice;
        const date = new pDate(invoice.timestamp).toLocaleString();
        invoice.date = date;
        const tablecolumns = [...columns];

        // add an extra column to detail table for display detailed settle transaction
        if (invoice.status === "settled") {
            tablecolumns.push({
                title: t.t("Settle detail"),
                dataIndex: "settleDetail",
            });
        }
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
                <Table pagination={false} columns={tablecolumns} rowKey="id" dataSource={[invoice]} size="small" />
            </Block>
        );
    }
}

export default Invoice;
