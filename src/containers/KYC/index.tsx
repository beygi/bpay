import { Alert, Button, Col, Form, Icon, Input, Layout, message, Modal, notification, Radio, Row, Select, Upload } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { connect } from "react-redux";
import Profile from "../../components/DashboardHeaderProfile";
import GatewayInformation from "../../components/GatewayInformation";
import Block from "../../components/Holder";
import Uploader from "../../components/Uploader";
import config from "../../config";
import Api from "../../lib/api/kyc";
import { setUser } from "../../redux/app/actions";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import "./style.less";

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const coverImg = require("../../assets/images/cover.png");
const personalImg = require("../../assets/images/personal.png");
const selfieImg = require("../../assets/images/selfie.png");
const nationalImg = require("../../assets/images/national.png");

const { TextArea } = Input;

const newApi = Api.getInstance();

interface IUserFormProps extends FormComponentProps {
}

interface IState {
    cover: string;
    passport: string;
    passid: string;
    submited: boolean;
    countries?: [{ id: string, name: string }];
}

class KycContainer extends React.Component<IUserFormProps, IState> {
    constructor(props: IUserFormProps) {
        super(props);
        this.setImage = this.setImage.bind(this);
        this.state = {
            cover: null,
            passport: null,
            passid: null,
            submited: false,
            countries: [{ id: "none", name: t.t("Please select your country") }],
        };
    }

    public componentDidMount() {
        this.getCountries();
    }
    public getCountries() {
        newApi.allcountriesUsingGET({}).then((response) => {
            console.log(response.body);
            this.setState({ countries: response.body });
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
                newApi.addMerchantKycUsingPOST({ input: values }).then((response) => {
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

    public setImage(file, type) {
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
        const formItemLayout = {
            labelCol: { lg: 4, md: 24 },
            wrapperCol: { lg: 12, md: 24 },
        };
        const countries = this.state.countries.map((item, i) => <Option key={`${i}`} value={item.id}>{item.name}</Option>);
        const { getFieldDecorator } = this.props.form;

        let block = <div></div>;
        if (!this.state.submited) {
            block = <Block>
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
                        {getFieldDecorator("national-code", {
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
                            rules: [{ required: true, message: t.t("please upload your national id card") }],
                        })(
                            <Uploader callback={this.setImage} example={nationalImg} action={`https://87.98.188.77:9092/kyc/img`} name="file" data={{ imgtype: "cover" }} />,
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
            </Block>;
        } else {
            block =
                <Alert
                    className="kyc-submitte"
                    message={t.t("your information submitted successfully")}
                    description={t.t("we will inform you about the progress in your profile page")}
                    type="success"
                    showIcon
                />;
        }

        return (
            <Row gutter={8}>
                <Col md={8} >
                    <Block>
                        <GatewayInformation />
                    </Block>
                </Col>
                <Col md={16} >
                    {block}
                </Col>
            </Row >
        );
    }
}

export default Form.create()(KycContainer);
