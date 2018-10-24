/**
 * @module Components/Settle
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker, InputNumber } from "antd";
import { Button, Form, Input, Spin, Table } from "antd";
import { FormComponentProps } from "antd/lib/form";
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

interface IProps extends FormComponentProps {
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

const FormItem = Form.Item;
/**
 * this component shows all merchants that have Unsettled invoices
 */
class Settle extends React.Component<IProps, IState> {
    public api = API.getInstance();
    public userObject = USER.getInstance();
    public rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({ selectedInvoices: selectedRowKeys, sum: _.sumBy(selectedRows, "amount") }, () => {
                this.props.form.validateFieldsAndScroll(["amount"], { force: true });
            });
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
        // const intervalId = setInterval(this.getInvoices, 2000);
        this.getInvoices();
    }

    public checkPrice = (rule, value, callback) => {
        if (value > 0 && value === this.state.sum) {
            callback();
        }
        if (value > 0 && value !== this.state.sum) {
            callback(t.t("amount is not equal to selected invoice sum"));
        }
        callback(t.t("Please select payment amount"));
        return;
    }

    public render() {
        const pDate = localDate(t.default.language);
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 24 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 24 },
            },
        };
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
                <div className="settle-form">
                    <Form layout="vertical" onSubmit={this.handleSubmit}>
                        <FormItem
                            label={t.t("Amount")}
                        >
                            {getFieldDecorator("amount", {
                                rules: [{
                                    required: true,
                                    validator: this.checkPrice,
                                }],
                                initialValue: 0,
                            })(
                                <InputNumber
                                    size="large"
                                    min={0}
                                    max={10000000}
                                    formatter={(value) => `IRR ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    parser={(value): number => {
                                        const output = parseInt(value.replace(/\IRR\s?|(,*)/g, ""), 10) || 0;
                                        return output;
                                    }}
                                />,
                            )}
                        </FormItem>
                        <FormItem
                            label={t.t("Date and time")}
                        >
                            {getFieldDecorator("datetime", {
                                rules: [{ type: "object", required: true, message: t.t("Please select payment date and time") }],
                            })(
                                <DatePicker
                                    style={{ width: "100%" }}
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                    dateRender={(current) => {
                                        const style = { border: "", borderRadius: "" };
                                        return (
                                            <div className="ant-calendar-date" style={style} >
                                                <Ex fixFloatNum={0} value={current.date()} stockStyle={false} />
                                            </div>
                                        );
                                    }}
                                />,
                            )}
                        </FormItem>
                        <FormItem
                            label={t.t("Origin Card number")}
                        >
                            {getFieldDecorator("originCard", {
                                rules: [{ required: true, pattern: /^\d{16}$/, message: t.t("Please input 16 digits origin card number ") }],
                            })(
                                <Input className="ltr" placeholder="" />,
                            )}
                        </FormItem>
                        <FormItem
                            label={t.t("Destination Card number")}
                        >
                            {getFieldDecorator("destCard", {
                                rules: [{ required: true, pattern: /^\d{16}$/, message: t.t("Please input 16 digits destination card number ") }],
                            })(
                                <Input className="ltr" placeholder="" />,
                            )}
                        </FormItem>
                        <FormItem
                            label={t.t("Tracking code")}
                        >
                            {getFieldDecorator("txid", {
                                rules: [{ required: true, message: t.t("Please input Tracking code ") }],
                            })(
                                <Input className="ltr" placeholder="" />,
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit">{t.t("Submit")}</Button>
                        </FormItem>
                    </Form>
                    <Table className="unsettled-invoices" rowSelection={this.rowSelection} pagination={false}
                        scroll={{ y: 250 }}
                        columns={columns} rowKey="id" dataSource={this.state.invoices.settleUpInvoices} size="small" />
                    <div>
                        {t.t("Total:") + " "}
                        <Ex stockStyle={false} fixFloatNum={0} value={this.state.sum} seperateThousand />
                    </div>
                </div>
            );
        }
        return (
            <Spin delay={400} />
        );
    }

    public handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values.datetime.toISOString());
            }

            // if (!err) {
            //     this.setState({ loading: true });
            //     this.api.addInvoiceUsingPOST({
            //         inv: {
            //             apiKey: this.props.user.apiKey,
            //             description: values.description,
            //             price: values.price,
            //             mobile: this.props.user.mobile,
            //             orderId: this.uuid(),
            //         },
            //         $domain: "https://api.becopay.com",
            //     }).then((response) => {
            //         this.setState({ loading: false });
            //         notification.success({
            //             duration: 10,
            //             message: t.t("New Invoice Created"),
            //             description: t.t("click to open gateway"),
            //             placement: "bottomRight",
            //             btn: <Button
            //                 target="blank" href={`${config.gateWayUrl}/invoice/${response.body.id}`} size="small" type="primary">{t.t("Open gateway")}</Button>,
            //         });
            //     }).catch((error) => {
            //         // handle error
            //         this.setState({ loading: false });
            //         // console.log(error.toString());
            //         const errorText = (error.response.body.message) ? error.response.body.message : error;
            //         notification.error({
            //             message: t.t("Failed to create invoice"),
            //             description: errorText,
            //             placement: "bottomRight",
            //         });
            //
            //     });
            // }
        });
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

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Form.create()(Settle));
