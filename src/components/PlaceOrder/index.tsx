import { Col, Row, Tabs } from "antd";
import * as React from "react";

import { connect } from "react-redux";
import Block from "../../components/Holder";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import "./style.less";

const TabPane = Tabs.TabPane;

interface IProps {
    fromSymbol: string;
    toSymbol: string;
}

interface IState {
}

class PlaceOrderComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <Tabs defaultActiveKey="1" >
                <TabPane tab={t.t("Limit")} key="1">
                    <Row gutter={8}>
                        <Col md={12}>
                            <Block>
                                Sell
                            </Block>
                        </Col>
                        <Col md={12}>
                            <Block>
                                Buy
                            </Block>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane  tab={t.t("Market")} key="2">Content of Tab Pane 2</TabPane>
              </Tabs>
        );
    }
}

export default PlaceOrderComponent;
