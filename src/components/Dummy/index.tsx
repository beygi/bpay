/**
 * @module Components/DummyComponent
 */
import { Collapse } from "antd";
import * as React from "react";

import { connect } from "react-redux";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import USER from "./../../lib/user";
import "./style.less";

const userObject = USER.getInstance();

interface IProps {
    /**  current user's email address that is synced with redux */
    email: any;
}

interface IState {
}

/**
 * this is a Dummy component, you can copy this to start a new component
 */
class DummyComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <div>Dummy Text</div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

function mapStateToProps(state: IRootState) {
    return {
        email: state.app.user.email,
    };
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(DummyComponent);
