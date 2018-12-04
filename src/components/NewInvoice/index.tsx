/**
 * @module Components/NewInvoice
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, InputNumber, notification } from "antd";
import { FormComponentProps } from "antd/lib/form";
import axios from "axios";
import * as React from "react";
import { JsonTable } from "react-json-to-html";
import { connect } from "react-redux";
import config from "../../config";
import API from "../../lib/api/invoice";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import USER from "./../../lib/user";
import "./style.less";
const FormItem = Form.Item;

interface IProps extends FormComponentProps {
    user: any;
}
interface IState {
    invoiceId: string;
    loading: boolean;
}

/**
 * this component shows all transactions of merchant
 */
class NewInvoice extends React.Component<IProps, IState> {

    public api = API.getInstance();
    public userObject = USER.getInstance();

    constructor(props: IProps) {
        super(props);
        this.state = {
            invoiceId: null,
            loading: false,
        };
        this.api.SetHeader(this.userObject.getToken().name, this.userObject.getToken().value);
        this.checkPrice = this.checkPrice.bind(this);
    }

    public handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({ loading: true });
                this.api.addInvoiceUsingPOST({
                    invReq: {
                        apikey: this.props.user.apiKey,
                        description: values.description,
                        price: values.price,
                        mobile: this.props.user.mobile,
                        orderId: this.uuid(),
                        payerCur: "IRR",
                        merchantCur: "IRR",
                    },
                    $domain: "https://api.becopay.com",
                }).then((response) => {
                    this.setState({ loading: false });
                    notification.success({
                        duration: 10,
                        message: t.t("New Invoice Created"),
                        description: t.t("click to open gateway"),
                        placement: "bottomRight",
                        btn: <Button
                            target="blank" href={`${config.gateWayUrl}/invoice/${response.body.id}`} size="small" type="primary">{t.t("Open gateway")}</Button>,
                    });
                }).catch((error) => {
                    // handle error
                    this.setState({ loading: false });
                    // console.log(error.toString());
                    const errorText = (error.response.body.message) ? error.response.body.message : error;
                    notification.error({
                        message: t.t("Failed to create invoice"),
                        description: errorText,
                        placement: "bottomRight",
                    });

                });
            }
        });
    }
    public uuid() { return "00000000".replace(/0/g, () => (Math.floor(Math.random() * 16)).toString(16)); }
    public checkPrice = (rule, value, callback) => {
        if (value > 0) {
            callback();
        }
        callback(t.t("Please input price"));
        return;
    }
    public render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="new-invoice" layout="inline" onSubmit={this.handleSubmit}  >
                <FormItem className="price">
                    {getFieldDecorator("price", {
                        rules: [{
                            required: true, type: "number",
                            validator: this.checkPrice,
                        }],
                        initialValue: 20000,
                    })(
                        <InputNumber
                            size="large"
                            placeholder="IRR"
                            min={0}
                            max={10000000000}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        />,
                    )}
                </FormItem>
                <FormItem className="description">
                    {getFieldDecorator("description", {
                        rules: [{
                            required: true, message: t.t("Please input description, max length is 30"),
                            max: 30,
                        }],
                    })(
                        <Input id="description" placeholder={t.t("Description")} size="large" />,
                    )}
                </FormItem>
                <FormItem
                    className="submit"
                >
                    <Button loading={this.state.loading} className="neat-btn" type="primary" htmlType="submit" size="large">
                        {(!this.state.loading) ? <FontAwesomeIcon icon={["fas", "plus"]} /> : null}
                        {t.t("Create")}
                    </Button>
                </FormItem>
            </Form>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(NewInvoice));
