import * as React from "react";
import DashboardPrivateLayout from "./containers/DashboardPrivate";
import PublicLayout from "./containers/Public";

export interface IProps {
    private: boolean;
    admin?: boolean;
    children?: any;
}

export default class Layout extends React.Component<IProps> {
    private admin: boolean = false;

    constructor(props: IProps) {
        super(props);

        if (this.props.children.props.location && this.props.children.props.location.pathname.startsWith("/admin/")) {
            this.admin = true;
        }
        // TODO for user permission
        // if (this.admin && false) {
        //     // user is not an admin.
        //     this.admin = false;
        // }
    }

    public render() {
        return (
            this.props.private ?
                // <PrivateLayout>{this.props.children}</PrivateLayout>
                <DashboardPrivateLayout isAdmin={this.admin}>{this.props.children}</DashboardPrivateLayout>
                :
                <PublicLayout>{this.props.children}</PublicLayout>
        );
    }
}
