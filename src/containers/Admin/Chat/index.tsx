import { Col, Layout, Row } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import Block from "../../../components/Holder";
import { setUser } from "../../../redux/app/actions";
import { IRootState } from "../../../redux/reducers";

import { Button, Input, Popover, Table } from "antd";

import t from "../../../services/trans/i18n";

import "./style.less";

interface IProps {
    user: any;
}

interface IState {
    users: any[];
    loading: boolean;
    pagination: any;
}

class ChatAdminContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            loading: false,
            users: [],
            pagination: {},
        };
    }

    public render() {
        return (
            <div className="frame-container">
                     <iframe className="frm" src="http://support.b2mark.com/" ></iframe>
            </div>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        user: (user) => dispatch(setUser({ user })),
    };
}

function mapStateToProps(state: IRootState) {
    return {
        user: state.app.user,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatAdminContainer);
