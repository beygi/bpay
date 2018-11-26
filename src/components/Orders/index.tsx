/**
 * @module Components/OrdersComponent
 */
import { Col, Form, Row, Tabs } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as _ from "lodash";
import * as React from "react";
import t from "../../services/trans/i18n";
import Block from "../Holder";
import MarketTrades from "../MarketTrades";
import "./style.less";

const TabPane = Tabs.TabPane;
interface IPlaceProps extends FormComponentProps {
    /** origin symbol */
    fromSymbol: string;
    /** target symbol */
    toSymbol: string;
}

interface IState {
}

/**
 * place order component, users can set bids for buy or sell
 */
class OrdersComponent extends React.Component<IPlaceProps, IState> {

    constructor(props: IPlaceProps) {
        super(props);
    }

    public render() {
        return (
            <Tabs defaultActiveKey="1" animated={false} >
                <TabPane tab={t.t("Orders")} key="1">
                    <Block className="user-orders">
                        <MarketTrades from={this.props.fromSymbol} to={this.props.toSymbol} />
                    </Block>
                </TabPane>
                <TabPane tab={t.t("Order history")} key="2">
                    <Block className="order-history">
                        <MarketTrades from={this.props.fromSymbol} to={this.props.toSymbol} />
                    </Block>
                </TabPane>
            </Tabs>
        );
    }
}

export default Form.create()(OrdersComponent);
