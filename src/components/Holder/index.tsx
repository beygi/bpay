import { Collapse } from "antd";
import * as React from "react";
import "./style.less";

const Panel = Collapse.Panel;

interface IProps {
    children: any;
    noPadding?: boolean;
    className?: string;
    collapse?: boolean;
    collapseClosed?: boolean;
    title?: string | JSX.Element;
    icon?: JSX.Element;
    iconPosition?: string;
    transparent?: boolean;
    showArrow?: boolean;
}

interface IState {
}

class BlockComponent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        let cssClass = this.props.className || "";
        const transparentClass = (this.props.transparent) ? "transparent" : "";
        let title: JSX.Element ;
        const icon: JSX.Element = <span className={this.props.iconPosition}>{this.props.icon}</span>;
        const disabled = (this.props.collapseClosed) ? "0" : "1";
        const showArrow = (this.props.showArrow !== undefined) ?  this.props.showArrow : true;

        // handle no-padding block
        cssClass += " block";
        cssClass += " " + transparentClass;
        if (this.props.noPadding || this.props.collapse) {
            cssClass += " no-padding";
        }

        if (this.props.collapse) {
            title = <div>{icon} {this.props.title || <span>&nbsp;</span>}</div>;
            return (
            <div className={cssClass} >
                        <Collapse className= "block-collapse" bordered={false} activeKey={disabled} defaultActiveKey={null}   >
                                  <Panel header={title} key="1"  showArrow={showArrow} >
                                      {this.props.children}
                                  </Panel>
                        </Collapse>
            </div>
            );
        }

        title = <h2>{icon} {this.props.title}</h2>;
        return (
        <div className={cssClass} >
                    {title}
                    {this.props.children}
        </div >
        );
    }

}

export default BlockComponent;
