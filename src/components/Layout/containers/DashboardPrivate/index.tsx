import { Layout } from "antd";
import * as React from "react";
import DashboardHeaderComponent from "./../../../DashboardHeader";
// import Sidebar from "./../../../Sidebar";
import "./style.less";

const { Sider, Content } = Layout;

interface IProps {
    children: JSX.Element;
}

interface IState {
    collapsed: boolean;
}

export default class DashboardPrivateLayout extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            collapsed: false,
        };
    }

    public render() {
        return (
            <Layout  style={{ minHeight: "100vh" }}>
                <Layout className="private-content">
                    <DashboardHeaderComponent />
                    <Content>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }

    private toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
}
