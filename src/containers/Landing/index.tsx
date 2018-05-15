import { Button } from "antd";
import * as React from "react";
import { Redirect } from "react-router";
import USER from "./../../lib/user";

const user =  USER.getInstance();

interface IProps {
}

interface IState {
}

class LandingContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.login = this.login.bind(this);
    }

    public render() {
        if (user.getCurrent()) {
            return (
                <Redirect to="/dashboard" />
            );
        }
        return (
            <div>
                <h1>Landing</h1>
                <Button onClick={this.login} type="primary" htmlType="submit" className="login-form-button">
                    Login
                </Button>
            </div>
        );
    }

    private login() {
        user.keycloak.login();
    }
}

export default LandingContainer;
