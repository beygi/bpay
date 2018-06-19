import { Layout } from "antd";
import * as React from "react";

import DashboardHeaderComponent from "./../../../DashboardHeader";
import DashboardMenuComponent from "./../../../DashboardMenu";
// import Sidebar from "./../../../Sidebar";
import "./style.less";

const { Sider, Content } = Layout;

interface IProps {
    children: JSX.Element;
    isAdmin: boolean;
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
        let AdminClass: string = "";
        if (this.props.isAdmin) {
            AdminClass = "admin-menu";
        }
        return (
            <Layout className={AdminClass} style={{ minHeight: "100vh" }}>
                <DashboardMenuComponent  isAdmin={this.props.isAdmin} />
                <Layout id="privateContent" className="private-content">
                    <DashboardHeaderComponent isAdmin={this.props.isAdmin}  />
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
