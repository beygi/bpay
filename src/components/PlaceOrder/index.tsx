/**
 * @module Components/PlaceOrderComponent
 */
import { Col, Form, Row, Tabs } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as _ from "lodash";
import * as React from "react";
import LimitedPlaceOrderComponent from "../../components/LimitedPlaceOrder";
import t from "../../services/trans/i18n";
import "./style.less";

const TabPane = Tabs.TabPane;
interface IPlaceProps extends FormComponentProps {
    /** origin symbol */
    fromSymbol: string;
    /** target symbol */
    toSymbol: string;
    /** display kyc modal */
    kycModal: () => void;
}

interface IState {
}

/**
 * place order component, users can set bids for buy or sell
 */
class PlaceOrderComponent extends React.Component<IPlaceProps, IState> {

    constructor(props: IPlaceProps) {
        super(props);
    }

    public render() {
        return (
            <Tabs animated={false} defaultActiveKey="1" >
                <TabPane tab={t.t("Limit")} key="1">
                    <Row gutter={4}>
                        <Col md={12}>
                            <LimitedPlaceOrderComponent kycModal={this.props.kycModal} fromSymbol={this.props.fromSymbol} toSymbol={this.props.toSymbol} type="buy" />
                        </Col>
                        <Col md={12}>
                            <LimitedPlaceOrderComponent kycModal={this.props.kycModal} fromSymbol={this.props.fromSymbol} toSymbol={this.props.toSymbol} type="sell" />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tab={t.t("Market price")} key="2">
                    <Row gutter={4}>
                        <Col md={12}>
                            <LimitedPlaceOrderComponent kycModal={this.props.kycModal} exchangeType="market" fromSymbol={this.props.fromSymbol} toSymbol={this.props.toSymbol} type="buy" />
                        </Col>
                        <Col md={12}>
                            <LimitedPlaceOrderComponent kycModal={this.props.kycModal} exchangeType="market" fromSymbol={this.props.fromSymbol} toSymbol={this.props.toSymbol} type="sell" />
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
        );
    }
}

export default Form.create()(PlaceOrderComponent);
