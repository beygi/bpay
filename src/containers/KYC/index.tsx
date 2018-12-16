import { Col, Row } from "antd";
import * as React from "react";
import GatewayInformation from "../../components/GatewayInformation";
import Block from "../../components/Holder";
import Kyc from "../../components/KYC";
import "./style.less";

interface IProps {
    match?: any;
}

interface IState {
}

class KycContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <Row gutter={8}>
                <Col md={8} >
                    <Block>
                        <GatewayInformation />
                    </Block>
                </Col>
                <Col md={16} >
                    <Kyc />
                </Col>
            </Row >
        );
    }
}

export default KycContainer;
