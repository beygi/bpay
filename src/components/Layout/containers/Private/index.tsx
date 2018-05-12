import { Layout } from "antd";
import * as React from "react";
import HeaderComponent from "./../../../Header";
import Sidebar from "./../../../Sidebar";
import "./style.less";

const { Sider, Content } = Layout;

interface IProps {
    children: JSX.Element;
}

interface IState {
    collapsed: boolean;
}

export default class PrivateLayout extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            collapsed: false,
        };
    }

    public render() {
        return (
            <Layout style={{ minHeight: "100vh" }}>
                <Layout>
                    <HeaderComponent />
                    <Content>
                        {this.props.children}
                    </Content>
                </Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    width="300"
                    className="sidebar-wrapper"
                >
                    <Sidebar collapsed={this.state.collapsed} />
                </Sider>
            </Layout>
        );
    }

    private toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
}
