import * as React from "react";
import { connect } from "react-redux";
import {Redirect} from "react-router";
import { setUser } from "../../../../redux/app/actions";
import { IRootState } from "../../../../redux/reducers";

import t from "../../../../services/trans/i18n";
import "./style.less";

import { Button, Checkbox, Form, Input, message } from "antd";

const FormItem = Form.Item;
import { FormComponentProps } from "antd/lib/form";
import API from "../../../../lib/api";

const logo = require("../../../../assets/images/logo.png");

interface IProps extends FormComponentProps {
    user: any;
    setUser: (user: any) => void;
}

interface IState {
    user?: any;
    loading: boolean;
}

class Login extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        console.log(props);
        this.state = {
            loading: false,
        };
    }

    public setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime( d.getTime() + ( exdays * 24 * 60 * 60 * 1000 ) );
        const expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires + "; " + "path=/";
    }

    public handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                const api = API.getInstance();
                // api.create_toekn___login_post({
                //     attributes: { email: values.userName, password: values.password, app_id: 1 },
                //     include : "user",
                // })
                //     .then((result) => {
                //         if (result.token) {
                //             // add user to store
                //             this.props.setUser(result.user);
                //             // add token to api lib
                //             api.setAuthToken(result.token);
                //
                //             // remember me
                //             if (values.remember) {
                //                 // store with date
                //                 this.setCookie("token", result.token, 365);
                //             } else {
                //                 // store without date
                //                 document.cookie = "token=" + result.token + "; path=/";
                //             }
                //         }
                //     }).catch((error) => {
                //             message.error(error.errors[0].detail);
                //     });
            }
        });
    }

    public render() {
        if (this.props.user) { return (<Redirect to="/dashboard" />); }
        const { getFieldDecorator } = this.props.form;
        return (
            <div id={"loginContainer"}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <img src={logo}/>
                    <FormItem>
                        {getFieldDecorator("userName", {
                            rules: [{required: true, message: t.t("Please input your Email") }],
                        })(
                            <Input type={"email"} placeholder={t.t("Email")} />,
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator("password", {
                            rules: [{required: true, message: t.t("Please input your Password")}],
                        })(
                            <Input type="password" placeholder={t.t("Password")} />,
                        )}
                    </FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        {t.t("login")}
                    </Button>
                    <FormItem className={"rm-text"}>
                        {getFieldDecorator("remember", {
                            valuePropName: "checked",
                            initialValue: true,
                        })(
                            <Checkbox><span>{t.t("Remember Me")}</span></Checkbox>,
                        )}
                    </FormItem>
                    <FormItem className={"rg-text"}>
                        {/*<a href="">{t.t("Register now")}</a>*/}
                    </FormItem>
                    <FormItem className={"fp-text"}>
                        <a className="login-form-forgot" href="">{/*t.t("Forgot Password")*/}</a>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setUser: (user) => dispatch(setUser(user)),
    };
}

function mapStateToProps(state: IRootState) {
    return {
        user: state.app.user,
    };
}

const WrappedNormalLoginForm = Form.create()(connect(mapStateToProps, mapDispatchToProps)(Login));
export default WrappedNormalLoginForm;
