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
    centerTitle?: boolean;
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
        const icon: JSX.Element = (this.props.icon) ? <span className={`block-icon ${this.props.iconPosition}`}>{this.props.icon}</span> : null;
        const disabled = (this.props.collapseClosed) ? ["0"] : ["1"];
        const showArrow = (this.props.showArrow !== undefined) ?  this.props.showArrow : true;
        const centerTitle = (this.props.centerTitle !== undefined && this.props.centerTitle) ?  "center-title" : "";

        // handle no-padding block
        cssClass += " block";
        cssClass += " " + transparentClass;
        if (this.props.noPadding || this.props.collapse) {
            cssClass += " no-padding";
        }

        if (this.props.collapse) {
            title = <div className="block-title-collapse">{icon} {this.props.title || <span>&nbsp;</span>}</div>;
            return (
            <div className={cssClass} >
                        <Collapse key={disabled[0]} className= "block-collapse" bordered={false} defaultActiveKey={["1"]}   >
                                  <Panel header={title}  key="1" showArrow={showArrow} >
                                      {this.props.children}
                                  </Panel>
                        </Collapse>
            </div>
            );
        }

        title = (this.props.title) ? <div className="block-title">{icon}<span className={centerTitle}>{this.props.title}</span></div> : null;
        return (
        <div className={cssClass} >
                    {title}
                    {this.props.children}
        </div >
        );
    }

}

export default BlockComponent;
