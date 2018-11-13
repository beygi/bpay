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
            <Tabs defaultActiveKey="1" >
                <TabPane tab={t.t("Limit")} key="1">
                    <Row gutter={8}>
                        <Col md={12}>
                            <LimitedPlaceOrderComponent fromSymbol={this.props.fromSymbol} toSymbol={this.props.toSymbol} type="buy" />
                        </Col>
                        <Col md={12}>
                            <LimitedPlaceOrderComponent fromSymbol={this.props.fromSymbol} toSymbol={this.props.toSymbol} type="sell" />
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
        );
    }
}

export default Form.create()(PlaceOrderComponent);
