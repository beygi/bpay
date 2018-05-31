import { Col, Layout, Row } from "antd";
import * as React from "react";
import {connect} from "react-redux";
import Profile from "../../components/DashboardHeaderProfile";
import Block from "../../components/Holder";
import {setUser} from "../../redux/app/actions";
import {IRootState} from "../../redux/reducers";

interface IProps {
    user: any;
}

interface IState {
    user: any;
}

class DashboardContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <Row gutter={8}>
              <Col md={6} >
                  <Block>
                          <Profile></Profile>
                  </Block>
                  <Block>
                          <Profile></Profile>
                  </Block>
                  <Block>
                          <Profile></Profile>
                  </Block>
              </Col>
              <Col md={18} >
                    <Block>
                            <Profile></Profile>
                    </Block>
                    <Block>
                            <Profile></Profile>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
