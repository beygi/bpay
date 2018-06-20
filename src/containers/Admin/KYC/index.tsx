import { Col, Layout, Row } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import Block from "../../../components/Holder";
import API from "../../../lib/api/index";
import { setUser } from "../../../redux/app/actions";
import { IRootState } from "../../../redux/reducers";

import { Button, Input, Popover, Table } from "antd";
import Api from "../../../lib/api";

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

const api = Api.getInstance();
const columns = [
    {
        dataIndex: "vip", render: (record) => {
            return {
                children: record === "vip" ? "VIP" : "",
                props: {
                    className: record === "vip" ? "vip" : "",
                },
            };
        }, title: "",
    },
    {
        dataIndex: "fullname", render: (record) => {
            console.log(record);
            return {
                children: record,
                props: {
                    className: "noRightPadding",
                },
            };
        }, title: "Full Name",
    },
    {
        dataIndex: "role", render: (record) => {
            return {
                children: record,
                props: {
                    className: "role",
                },
            };
        }, title: "Role",
    },
    { title: "Skill", dataIndex: "skillName", key: "skillName" },
    {
        dataIndex: "status", key: "status", render: (record) => {
            return {
                children: <span><i className={"circle"} />
                </span>,
                props: {
                    className: record,
                },
            };
        }, title: "Status",
    },
    {
        dataIndex: "", key: "x", render: () => {
            return {
                children: <a href="#">{t.t("view profile")}</a>,
                props: {
                    className: "endText",
                },
            };
        }, title: "",
    },
];

class KycAdminContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            loading: false,
            users: [],
            pagination: {},
        };
    }

    public componentDidMount() {
        this.loadData();
    }

    public render() {
        return (
            <Row gutter={8}>
                <Col md={6} >
                    <Block>
                    </Block>
                    <Block>
                    </Block>
                </Col>
                <Col md={18} >
                    <Table
                        loading={this.state.loading}
                        columns={columns}
                        expandedRowRender={(record) => <p style={{ margin: 0 }}>{record.description}</p>}
                        // rowClassName={(record, index) => record.status + index}
                        dataSource={this.state.users}
                        pagination={this.state.pagination}
                    />
                </Col>
            </Row>
        );
    }

    private loadData() {
        api.getAllKYC().then((response) => {
            console.log(response);
        },
        );
        return true;
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

export default connect(mapStateToProps, mapDispatchToProps)(KycAdminContainer);
