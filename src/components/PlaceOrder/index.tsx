/**
 * @module Components/PlaceOrderComponent
 */
import { Button, Checkbox, Col, Form, Input, Row, Tabs } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { connect } from "react-redux";
import Block from "../../components/Holder";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import "./style.less";

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

interface IPlaceProps extends FormComponentProps {
    fromSymbol: string;
    toSymbol: string;
}

interface IState {
}

class PlaceOrderComponent extends React.Component<IPlaceProps, IState> {

    constructor(props: IPlaceProps) {
        super(props);
    }

    public handleSubmit = (e) => {
        e.preventDefault();

    }
    public render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Tabs defaultActiveKey="1" >
                <TabPane tab={t.t("Limit")} key="1">
                    <Row gutter={8}>
                        <Col md={12}>
                            <Block className="place-order">
                                <h3>{t.t("Buy ") + this.props.fromSymbol}</h3>
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                  <FormItem {...formItemLayout}  label="Price">
                                    {getFieldDecorator("price", {
                                      rules: [{ required: true, message: "Please input price" }],
                                    })(
                                      <Input  />,
                                    )}
                                  </FormItem>
                                  <FormItem {...formItemLayout}  label="Amount">
                                    {getFieldDecorator("amount", {
                                      rules: [{ required: true, message: "Please input amount" }],
                                    })(
                                      <Input  />,
                                    )}
                                  </FormItem>
                                  <FormItem {...formItemLayout}  label="Total">
                                    {getFieldDecorator("total", {
                                      rules: [{ required: false, message: "Please input amount" }],
                                    })(
                                      <Input  />,
                                    )}
                                  </FormItem>
                                  <FormItem>
                                    <Button className="buy-btn" type="primary" htmlType="submit" >
                                     {t.t("Buy ") + this.props.fromSymbol}
                                    </Button>
                                  </FormItem>
                                </Form>
                            </Block>
                        </Col>
                        <Col md={12}>
                            <Block className="place-order">
                                <h3>{t.t("Sell ") + this.props.fromSymbol}</h3>
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                  <FormItem {...formItemLayout}  label="Price">
                                    {getFieldDecorator("price", {
                                      rules: [{ required: true, message: "Please input price" }],
                                    })(
                                      <Input  />,
                                    )}
                                  </FormItem>
                                  <FormItem {...formItemLayout}  label="Amount">
                                    {getFieldDecorator("amount", {
                                      rules: [{ required: true, message: "Please input amount" }],
                                    })(
                                      <Input  />,
                                    )}
                                  </FormItem>
                                  <FormItem {...formItemLayout}  label="Total">
                                    {getFieldDecorator("total", {
                                      rules: [{ required: false, message: "Please input amount" }],
                                    })(
                                      <Input  />,
                                    )}
                                  </FormItem>
                                  <FormItem>
                                    <Button className="sell-btn" type="primary" htmlType="submit" >
                                     {t.t("Sell ") + this.props.fromSymbol}
                                    </Button>
                                  </FormItem>
                                </Form>
                            </Block>
                        </Col>
                    </Row>
                </TabPane>
              </Tabs>
        );
    }
}

export default Form.create()(PlaceOrderComponent);
