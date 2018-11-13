/**
 * @module Components/PlaceOrderComponent
 */
import { Button, Checkbox, Col, Form, Input, InputNumber, Row, Tabs } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as _ from "lodash";
import * as React from "react";
import Ex from "../../components/ExchangeValue";
import Block from "../../components/Holder";
import config from "../../config";
import Tools from "../../services/tools";
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
    /** origin symbol */
    fromSymbol: string;
    /** target symbol */
    toSymbol: string;
}

interface IState {
    /** holds total value of order */
    total?: number;
}

/**
 * place order component, users can set bids for buy or sell
 */
class PlaceOrderComponent extends React.Component<IPlaceProps, IState> {

    constructor(props: IPlaceProps) {
        super(props);
        let floatNumbers = 2;
        if (this.props.toSymbol === "IRR") {
            floatNumbers = 0;
        }
        if (this.props.toSymbol === "BTC" || this.props.toSymbol === "ETH") {
            floatNumbers = 4;
        }
        this.state = {
            total: _.round(Tools.getPrice(this.props.fromSymbol, this.props.toSymbol), floatNumbers),
        };

        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
    }

    public componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.fromSymbol !== prevProps.fromSymbol || this.props.toSymbol !== prevProps.toSymbol) {
            let floatNumbers = 2;
            if (this.props.toSymbol === "IRR") {
                floatNumbers = 0;
            }
            if (this.props.toSymbol === "BTC" || this.props.toSymbol === "ETH") {
                floatNumbers = 4;
            }
            this.props.form.setFieldsValue({
                price: _.round(Tools.getPrice(this.props.fromSymbol, this.props.toSymbol), floatNumbers),
                amount: 1,
            });
            this.setState({ total: _.round(Tools.getPrice(this.props.fromSymbol, this.props.toSymbol), floatNumbers) });
        }
    }

    public handleSubmit = (e) => {
        e.preventDefault();
        console.log(Tools.getPrice(this.props.fromSymbol, this.props.toSymbol));
    }

    public handlePriceChange(value) {
        this.setState({ total: this.props.form.getFieldValue("amount") * value });
    }

    public handleAmountChange(value) {
        this.setState({ total: this.props.form.getFieldValue("price") * value });
    }

    public render() {
        let step = 0.1;
        let floatNumbers = 2;
        if (this.props.toSymbol === "IRR") {
            step = 10000;
            floatNumbers = 0;
        }
        if (this.props.toSymbol === "BTC" || this.props.toSymbol === "ETH") {
            step = 0.001;
            floatNumbers = 4;
        }

        const { getFieldDecorator } = this.props.form;
        return (
            <Tabs defaultActiveKey="1" >
                <TabPane tab={t.t("Limit")} key="1">
                    <Row gutter={8}>
                        <Col md={12}>
                            <Block className="place-order">
                                <h3>{t.t("Buy ") + t.t(config.currencies[this.props.fromSymbol].name)}</h3>
                                <Form onSubmit={this.handleSubmit} className="buy-form">
                                    <FormItem {...formItemLayout} label={t.t("Price")}>
                                        {getFieldDecorator("price", {
                                            initialValue: _.round(Tools.getPrice(this.props.fromSymbol, this.props.toSymbol), floatNumbers),
                                            rules: [{
                                                required: true,
                                                message: t.t("Please input price"),
                                            }],
                                        })(
                                            <InputNumber
                                                placeholder={this.props.toSymbol}
                                                min={0}
                                                max={10000000000}
                                                step={step}
                                                onChange={this.handlePriceChange}
                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                            />,
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label={t.t("Amount")}>
                                        {getFieldDecorator("amount", {
                                            initialValue: 1,
                                            rules: [{
                                                required: true,
                                            }],
                                        })(
                                            <InputNumber
                                                onChange={this.handleAmountChange}
                                                placeholder={this.props.fromSymbol}
                                                min={0}
                                                max={10000000000}
                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                            />,
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label={t.t("Total")}>
                                        <Ex fixFloatNum={floatNumbers} value={this.state.total} stockStyle={false} />
                                    </FormItem>
                                    <FormItem>
                                        <Button className="buy-btn" type="primary" htmlType="submit" >
                                            {t.t("Buy ") + t.t(config.currencies[this.props.fromSymbol].name)}
                                        </Button>
                                    </FormItem>
                                </Form>
                            </Block>
                        </Col>
                        <Col md={12}>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
        );
    }
}

export default Form.create()(PlaceOrderComponent);
