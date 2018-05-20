import * as React from "react";
import { Redirect } from "react-router";
import USER from "./../../lib/user";
import "./style.less";
const logo = require("../../assets/images/logo.png");

const user = USER.getInstance();
import { Breadcrumb, Button, Icon , Layout, Menu } from "antd";
const { Header, Footer, Sider, Content } = Layout;

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
                              <Button onClick={this.login} className="startButton" type="primary" size="large">
                                   Get Started <Icon type="right" />
                              </Button>
                              <br />
                              <div className="already-memeber">
                                  already memeber?
                                      <a className="signin" onClick={this.register}>sign in</a>
                              </div>
                          </div>
                </div>
                <Footer>
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
