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
                  <Block>
                          <img src="https://dummyimage.com/600x800/4c4649/3ee6e0.png" alt=""/>
                  </Block>
              </Col>
              <Col md={18} >
                  <Row gutter={8}>
                        <Col md={6} >
                            <Block title={t.t("Hot storage")} >
                                <Balance />
                            </Block>
                        </Col>
                        <Col md={6} >
                            <Block collapse title={t.t("Cold storage")} >
                                <Balance />
                            </Block>
                        </Col>
                        <Col md={6} >
                            <Block collapse title={t.t("Tax Cash Desk")} >
                                <Balance />
                            </Block>
                        </Col>
                        <Col md={6} >
                            <Block collapse title={t.t("Fee Cash Desk")} >
                                <Balance />
                            </Block>
                        </Col>
                  </Row>
                   <Block>
                       <img src="https://dummyimage.com/100x300/4c4649/3ee6e0.png" alt=""/>
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
