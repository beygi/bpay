import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Layout, Row } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Balance from "../../components/Balance";
import Profile from "../../components/DashboardHeaderProfile";
import Deposit from "../../components/Deposit";
import History from "../../components/DepositHistory";
import Block from "../../components/Holder";
import { setUser } from "../../redux/app/actions";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";

import "./style.less";

interface IProps {
}

interface IState {
}

class DepositContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <Row gutter={8}>
                <Col md={6} >
                    <Block className="user-balance" collapse title="Balance" icon={<FontAwesomeIcon icon={["fas", "balance-scale"]} />} iconPosition="right" >
                        <Balance />
                    </Block>
                </Col>
                <Col md={12} >
                    <Row gutter={8}>
                        <Col md={24} className="">
                            <Block title={t.t("View wallet address")} icon={<FontAwesomeIcon icon={["fas", "wallet"]} />} >
                                <Deposit />
                            </Block>
                        </Col>
                    </Row>
                </Col>
                <Col md={6} >
                    <Block title={t.t("Deposit history")} icon={<FontAwesomeIcon icon={["fas", "history"]} />}  >
                            <History />
                    </Block>
                </Col>
            </Row>
        );
    }
}

export default DepositContainer;
