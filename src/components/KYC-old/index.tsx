/**
 * @module Components/KycComponent
 */
import { Alert, Button, Form, Icon, Input, notification, Radio, Spin } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import Uploader from "../../components/Uploader";
import config from "../../config";
import API from "../../lib/api/kyc";
import t from "../../services/trans/i18n";
import USER from "./../../lib/user";
import "./style.less";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

// const coverImg = require("../../assets/images/cover.png");
// const personalImg = require("../../assets/images/personal.png");
// const selfieImg = require("../../assets/images/selfie.png");
const nationalImg = require("../../assets/images/national.png");

const { TextArea } = Input;

interface IProps extends FormComponentProps {
}

interface IState {
    cover: string;
    passport: string;
    passid: string;
    submited: boolean;
    loading: boolean;
    status: string;
    countries?: [{ id: string, name: string }];
}

class KycComponent extends React.Component<IProps, IState> {
    /**  holds api instance */
    public api = API.getInstance();
    /**  user object wich is represent current user */
    public userObject = USER.getInstance();
    constructor(props: IProps) {
        super(props);
        this.setImage = this.setImage.bind(this);
        this.state = {
            cover: null,
            passport: null,
            passid: null,
            submited: false,
            countries: [{ id: "none", name: t.t("Please select your country") }],
            loading: true,
            status: "unknown",
        };
        // send token with all api requests
        this.api.SetHeader(this.userObject.getToken().name, this.userObject.getToken().value);
    }

    public componentDidMount() {
        // this.getCountries();
        this.getStatus();
    }
    public getCountries() {
        this.api.allcountriesUsingGET({}).then((response) => {
            console.log(response.body);
            this.setState({ countries: response.body });
        });
    }

    public getStatus() {
        this.api.getStatusUsingGET({ $domain: config.apiUrl }).then((response) => {
            this.setState({ loading: false, status: response.body.status });
        }).catch((error) => {
            this.setState({ loading: false });
        });
    }

    public handleSubmit = (e) => {
        e.preventDefault();
        // check for validating image uploads
        this.props.form.setFields({
            cover: {
                value: this.state.cover,
            },
            // passport: {
            //     value: this.state.passport,
            // },
            // passid: {
            //     value: this.state.passid,
            // },
        });
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                this.api.addMerchantKycUsingPOST({ input: values, $domain: config.apiUrl }).then((response) => {
                    this.setState({ submited: true });
                    console.log(response.body);
                }).catch((error) => {
                    notification.error({
                        message: t.t("Error in sending data"),
                        placement: "bottomRight",
                        description: error + "",
                        duration: 5,
                    });
                });
            }
        });
    }

    public setImage(file, type, describe) {
        // success info  warning error
        // console.log(file);
        if (file[type] === true) {
            notification.success({
                message: type + " " + t.t("Image uploaded successfully"),
                placement: "bottomRight",
                description: t.t("Your  {type} image uploaded to our servers, you can change it any time before our review").replace("{type}", type),
                duration: 5,
            });
        }
        this.setState(file);
    }

    public render() {
        if (this.state.loading) {
            return (
                <Spin spinning />
            );
        }
        if (this.state.status === "pending") {
            return (
                <Alert
                    message={t.t("your information submitted successfully")}
                    description={t.t("we will inform you about the progress in your profile page")}
                    type="info"
                    showIcon
                />
            );
        }
        const formItemLayout = {
            labelCol: { lg: 4, md: 24 },
            wrapperCol: { lg: 12, md: 24 },
        };
        // const countries = this.state.countries.map((item, i) => <Option key={`${i}`} value={item.id}>{item.name}</Option>);
        const { getFieldDecorator } = this.props.form;

        let block = <div></div>;
        if (!this.state.submited) {
            block = <div>
                <Alert className="kyc-info"
                    message={<h2>{t.t("Before you start")}</h2>}
                    description={<div dangerouslySetInnerHTML={{
                        __html: t.t("KYC stands for (Know Your Customer) it is the process of a business. <br> verifying and identifying the identity \
of its clients.It is required because the KYC its used to refer to the bank and anti-money laundering regulations."),
                    }}></div>}
                    type="info"
                    showIcon
                />
                <Form layout="horizontal" onSubmit={this.handleSubmit} className="kyc-form">

                    {/*  first name */}
                    <FormItem label={t.t("First Name")}  {...formItemLayout} >
                        {getFieldDecorator("fname", {
                            rules: [{ required: true, message: t.t("Please input your first name") }],
                        })(
                            <Input prefix={<Icon type={"user"} />} />,
                        )}
                    </FormItem>

                    {/*  family */}
                    <FormItem label={t.t("Last Name")}  {...formItemLayout} >
                        {getFieldDecorator("lname", {
                            rules: [{ required: true, message: t.t("Please input your last name") }],
                        })(
                            <Input prefix={<Icon type={"user"} />} />,
                        )}
                    </FormItem>

                    {/* sex */}
                    <FormItem
                        {...formItemLayout}
                        label={t.t("Gender")
                        }
                    >
                        {getFieldDecorator("gender", {
                            rules: [{ required: true, message: t.t("Please select your gender") }],
                        })(
                            <RadioGroup>
                                <Radio value="male">{t.t("Male")}</Radio>
                                <Radio value="female">{t.t("Female")}</Radio>
                            </RadioGroup>,
                        )}
                    </FormItem>

                    {/*  country */}

                    {/* <FormItem
                        {...formItemLayout}
                        label={t.t("Country")}
                    >
                        {getFieldDecorator("country", {
                            rules: [
                                { required: true, message: t.t("Please select your country") },
                            ],
                        })(
                            <Select placeholder={t.t("Please select a country")} showSearch={true}>
                                <Option value="">{t.t("Please select ...")}</Option>
                                {countries}
                            </Select>,
                        )}
                    </FormItem> */}

                    {/* License Type */}
                    {/* <FormItem
                        {...formItemLayout}
                        label={t.t("License Type")}
                    >
                        {getFieldDecorator("ltype", {
                            initialValue: "PS",
                        })(
                            <RadioGroup   >
                                <RadioButton value="PS">{t.t("Passport")}</RadioButton>
                                <RadioButton value="DL">{t.t("Driving license")}</RadioButton>
                                <RadioButton value="NI">{t.t(" National ID Card")}</RadioButton>
                            </RadioGroup>,
                        )}
                    </FormItem> */}

                    {/*  License ID */}
                    <FormItem label={t.t("National code")}  {...formItemLayout} >
                        {getFieldDecorator("nationalCode", {
                            rules: [{ required: true, pattern: /^\d{10}$/, message: t.t("Please input your national code ") }],
                        })(
                            <Input prefix={<Icon type="idcard" />} />,
                        )}
                    </FormItem>

                    <FormItem label={t.t("Bank card number")}  {...formItemLayout} >
                        {getFieldDecorator("card", {
                            rules: [{ required: true, pattern: /^\d{16}$/, message: t.t("Please input your 16 digits card number ") }],
                        })(
                            <Input prefix={<Icon type="credit-card" />} />,
                        )}
                    </FormItem>

                    <FormItem label={t.t("Address")}  {...formItemLayout} >
                        {getFieldDecorator("address", {
                            rules: [{ required: true, message: t.t("Please input your address") }],
                        })(
                            <TextArea autosize={{ minRows: 2, maxRows: 6 }} />,
                        )}
                    </FormItem>

                    {/*  Upload */}
                    <FormItem label={t.t("National ID card")}  {...formItemLayout} >
                        {getFieldDecorator("cover", {
                            rules: [{ required: false, message: t.t("please upload your national id card") }],
                        })(
                            <Uploader callback={this.setImage} describe="" example={nationalImg} action={`${config.apiUrl}/kyc/img`} name="file" data={{ imgtype: t.t("cover") }} />,
                        )}
                    </FormItem>

                    {/* <FormItem label={t.t("Passport Personal Page")}  {...formItemLayout} >
                        {getFieldDecorator("passport", {
                            rules: [{ required: true, message: t.t("please upload your passport personal page") }],
                        })(
                            <Uploader callback={this.setImage} example={personalImg} action="http://87.98.188.77:9092/kyc/img" name="file" data={{ imgtype: "passport" }} />,
                        )}
                    </FormItem> */}

                    {/* <FormItem label={t.t("Selfie With ID And Note")}  {...formItemLayout} >
                        {getFieldDecorator("passid", {
                            rules: [{ required: true, message: t.t("please upload your slefie  image") }],
                        })(
                            <Uploader callback={this.setImage} example={selfieImg} action="http://87.98.188.77:9092/kyc/img" name="file" data={{ imgtype: "passid" }} />,
                        )}
                    </FormItem> */}
                    <FormItem label=" " colon={false} {...formItemLayout}>
                        <Button type="primary" htmlType="submit" size="large">{t.t("Submit")}</Button>
                    </FormItem>
                </Form>
            </div>;
        } else {
            block =
                <Alert
                    message={t.t("your information submitted successfully")}
                    description={t.t("we will inform you about the progress in your profile page")}
                    type="success"
                    showIcon
                />;
        }

        return block;
    }
}

export default Form.create()(KycComponent);
