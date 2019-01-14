/**
 * @module Components/NewInvoice
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Button, Form, Input, InputNumber, notification, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import config from "../../config";
import API from "../../lib/api/invoice";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import USER from "./../../lib/user";
import "./style.less";

const FormItem = Form.Item;
const Option = Select.Option;

interface IProps extends FormComponentProps {
    mobile: string;
    apiKey: string;
    theme: string;
    language: string;
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
        this.api.setAuthToken(this.userObject.getToken().value);
        this.api.setBaseURL(config.apiUrl);
        this.checkPrice = this.checkPrice.bind(this);
    }

    // public async testAxios() {
    //     TESTPI.getInstance().postKYC({
    //         apikey: "d089b7cad4b1f425b35ab943ac34c6e88514afeed56e13e161c4a521e9e50dc6",
    //         description: "asdasd",
    //         mobile: "09120453931",
    //         orderId: "sdAAAASAS",
    //         price: "2",
    //     }).catch((err) => { console.log(err); });
    // }

    public handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({ loading: true });

                this.api.addInvoiceUsingPOST({
                    invReq: {
                        apikey: this.props.apiKey,
                        description: values.description,
                        price: values.price,
                        mobile: this.props.mobile,
                        orderId: this.uuid(),
                        currency: values.fiat,
                        merchantCur: "IRR",
                    },
                }).then((response) => {
                    this.setState({ loading: false });
                    notification.success({
                        duration: 10,
                        message: t.t("New Invoice Created"),
                        description: t.t("click to open gateway"),
                        placement: "bottomRight",
                        btn: <Button
                            target="blank" href={`${config.gateWayUrl}/invoice/${response.data.id}`} size="small" type="primary">{t.t("Open gateway")}</Button>,
                    });
                }).catch((error) => {
                    // handle error
                    this.setState({ loading: false });
                    // console.log(error.toString());
                    const errorText = (error.response.body.description) ? error.response.body.description : error;
                    notification.error({
                        message: t.t("Failed to create invoice"),
                        description: t.t(errorText),
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
        const fiats = _.filter(config.currencies, { type: "fiat" }).map((fiat) => <Option key={fiat.name} value={fiat.name}>{t.t(fiat.name)}</Option>);

        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form className="new-invoice" layout="inline" onSubmit={this.handleSubmit}  >
                    <FormItem label={t.t("Price")} className="price">
                        {getFieldDecorator("price", {
                            rules: [{
                                required: true, type: "number",
                                validator: this.checkPrice,
                            }],
                            initialValue: 0,
                        })(
                            <InputNumber
                                size="large"
                                placeholder={this.props.form.getFieldValue("fiat")}
                                min={0}
                                max={10000000000}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            />,
                        )}
                    </FormItem>
                    <FormItem label={t.t("Price unit")} className="fiat">
                        {getFieldDecorator("fiat", {
                            rules: [{
                                required: true, message: t.t("Please select input currency"),
                            }],
                            initialValue: "IRR",
                        })(
                            <Select dropdownClassName={`select-${this.props.theme}`} size="large">
                                {
                                    fiats
                                }
                            </Select>,
                        )}
                    </FormItem>
                    <FormItem label={t.t("Description")} className="description">
                        {getFieldDecorator("description", {
                            rules: [{
                                required: true, message: t.t("Please input description, max length is 30"),
                                max: 30,
                            }],
                        })(
                            <Input id="description" placeholder={t.t("example: sell product #1233")} size="large" />,
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
            </div>

        );
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
        theme: state.app.user.theme,
        language: state.app.user.language,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(NewInvoice));
