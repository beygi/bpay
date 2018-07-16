import { Alert, Button, Col, Form, Icon, Input, Layout, Modal, notification, Radio, Row, Select, Upload } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { connect } from "react-redux";
import Profile from "../../components/DashboardHeaderProfile";
import Block from "../../components/Holder";
import Uploader from "../../components/Uploader";
import Api from "../../lib/api/kyc";
import { setUser } from "../../redux/app/actions";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const coverImg = require("../../assets/images/cover.png");
const personalImg = require("../../assets/images/personal.png");
const selfieImg = require("../../assets/images/selfie.png");

const newApi = Api.getInstance();

interface IUserFormProps extends FormComponentProps {
    user: any;
}

interface IState {
    user?: any;
    cover: string;
    passport: string;
    passid: string;
    submited: boolean;
    countries?: [{id: string , name: string}];
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
            countries: [{ id: "none", name: t.t("Please select your country")}],
        };
    }

   public componentDidMount() {
       this.getCountries();
   }
   public getCountries() {
        newApi.allcountriesUsingGET({}).then( (response) => {
            console.log(response.body);
            this.setState({countries : response.body });
        } );
   }

    public handleSubmit = (e) => {
        e.preventDefault();
        // check for validating image uploads
        this.props.form.setFields({
            cover: {
                value: this.state.cover,
            },
            passport: {
                value: this.state.passport,
            },
            passid: {
                value: this.state.passid,
            },
        });
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                newApi.addKycUsingPOST( {input :  values } ).then((response) => {
                    this.setState({ submited: true });
                    console.log(response.data);
                }).catch((error) => {
                    console.log(error);
                });
            }
        });
    }

    public setImage(file, type) {
        // success info  warning error
        console.log(file);
        if (file[type] === true) {
            notification.success({
                message: type + " " + t.t("Image uploaded successfully"),
                description: "Your " + type + " image uploaded to our servers, you can change it any time before our review" ,
                placement : "bottomRight",
                duration : 5,
            });
        }
        this.setState(file);
    }

    public render() {
        const formItemLayout = {
            labelCol: { lg: 4, md: 24 },
            wrapperCol: { lg: 14, md: 24 },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 4,
                },
            },
        };

        const countries = this.state.countries.map((item, i) => <Option key={i} value={item.id}>{item.name}</Option>);
        const { getFieldDecorator } = this.props.form;

        let block = <div></div>;
        if (!this.state.submited) {
            block = <Block><h2>{t.t("Before you start")}</h2>
                <div>
KYC stands for (Know Your Customer) it is the process of a business <br /> verifying and identifying the identity
 of its clients. It is required <br /> because the KYC its used to refer to the bank and anti-money laundering regulations.
 <br /> <br />
                </div>
                <Form layout="horizontal" onSubmit={this.handleSubmit} className="login-form">

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
                    <FormItem
                        {...formItemLayout}
                        label={t.t("Country")}
                    >
                        {getFieldDecorator("country", {
                            rules: [
                                { required: true, message: t.t("Please select your country") },
                            ],
                        })(
                            <Select placeholder={t.t("Please select a country")} showSearch={true}>
                                {/* <Option value="">{t.t("Please select ...")}</Option> */}
                                {countries}
                            </Select>,
                        )}
                    </FormItem>

                    {/* License Type */}
                    <FormItem
                        {...formItemLayout}
                        label={t.t("License Type")}
                    >
                        {getFieldDecorator("ltype", {
                            initialValue: "passport",
                        })(
                            <RadioGroup   >
                                <RadioButton value="PS">{t.t("Passport")}</RadioButton>
                                <RadioButton value="DL">{t.t("Driving license")}</RadioButton>
                                <RadioButton value="NI">{t.t(" National ID Card")}</RadioButton>
                            </RadioGroup>,
                        )}
                    </FormItem>

                    {/*  License ID */}
                    <FormItem label={t.t("License ID")}  {...formItemLayout} >
                        {getFieldDecorator("licenseid", {
                            rules: [{ required: true, message: t.t("Please input your license id ") }],
                        })(
                            <Input prefix={<Icon type="file-text" />} />,
                        )}
                    </FormItem>

                    {/*  Upload */}
                    <FormItem label={t.t("Passport Cover")}  {...formItemLayout} >
                        {getFieldDecorator("cover", {
                            rules: [{ required: true, message: t.t("please upload your cover") }],
                        })(
                            <Uploader callback={this.setImage} example={coverImg} action="http://87.98.188.77:9092/kyc/img" name="file" data={{ imgtype: "cover" }} />,
                        )}
                    </FormItem>

                    <FormItem label={t.t("Passport Personal Page")}  {...formItemLayout} >
                        {getFieldDecorator("passport", {
                            rules: [{ required: true, message: t.t("please upload your passport personal page") }],
                        })(
                            <Uploader callback={this.setImage} example={personalImg} action="http://87.98.188.77:9092/kyc/img" name="file" data={{ imgtype: "passport" }} />,
                        )}
                    </FormItem>

                    <FormItem label={t.t("Selfie With ID And Note")}  {...formItemLayout} >
                        {getFieldDecorator("passid", {
                            rules: [{ required: true, message: t.t("please upload your slefie  image") }],
                        })(
                            <Uploader callback={this.setImage} example={selfieImg} action="http://87.98.188.77:9092/kyc/img" name="file" data={{ imgtype: "passid" }} />,
                        )}
                    </FormItem>

                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" size="large">{t.t("Submit")}</Button>
                    </FormItem>

                </Form>
            </Block>;
        } else {
            block = <Alert banner
                message={t.t("your information submitted successfully")}
                description={t.t("we will inform you about the progress in your profile page")}
                type="success"
                showIcon
            />
                ;
        }

        return (
            <Row gutter={8}>
                <Col md={6} >
                    <Block>
                        <img src="https://dummyimage.com/600x400/4c4649/3ee6e0.png" alt=""/>
                    </Block>
                    <Block>
                            <img src="https://dummyimage.com/600x800/4c4649/3ee6e0.png" alt=""/>
                    </Block>
                </Col>
                <Col md={18} >
                    {block}
                </Col>
            </Row >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        user: (user) => dispatch(setUser({ user })),
    };
}

function mapStateToProps(state: IRootState) {
    return {
        user: state.app.user,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(KycContainer));
