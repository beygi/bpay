import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Layout, Row } from "antd";
import * as React from "react";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import Balance from "../../components/Balance";
import Profile from "../../components/DashboardHeaderProfile";
import Block from "../../components/Holder";
import Live from "../../components/Live";
import Guide from "../../components/UserStatusGuide";
import {setUser} from "../../redux/app/actions";
import {IRootState} from "../../redux/reducers";
import "./style.less";

interface IProps {
}

interface IState {
}

class DashboardContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <Row gutter={8}>
              <Col md={6} >
                  <Block className="user-balance" collapse title="Balance" icon={<FontAwesomeIcon  icon={ ["fas", "balance-scale"] }  />} iconPosition="right" >
                      <Balance />
                      <Link to="/deposit">
                          <Button  className="action"  type="primary" size="small">Deposit</Button>
                      </Link>
                  </Block>
                      <Block collapse title="Live prices" icon={<FontAwesomeIcon  icon={ ["fas", "chart-line"] }  />} iconPosition="right" >
                         <Live />
                     </Block>
              </Col>
              <Col md={18} >
                   <Block>
                       <Guide />
                   </Block>
                    <Block>
                            <img src="https://dummyimage.com/1000x500/4c4649/3ee6e0.png" alt=""/>
                    </Block>
              </Col>
            </Row>
        );
    }
}

export default DashboardContainer;
