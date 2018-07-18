import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Layout, Row } from "antd";
import * as React from "react";
import {connect} from "react-redux";
import Balance from "../../../components/Balance";
import Profile from "../../../components/DashboardHeaderProfile";
import Block from "../../../components/Holder";
import Guide from "../../../components/UserStatusGuide";
import {setUser} from "../../../redux/app/actions";
import {IRootState} from "../../../redux/reducers";
import t from "../../../services/trans/i18n";
import "./style.less";

interface IProps {
    user: any;
}

interface IState {
    user: any;
}

class AdminDashboardContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <Row gutter={8}>
              <Col md={6} >
                  <Block>
                      <img src="https://dummyimage.com/600x400/4c4649/3ee6e0.png" alt=""/>
                  </Block>
                  <Block collapse>
                          <img src="https://dummyimage.com/600x600/4c4649/3ee6e0.png" alt=""/>
                  </Block>
              </Col>
              <Col md={18} >
                  <Row gutter={8}>
                        <Col md={6} >
                            <Block title={t.t("Hot storage")} icon={<FontAwesomeIcon className="hot-storage" icon={ ["fas", "box"] } /> } iconPosition="right">
                                <Balance />
                            </Block>
                        </Col>
                        <Col md={6} >
                            <Block title={t.t("Cold storage")}  icon={<FontAwesomeIcon  className="cold-storage" icon={ ["fas", "box"] } /> } iconPosition="right">
                                <Balance />
                            </Block>
                        </Col>
                        <Col md={6} >
                            <Block title={t.t("Tax Cash Desk")}  icon={<FontAwesomeIcon  icon={ ["fas", "box"] } /> }  iconPosition="right">
                                <Balance />
                            </Block>
                        </Col>
                        <Col md={6} >
                            <Block title={t.t("Fee Cash Desk")}   icon={<FontAwesomeIcon  icon={ ["fas", "box"] } /> }  iconPosition="right" transparent>
                                <Balance />
                            </Block>
                        </Col>
                  </Row>
                   <Block>
                       <img src="https://dummyimage.com/1000x300/4c4649/3ee6e0.png" alt=""/>
                   </Block>
              </Col>
            </Row>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        user: (user) => dispatch(setUser({user})),
    };
}

function mapStateToProps(state: IRootState) {
    return {
        user: state.app.user,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboardContainer);
