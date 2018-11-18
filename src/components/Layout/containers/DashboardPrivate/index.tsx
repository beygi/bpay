/**
 * @module Components/Layout/DashboardPrivateLayout
 */
import { Layout } from "antd";
import * as React from "react";

import DashboardHeaderComponent from "./../../../DashboardHeader";
import DashboardMenuComponent from "./../../../DashboardMenu";

import "./style.less";

const { Sider, Content } = Layout;

interface IProps {
    /** react element which is filled the layout */
    children: JSX.Element;
    /** specify admin status */
    isAdmin: boolean;
}

interface IState {
    collapsed: boolean;
    menuClass: string; // normal or mini
}

/**
 * private layout to represent pages that needs a loggined user
 */
export default class DashboardPrivateLayout extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.handleScroll = this.handleScroll.bind(this);

        this.state = {
            collapsed: false,
            menuClass: "normal-menu",
        };
    }

    public handleScroll(event) {
        console.log(event.pageY);
        if (event.pageY > 25) {
            this.setState({
                menuClass: "mini-menu",
            });
        } else {
            this.setState({
                menuClass: "normal-menu",
            });
        }
    }

    public render() {
        console.log(this.props);
        let AdminClass: string = this.state.menuClass;
        if (this.props.isAdmin) {
            AdminClass = "admin-menu " + this.state.menuClass;
        }
        return (
            <Layout className={`${AdminClass} ${this.props.children.props.location.pathname.split("/")[1]}-page`} style={{ minHeight: "100vh" }}>
                <DashboardMenuComponent isAdmin={this.props.isAdmin} />
                <Layout id="privateContent" className="private-content">
                    <DashboardHeaderComponent isAdmin={this.props.isAdmin} />
                    <Content>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>;
        )
    }

    private toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
}
