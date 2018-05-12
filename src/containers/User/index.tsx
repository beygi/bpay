import * as React from "react";
import {connect} from "react-redux";
import {Route} from "react-router";
import {setUser} from "../../redux/app/actions";
import {IRootState} from "../../redux/reducers";

import { Button, Checkbox, Form, Icon, Input } from "antd";
const FormItem = Form.Item;

import Login from "./components/Login";

interface IProps {
    user: any;
}

interface IState {
    user?: any;
    loading: boolean;
}

class UserContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    public render() {
        return (
            <div>
                <Route path={`/user/login`} component={Login}/>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        user: (user) => dispatch(setUser({user})),
    };
}

function mapStateToProps(state: IRootState) {
    return {
        user: state.app.user,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
