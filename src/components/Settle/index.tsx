/**
 * @module Components/Settle
 */

import { DatePicker, InputNumber, notification } from "antd";
import { Button, Form, Input, Spin, Table } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import config from "../../config";
import API from "../../lib/api/invoice";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import { localDate } from "../../services/trans/i18n";
import Ex from "../ExchangeValue";
import USER from "./../../lib/user";
import "./style.less";

interface IProps extends FormComponentProps {
    /**  current user's mobile number that is synced with redux */
    mobile: string;
    /**  current user's api key that is synced with redux */
    apiKey: string;
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
            this.setState({ selectedInvoices: selectedRowKeys, sum: _.sumBy(selectedRows, "merchantAmount") }, () => {
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
        this.api.setAuthToken(this.userObject.getToken().value);
        this.api.setBaseURL(config.apiUrl);
        // bind getInvoices to current object
        this.getInvoices = this.getInvoices.bind(this);
    }

    public componentDidMount() {
        // const intervalId = setInterval(this.getInvoices, 2000);
        this.getInvoices();
    }

    /** amount field validator, it compares amount with total amount of seleced row and check their equality */
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

    /** date field validator, it compares  selected date to currnte date and prevent is selected date is in the future */
    public checkDate = (rule, value, callback) => {
        if (!value) {
            callback(t.t("Please select payment date and time"));
            return;
        }
        if (value.isAfter()) {
            callback(t.t("Selected time is in the future"));
            return;
        }
        callback();
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
                dataIndex: "merchantAmount",
                render: (price) => (
                    <Ex floatsNum={0} value={price} seperateThousand />
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
                                })(
                                    <InputNumber
                                        placeholder="IRR"
                                        min={0}
                                        max={10000000000}
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    />,
                                )}
                            </FormItem>
                            <FormItem
                                label={t.t("Date and time")}
                            >
                                {getFieldDecorator("datetime", {
                                    rules: [{
                                        type: "object", required: true,
                                        validator: this.checkDate,
                                    }],
                                })(
                                    <DatePicker
                                        style={{ width: "100%" }}
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                        dateRender={(current) => {
                                            const style = { border: "", borderRadius: "" };
                                            return (
                                                <div className="ant-calendar-date" style={style} >
                                                    <Ex floatsNum={0} value={current.date()} stockStyle={false} />
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
                                <Button type="primary" htmlType="submit">{t.t("Submit transaction")}</Button>
                            </FormItem>
                        </Form>
                    </Spin>
                    <Table className="unsettled-invoices" rowSelection={this.rowSelection} pagination={false}
                        scroll={{ y: 250 }}
                        columns={columns} rowKey="id" dataSource={this.state.invoices.settleUpInvoices} size="small" />
                    <div>
                        {t.t("Total:") + " "}
                        <Ex stockStyle={false} floatsNum={0} value={this.state.sum} seperateThousand />
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
                values.datetime = values.datetime.toISOString();
                // prepare post data, format data and append extra props to values
                values.apikey = this.props.apiKey;
                values.mob = this.props.mobile;
                // notice: i don't set merMobile as a property name normally, i named it to match with our api schema
                values.merMobile = this.props.merchantId;
                values.invoiceIds = this.state.selectedInvoices;
                this.api.settleUp1UsingPOST(values).then(() => {
                    this.setState({ loading: false });
                    // notify user about successfull event and call successfull callback (probably to close modal)
                    notification.success({
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
            apikey: this.props.apiKey,
            mob: this.props.mobile,
            mermob: this.props.merchantId,
        }).then((response) => {
            this.setState({ loading: false });
            this.setState({
                invoices: response.data,
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
        mobile: state.app.user.mobile,
        apiKey: state.app.user.apiKey,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Settle));
