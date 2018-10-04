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
import Block from "../Holder";
import USER from "./../../lib/user";
import "./style.less";

const FormItem = Form.Item;

const userObject = USER.getInstance();
const api = API.getInstance();
// api.SetHeader(userObject.getToken().name, userObject.getToken().value);

interface IProps extends FormComponentProps {
}
interface IState {
    invoiceId: string;
    loading: boolean;
}

/**
 * this component shows all transactions of merchant
 */
class NewInvoice extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            invoiceId: null,
            loading: false,
        };
    }

    public handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({ loading: true });
                api.addInvoiceUsingPOST({
                    inv: {
                        apiKey: "B822BB93905A9BD8B3A0C08168C427696436CF8BF37ED4AB8EBF41A307642ED1",
                        description: values.description,
                        price: values.price,
                        mobile: "09355126588",
                        orderId: this.uuid(),
                    },
                    $domain: "http://87.98.188.77:9193",
                }).then((response) => {
                    this.setState({ loading: false });
                    notification.success({
                        message: "New Invoice Created",
                        description: "click to open gateway",
                        placement: "bottomRight",
                        btn: <Button
                            target="blank" href={`${config.gateWayUrl}/invoice/${response.body.id}`} size="small" type="primary">Open gateway</Button>,
                    });
                }).catch((error) => {
                    // handle error
                    this.setState({ loading: false });
                    // console.log(error.toString());
                    const errorText = (error.response.body.message) ? error.response.body.message : error;
                    notification.error({
                        message: "Failed to create invoice",
                        description: errorText,
                        placement: "bottomRight",
                    });

                });
            }
        });
    }
    public uuid() { return "00000000".replace(/0/g, () => (Math.floor(Math.random() * 16)).toString(16)); }
    public render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="new-invoice" layout="inline" onSubmit={this.handleSubmit}  >
                <FormItem className="price">
                    {getFieldDecorator("price", {
                        rules: [{
                            required: true, type: "number", message: t.t("Please input price"),
                        }],
                        initialValue: 20000,
                    })(
                        <InputNumber
                            size="large"
                            min={0}
                            max={10000000}
                            formatter={(value) => `IRR ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            parser={(value): number => {

                                // alert(parseInt(value.replace(/\IRR\s?|(,*)/g, ""), 10));
                                const output = parseInt(value.replace(/\IRR\s?|(,*)/g, ""), 10) || 0;
                                return output;
                            }}
                        />,
                    )}
                </FormItem>
                <FormItem className="description">
                    {getFieldDecorator("description", {
                        rules: [{
                            required: true, message: t.t("Please input description"),
                        }],
                    })(
                        <Input id="description" placeholder={t.t("Description")} size="large" />,
                    )}
                </FormItem>
                <FormItem>
                    <Button loading={this.state.loading} className="neat-btn" type="primary" htmlType="submit" size="large">Create</Button>
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(NewInvoice));
