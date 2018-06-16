import { Button, Col, Form, Icon, Input, Layout, Modal , Radio, Row, Select, Upload} from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { connect } from "react-redux";
import Profile from "../../components/DashboardHeaderProfile";
import Block from "../../components/Holder";
import Uploader from "../../components/Uploader";
import { setUser } from "../../redux/app/actions";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import CountryList from "./countries";

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const example1 = require("../../assets/images/example1.png");

interface IUserFormProps extends FormComponentProps {
    user: any;
}

interface IState {
    user: any;
}

class KycContainer extends React.Component<IUserFormProps, IState> {
    constructor(props: IUserFormProps) {
        super(props);
    }

    public handleSubmit() {
        return true;
    }

    public render() {
        const formItemLayout = {
            labelCol: { md: 4 },
            wrapperCol: { md: 8 },
        };

        const countries = CountryList.map((item, i) => <Option key={i} value={item.code}>{item.name}</Option>);

        const { getFieldDecorator } = this.props.form;
        return (
            <Row gutter={8}>
                <Col md={6} >
                    <Block>
                        <Profile></Profile>
                        <Profile></Profile>
                    </Block>
                    <Block>
                        <Profile></Profile>
                    </Block>
                </Col>
                <Col md={18} >
                    <Block>
                        <h2>{t.t("Before you start")}</h2>
                        <div>
                            <ul>
                                <li>to be replaced,  to be replaced,  to be replaced,  to be replaced,</li>
                                <li>to be replaced,  to be replaced,  to be replaced,  to be replaced,</li>
                                <li>to be replaced,  to be replaced,  to be replaced,  to be replaced,</li>
                                <li>to be replaced,  to be replaced,  to be replaced,  to be replaced,</li>
                                <li>to be replaced,  to be replaced,  to be replaced,  to be replaced,</li>
                                <li>to be replaced,  to be replaced,  to be replaced,  to be replaced,</li>
                            </ul>
                        </div>
                        <Form layout="horizontal" onSubmit={this.handleSubmit} className="login-form">

                            {/*  first name */}
                            <FormItem label={t.t("First Name")}  {...formItemLayout} >
                                {getFieldDecorator("first-name", {
                                    rules: [{ required: true, message: t.t("Please input your first name") }],
                                })(
                                    <Input prefix={<Icon type={"user"} />} />,
                                )}
                            </FormItem>

                            {/*  family */}
                            <FormItem label={t.t("Last Name")}  {...formItemLayout} >
                                {getFieldDecorator("last-name", {
                                    rules: [{ required: true, message: t.t("Please input your last name") }],
                                })(
                                    <Input prefix={<Icon type={"user"} />} />,
                                )}
                            </FormItem>

                            {/* sex */}
                            <FormItem
                                {...formItemLayout}
                                label={t.t("Sex")}
                            >
                                {getFieldDecorator("sex")(
                                    <RadioGroup>
                                        <Radio value="male">{t.t("Male")}</Radio>
                                        <Radio value="female">{t.t("Female")}</Radio>
                                        <Radio value="other">{t.t("Other")}</Radio>
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
                                    <Select placeholder={t.t("Please select a country")}>
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
                                    {getFieldDecorator("license-type", {
                                        initialValue : "passport",
                                    })(
                                        <RadioGroup   >
                                            <RadioButton value="passport">{t.t("Passport")}</RadioButton>
                                            <RadioButton value="driving">{t.t("Driving license")}</RadioButton>
                                            <RadioButton value="idcard">{t.t(" National ID Card")}</RadioButton>
                                        </RadioGroup>,
                                    )}
                                </FormItem>

                                {/*  License ID */}
                                <FormItem label={t.t("License ID")}  {...formItemLayout} >
                                    {getFieldDecorator("license-id", {
                                        rules: [{ required: true, message: t.t("Please input your license id ") }],
                                    })(
                                        <Input prefix={<Icon type="file-text" />} />,
                                    )}
                                </FormItem>

                                {/*  Upload */}
                                <FormItem label={t.t("License ID")}  {...formItemLayout} >
                                    {getFieldDecorator("license-id", {
                                        rules: [{ required: true, message: t.t("Please input your license id ") }],
                                    })(
                                        <Uploader example={example1} action="http://192.168.1.42:9092/kyc/img" name="file" headers={{imgtype: "cover"}} />,
                                    )}
                                </FormItem>

                        </Form>

                    </Block>
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
