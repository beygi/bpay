import { Collapse } from "antd";
import * as React from "react";
import "./style.less";

const Panel = Collapse.Panel;

interface IProps {
    children: any;
    noPadding?: boolean;
    className?: string;
    collapse?: boolean;
    title?: string;
}

interface IState {
}

class BlockComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        let cssClass = this.props.className || "";
        cssClass += " block";
        if (this.props.noPadding || this.props.collapse) {
            cssClass += " no-padding";
        }

        if (this.props.collapse && this.props.title) {
            return (
            <div className={cssClass} >
                        <Collapse className="block-collapse" bordered={false} defaultActiveKey={["1"]}>
                                  <Panel header={this.props.title} key="1">
                                      {this.props.children}
                                  </Panel>
                        </Collapse>
            </div >
            );
        }
        let title: JSX.Element;
        title = <div></div>;
        if  (this.props.title) {
            title = <h2>{this.props.title}</h2>;
        }
        return (
        <div className={cssClass} >
                    {title}
                    {this.props.children}
        </div >
        );
    }

}

export default BlockComponent;
