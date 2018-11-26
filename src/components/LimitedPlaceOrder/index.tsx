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
// for translation purposes
const types = [t.t("buy"), t.t("sell")];
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

interface IProps extends FormComponentProps {
    /** origin symbol */
    fromSymbol: string;
    /** target symbol */
    toSymbol: string;
    /** buy or sell */
    type: string;
    /** limit or market */
    exchangeType?: "limit" | "market";
}

interface IState {
    /** holds total value of the order */
    total?: number;
    /** holds price value of the order */
    price?: number;
    /** holds amount value of the order */
    amount?: number;
}

/**
 * place order component, users can set bids for buy or sell
 */
class LimitedPlaceOrderComponent extends React.Component<IProps, IState> {
    public static defaultProps: Partial<IProps> = {
        exchangeType: "limit",
    };

    constructor(props: IProps) {
        super(props);
        const priceFloatedNums = config.marketsOptions[`${this.props.fromSymbol}:${this.props.toSymbol}`].priceFloatedNums;
        const currentPrice = _.round(Tools.getPrice(this.props.fromSymbol, this.props.toSymbol), priceFloatedNums);
        this.state = {
            total: currentPrice,
            price: currentPrice,
        };

        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleTotalChange = this.handleTotalChange.bind(this);
    }

    public componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.fromSymbol !== prevProps.fromSymbol || this.props.toSymbol !== prevProps.toSymbol) {
            const priceFloatedNums = config.marketsOptions[`${this.props.fromSymbol}:${this.props.toSymbol}`].priceFloatedNums;
            const currentPrice = _.round(Tools.getPrice(this.props.fromSymbol, this.props.toSymbol), priceFloatedNums);
            this.setState({
                total: currentPrice,
                price: currentPrice,
                amount: 2,
            });
            this.props.form.resetFields(["amount", "price", "total"]);
        }
    }

    public handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                notification.success({
                    message: t.t("{type} request").replace("{type}", t.t(this.props.type)),
                    description: t.t("{type} request places successfully").replace("{type}", t.t(this.props.type)),
                    placement: "bottomRight",
                });
            }

        });
    }

    /** amount and price field validator */
    public checkPrice = (rule, value, callback) => {
        console.log("CHECK");
        if (value > 0) {
            callback();
        }
        callback(t.t("please input number"));
        return;
    }

    public handlePriceChange(value, floats) {
        this.setState({
            total: _.round(this.props.form.getFieldValue("amount") * value, floats),
            price: value,
        });
        this.props.form.resetFields(["total"]);
    }

    public handleAmountChange(value, floats) {
        this.setState({
            total: _.round(this.props.form.getFieldValue("price") * value, floats),
            amount: value,
        });
        this.props.form.resetFields(["total"]);
    }

    public handleTotalChange(value, floats) {
        // this.setState({ total: _.round(this.props.form.getFieldValue("price") * value, floats) });
        this.setState({
            amount: _.round(value / this.state.price, 10),
            total: value,
        });
        this.props.form.resetFields(["amount"]);
    }

    public render() {
        const { getFieldDecorator } = this.props.form;
        const priceStep = config.marketsOptions[`${this.props.fromSymbol}:${this.props.toSymbol}`].priceStep;
        const amountStep = config.marketsOptions[`${this.props.fromSymbol}:${this.props.toSymbol}`].amountStep;
        const priceFloatedNums = config.marketsOptions[`${this.props.fromSymbol}:${this.props.toSymbol}`].priceFloatedNums;
        return (
            <Block className="limited-place-order">
                <h3>{`${t.t(this.props.type)} ` + t.t(config.currencies[this.props.fromSymbol].name)}</h3>
                <Form onSubmit={this.handleSubmit} className="limited-form">
                    {(this.props.exchangeType === "limit") ?
                        <FormItem {...formItemLayout} label={t.t("Price")}>
                            {getFieldDecorator("price", {
                                initialValue: (this.props.exchangeType === "limit") ? this.state.price || 0 : "Market",
                                rules: [{
                                    required: true,
                                    validator: this.checkPrice,
                                }],
                            })(
                                <InputNumber
                                    placeholder={this.props.toSymbol}
                                    size="small"
                                    min={0}
                                    max={10000000000}
                                    step={priceStep}
                                    onChange={(value) => { this.handlePriceChange(value, priceFloatedNums); }}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                />,
                            )}
                        </FormItem> :
                        <FormItem required {...formItemLayout} label={t.t("Price")}>
                            {`${t.t("Market price")}`}
                        </FormItem>
                    }
                    <FormItem {...formItemLayout} label={t.t("Amount")}>
                        {getFieldDecorator("amount", {
                            initialValue: this.state.amount || 1,
                            rules: [{
                                required: true,
                                validator: this.checkPrice,
                            }],
                        })(
                            <InputNumber
                                onChange={(value) => { this.handleAmountChange(value, priceFloatedNums); }}
                                placeholder={this.props.fromSymbol}
                                size="small"
                                min={0}
                                max={10000000000}
                                step={amountStep}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            />,
                        )}
                    </FormItem>
                    {
                        (this.props.exchangeType === "limit") ?
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
                                        onChange={(value) => { this.handleTotalChange(value, priceFloatedNums); }}
                                        size="small"
                                        min={0}
                                        max={10000000000}
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    />,
                                )}
                            </FormItem> :
                            <FormItem  {...formItemLayout} >
                                <span></span>
                            </FormItem>
                    }
                    {/* <FormItem {...formItemLayout} label={t.t("Total")}>
                        <Ex value={this.state.total || 0} stockStyle={false} /> {t.t(this.props.toSymbol)}
                    </FormItem> */}
                    <FormItem>
                        <Button size="small" className={`${this.props.type}-btn`} type="primary" htmlType="submit" >
                            {`${t.t(this.props.type)} ` + t.t(config.currencies[this.props.fromSymbol].name)}
                        </Button>
                    </FormItem>
                </Form>
            </Block>
        );
    }
}

export default Form.create()(LimitedPlaceOrderComponent);
