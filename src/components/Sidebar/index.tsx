import { Icon, Layout, Menu } from "antd";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";

import * as Gravatar from "react-gravatar";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import menu from "./menu";

import "./style.less";

import { connect } from "react-redux";
import { IRootState } from "../../redux/reducers";

const logo = require("../../assets/images/logo.png");

const { Sider }: any = Layout;

interface IProps extends RouteComponentProps<any> {
    user: any;
    company: any;
    collapsed: boolean;
}

interface IState {
    menuItems: object[];
}

class Sidebar extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            menuItems: this.renderWholeMenu(menu()),
        };
    }

    public renderWholeMenu(obj) {
        const outerItem: any = [];
        for (const objKey in obj) {
            if (obj[objKey].visible) {
                outerItem.push(this.renderMenuItem(obj[objKey]));
            }
        }
        return outerItem;
    }

    public renderMenuItem(item) {
        if (item.subMenu) {
            const innerItems: any = this.renderWholeMenu(item.subMenu);
            return (
                <Menu.SubMenu
                    key={item.key}
                    title={<span><Icon type={item.iconType} /><span>{item.text}</span></span>}>
                    {innerItems}
                </Menu.SubMenu>
            );
        } else {
            let icon: JSX.Element;
            if (item.iconType) { icon = <Icon type={item.iconType} />; }
            return (
                <Menu.Item key={item.key}>
                    <Link to={item.url || ""}><span>{icon}<span>{item.text}</span></span></Link>
                </Menu.Item>
            );
        }
    }

    public render() {
        return (
            <Sider>
                <div id={"menuImageBox"}>
                    <img src={logo} id={"menuLogo"} />
                    <Gravatar email={this.props.user.email} default="monsterid"
                    size={200} className={"menuProfilePic"} />
                </div>
                <div id={"menuTextBox"}>
                    <p className={"desc"}>{this.props.user.name}</p>
                    {/* <p className={"desc"}>{this.props.user.attributes.role}</p> */}
                </div>
                <Menu theme="dark" inlineCollapsed={this.props.collapsed} mode="inline" defaultSelectedKeys={["1"]}>
                    {this.state.menuItems.map((item) => item)}
                </Menu>
            </Sider>
        );
    }

}

function mapStateToProps(state: IRootState) {
    return {
        user: state.app.user,
        company: state.app.company,
    };
}

export default connect(mapStateToProps)(withRouter<IProps>(Sidebar as any));
