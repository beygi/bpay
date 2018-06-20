import { Col, Layout, Row } from "antd";
import * as React from "react";
import {connect} from "react-redux";
import Profile from "../../components/DashboardHeaderProfile";
import Block from "../../components/Holder";
import Guide from "../../components/UserStatusGuide";
import {setUser} from "../../redux/app/actions";
import {IRootState} from "../../redux/reducers";

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
                  </Block>
                  <Block>
                  </Block>
              </Col>
              <Col md={18} >
                   <Block>
                        Admin Dashboard
                   </Block>
                    <Block>
                    </Block>
                    <Block>
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
