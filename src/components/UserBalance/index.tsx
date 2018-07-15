import { Collapse } from "antd";
import * as React from "react";

import { connect } from "react-redux";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import USER from "./../../lib/user";
import "./style.less";

const userObject = USER.getInstance();

interface IProps {
    user: any;
}

interface IState {
}

class UserBalanceComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        // this.action = this.action.bind(this);
    }

    public render() {
        return (
            <div>BALANCE</div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

function mapStateToProps(state: IRootState) {
    return {
        user: state.app.user,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBalanceComponent);
