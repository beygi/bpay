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
    menuClass: string; // normal or mini
}

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

    // public componentDidMount() {
    //     window.addEventListener("scroll", this.handleScroll);
    // }
    //
    // public componentWillUnmount() {
    //     window.removeEventListener("scroll", this.handleScroll);
    // }

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
        let AdminClass: string = this.state.menuClass;
        if (this.props.isAdmin) {
            AdminClass = "admin-menu " + this.state.menuClass;
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
