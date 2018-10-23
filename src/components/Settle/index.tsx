/**
 * @module Components/Settle
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Spin, Table } from "antd";
import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import API from "../../lib/api/invoice";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import { localDate } from "../../services/trans/i18n";
import Ex from "../ExchangeValue";
import USER from "./../../lib/user";
import "./style.less";
interface IProps {
    /**  current user's email address that is synced with redux */
    user: any;
    merchantId: number;
}

interface IState {
    /**  list of all invoices */
    invoices: any;
    currentPage: number;
    selectedInvoices: any;
    sum: number;
}

/**
 * this component shows all merchants that have Unsettled invoices
 */
class Settle extends React.Component<IProps, IState> {
    public api = API.getInstance();
    public userObject = USER.getInstance();
    public rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({ selectedInvoices: selectedRowKeys, sum: _.sumBy(selectedRows, "amount"); });
            console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
        },
    };
    constructor(props: IProps) {
        super(props);
        this.state = {
            currentPage: 1, selectedInvoices: [], invoices: null, sum: 0,
        };
        // send token with all api requests
        this.api.SetHeader(this.userObject.getToken().name, this.userObject.getToken().value);
        this.getInvoices = this.getInvoices.bind(this);
    }

    public componentDidMount() {
        const intervalId = setInterval(this.getInvoices, 2000);
    }

    public render() {
        const pDate = localDate(t.default.language);
        const columns = [
            {
                title: t.t("ID"),
                dataIndex: "id",
            },
            {
                title: t.t("Amount"),
                dataIndex: "amount",
                render: (price) => (
                    <Ex fixFloatNum={0} value={price * 1000} seperateThousand />
                ),
            },
            {
                title: t.t("Date"),
                dataIndex: "date",
                render: (date) => (
                    <div>{new pDate(date).toLocaleString()}</div>
                ),
            },
        ];
        if (this.state.invoices !== null) {
            // local Date object
            return (
                <div>
                    <Table className="unsettled-invoices" rowSelection={this.rowSelection} pagination={false}
                        scroll={{ y: 300 }}
                        columns={columns} rowKey="id" dataSource={this.state.invoices.settleUpInvoices} size="small" />
                    <div>
                        {t.t("Total:") + " "}
                        <Ex fixFloatNum={0} value={this.state.sum} seperateThousand />
                    </div>
                </div>
            );
        }
        return (
            <Spin delay={400} />
        );
    }

    // seach merchants
    public getInvoices() {
        this.setState({
            invoices:
            {
                sum: 59000,
                mobile: "09120453931",
                shopName: "mehdi-berger",
                cardNumber: "6104337645502681",
                settleUpInvoices: [
                    {
                        id: "POS_11_5a7b",
                        amount: 11000,
                        date: 1529519508757,
                    },
                    {
                        id: "POS_11_5a9db",
                        amount: 59000,
                        date: 1539579508457,
                    },
                    {
                        id: "PsOS_11_511ab",
                        amount: 5000,
                        date: 1539519102557,
                    },
                    {
                        id: "POS_g11_51s1b",
                        amount: 5000,
                        date: 1539519102557,
                    },
                    {
                        id: "POS_1as1_51s1b",
                        amount: 5000,
                        date: 1539519102557,
                    },
                    {
                        id: "POS_11fdg_511b",
                        amount: 5000,
                        date: 1539519102557,
                    },
                    {
                        id: "POS_11_sd511b",
                        amount: 5000,
                        date: 1539519102557,
                    },
                    {
                        id: "POS_1sd1_511b",
                        amount: 5000,
                        date: 1539519102557,
                    },
                ],
                count: 1,
            },
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

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Settle);
