import { Col, Layout, Row } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import API from "../../lib/api-old";
import { setUser } from "../../redux/app/actions";
import { IRootState } from "../../redux/reducers";

import { Button, Input, Popover, Table, Tabs, Tag } from "antd";

const Search = Input.Search;
const TabPane = Tabs.TabPane;
const { CheckableTag } = Tag;
const api = API.getInstance();
// import paginationElement from "../../components/Pagination";

import t from "../../services/trans/i18n";

import "./style.less";

interface IProps {
    user: any;
}

interface IState {
    users: any[];
    loading: boolean;
}

const columns = [
    { title: "Name", dataIndex: "firstName", key: "firstName" },
    { title: "Family", dataIndex: "lastName", key: "lastName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { dataIndex: "status", key: "status", render: (record) => <b>{record}</b>, title: "Status" },
];

const content = (
    <div>
        <Button type="primary">{t.t("active")}</Button>
        <Button>{t.t("verify")}</Button>
        <Button>{t.t("test")}</Button>
    </div>
);

class CustomersContainer extends React.Component<IProps, IState> {
    private api = API.getInstance();
    private skills = [];

    constructor(props: IProps) {
        super(props);
        this.state = {
            loading: true,
            users: [],
        };
    }

    public componentDidMount() {
        this.loadData();
    }

    public loadData() {
        // make an ajax call to users

        api.GetUsers().then((res) => {

            this.setState({
                users: res.data,
                loading: false,
            });
        });
    }

    public render() {
        return (
            <Row gutter={8}>
                <Col md={24} >
                    <Search className="user-search"
                        placeholder="input search text"
                        onSearch={(value) => {
                            console.log(value);
                        }}
                    />

                    <Table rowKey="id"
                        loading={this.state.loading}
                        columns={columns}
                        expandedRowRender={(record) => <p style={{ margin: 0 }}>{record.description}</p>}
                        // rowClassName={(record, index) => record.status + index}
                        dataSource={this.state.users}
                    />
                </Col>
            </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomersContainer);
