/**
 * @module Components/SessionsComponent
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "antd";
import * as React from "react";
import t from "../../services/trans/i18n";
import "./style.less";

interface IProps {
}

interface IState {
}

const columns = [{
  title: "IP",
  dataIndex: "ip",
}, {
  title: "Started",
  dataIndex: "started",
}, {
  title: "Last Access",
  dataIndex: "lastAccess",
},
{
  title: "Expires",
  dataIndex: "expires",
},
];

const data = [{
  key: "1",
  ip: "134.156.177.188",
  started : "Aug 2, 2018 3:48:24 AM",
  lastAccess: "Aug 2, 2018 3:48:24 AM",
  expires: "Aug 2, 2018 1:48:30 PM",
},
{
  key: "2",
  ip: "134.156.177.188",
  started : "Aug 2, 2018 3:48:24 AM",
  lastAccess: "Aug 2, 2018 3:48:24 AM",
  expires: "Aug 2, 2018 1:48:30 PM",
},
{
  key: "3",
  ip: "134.156.177.188",
  started : "Aug 2, 2018 3:48:24 AM",
  lastAccess: "Aug 2, 2018 3:48:24 AM",
  expires: "Aug 2, 2018 1:48:30 PM",
}];

class SessionsComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <div className="sessions">
                <Table pagination={false} columns={columns} dataSource={data} size="small" />
            </div >
        );
    }
}

export default SessionsComponent;
