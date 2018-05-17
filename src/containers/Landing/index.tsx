import { Button } from "antd";
import * as React from "react";
import { Redirect } from "react-router";
import USER from "./../../lib/user";
import "./style.less";
const logo = require("../../assets/images/logo.png");

const user = USER.getInstance();
import { Breadcrumb, Layout, Menu } from "antd";
const { Header, Footer, Sider, Content } = Layout;

interface IProps {
}

interface IState {
}

class LandingContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.login = this.login.bind(this);
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
                    <Header className="header">
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={["2"]}
                            style={{ lineHeight: "64px" }}
                        >
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Header>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
</Layout>
                );
                    }

    private login() {
                    user.keycloak.login();
                }
            }

export default LandingContainer;
