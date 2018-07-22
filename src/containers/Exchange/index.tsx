import { Col, Layout, Row } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import Profile from "../../components/DashboardHeaderProfile";
import Block from "../../components/Holder";
import Guide from "../../components/UserStatusGuide";
import { setUser } from "../../redux/app/actions";
import { IRootState } from "../../redux/reducers";
import "./style.less";

interface IProps {
}

interface IState {
}

class ExchangeContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <Row gutter={8}>
                <Col md={6} >
                    <Block>
                        <img src="https://dummyimage.com/600x800/4c4649/3ee6e0.png" alt=""/>
                    </Block>
                    <Block>
                        <img src="https://dummyimage.com/600x200/4c4649/3ee6e0.png" alt=""/>
                    </Block>
                </Col>
                <Col md={12} >
                <Row gutter={8}>
                        <Col md={24} className="trading-view">
                                <TradingViewWidget
                                    symbol="BITFINEX:BTCUSD"
                                    theme={Themes.DARK}
                                    autosize
                                />

                        </Col>
                        <Col md={24} className="trading-view">
                            <Block>
                                <img src="https://dummyimage.com/1000x200/4c4649/3ee6e0.png" alt=""/>
                            </Block>
                        </Col>
                    </Row>
                </Col>
                <Col md={6} >
                    <Block>
                        <img src="https://dummyimage.com/600x800/4c4649/3ee6e0.png" alt=""/>
                    </Block>
                    <Block>
                        <img src="https://dummyimage.com/600x200/4c4649/3ee6e0.png" alt=""/>
                    </Block>
                </Col>
            </Row>
        );
    }
}

export default ExchangeContainer;
