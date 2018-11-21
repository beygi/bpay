/**
 * @module Components/LimitedPlaceOrderComponent
 */
import { Button, Form, InputNumber, notification } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as _ from "lodash";
import * as React from "react";
import Ex from "../../components/ExchangeValue";
import Block from "../../components/Holder";
import config from "../../config";
import Tools from "../../services/tools";
import t from "../../services/trans/i18n";
import "./style.less";

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
    /** buy or sell */
    type: string;
}

interface IState {
    /** holds total value of order */
    total?: number;
    type?: string;
}

/**
 * place order component, users can set bids for buy or sell
 */
class LimitedPlaceOrderComponent extends React.Component<IPlaceProps, IState> {

    constructor(props: IPlaceProps) {
        super(props);
        const priceFloatedNums = config.marketsOptions[`${this.props.fromSymbol}:${this.props.toSymbol}`].priceFloatedNums;
        this.state = {
            total: _.round(Tools.getPrice(this.props.fromSymbol, this.props.toSymbol), priceFloatedNums),
            type: (this.props.type === "sell") ? t.t("Sell") : t.t("Buy"),
        };

        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
    }

    public componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.fromSymbol !== prevProps.fromSymbol || this.props.toSymbol !== prevProps.toSymbol) {
            const priceFloatedNums = config.marketsOptions[`${this.props.fromSymbol}:${this.props.toSymbol}`].priceFloatedNums;
            this.props.form.setFieldsValue({
                price: _.round(Tools.getPrice(this.props.fromSymbol, this.props.toSymbol), priceFloatedNums),
                amount: 1,
            });
            this.setState({ total: _.round(Tools.getPrice(this.props.fromSymbol, this.props.toSymbol), priceFloatedNums) });
        }
    }

    public handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                notification.success({
                    message: t.t("{type} request").replace("{type}", this.state.type),
                    description: t.t("{type} request places successfully").replace("{type}", this.state.type),
                    placement: "bottomRight",
                });
            }

        });
    }

    /** amount and price field validator */
    public checkPrice = (rule, value, callback) => {
        if (value > 0) {
            callback();
        }
        callback(t.t("please input number"));
        return;
    }

    public handlePriceChange(value, floats) {
        this.setState({ total: _.round(this.props.form.getFieldValue("amount") * value, floats) });
    }

    public handleAmountChange(value, floats) {
        this.setState({ total: _.round(this.props.form.getFieldValue("price") * value, floats) });
    }

    public render() {
        const { getFieldDecorator } = this.props.form;
        const priceStep = config.marketsOptions[`${this.props.fromSymbol}:${this.props.toSymbol}`].priceStep;
        const amountStep = config.marketsOptions[`${this.props.fromSymbol}:${this.props.toSymbol}`].amountStep;
        const priceFloatedNums = config.marketsOptions[`${this.props.fromSymbol}:${this.props.toSymbol}`].priceFloatedNums;
        return (
            <Block className="limited-place-order">
                <h3>{t.t(`${this.state.type} `) + t.t(config.currencies[this.props.fromSymbol].name)}</h3>
                <Form onSubmit={this.handleSubmit} className="limited-form">
                    <FormItem {...formItemLayout} label={t.t("Price")}>
                        {getFieldDecorator("price", {
                            initialValue: _.round(Tools.getPrice(this.props.fromSymbol, this.props.toSymbol), priceFloatedNums),
                            rules: [{
                                required: true,
                                validator: this.checkPrice,
                            }],
                        })(
                            <InputNumber
                                placeholder={this.props.toSymbol}
                                min={0}
                                max={10000000000}
                                step={priceStep}
                                onChange={(value) => { this.handlePriceChange(value, priceFloatedNums); }}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            />,
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={t.t("Amount")}>
                        {getFieldDecorator("amount", {
                            initialValue: 1,
                            rules: [{
                                required: true,
                                validator: this.checkPrice,
                            }],
                        })(
                            <InputNumber
                                onChange={(value) => { this.handleAmountChange(value, priceFloatedNums); }}
                                placeholder={this.props.fromSymbol}
                                min={0}
                                max={10000000000}
                                step={amountStep}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            />,
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={t.t("Total")}>
                        {getFieldDecorator("total", {
                            initialValue: this.state.total || 0,
                            rules: [{
                                required: true,
                                validator: this.checkPrice,
                            }],
                        })(
                            <InputNumber
                                placeholder={this.props.fromSymbol}
                                min={0}
                                max={10000000000}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            />,
                        )}
                    </FormItem>
                    {/* <FormItem {...formItemLayout} label={t.t("Total")}>
                        <Ex fixFloatNum={floatNumbers} value={this.state.total || 0} stockStyle={false} /> {t.t(this.props.toSymbol)}
                    </FormItem> */}
                    <FormItem>
                        <Button className={`${this.props.type}-btn`} type="primary" htmlType="submit" >
                            {t.t(`${this.state.type} `) + t.t(config.currencies[this.props.fromSymbol].name)}
                        </Button>
                    </FormItem>
                </Form>
            </Block>
        );
    }
}

export default Form.create()(LimitedPlaceOrderComponent);
