/**
 * @module Components/Layout
 */
import * as React from "react";
import USER from "./../../lib/user";
import DashboardPrivateLayout from "./containers/DashboardPrivate";
import PublicLayout from "./containers/Public";

const userObject = USER.getInstance();

export interface IProps {
    private: boolean;
    admin?: boolean;
    children?: any;
}

export default class Layout extends React.Component<IProps> {
    private admin: boolean = false;

    constructor(props: IProps) {
        super(props);

    }

    public render() {
        // decide if user is admin or not
         this.admin = false;
         if (this.props.children.props.location && this.props.children.props.location.pathname.startsWith("/admin/")) {
             this.admin = true;
         }

         if (this.admin  && !userObject.permission("admin").adminView) {
             // we have some rats here
             this.admin = false;
             return(<PublicLayout><h1>404. not found</h1></PublicLayout>);
         }
         return (
            this.props.private ?
                // <PrivateLayout>{this.props.children}</PrivateLayout>
                <DashboardPrivateLayout isAdmin={this.admin}>{this.props.children}</DashboardPrivateLayout>
                :
                <PublicLayout>{this.props.children}</PublicLayout>
        );
    }
}
