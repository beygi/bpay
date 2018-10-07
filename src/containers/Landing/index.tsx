import * as React from "react";
import { Redirect } from "react-router";
import USER from "./../../lib/user";
import "./style.less";
const logo = require("../../assets/images/logo.png");

const home1 = require("../../assets/images/home1.png");
const home2 = require("../../assets/images/home2.png");
const home3 = require("../../assets/images/home3.png");

const user = USER.getInstance();
import { Breadcrumb, Button, Card, Col, Icon, Layout, Menu, Row, Tooltip } from "antd";
const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;

interface IProps {
}

interface IState {
}

class LandingContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    public render() {
        if (user.getCurrent()) {
            return (
                <Redirect to="/dashboard" />
            );
        }
        return (
            <div>Becopay</div>
            // <Layout>
            //     <div className="header-logo">
            //         <img src={logo} />
            //     </div>
            //     <div className="top-menu">
            //         <a className="exchange" href="">Exchange</a>
            //         <a href="">FAQ</a>
            //         <a href="">SUPPORT</a>
            //         <a href="">ABOUT US</a>
            //     </div>
            //     <div className="landing-content">
            //         <h1>B2B Market Place</h1>
            //         <div className="login-signin">
            //             <Button onClick={this.register} className="startButton" type="primary" size="large">
            //                 Get Started <Icon type="right" />
            //             </Button>
            //             <br />
            //             <div className="already-memeber">
            //                 already memeber?
            //                           <a className="signin" onClick={this.login}>sign in</a>
            //             </div>
            //         </div>
            //     </div>
            //     <Content className="hero">
            //
            //         <Row gutter={16}>
            //             <Col xs={24} md={8}>
            //
            //                 <Card
            //                     cover={<img alt="example" src={home1} />}
            //                     hoverable title="Fast Trading" >
            //                 </Card>
            //             </Col>
            //             <Col xs={24} md={8}>
            //
            //                 <Card
            //                     cover={<img alt="example" src={home2} />}
            //                     hoverable title="Find Best Sellers" >
            //                 </Card>
            //             </Col>
            //             <Col xs={24} md={8}>
            //
            //                 <Card
            //                     cover={<img alt="example" src={home3} />}
            //                     hoverable title="Buy high quality products" >
            //                 </Card>
            //             </Col>
            //         </Row>
            //     </Content>
            //     <Footer>
            //         <Row gutter={16}>
            //             <Col sm={24} md={12}>
            //                 <h1><Icon type="user" /> Who we are ?</h1>
            //                 Hello, we are the worldwide stock exchange. A market where
            //                  anyone from anywhere can invest in any business worldwide
            //                   using cryptocurrencies (BTC, ETH, NXT, and others) or fiat money.
            //                 </Col>
            //             <Col sm={24} md={12}>
            //                 <h1><Icon type="wallet" /> What we do ?</h1>
            //                 Imagine you can invest in Chinese manufacturing or a Brazilian sawmill
            //                  without papers in just minutes. Imagine anybody can invest in your business too.
            //                   On this worldwide stock exchange market, businesses can issue their stocks, assets,
            //                    or tokens on major established crypto platforms (NXT, ARDOR, ETH, etc.), sell them,
            //                     do business, and pay dividends to stock holders in just one click.ney.
            //                 </Col>
            //         </Row>
            //         <Row className="socials" type="flex" justify="center" gutter={16}>
            //             <Col md={2}>
            //                 <Tooltip placement="top" title="Twitter">
            //                     <a href=""><Icon type="twitter" /></a>
            //                 </Tooltip>
            //             </Col>
            //             <Col md={2}>
            //                 <Tooltip placement="top" title="Email">
            //                     <a href=""><Icon type="mail" /></a>
            //                 </Tooltip>
            //             </Col>
            //             <Col md={2}>
            //                 <Tooltip placement="top" title="Api Doc">
            //                     <a href=""><Icon type="api" /></a>
            //                 </Tooltip>
            //             </Col>
            //         </Row>
            //         <Row gutter={16}>
            //             <Col className="copyright" md={24}>
            //                 B2B Corporation © 2018
            //              </Col>
            //         </Row>
            //
            //     </Footer>
            // </Layout>
        );
    }

    private login() {
        user.keycloak.login();
    }

    private register() {
        user.keycloak.register();
    }
}

export default LandingContainer;
