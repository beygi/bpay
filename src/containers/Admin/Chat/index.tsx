import { Col, Layout, Row } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import Block from "../../../components/Holder";
import { IRootState } from "../../../redux/reducers";

import { Button, Input, Popover, Table } from "antd";

import t from "../../../services/trans/i18n";

import "./style.less";

interface IProps {
}

interface IState {
}

class ChatAdminContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <div className="frame-container">
                <iframe className="frm" src="http://support.b2mark.com/" ></iframe>
            </div>
        );
    }
}

export default ChatAdminContainer;
