import * as React from "react";
import DashboardPrivateLayout from "./containers/DashboardPrivate";
import PublicLayout from "./containers/Public";

export interface IProps {
    private: boolean;
    children?: any;
}

export default class Layout extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            this.props.private ?
                // <PrivateLayout>{this.props.children}</PrivateLayout>
                <DashboardPrivateLayout>{this.props.children}</DashboardPrivateLayout>
                :
                <PublicLayout>{this.props.children}</PublicLayout>
        );
    }
}
