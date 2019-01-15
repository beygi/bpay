/**
 * @module Components/PhoneValidate
 */

import { Button, Form, Input, message, notification, Spin } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import config from "../../config";
import API from "../../lib/api/invoice";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import USER from "./../../lib/user";
import "./style.less";

interface IProps extends FormComponentProps {
    /** success callback. it can be used to close modal */
    success?: () => void;
}

interface IState {
    /** loading state,  spinner used this value to spinning */
    loading: boolean;
    /** send or validate */
    action?: string;
}

const FormItem = Form.Item;
/**
 * shows list of unsettled invoices of a merchant to select and settle
 */
class PhoneValidate extends React.Component<IProps, IState> {
    /** holds an instance of invoice api */
    public api = API.getInstance();
    /** represent user object for the currently loggined user */
    public userObject = USER.getInstance();
    constructor(props: IProps) {
        super(props);
        // initial state
        this.state = {
            loading: false,
            action: "send",
        };

        // send token with all api requests
        this.api.setAuthToken(this.userObject.getToken().value);
        this.api.setBaseURL(config.apiUrl);
    }

    public render() {
        if (this.state.action === "sends") {
            return this.send_render();
        }
        return this.verify_render();
    }

    public verify_render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="phone-validate-form">
                <Spin spinning={this.state.loading}>
                    <Form layout="vertical" onSubmit={this.handleVerify}>
                        <FormItem
                            label={t.t("Verification code which is sent via SMS")}
                        >
                            {getFieldDecorator("code", {
                                rules: [{ required: true, pattern: /^\d{5}$/, message: t.t("Please input 5 digit verify code which is sent to your device") }],
                            })(
                                <Input className="ltr" placeholder={t.t("example: 43543")} />,
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit">{t.t("Verify")}</Button>
                        </FormItem>
                    </Form>
                </Spin>
            </div>
        );
    }

    public send_render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="phone-validate-form">
                <Spin spinning={this.state.loading}>
                    <Form layout="vertical" onSubmit={this.handleSubmit}>
                        <FormItem
                            label={t.t("Mobile number")}
                        >
                            {getFieldDecorator("mobile", {
                                rules: [{ required: true, pattern: /^\d{10}$/, message: t.t("Please input your 10 digits mobile number like example") }],
                            })(
                                <Input className="ltr" placeholder={t.t("example: 9123456789")} />,
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit">{t.t("Submit")}</Button>
                        </FormItem>
                    </Form>
                </Spin>
            </div>
        );
    }

    /** handles form submit routine */
    public handleVerify = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const userProps = { ...this.userObject.getCurrent() };
                if (!userProps.realm_access.roles.includes("merchant")) {
                    userProps.realm_access.roles.push("merchant");
                    this.userObject.UpdateProfile(userProps);
                }
            }
        });
    }

    /** handles form submit routine */
    public handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({ loading: true });
                this.api.settleUp1UsingPOST(values).then(() => {
                    this.setState({ loading: false });
                    this.props.success();
                }).catch((error) => {
                    // handle error
                    this.setState({ loading: false });
                    let errorText = (error.response.body.message) ? error.response.body.message : error;
                    errorText = (error.response.body.description) ? error.response.body.description : errorText;
                    // inform user about error using error message provided by api
                    notification.error({
                        message: t.t("Failed to send phone number"),
                        description: errorText,
                        placement: "bottomRight",
                    });
                });
            }

        });
    }
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

function mapStateToProps(state: IRootState) {
    return {
        language: state.app.user.language,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(PhoneValidate));
