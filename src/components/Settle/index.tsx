/**
 * @module Components/Settle
 */

import { DatePicker, InputNumber, notification } from "antd";
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
    /**  the unique id of the merchnat. this is email address for now */
    merchantId: string;
    /** success callback. it can be used to close modal */
    success: () => void;
}

interface IState {
    /**  merchant data with list of invoices  */
    invoices: any;
    /** holds lists of seleced invoices */
    selectedInvoices: [];
    /** total amount of selected invoices */
    sum: number;
    /** loading state,  spinner used this value to spinning */
    loading: boolean;
}

const FormItem = Form.Item;
/**
 * shows list of unsettled invoices of a merchant to select and settle
 */
class Settle extends React.Component<IProps, IState> {
    /** holds an instance of invoice api */
    public api = API.getInstance();
    /** represent user object for the currently loggined user */
    public userObject = USER.getInstance();
    /** handles row selection. this function set sum and seleced rows to the component state */
    public rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({ selectedInvoices: selectedRowKeys, sum: _.sumBy(selectedRows, "amount") }, () => {
                this.props.form.validateFieldsAndScroll(["amount"], { force: true });
            });
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
        },
    };
    constructor(props: IProps) {
        super(props);

        // initial state
        this.state = {
            selectedInvoices: [], invoices: null, sum: 0, loading: false,
        };

        // send token with all api requests
        this.api.SetHeader(this.userObject.getToken().name, this.userObject.getToken().value);
        // bind getInvoices to current object
        this.getInvoices = this.getInvoices.bind(this);
    }

    public componentDidMount() {
        // const intervalId = setInterval(this.getInvoices, 2000);
        this.getInvoices();
    }

    /** amount field validator, it compare amount with total amount of seleced row and check their equality */
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
        /** date object for current locale */
        const pDate = localDate(t.default.language);
        const { getFieldDecorator } = this.props.form;

        /** table columns */
        const columns = [
            {
                title: t.t("ID"),
                dataIndex: "id",
            },
            {
                title: t.t("Amount"),
                dataIndex: "amount",
                render: (price) => (
                    <Ex fixFloatNum={0} value={price} seperateThousand />
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
            return (
                <div className="settle-form">
                    <Spin spinning={this.state.loading}>
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
                                        min={0}
                                        max={10000000000}
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
                                    initialValue: this.state.invoices.cardNumber,
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
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit">{t.t("Submit")}</Button>
                            </FormItem>
                        </Form>
                    </Spin>
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

    /** handles form submit routine */
    public handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({ loading: true });
                // prepare post data, format datea and append extra props to values
                values.datetime = values.datetime.toISOString();
                values.apikey = this.props.user.apiKey;
                values.mob = this.props.user.mobile;
                values.merMobile = this.props.merchantId;
                values.invoiceIds = this.state.selectedInvoices;
                this.api.settleUp1UsingPOST({
                    requestSettle: values,
                    $domain: "https://api.becopay.com",
                }).then(() => {
                    this.setState({ loading: false });
                    // notify user about successfull event and call successfull callback (probably to close modal)
                    notification.error({
                        message: t.t(this.state.invoices.shopName),
                        description: t.t("successfully settled"),
                        placement: "bottomRight",
                    });
                    this.props.success();
                }).catch((error) => {
                    // handle error
                    this.setState({ loading: false });
                    let errorText = (error.response.body.message) ? error.response.body.message : error;
                    errorText = (error.response.body.description) ? error.response.body.description : errorText;
                    // inform user about error using error message provided by api
                    notification.error({
                        message: t.t("Failed to settle invoices"),
                        description: errorText,
                        placement: "bottomRight",
                    });
                });
            }

        });
    }

    /** get merchant data and invouce */
    public getInvoices() {
        this.api.getPreSettleUsingGET({
            apikey: this.props.user.apiKey,
            mob: this.props.user.mobile,
            mermob: this.props.merchantId,
            $domain: "https://api.becopay.com",
        }).then((response) => {
            this.setState({ loading: false });
            this.setState({
                invoices: response.body,
            });
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
