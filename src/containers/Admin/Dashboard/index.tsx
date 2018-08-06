import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Layout, Row } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import Balance from "../../../components/Balance";
import Profile from "../../../components/DashboardHeaderProfile";
import Gauge from "../../../components/Gauge";
import Block from "../../../components/Holder";
import Guide from "../../../components/UserStatusGuide";
import config from "../../../config";
import { setUser } from "../../../redux/app/actions";
import { IRootState } from "../../../redux/reducers";
import t from "../../../services/trans/i18n";
import "./style.less";

interface IProps {
}

interface IState {
}

class AdminDashboardContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <Row gutter={8}>
                <Col md={6} >
                    <Block title={t.t("Hot storage")} icon={<FontAwesomeIcon className="hot-storage" icon={["fab", "gripfire"]} />} >
                        <Balance />
                    </Block>
                    <Block title={t.t("Cold storage")} icon={<FontAwesomeIcon className="cold-storage" icon={["fas", "snowflake"]} />} >
                        <Balance />
                    </Block>
                    <Block title={t.t("Tax Cash Desk")} icon={<FontAwesomeIcon icon={["fas", "box"]} />} >
                        <Balance />
                    </Block>
                    <Block title={t.t("Fee Cash Desk")} icon={<FontAwesomeIcon icon={["fas", "box"]} />}  >
                        <Balance />
                    </Block>
                </Col>
                <Col md={18} >
                    <Row gutter={8}>
                        <Col md={24}>
                            <Block>
                                <Row gutter={8}>
                                    <Col md={6}>
                                        BTC
                                </Col>
                                    <Col md={6}>
                                        <Gauge to={config.currencies.ETH.name}  />
                                    </Col>
                                    <Col md={6}>
                                        <Gauge to={config.currencies.LTC.name} />
                                    </Col>
                                    <Col md={6}>
                                        <Gauge to={config.currencies.USD.name}  />
                                    </Col>
                                </Row>
                            </Block>
                        </Col>
                    </Row>
                    <Block>
                        <img src="https://dummyimage.com/1000x300/4c4649/3ee6e0.png" alt="" />
                    </Block>
                </Col>
            </Row>
        );
    }
}

export default AdminDashboardContainer;
