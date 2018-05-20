import * as React from "react";
import { Redirect } from "react-router";
import USER from "./../../lib/user";
import "./style.less";
const logo = require("../../assets/images/logo.png");

const user = USER.getInstance();
import { Breadcrumb, Button, Card, Col, Icon, Layout, Menu, Row } from "antd";
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

            <Layout>
                <div className="header-logo">
                    <img src={logo} />
                </div>
                <div className="top-menu">
                    <a href="">FAQ</a>
                    <a href="">SUPPORT</a>
                    <a href="">ABOUT US</a>
                </div>
                <div className="landing-content">
                    <h1>B2B MARKET PLACE</h1>
                    <div className="login-signin">
                        <Button onClick={this.register} className="startButton" type="primary" size="large">
                            Get Started <Icon type="right" />
                        </Button>
                        <br />
                        <div className="already-memeber">
                            already memeber?
                                      <a className="signin" onClick={this.login}>sign in</a>
                        </div>
                    </div>
                </div>
                <Footer>

                    <Row  gutter={16}>
                        <Col xs={24} md={8}>

                            <Card
                                cover={<img alt="example" src="https://static.giantbomb.com/uploads/scale_super/9/93998/2238069-tfjlg.png" />}
                                hoverable title="Card title" >
                            </Card>
                        </Col>
                        <Col xs={24} md={8}>

                            <Card
                                cover={<img alt="example" src="https://i.pinimg.com/originals/17/5e/ce/175ececbf3de2a05b400178d478aa075.jpg" />}
                                hoverable title="Card title" >
                            </Card>
                        </Col>
                        <Col xs={24} md={8}>

                            <Card
                                cover={<img alt="example" src="http://2.bp.blogspot.com/-ZxJraKZRso4/T9_6vUVbjVI/AAAAAAAAGEs/f2eaWi5OHow/s1600/W&HM+-+Tekken+Girls+@+2012+E3+(244).JPG" />}
                                hoverable title="Card title" >
                            </Card>
                        </Col>
                    </Row>

                    Hello, we are the worldwide stock exchange. A market where
                     anyone from anywhere can invest in any business worldwide
                      using cryptocurrencies (BTC, ETH, NXT, and others) or fiat money.
                      Imagine you can invest in Chinese manufacturing or a Brazilian sawmill
                       without papers in just minutes. Imagine anybody can invest in your business too.
                        On this worldwide stock exchange market, businesses can issue their stocks, assets,
                         or tokens on major established crypto platforms (NXT, ARDOR, ETH, etc.), sell them,
                          do business, and pay dividends to stock holders in just one click.
                </Footer>
            </Layout>
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
