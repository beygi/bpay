/**
 * @module Components/Layout/PublicLayout
 */
import * as React from "react";

interface IProp {
    children?: JSX.Element;
}

/**
 * public layout to represent public pages that don't need a loggined user
 */
export default class PublicLayout extends React.Component {
    public render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
