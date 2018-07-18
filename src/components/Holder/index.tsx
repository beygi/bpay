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
    icon?: JSX.Element;
}

interface IState {
}

class BlockComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        let cssClass = this.props.className || "";
        let title: JSX.Element;

        // handle no-padding block
        cssClass += " block";
        if (this.props.noPadding || this.props.collapse) {
            cssClass += " no-padding";
        }

        if (this.props.collapse && this.props.title) {
            title = <div>{this.props.icon} {this.props.title}</div>;
            return (
            <div className={cssClass} >
                        <Collapse className="block-collapse" bordered={false} defaultActiveKey={["1"]}>
                                  <Panel header={title} key="1">
                                      {this.props.children}
                                  </Panel>
                        </Collapse>
            </div >
            );
        }
        title = <h2>{this.props.icon} {this.props.title}</h2>;
        return (
        <div className={cssClass} >
                    {title}
                    {this.props.children}
        </div >
        );
    }

}

export default BlockComponent;
