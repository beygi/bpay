import * as React from "react";
import "./style.less";

interface IProps {
    children: any;
    noPadding?: boolean;
}

interface IState {
}

class BlockComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        let noPaddingClass = "block";
        if (this.props.noPadding) {
            noPaddingClass = "block no-padding";
        }
        // finde selected menu name based on pathname
        return (
        <div className={noPaddingClass} >
                    {this.props.children}
            </div >
        );
    }

}

export default BlockComponent;
