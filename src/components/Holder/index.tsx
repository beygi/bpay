import * as React from "react";
import "./style.less";

interface IProps {
    children: JSX.Element;
}

interface IState {
}

class BlockComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        // finde selected menu name based on pathname
        return (
            <div className="block">
                    {this.props.children}
            </div >
        );
    }

}

export default BlockComponent;
